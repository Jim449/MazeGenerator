from sqlalchemy import create_engine, select, URL, ScalarResult
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import app.api.v1.core.models as m
import os
import dotenv
import app.api.v1.core.schemas as sc

dotenv.load_dotenv()

DATABASE = os.getenv("DATABASE")
PASSWORD = os.getenv("PASSWORD")

connection_string = URL.create(
    "postgresql+psycopg2",
    username="postgres",
    password=PASSWORD,
    host="localhost",
    port=5432,
    database=DATABASE)

engine = create_engine(connection_string, echo=True)


def get_blueprints() -> ScalarResult:
    statement = select(m.BlueprintModel)

    with Session(engine) as session:
        result = session.execute(statement)
        schema_list = []

        for item in result.scalars().all():
            schema_item = sc.BlueprintSchema.model_validate(item)
            schema_list.append(schema_item)

        return schema_list
