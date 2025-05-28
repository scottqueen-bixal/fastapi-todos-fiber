from datetime import datetime

from pydantic import BaseModel


class CreateTodo(BaseModel):
    task: str
    is_completed: bool = False
    is_seed_data: bool = False
