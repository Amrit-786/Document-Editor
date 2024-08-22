require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const WebSocket = require('ws');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));


app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});


const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
