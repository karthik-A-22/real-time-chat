const Group = require('../models/Group');

// Create Group
exports.createGroup = async (req, res) => {
    const { name, members } = req.body;

    try {
        const group = new Group({ name, members });
        await group.save();
        res.json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({})
            .select('name _id'); // Return only the name and _id fields

        res.json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.sendGroupMessage = async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body;
    const senderId = req.user.id;
    try {
        // Find the group by ID
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        // Add message to the group's messages array
        group.messages.push({ senderId, content });
        await group.save();

        // Return the sent message object
        const sentMessage = group.messages[group.messages.length - 1];
        res.json(sentMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};