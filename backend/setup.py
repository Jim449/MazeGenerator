import models as m
from database import engine
from sqlalchemy.orm import Session


def setup():
    m.Base.metadata.create_all(engine)

    with Session(engine) as session:
        blueprint_1 = m.BlueprintModel(
            area_length=5,
            area_count=1,
            randomize_areas=False,
            areas=[m.BlueprintAreaModel(x=0, y=0, north=1)])

        blueprint_2 = m.BlueprintModel(
            area_length=4,
            area_count=2,
            areas=[m.BlueprintAreaModel(x=0, y=0, east=1, west=1),
                   m.BlueprintAreaModel(x=1, y=1, west=1, south=1),
                   m.BlueprintAreaModel(x=0, y=1, east=1),
                   m.BlueprintAreaModel(x=1, y=1, west=1, north=1)])

        blueprint_3 = m.BlueprintModel(
            area_length=3,
            area_count=3,
            areas=[m.BlueprintAreaModel(x=0, y=0, east=1),
                   m.BlueprintAreaModel(
                x=1, y=0, north=1, east=1, west=1, south=1),
                m.BlueprintAreaModel(x=2, y=0, west=1),
                m.BlueprintAreaModel(x=0, y=1, east=1),
                m.BlueprintAreaModel(
                x=1, y=1, north=1, east=1, south=1, west=1),
                m.BlueprintAreaModel(x=2, y=1, west=1),
                m.BlueprintAreaModel(x=0, y=2, east=1),
                m.BlueprintAreaModel(x=1, y=2, north=1, east=1, west=1),
                m.BlueprintAreaModel(x=2, y=2, west=1)])

        session.add_all([blueprint_1, blueprint_2, blueprint_3])
        session.commit()


if __name__ == "__main__":
    setup()
