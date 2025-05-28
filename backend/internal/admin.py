from fastapi import APIRouter

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_items():
    return {"message": "Admin panel"}
