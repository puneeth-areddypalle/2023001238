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


# Stage 4

## Scaling and Performance Improvements

When the notification system grows, performance can be improved using caching, pagination, and lazy loading.

## Caching

Frequently accessed notifications can be stored in cache using Redis.

Benefits:
- Faster response time
- Less database load
- Better performance for repeated requests

## Pagination

Instead of loading all notifications at once, notifications can be loaded page by page.

Example:

GET /api/notifications?page=1&limit=10

Benefits:
- Faster loading
- Less memory usage
- Better user experience

## Lazy Loading

Notifications can be loaded only when the user scrolls or requests more data.

Benefits:
- Reduces initial page load time
- Loads only required data
- Improves frontend performance

## Archiving Old Notifications

Old notifications can be moved to archive storage.

Benefits:
- Main database remains smaller
- Recent notifications load faster
- Long-term data is still available

## Conclusion

Using caching, pagination, lazy loading, and archiving helps the notification system handle large amounts of data efficiently.