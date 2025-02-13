from typing import List, Optional
from sqlalchemy import ForeignKey, String, Integer, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class BlueprintModel(Base):
    __tablename__ = "blueprint"
    id: Mapped[int] = mapped_column(primary_key=True)
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
    id: Mapped[int] = mapped_column(primary_key=True)
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
