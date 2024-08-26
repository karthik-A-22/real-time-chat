const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
// Indexes for better performance
MessageSchema.index({ senderId: 1, receiverId: 1 });
MessageSchema.index({ groupId: 1 });
module.exports = mongoose.model('Message', MessageSchema);
