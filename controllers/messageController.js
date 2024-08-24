const Message = require('../models/Message');

// Send Message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, groupId, content } = req.body;

    try {
        const message = new Message({ senderId, receiverId, groupId, content });
        await message.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Message History
exports.getMessageHistory = async (req, res) => {
    const { userId, withUserId, groupId, page = 1, pageSize = 20 } = req.query;

    try {
        const query = { $or: [] };
        if (withUserId) query.$or.push({ senderId: userId, receiverId: withUserId });
        if (groupId) query.$or.push({ groupId });

        const messages = await Message.find(query)
            .sort({ timestamp: -1 })
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize));

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
