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
