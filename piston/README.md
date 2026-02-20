# Piston - Code Execution Engine

Self-hosted [Piston](https://github.com/engineer-man/piston) instance for running user-submitted code in a sandboxed environment.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- At least **1GB free RAM**
- Linux containers mode (Docker Desktop default)

> **Windows users:** Docker Desktop with WSL2 backend is required. Piston uses Docker-native sandboxing (cgroups v2), which is the WSL2 default — no special configuration needed.

## Quick Start

```bash
# From the project root
cd piston

# Start the Piston container
docker compose up -d

# Install language runtimes (first time only — persists across restarts)
bash install-runtimes.sh

# Verify it's running
curl http://localhost:2000/api/v2/runtimes
```

You should see a JSON array of installed runtimes. If you get `connection refused`, wait a few seconds — the container needs time to initialize.

## Test It

Send a simple Python submission:

```bash
curl -X POST http://localhost:2000/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "version": "3.10.0",
    "files": [{"content": "print(\"Hello, World!\")"}]
  }'
```

Expected response:
```json
{
  "language": "python",
  "version": "3.10.0",
  "run": {
    "stdout": "Hello, World!\n",
    "stderr": "",
    "code": 0,
    "signal": null,
    "output": "Hello, World!\n"
  }
}
```

### Test with stdin

```bash
curl -X POST http://localhost:2000/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "version": "3.10.0",
    "files": [{"content": "print(input())"}],
    "stdin": "42"
  }'
```

## Common Commands

```bash
# Start
docker compose up -d

# Stop (keeps data and installed runtimes)
docker compose down

# Stop and wipe all data (need to re-run install-runtimes.sh)
docker compose down -v

# View logs
docker compose logs -f piston

# Restart
docker compose restart

# Check container status
docker compose ps
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| `piston` | `2000` | Piston API (single container — no separate DB or Redis needed) |

## Configuration (Environment Variables)

| Setting | Value | Description |
|---------|-------|-------------|
| `PISTON_RUN_TIMEOUT` | `10000` | Max run time per execution (ms) |
| `PISTON_COMPILE_TIMEOUT` | `10000` | Max compile time (ms) |
| `PISTON_OUTPUT_MAX_SIZE` | `65536` | Max output size (bytes) |
| `PISTON_DISABLE_NETWORKING` | `true` | Network access disabled for security |
| `PISTON_RUN_MEMORY_LIMIT` | `134217728` | Max memory per execution (128MB in bytes) |

To change limits, edit `docker-compose.yml` environment section and restart: `docker compose restart`

## Installed Runtimes

Runtimes are installed via `install-runtimes.sh` and persist in the `piston-packages` Docker volume.

| Language | Version | Language ID (for DTOs) |
|----------|---------|----------------------|
| Python | 3.10.0 | 71 |
| JavaScript (Node.js) | 15.10.0 | 63 |
| Java | 15.0.2 | 62 |
| TypeScript | 4.2.3 | 74 |
| C (GCC) | 10.2.0 | 50 |
| C++ (G++) | 10.2.0 | 54 |

List installed runtimes:
```bash
curl http://localhost:2000/api/v2/runtimes
```

Install additional runtimes:
```bash
curl -X POST http://localhost:2000/api/v2/packages \
  -H "Content-Type: application/json" \
  -d '{"language":"rust","version":"1.56.1"}'
```

## API Endpoints

Base URL: `http://localhost:2000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v2/runtimes` | List installed runtimes |
| `POST` | `/api/v2/execute` | Execute code (synchronous) |
| `GET` | `/api/v2/packages` | List available packages |
| `POST` | `/api/v2/packages` | Install a runtime package |

Full API docs: https://github.com/engineer-man/piston#api-v2

## How It Connects to Aralify

```
User submits code
       ↓
  NestJS Backend
  (CodeExecutionService → PistonService)
       ↓
  POST localhost:2000/api/v2/execute (per test case)
       ↓
  Piston executes code in sandbox
       ↓
  Returns stdout/stderr/exit code
       ↓
  Backend compares output vs expected
       ↓
  Awards XP if all tests pass
```

Backend config in `backend-api/.env`:
```env
PISTON_API_URL=http://localhost:2000
PISTON_TIMEOUT_MS=10000
PISTON_RUN_TIMEOUT_MS=10000
PISTON_RUN_MEMORY_LIMIT=134217728
```

## Troubleshooting

### "Connection refused" on localhost:2000
- Wait 5-10 seconds after `docker compose up -d`
- Check if container is running: `docker compose ps`
- Check logs: `docker compose logs piston`

### "Runtime not found" error
- Install runtimes: `bash install-runtimes.sh`
- Verify: `curl http://localhost:2000/api/v2/runtimes`

### Container keeps restarting
- Check logs: `docker compose logs -f`
- Ensure Docker has enough memory allocated (Settings > Resources > 1GB+)
- On Windows, ensure WSL2 backend is enabled

### Fresh start (nuclear option)
```bash
docker compose down -v
docker compose up -d
bash install-runtimes.sh
```
This wipes all Piston data (including installed runtimes) and starts clean.
