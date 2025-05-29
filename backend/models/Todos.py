from sqlalchemy import Column, Integer, String, Boolean, DateTime
from backend.db import Base
import datetime


class Todos(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)
    is_seed_data = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(
        DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now
    )
