from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.db import get_async_db_session
from app.models.Todos import Todos
from app.schemas.Todos import CreateTodo


router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}},
)


@router.post("/seed", summary="Seed X number of todos")
async def seed_todos(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
    count: int,
) -> dict:
    if count <= 0:
        raise HTTPException(status_code=400, detail="Count must be greater than 0")

    todos = [
        Todos(task=f"Sample Todo {i + 1}", is_seed_data=True) for i in range(count)
    ]
    db.add_all(todos)
    await db.commit()

    todos_response = [
        {"id": todo.id, "task": todo.task, "is_seed_data": todo.is_seed_data}
        for todo in todos
    ]

    return {
        "message": f"Successfully seeded {count} todos",
        "todos": todos_response,
    }


@router.delete("/seed/delete", summary="Delete all seed todos")
async def delete_seed_todos(
    db: Annotated[AsyncSession, Depends(get_async_db_session)],
) -> dict:
    # Delete all rows where is_seed_data=True
    await db.execute(text("DELETE FROM todos WHERE is_seed_data = true"))
    await db.commit()

    return {"message": "Successfully deleted all seed todos"}


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
