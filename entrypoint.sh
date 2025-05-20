#!/bin/sh

# Wait for the database to be ready
until nc -z db 5432; do
  echo "Waiting for the database...";
  sleep 2;
done;

# Run Alembic migrations
/app/.venv/bin/alembic upgrade head

# Start the FastAPI application
/app/.venv/bin/fastapi run ./app/main.py --port 80
