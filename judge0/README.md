# Judge0 - Code Execution Engine

Self-hosted Judge0 instance for running user-submitted code in a sandboxed environment.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- At least **2GB free RAM** (Judge0 workers are memory-hungry)
- Linux containers mode (Docker Desktop default)

> **Windows users:** Docker Desktop with WSL2 backend is required. Judge0 uses Linux-based isolate sandboxing.

## Quick Start

```bash
# From the project root
cd judge0

# Start all containers (Judge0 server, workers, Postgres, Redis)
docker compose up -d

# Verify it's running (may take 10-30s on first start)
curl http://localhost:2358/system_info
```

You should see a JSON response with Judge0 version info. If you get `connection refused`, wait a few seconds — the server needs time to run database migrations on first boot.

## Test It

Send a simple Python submission to verify code execution works:

```bash
# Submit a Python "Hello World" (base64 encoded)
curl -X POST http://localhost:2358/submissions?base64_encoded=true&wait=true \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "cHJpbnQoIkhlbGxvLCBXb3JsZCEiKQ==",
    "language_id": 71
  }'
# One Liner
curl -X POST "http://localhost:2358/submissions?base64_encoded=true&wait=true" -H "Content-Type: application/json" -d '{"source_code":"cHJpbnQoIkhlbGxvLCBXb3JsZCEiKQ==","language_id":71}'

```

Expected response (stdout will be base64):
```json
{
  "stdout": "SGVsbG8sIFdvcmxkIQo=",
  "stderr": null,
  "status": { "id": 3, "description": "Accepted" },
  "time": "0.015",
  "memory": 3200
}
```

Decode the output: `echo "SGVsbG8sIFdvcmxkIQo=" | base64 -d` → `Hello, World!`

### Test with stdin

```bash
# Python: read input and print it back
# source_code = print(input())  →  base64: cHJpbnQoaW5wdXQoKSk=
# stdin = "42"                  →  base64: NDI=
curl -X POST http://localhost:2358/submissions?base64_encoded=true&wait=true \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "cHJpbnQoaW5wdXQoKSk=",
    "language_id": 71,
    "stdin": "NDI="
  }'
```

## Common Commands

```bash
# Start
docker compose up -d

# Stop (keeps data)
docker compose down

# Stop and wipe all data (fresh start)
docker compose down -v

# View logs
docker compose logs -f judge0-server
docker compose logs -f judge0-workers

# Restart
docker compose restart

# Check container status
docker compose ps
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| `judge0-server` | `2358` | Judge0 API (the only one you interact with) |
| `judge0-workers` | — | Background workers that execute code |
| `judge0-db` | — | PostgreSQL 16 for Judge0 internal storage |
| `judge0-redis` | — | Redis 7 for Judge0 internal queuing |

## Configuration (`judge0.conf`)

| Setting | Value | Description |
|---------|-------|-------------|
| `CPU_TIME_LIMIT` | `5` | Max CPU time per submission (seconds) |
| `WALL_TIME_LIMIT` | `10` | Max wall clock time (seconds) |
| `MEMORY_LIMIT` | `131072` | Max memory per submission (128MB in KB) |
| `ENABLE_NETWORK` | `false` | Network access disabled for security |
| `ENABLE_WAIT_RESULT` | `true` | Enables `?wait=true` synchronous mode |
| `ENABLE_BATCHED_SUBMISSIONS` | `true` | Enables `/submissions/batch` endpoint |

To change limits, edit `judge0.conf` and restart: `docker compose restart`

## Supported Languages

Get the full list:
```bash
curl http://localhost:2358/languages
```

Common language IDs used in Aralify:

| ID | Language |
|----|----------|
| 71 | Python 3.8.1 |
| 62 | Java (OpenJDK 13.0.1) |
| 63 | JavaScript (Node.js 12.14.0) |
| 74 | TypeScript (3.7.4) |
| 50 | C (GCC 9.2.0) |
| 54 | C++ (GCC 9.2.0) |

## API Endpoints

Base URL: `http://localhost:2358`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/system_info` | Health check + system info |
| `GET` | `/languages` | List all supported languages |
| `POST` | `/submissions?wait=true` | Submit code and wait for result |
| `POST` | `/submissions/batch` | Submit multiple at once |
| `GET` | `/submissions/:token` | Get result by token |
| `GET` | `/submissions/batch?tokens=a,b,c` | Get batch results |

Full API docs: https://ce.judge0.com

## How It Connects to Aralify

```
User submits code
       ↓
  NestJS Backend
  (CodeExecutionService)
       ↓
  POST localhost:2358/submissions/batch?wait=true
       ↓
  Judge0 executes code in sandbox
       ↓
  Returns stdout/stderr/status per test case
       ↓
  Backend compares output vs expected
       ↓
  Awards XP if all tests pass
```

Backend config in `backend-api/.env`:
```env
JUDGE0_API_URL=http://localhost:2358
JUDGE0_API_KEY=
JUDGE0_TIMEOUT_MS=10000
```

## Troubleshooting

### "Connection refused" on localhost:2358
- Wait 15-30 seconds after `docker compose up -d` (first boot runs DB migrations)
- Check if containers are running: `docker compose ps`
- Check logs: `docker compose logs judge0-server`

### Containers keep restarting
- Check logs: `docker compose logs -f`
- Ensure Docker has enough memory allocated (Settings > Resources > 2GB+)
- On Windows, ensure WSL2 backend is enabled

### "Internal Error" on submissions
- Check worker logs: `docker compose logs judge0-workers`
- Ensure `privileged: true` is set (required for isolate sandboxing)
- On some systems, you may need to run `docker compose up` without `-d` first to see boot errors

### Submissions stuck in "Processing"
- Workers might not be running: `docker compose ps` — check `judge0-workers` is `Up`
- Restart workers: `docker compose restart judge0-workers`

### Fresh start (nuclear option)
```bash
docker compose down -v
docker compose up -d
```
This wipes all Judge0 data and starts clean.
