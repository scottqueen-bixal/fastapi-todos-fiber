from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db import get_async_db_session
from app.models import Todos
# from app.schemas import TodoCreate, TodoUpdate


router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_items(db: Session = Depends(get_async_db_session)):
    todos = db.query(Todos).all()
    return todos

@router.get("/{todo_id}")
async def read_item(todo_id: int, db: Session = Depends(get_async_db_session)):
    todo = db.query(Todos).filter(Todos.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")
    return todo
