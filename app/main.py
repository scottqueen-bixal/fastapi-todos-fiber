from fastapi import FastAPI
from app.internal import admin
from app.routers import todos  # Import the todos router

app = FastAPI()

# Include our admin router
app.include_router(admin.router)

# Include the todos router
app.include_router(todos.router)

@app.get("/")
def read_root():
    return {"message": "Hello World!"}
