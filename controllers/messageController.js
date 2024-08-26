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
        // Initialize the query object
        const query = {};

        // Filter messages based on sender and receiver IDs or group ID
        if (withUserId) {
            query.$or = [
                { senderId: userId, receiverId: withUserId },
                { senderId: withUserId, receiverId: userId }
            ];
        } else if (groupId) {
            query.groupId = groupId;
        } else {
            // If no filters are provided, get messages related to the user
            query.$or = [
                { senderId: userId },
                { receiverId: userId }
            ];
        }

        // Fetch messages with populated user and group details
        const messages = await Message.find(query)
            .populate('senderId', 'username')  // Populate senderId with username
            .populate('receiverId', 'username')  // Populate receiverId with username
            .populate('groupId', 'name')  // Populate groupId with group details
            .sort({ timestamp: -1 })  // Sort messages by timestamp in descending order
            .skip((page - 1) * pageSize)  // Apply pagination
            .limit(parseInt(pageSize));  // Limit the number of messages returned

        const totalMessages = await Message.countDocuments(query);  // Count total number of messages
        const totalPages = Math.ceil(totalMessages / pageSize);  // Calculate total number of pages

        // Format the messages to include sender, receiver, and group info
        const formattedMessages = messages.map(msg => ({
            senderId: msg.senderId._id,
            sender: msg.senderId.username,
            receiverId: msg.receiverId ? msg.receiverId._id : null,
            receiver: msg.receiverId ? msg.receiverId.username : 'System',  // Handle case where receiverId might be null
            group: msg.groupId ? msg.groupId.name : 'No Group', // Handle case where groupId might be null
            content: msg.content,
            timestamp: msg.timestamp
        }));

        // Send the response with messages and pagination details
        res.json({
            messages: formattedMessages,
            currentPage: parseInt(page),
            totalPages,
            pageSize: parseInt(pageSize),
            totalMessages
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

