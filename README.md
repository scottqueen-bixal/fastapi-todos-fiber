# Dopestack Project

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

## Services

### Database (PostgreSQL)
- **Image**: `postgres`
- **Environment Variables**:
  - `POSTGRES_USER`: `db_user`
  - `POSTGRES_PASSWORD`: `password`
  - `POSTGRES_DB`: `postgres`
- **Volumes**:
  - `pgdata:/var/lib/postgresql/data`
- **Ports**:
  - `5432:5432`

### Adminer
- **Image**: `adminer:latest`
- **Environment Variables**:
  - `ADMINER_DEFAULT_DB_DRIVER`: `postgresql`
  - `ADMINER_DEFAULT_DB_HOST`: `db`
  - `ADMINER_DEFAULT_DB_NAME`: `postgres`
- **Ports**:
  - `8080:8080`
- **Volumes**:
  - `./adminer/adminer.css:/var/www/html/adminer.css`

### FastAPI Backend
- **Build Context**: `.`
- **Dockerfile**: `Dockerfile`
- **Ports**:
  - `8000:8000`
- **Depends On**:
  - `db`
- **Entrypoint**:
  - `entrypoint.sh`: Handles database readiness, Alembic migrations, and application startup.

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

## License
This project is licensed under the MIT License.
