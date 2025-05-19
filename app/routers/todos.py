from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_async_db_session
from app.models.Todos import Todos
from app.schemas.Todos import CreateTodo


router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}},
)

@router.post("", summary="Create a new todo")
async def create_todo(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    request_data: CreateTodo,
) -> CreateTodo:
    todo = Todos(task=request_data.task, is_completed=request_data.is_completed)
    db.add(todo)
    await db.commit()
    await db.refresh(todo)
    return CreateTodo(
        id=todo.id,
        task=todo.task,
        is_completed=todo.is_completed,
    )
