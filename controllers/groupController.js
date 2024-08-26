const Group = require('../models/Group');

// Create Group
exports.createGroup = async (req, res) => {
    const { name, members } = req.body;

    // Check if all required fields are provided and valid
    if (!name || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ msg: 'Please provide a group name and at least one member' });
    }

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

    // Validate request data
    if (!content || !groupId) {
        return res.status(400).json({ msg: 'Group ID and message content are required' });
    }

    try {
        // Find the group by ID
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        // Check if the user is a member of the group
        if (!group.members.includes(senderId)) {
            return res.status(403).json({ msg: 'User is not a member of this group' });
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
