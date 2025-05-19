FROM python:3.12-slim-bullseye

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy all files from the parent directory and below into /app.
COPY . /app

# Install the application dependencies.
WORKDIR /app

RUN uv sync --frozen --no-cache

EXPOSE 80

# Run the application.
CMD ["/app/.venv/bin/fastapi", "run", "./app/main.py", "--port", "80"]
