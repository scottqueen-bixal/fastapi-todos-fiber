from typing import Optional

from pydantic import BaseModel


class CreateTodo(BaseModel):
    task: str
    is_completed: bool = False
    is_seed_data: bool = False


class UpdateTodo(BaseModel):
    task: Optional[str] = None
    is_completed: Optional[bool] = None
