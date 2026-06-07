# Stage 1

## REST API Design

### 1. Get All Notifications

GET /api/notifications

Headers:
Authorization: Bearer token

Response:
{
  "success": true,
  "notifications": []
}

### 2. Get Notification by ID

GET /api/notifications/:id

### 3. Mark Notification as Read

PATCH /api/notifications/:id/read

### 4. Filter Notifications by Type

GET /api/notifications?type=Placement

### 5. Get Priority Notifications

GET /api/notifications/priority?limit=10

## Real-Time Notification Mechanism

For real-time updates, WebSocket or Server-Sent Events can be used. When a new notification is created, the server pushes it immediately to connected users without refreshing the page.