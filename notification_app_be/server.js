const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Log = require("../logging_middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJlZGR5cEBnaXRhbS5pbiIsImV4cCI6MTc4MDgxNjY4MywiaWF0IjoxNzgwODE1NzgzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODNkYjM4MzAtOTQxZC00MDZhLTk5OWItNzA1ZmQzY2RkNjlmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJlZGR5IHBhbGxlIHNhaSBwdW5lZXRoIGt1bWFyIiwic3ViIjoiNjc3NjdmYWEtYmE1MC00MGRlLThlZTEtMzEzNWNmODE3N2U5In0sImVtYWlsIjoic2FyZWRkeXBAZ2l0YW0uaW4iLCJuYW1lIjoiYXJlZGR5IHBhbGxlIHNhaSBwdW5lZXRoIGt1bWFyIiwicm9sbE5vIjoiMjAyMzAwMTIzOCIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjY3NzY3ZmFhLWJhNTAtNDBkZS04ZWUxLTMxMzVjZjgxNzdlOSIsImNsaWVudFNlY3JldCI6Im1xaFpTVVdRdEhtUUdaRk4ifQ.zPYUU4eRcptqrWQn9fpz-DGssChjuO9qd1HBXq8XBXA";
const API_URL = "http://4.224.186.213/evaluation-service/notifications";

function getPriority(type, timestamp) {
  let weight = 1;

  if (type === "Placement") {
    weight = 3;
  } else if (type === "Result") {
    weight = 2;
  } else if (type === "Event") {
    weight = 1;
  }

  const notificationTime = new Date(timestamp).getTime();
  const currentTime = Date.now();
  const ageInMinutes = (currentTime - notificationTime) / (1000 * 60);

  const recencyScore = Math.max(0, 1000 - ageInMinutes);

  return (weight * 1000) + recencyScore;
}

app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Home route opened");
  res.send("Backend is running");
});

app.get("/notifications", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Fetching notifications");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    res.json(response.data);
  } catch (error) {
    await Log("backend", "error", "handler", "Failed to fetch notifications");
    res.status(500).json({
      message: "Error while fetching notifications",
      error: error.message
    });
  }
});

app.get("/priority", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Fetching priority notifications");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    const notifications = response.data.notifications;

    const priorityNotifications = notifications
      .map((item) => {
        return {
          ...item,
          priorityScore: getPriority(item.Type, item.Timestamp)
        };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 10);

    res.json(priorityNotifications);
  } catch (error) {
    await Log("backend", "error", "handler", "Failed to fetch priority notifications");
    res.status(500).json({
      message: "Error while fetching priority notifications",
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});