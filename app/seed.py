from sqlalchemy.ext.asyncio import AsyncSession
from app.models.Todos import Todos
from app.schemas.Todos import CreateTodo


async def seed_todos(db: Annotated[AsyncSession, Depends(get_async_db_session)]):
    # Check if data already exists to avoid duplicate seeding
    existing_count = await db.execute("SELECT COUNT(*) FROM todos")
    if existing_count.scalar() == 0:
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
