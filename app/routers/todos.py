from typing import Annotated

from fastapi import APIRouter, Depends
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


@router.post("/seed")
async def seed_todos(db: Annotated[AsyncSession, Depends(get_async_db_session)]):
    # Check if data already exists to avoid duplicate seeding
    result = await db.execute(text("SELECT COUNT(*) FROM todos"))
    existing_count = result.scalar()
    if existing_count == 0:
        # Add seed data
        todos = [
            CreateTodo(task="Buy groceries", is_completed=False),
            CreateTodo(task="Read a book", is_completed=False),
        ]
        for todo_data in todos:
            todo = Todos(task=todo_data.task, is_completed=todo_data.is_completed)
            db.add(todo)
        await db.commit()
        print("Database seeded successfully!")
    else:
        print("Database already seeded.")


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
