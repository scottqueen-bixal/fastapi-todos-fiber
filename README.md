# FASTAPI + React + Virtualized Rendering

## Overview
This project is a multi-service application that includes a PostgreSQL database, a FastAPI backend, and a React frontend with virtualized rendering for efficient performance. The services are orchestrated using Docker Compose.

## Project Structure
```
docker-compose.yml
pyproject.toml
README.md
uv.lock
adminer/
    adminer.css
backend/
    __init__.py
    db.py
    main.py
    settings.py
    utils.py
    internal/
        admin.py
    models/
        Todos.py
    routers/
        Todos.py
    schemas/
        Todos.py
frontend/
    src/
        App.tsx
        components/
            TodoComponent.tsx
            TodoListComponent/
        utils.ts
        index.css
migrations/
    env.py
    versions/
entrypoint.sh
```

## Quick Start Guide

1. **Clone the repository:**
   ```bash
   git clone git@github.com:scottqueen-bixal/fastapi-todos-fiber.git
   cd fastapi-todos-fiber
   ```

2. **(Optional) Initialize submodules:**
   ```bash
   git submodule init
   git submodule update
   ```

3. **Copy and configure environment variables:**
   - Copy `.env.example` to `.env` and edit as needed.
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
   - **Frontend:** [http://todo.com](http://todo.com) || [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://todo.com/api](http://todo.com/api)
   - **API Swagger Docs:** [http://todo.com/docs](http://todo.com/docs)
   - **Adminer (DB UI):** [http://todo.com:8080](http://todo.com:8080)
   - **Traefik Dashboard:** [http://traefik.todo.com](http://traefik.todo.com)

## Frontend Application
The React frontend is located in the `frontend` directory and includes the following key components:

- `App.tsx`: Main application file.
- `TodoComponent.tsx`: Component for individual todo items.
- `TodoListComponent/`: Component for rendering the list of todos with virtualization.
- `utils.ts`: Utility functions for API interactions.

## Backend Application
The FastAPI backend is located in the `backend` directory and follows a modular structure:

- `main.py`: Entry point of the application.
- `db.py`: Database configuration and session management.
- `routers/Todos.py`: Routes for managing todos.
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

## How to Run
1. Ensure Docker and Docker Compose are installed on your system.
2. Build and start the services:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   - Adminer: [http://localhost:8080](http://localhost:8080)
   - FastAPI: [http://localhost:8000](http://localhost:8000)
   - Frontend: [http://localhost:5173](http://localhost:5173)

## License
This project is licensed under the MIT License.
