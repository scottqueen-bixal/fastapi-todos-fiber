from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TodoBase(BaseModel):
  title: str
  description: Optional[str] = None
  completed: bool = False

class TodoCreate(TodoBase):
  pass

class TodoUpdate(TodoBase):
  title: Optional[str] = None
  description: Optional[str] = None
  completed: Optional[bool] = None

class TodoInDBBase(TodoBase):
  id: int
  created_at: datetime
  updated_at: datetime

  class Config:
    orm_mode = True

class Todo(TodoInDBBase):
  pass
