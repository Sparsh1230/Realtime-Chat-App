const Message = require("../models/Message");
const { getIO } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({
        message: "Username and message are required.",
      });
    }

    const newMessage = await Message.create({
      username,
      message,
    });

    getIO().emit("receiveMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to send message.",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: 1,
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch messages.",
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};