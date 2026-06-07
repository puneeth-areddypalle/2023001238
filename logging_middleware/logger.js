const axios = require("axios");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXJlZGR5cEBnaXRhbS5pbiIsImV4cCI6MTc4MDgxMjc3NSwiaWF0IjoxNzgwODExODc1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjkwNjk2ZjctMDhjMC00MWYxLWE0ZTgtZmE4N2ViOTYyZmUyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJlZGR5IHBhbGxlIHNhaSBwdW5lZXRoIGt1bWFyIiwic3ViIjoiNjc3NjdmYWEtYmE1MC00MGRlLThlZTEtMzEzNWNmODE3N2U5In0sImVtYWlsIjoic2FyZWRkeXBAZ2l0YW0uaW4iLCJuYW1lIjoiYXJlZGR5IHBhbGxlIHNhaSBwdW5lZXRoIGt1bWFyIiwicm9sbE5vIjoiMjAyMzAwMTIzOCIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjY3NzY3ZmFhLWJhNTAtNDBkZS04ZWUxLTMxMzVjZjgxNzdlOSIsImNsaWVudFNlY3JldCI6Im1xaFpTVVdRdEhtUUdaRk4ifQ.qxrw3Z1bTvP_S5ZQaSddyRISBDM2tJZNEKNSa9xetHw";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

module.exports = Log;