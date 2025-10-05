# Inventory Management API

A Django REST Framework project for managing inventory with item ownership, audit history, filtering, pagination, and JWT authentication.

## Features
- JWT authentication with refresh tokens via SimpleJWT
- User registration plus admin-managed CRUD with `/api/users/` and `/api/users/me/`
- Item CRUD with owner-only write permissions and optional categories/suppliers
- Inventory change logging and ad-hoc adjustments via `/api/items/{id}/adjust/`
- Inventory level view with filtering, search, ordering, pagination, and low stock threshold support
- Auto-generated OpenAPI schema and Swagger UI powered by drf-spectacular

## Quickstart
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Authentication Flow
1. Register: `POST /api/auth/register/`
2. Obtain tokens: `POST /api/auth/token/`
3. Refresh tokens: `POST /api/auth/refresh/`
4. Send `Authorization: Bearer <access>` to protected endpoints

## Core Endpoints
- `GET/POST /api/items/` - list all items (authenticated) and create owned items
- `GET/PUT/PATCH/DELETE /api/items/{id}/` - owner or staff updates/deletes
- `POST /api/items/{id}/adjust/` - apply quantity delta with optional reason
- `GET /api/items/{id}/changes/` - paginated change history
- `GET /api/items/levels/?category=&min_price=&max_price=&low_stock=` - inventory dashboard
- `GET/POST ... /api/categories/`, `/api/suppliers/`
- `GET/POST ... /api/users/` - staff only; `GET /api/users/me/` for self profile
- Docs: `/api/schema/` (OpenAPI) and `/api/docs/` (Swagger UI)

## Smoke Test Snippets
```bash
# Register (public)
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"bevan","email":"bevan@example.com","password":"Passw0rd!"}'

# Token request
token_response=$(curl -s -X POST http://127.0.0.1:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"bevan","password":"Passw0rd!"}')

# Create category & supplier
curl -X POST http://127.0.0.1:8000/api/categories/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" \
  -d '{"name":"Stationery"}'

curl -X POST http://127.0.0.1:8000/api/suppliers/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" \
  -d '{"name":"Acme Ltd"}'

# Create item
curl -X POST http://127.0.0.1:8000/api/items/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" \
  -d '{"name":"Notebook","description":"A5 ruled","quantity":20,"price":"120.00","category":1,"supplier":1}'

# Adjust quantity
curl -X POST http://127.0.0.1:8000/api/items/1/adjust/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" \
  -d '{"delta":-3,"reason":"sale"}'

# Inventory levels
curl -H "Authorization: Bearer <ACCESS_TOKEN>" "http://127.0.0.1:8000/api/items/levels/?low_stock=5"
```

## Deployment Notes
- Configure `DJANGO_SECRET_KEY`, `DEBUG=0`, and `ALLOWED_HOSTS` in production
- Run `python manage.py collectstatic` if serving static files
- For Gunicorn/Heroku-style deploys use `web: gunicorn config.wsgi` in a Procfile
