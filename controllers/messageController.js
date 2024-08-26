const Message = require('../models/Message');

// Send Message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, groupId, content } = req.body;
    // Validate non-empty fields
    if (!senderId) {
        return res.status(400).json({ msg: 'Sender ID is required.' });
    }
    if (!receiverId) {
        return res.status(400).json({ msg: 'Receiver ID is required.' });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({ msg: 'Message content is required.' });
    }
    try {
        const message = new Message({ senderId, receiverId, groupId, content });
        await message.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get Message History
exports.getMessageHistory = async (req, res) => {
    const { userId, withUserId, groupId, page = 1, pageSize = 20 } = req.query;

    try {
        const query = { $or: [] };
        if (withUserId) query.$or.push({ senderId: userId, receiverId: withUserId });
        if (groupId) query.$or.push({ groupId });

        // Fetch messages with populated user and group details
        const messages = await Message.find(query)
            .populate('senderId', 'username')  // Populate senderId with username
            .populate('receiverId', 'username')  // Populate receiverId with username
            .populate('groupId', 'name')  // Populate groupId with group details
            .sort({ timestamp: -1 })
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize));

        // Format the messages to include sender, receiver, and group info
        const formattedMessages = messages.map(msg => ({
            sender: msg.senderId.username,
            receiver: msg.receiverId ? msg.receiverId.username : 'System',  // Handle case where receiverId might be null
            group: msg.groupId ? msg.groupId.name : 'No Group', // Handle case where groupId might be null
            content: msg.content,
            timestamp: msg.timestamp
        }));

        res.json(formattedMessages);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


