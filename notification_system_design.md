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


# Stage 2

## Database Choice

MongoDB is selected because it supports flexible document storage, fast development, and horizontal scaling.

## Notification Schema

Notification

- id
- title
- message
- type
- priority
- userId
- isRead
- createdAt

User

- id
- name
- email

## Relationships

One User can have many Notifications.

## Sample Queries

Get all notifications:

SELECT * FROM notifications;

Get unread notifications:

SELECT * FROM notifications WHERE isRead = false;

Get top priority notifications:

SELECT * FROM notifications ORDER BY priority DESC LIMIT 10;