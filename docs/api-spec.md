# API Specification

The VANTAGE API is built using FastAPI, providing a high-performance interface for both the dashboard and external integrations.

## Endpoints

### 1. `GET /api/health`
Checks the service status.
- **Returns**: `{"status": "ok", "project": "VANTAGE"}`

### 2. `GET /api/data/stats`
Fetches high-level statistics about the Global Graph.
- **Returns**:
    ```json
    {
      "total_events": 266914422,
      "columns": ["Actor1", "Actor2", "EventCode", "..."]
    }
    ```

### 3. `POST /api/forecast`
Triggers the agentic forecasting loop for a specific actor interaction.
- **Payload**:
    ```json
    {
      "actor1": "USA",
      "actor2": "CHN",
      "target_date": "2026-03-01",
      "scenario": "A major trade deal is signed"
    }
    ```
- **Returns**: A structured dossier including agent thoughts, actions, and final predictions.

## Error Handling
The API follows standard HTTP status codes:
- `200`: Success.
- `400`: Bad Request (invalid payload).
- `500`: Internal Server Error (agent logic failure).

## Authentication
Currently, the API is open for local research environments. For enterprise deployments, standard OAuth2/JWT middleware can be integrated into the `CORSMiddleware` configuration.
