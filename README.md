# FASTAPI + React + Virtualized Rendering

## Overview
This project is a multi-service application that includes a PostgreSQL database, an Adminer interface, and a FastAPI backend. The services are orchestrated using Docker Compose.

## Project Structure
```
docker-compose.yml
pyproject.toml
README.md
uv.lock
adminer/
    adminer.css
app/
    __init__.py
    db.py
    dependencies.py
    main.py
    routers/
        todos.py
    schemas/
        Todos.py
migrations/
    env.py
    versions/
entrypoint.sh
```

## Quick Start Guide

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd
   ```

2. **(Optional) Initialize submodules:**
   ```bash
   git submodule init
   git submodule update
   ```

3. **Copy and configure environment variables:**
   - Copy `.env.example` to `.env` and edit as needed (create `.env.example` if not present).
   - For the `mcp-crawl4ai-rag` service, copy `.env.mcp.example` to `.env.mcp` and edit as needed.

4. **Update `/etc/hosts`:**
   - Add the following line to your `/etc/hosts` file:

     ```bash
     127.0.0.1 todo.com
     127.0.0.1 traefik.todo.com
     ```

5. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

6. **Access the application:**
   - **Frontend:** [http://todo.com](http://todo.com)
   - **Backend API:** [http://todo.com/api](http://todo.com/api)
   - **API Swagger Docs:** [http://todo.com/docs](http://todo.com:8000/docs)
   - **Adminer (DB UI):** [http://todo.com:8080](http://todo.com:8080)
   - **Traefik Dashboard:** [http://traefik.todo.com](http://traefik.todo.com)


## FastAPI Application
The FastAPI application is located in the `app` directory and follows a modular structure:

- `main.py`: Entry point of the application.
- `db.py`: Database configuration and session management.
- `dependencies.py`: Contains shared dependencies.
- `routers/todos.py`: Routes for managing todos.
- `schemas/Todos.py`: Pydantic models for todos.

## Migrations
Alembic is used for database migrations. The migration files are located in the `migrations/versions/` directory.

### Running Migrations
To create a new migration:
```bash
docker-compose exec backend uv run alembic revision --autogenerate -m "migration message"
```

To apply migrations:
```bash
docker-compose exec backend uv run alembic upgrade head
```

```bash
docker-compose cp backend:/app/alembic/versions ./alembic
```

## How to Run
1. Ensure Docker and Docker Compose are installed on your system.
2. Build and start the services:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   - Adminer: [http://localhost:8080](http://localhost:8080)
   - FastAPI: [http://localhost:8000](http://localhost:8000)

## Submodule Setup
To initialize and update the `mcp-crawl4ai-rag` submodule:

```bash
git submodule init
git submodule update
```

## License
This project is licensed under the MIT License.
