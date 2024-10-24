const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, // Ensure this is required
    createdAt: { type: Date, default: Date.now },
    isStarred: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;