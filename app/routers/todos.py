from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}},
)

fake_todos_db = fake_todos_db = {
    "1": {"task": "Buy groceries", "is_complete": True, "created_at": "2025-05-17T00:00:00Z"},
    "2": {"task": "Complete project report", "is_complete": False, "created_at": "2025-05-17T00:00:00Z"},
    "3": {"task": "Schedule dentist appointment", "is_complete": False, "created_at": "2025-05-17T00:00:00Z"},
    "4": {"task": "Call mom", "is_complete": False, "created_at": "2025-05-17T00:00:00Z"},
    "5": {"task": "Plan weekend trip", "is_complete": False, "created_at": "2025-05-17T00:00:00Z"},
}


@router.get("/")
async def read_items():
    return fake_todos_db

@router.get("/{todo_id}")
async def read_item(todo_id: str):
    if todo_id not in fake_todos_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return fake_todos_db[todo_id]
