import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.internal import admin
from backend.routers import Todos  # Import the todos router

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our admin router
app.include_router(admin.router)

# Include the Todos router
app.include_router(Todos.router)


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
