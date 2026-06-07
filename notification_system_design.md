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


# Stage 3

## Database Optimization

To improve notification query performance, indexes can be created on frequently searched fields.

## Indexes

1. userId index  
Used to quickly find notifications of a particular user.

2. isRead index  
Used to filter unread notifications faster.

3. type index  
Used to filter notifications by category.

4. priority index  
Used to fetch high priority notifications quickly.

5. createdAt index  
Used to sort latest notifications faster.

## Optimized Query Examples

Get unread notifications:

SELECT * FROM notifications
WHERE userId = "user1" AND isRead = false;

Get latest notifications:

SELECT * FROM notifications
WHERE userId = "user1"
ORDER BY createdAt DESC
LIMIT 10;

Get top priority notifications:

SELECT * FROM notifications
WHERE userId = "user1"
ORDER BY priority DESC
LIMIT 5;

## Explanation

Without indexes, the database checks every record, which is slow for large data.

With indexes, the database can directly find matching records, so search and filtering become faster.