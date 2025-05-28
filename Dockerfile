FROM python:3.13-slim-bookworm

RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy all files from the parent directory and below into /app.
COPY . /app

RUN chmod +x /app/entrypoint.sh

# Install the application dependencies.
WORKDIR /app

RUN uv sync --frozen --no-cache

EXPOSE 8000

# Run the application.
CMD ["/app/entrypoint.sh"]
