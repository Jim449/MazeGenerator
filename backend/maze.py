from room import Room
from blueprint import Blueprint
from trail import Trail
from random import shuffle


class Maze(Blueprint):
    """A maze"""

    def __init__(self, area_count: int, area_size: int):
        """Generates an empty maze"""
        super().__init__(area_count, area_size)
        self.length: int = area_count * area_size
        self.size: int = self.length**2
        self.areas: dict[int, list[Room]] = dict()
        self.blueprint: Blueprint = None
        self.trails: list[Trail] = []

    def build_maze(self, blueprint: Blueprint) -> None:
        """Constructs the maze from a blueprint"""
        self.blueprint = blueprint
        blueprint_x = 0
        blueprint_y = 0

        for y in range(self.length):
            row = []
            blueprint_y = y // self.area_size

            for x in range(self.length):
                blueprint_x = x // self.area_size
                room = Room(x, y, number=-1, area=-1)
                area = blueprint.get_location(blueprint_x, blueprint_y).area
                self.set_area(room, area)
                row.append(Room(x, y, number=-1,
                                area=blueprint.get_location(blueprint_x, blueprint_y).area))
            self.map.append(row)

    def get_area(self, id: int) -> list[Room]:
        """Returns all rooms of a given area.

        Raises:
            KeyError"""
        return self.areas[id]

    def find_area_neighbors(self, room: Room, discovered: set[Room]) -> set[Room]:
        """Search the surroundings for rooms belonging to the same area.
        If this function doesn't locate all rooms of the area,
        it indicates the area has been broken up into distinct parts
        and that it is invalid"""
        for direction in range(4):
            try:
                neighbor = self.get_next_location(room.x, room.y, direction)

                if neighbor.area == room.area and neighbor not in discovered:
                    discovered.add(neighbor)
                    self.find_area_neighbors(neighbor, discovered)
            except IndexError:
                pass
        return discovered

    def check_area_unity(self, id: int) -> bool:
        """Returns true if the area 'id' is valid
        and not broken up into distinct parts"""
        area = self.get_area(id)
        start = area[0]
        discovered = {start}
        discovered = self.find_area_neighbors(start, discovered)
        return len(area) == len(discovered)

    def set_area(self, room: Room, area: int) -> bool:
        """Assigns an area to a room"""
        old_area = room.area
        room.area = area

        if old_area == -1:
            if area in self.areas:
                self.get_area(area).append(room)
            else:
                self.areas[area] = [room]
            return True
        elif self.check_area_unity(old_area):
            self.get_area(old_area).remove(room)
            self.get_area(area).append(room)
            return True
        else:
            # Or raise error
            return False

    def get_area_border(self, area_1: int, area_2: int = None) -> tuple[Room]:
        """Returns a room of area_1, a room of area_2
        and a direction linking the rooms together.
        Return values are picked at random from valid rooms and directions.
        If area_2 is None, it represents any area not equal to area_1"""
        area_copy = self.areas[area_1].copy()
        shuffle(area_copy)

        for room in area_copy:
            for dir in self.get_directions():
                try:
                    neighbor = self.get_next_location(room.x, room.y, dir)

                    if area_2 == None or neighbor.area == area_2:
                        return (room, neighbor, dir)
                except IndexError:
                    pass

    def expand_from_room(self, room: Room, connect: bool = False, trail: Trail = None) -> Room:
        """Given a room, returns a random, neighboring,
        previously unconnected room within the same area.
        Returns None if no valid room was found.

        If connect is true, this instead returns a random, neighboring,
        already connected room within the same area,
        belonging to a different trail"""
        directions = self.get_directions()

        while len(directions) > 0:
            dir = directions.pop()

            try:
                neighbor = self.get_next_location(room.x, room.y, dir)

                if connect and neighbor.area == room.area \
                        and trail.has_connection(neighbor.trail) == False:
                    self.connect_rooms(room.x, room.y, dir)
                    return neighbor
                elif connect:
                    return None
                elif neighbor.is_unconnected() and neighbor.area == room.area:
                    self.connect_rooms(room.x, room.y, dir)
                    return neighbor
            except IndexError:
                pass
        return None

    def connect_trails(self) -> None:
        """Expands all trails again in order to connect them"""
        for trail in self.trails:
            for room in trail:
                neighbor = self.expand_from_room(
                    room, connect=True, trail=trail)

                if neighbor != None:
                    trail.connect_trail(neighbor.trail)
                    self.trails[neighbor.trail].connect_trail(trail.id)
                    break

    def explore(self, trail: Trail) -> bool:
        """Given a trail of rooms,
        expand with a neighboring,
        previously unconnected room within the same area.
        Returns true if successful"""
        # Trail implements reverse order iteration
        for room in trail:
            addition = self.expand_from_room(room)

            if addition != None:
                trail.add_room(addition)
                return True
        trail.finished = True
        return False

    def construct_areas(self) -> None:
        """Constructs the maze by connecting rooms within the same areas.
        Call construct_connections first"""
        finished = False

        while not finished:
            finished = True

            for trail in self.trails:
                if trail.finished == False:
                    self.explore(trail)
                    finished = False
            # Testingtesting!
            maze.display()
            input()

        self.connect_trails()

    def construct_connections(self) -> None:
        """Connects areas according to the blueprint.
        Opens up rooms which can be used as starting points
        for further maze expansion"""
        for area_1 in range(self.blueprint.size - 1):
            for area_2 in range(area_1 + 1, self.blueprint.size):
                if self.blueprint.has_area_connection(area_1, area_2):
                    room, neighbor, dir = self.get_area_border(area_1, area_2)
                    self.connect_rooms(room.x, room.y, dir)
                    self.trails.append(Trail(len(self.trails), area_1, room))
                    self.trails.append(
                        Trail(len(self.trails), area_2, neighbor))


if __name__ == "__main__":
    blueprint = Blueprint(3, 3)
    blueprint.setup()
    blueprint.get_location(0, 0).area = 0
    blueprint.get_location(1, 0).area = 1
    blueprint.get_location(2, 0).area = 2
    blueprint.get_location(0, 1).area = 3
    blueprint.get_location(1, 1).area = 4
    blueprint.get_location(2, 1).area = 5
    blueprint.get_location(0, 2).area = 6
    blueprint.get_location(1, 2).area = 7
    blueprint.get_location(2, 2).area = 8
    blueprint.connect_rooms(0, 0, Room.EAST)
    blueprint.connect_rooms(1, 0, Room.SOUTH)
    blueprint.connect_rooms(1, 1, Room.EAST)
    blueprint.connect_rooms(1, 1, Room.WEST)
    blueprint.connect_rooms(1, 1, Room.SOUTH)
    blueprint.connect_rooms(2, 1, Room.NORTH)
    blueprint.connect_rooms(0, 1, Room.SOUTH)
    blueprint.connect_rooms(0, 2, Room.EAST)
    blueprint.connect_rooms(1, 2, Room.EAST)
    blueprint.display()
    maze = Maze(3, 3)
    maze.build_maze(blueprint)
    maze.construct_connections()
    maze.construct_areas()
    maze.display()
