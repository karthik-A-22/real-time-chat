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
