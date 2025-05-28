import logging
from fastapi import FastAPI
from backend.internal import admin
from backend.routers import Todos  # Import the todos router

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Include our admin router
app.include_router(admin.router)

# Include the Todos router
app.include_router(Todos.router)


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
