# Expense Tracker

created by Yaroslav Stopenchuk

---

## Contents

- `backend/` — NestJS backend (MongoDB)
- `frontend/` — React frontend (Vite)
- `docker-compose.yml` — orchestration for local dev using Docker
- `Dockerfile` — root multi-stage build for both apps

---

## Prerequisites

- Git
- Docker & Docker Compose (v2) OR Node.js (>= 20) + Yarn (if running locally)

---

## Quick start with Docker

1. Clone the repository:

```bash
git clone git@github.com:humblezxc/expense-tracker.git
cd expense-tracker
```

2. Run the following command to start the app:
```bash
docker compose up -d --build
```