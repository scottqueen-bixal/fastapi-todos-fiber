import asyncio
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
import settings

engine = create_async_engine(
    settings.SQLALCHEMY_DATABASE_URL,
    echo=settings.SQLALCHEMY_ECHO,
)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def get_async_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

if __name__ == "__main__":
    asyncio.run(get_async_db_session())
