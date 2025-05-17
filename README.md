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
    dependencies.py
    main.py
    internal/
        admin.py
    routers/
        items.py
        users.py
```

## Services

### Database (PostgreSQL)
- **Image**: `postgres`
- **Environment Variables**:
  - `POSTGRES_USER`: `app_user`
  - `POSTGRES_PASSWORD`: `password`
  - `POSTGRES_DB`: `postgres`
- **Volumes**:
  - `pgdata:/var/lib/postgresql/data`

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
  - `8000:80`
- **Depends On**:
  - `db`

## FastAPI Application
The FastAPI application is located in the `app` directory and follows a modular structure:

- `main.py`: Entry point of the application.
- `dependencies.py`: Contains shared dependencies.
- `internal/admin.py`: Internal admin routes.
- `routers/items.py`: Routes for managing items.
- `routers/users.py`: Routes for managing users.

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
