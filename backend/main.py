from fastapi import FastAPI, HTTPException, Depends, status, Request
from typing import List
from contextlib import asynccontextmanager
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.db_setup import init_db, get_db
import app.api.v1.core.models as m
import app.api.v1.core.schemas as sc

# app = FastAPI()

# Funktion som körs när vi startar FastAPI -
# perfekt ställe att skapa en uppkoppling till en databas

# Skapar ej databaser som redan finns


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)


# My endpoints, move to another file
@app.get("/status")
def status():
    return {"message": "API is up and running."}


# My original version
# @app.get("/blueprint", response_model=List[sc.BlueprintSchema])
# def get_blueprints():
#     result = db.get_blueprints()
#     return result

# From lecture
@app.get("/blueprint", status_code=200)
def get_blueprints(session: Session = Depends(get_db)):
    blueprints = session.scalars(select(m.BlueprintModel)).all()
    if not blueprints:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, details="No blueprints found"
        )
    return blueprints
