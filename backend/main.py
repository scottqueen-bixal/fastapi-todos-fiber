import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from backend.internal import admin
from backend.routers import Todos  # Import the todos router
from backend.settings import ENV, VITE_BASE_URL

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Add CORS middleware
origins = [
    VITE_BASE_URL,
]

if ENV == "development":
    origins.extend(
        [
            f"http://{VITE_BASE_URL}:5173",
            "http://localhost:5173",
            "http://localhost:3000",
        ]
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our admin router
app.include_router(admin.router)

# Include the Todos router
app.include_router(Todos.router, prefix="/api")


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
