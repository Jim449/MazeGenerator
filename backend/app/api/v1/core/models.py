from typing import List, Optional
from sqlalchemy import ForeignKey, String, Integer, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)


class BlueprintModel(Base):
    __tablename__ = "blueprint"
    name: Mapped[str] = mapped_column(String, default="Blueprint")
    area_length: Mapped[int] = mapped_column(Integer)
    area_count: Mapped[int] = mapped_column(Integer)
    randomize_areas: Mapped[bool] = mapped_column(Boolean, default=True)
    areas: Mapped[List["BlueprintAreaModel"]] = relationship(
        back_populates="blueprint")

    def __repr__(self) -> str:
        return f"Blueprint with {self.area_length}x{self.area_length} areas of size {self.area_count}x{self.area_count}"


class BlueprintAreaModel(Base):
    __tablename__ = "blueprint_area"
    blueprint_id: Mapped[int] = mapped_column(ForeignKey("blueprint.id"))
    x: Mapped[int] = mapped_column(Integer)
    y: Mapped[int] = mapped_column(Integer)
    north: Mapped[int] = mapped_column(Integer, default=0)
    east: Mapped[int] = mapped_column(Integer, default=0)
    south: Mapped[int] = mapped_column(Integer, default=0)
    west: Mapped[int] = mapped_column(Integer, default=0)
    blueprint: Mapped["BlueprintModel"] = relationship(back_populates="areas")

    def __repr__(self) -> str:
        return f"Area at ({self.x}, {self.y}) with connections NESW {self.north}, {self.east}, {self.south}, {self.west}"


class Direction(Base):
    __tablename__ = "direction"
    value: Mapped[int] = mapped_column(Integer, unique=True)
    name: Mapped[str] = mapped_column(String(20), unique=True)

    def __repr__(self) -> str:
        return f"Direction {self.name}"


class BlueprintMessageModel(Base):
    __tablename__ = "message"
    text: Mapped[str] = mapped_column(String(2000))
    direction: Mapped[int] = mapped_column(
        ForeignKey("direction.id"), nullable=True)
    distance: Mapped[int] = mapped_column(Integer, nullable=True)
    blueprint_area_id: Mapped[id] = mapped_column(
        ForeignKey("blueprint_area.id"))

    def __repr__(self) -> str:
        return f"Message {self.text:20}..."
