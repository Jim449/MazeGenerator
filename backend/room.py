class Room():
    """Describes a maze room"""
    OPEN: int = 1
    CLOSED: int = 0
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3

    def __init__(self, x: int, y: int, number: int, area: int):
        """Creates an empty room at (x, y)"""
        self.x: int = x
        self.y: int = y
        self.number: int = number
        self.area: int = area
        self.paths: list[int] = [0, 0, 0, 0]
        self.connections: list[int] = []

    def get_type(self) -> str:
        """Returns the types of path NESW.
        Equals the name of the room image"""
        result = ""

        for path in self.paths:
            if path > 0:
                result = "1" + result
            else:
                result = "0" + result
        return result

    def set_path(self, dir: int, value: int, linked_room: int) -> None:
        """Sets a path towards a direction to OPEN or CLOSED"""
        self.paths[dir] = value
        self.connections.append(linked_room)

    def has_path(self, dir: int) -> bool:
        """Returns true if there is a path towards the given direction"""
        return self.paths[dir] > 0

    def connected_to(self, room_number: int) -> bool:
        """Returns true if there is a direct path from this room
        to the room with the given room number"""
        return room_number in self.connections

    def clear(self) -> None:
        """Clears paths, number and area"""
        self.paths = [0, 0, 0, 0]
        self.connections = []
        self.number = -1
        self.area = -1

    @staticmethod
    def reverse(dir: int) -> int:
        """Returns the reverse direction"""
        return (dir + 2) % 4

    def is_empty(self) -> bool:
        """Returns true if room details haven't been set"""
        return self.area == -1
