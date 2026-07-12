# Realtime Chat Application

## Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- Expo Router
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Socket.io

---

## Features

- Login with Username
- Real-time Messaging
- Socket.io
- Chat History
- MongoDB Storage
- Message Timestamp
- Typing Indicator
- Online Users
- Auto Scroll
- Responsive UI

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

## Environment Variables

Create a `.env` file inside backend.

```
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

## API

### GET

```
/api/messages
```

Returns all chat messages.

### POST

```
/api/messages
```

Body

```json
{
  "username":"John",
  "message":"Hello"
}
```

---

## Socket Events

### Client → Server

- join
- typing
- stopTyping

### Server → Client

- receiveMessage
- onlineUsers
- typing
- stopTyping

---

## Author

Sparsh Saini