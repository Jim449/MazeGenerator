from sqlalchemy import create_engine, URL
import os
import dotenv

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
