'use strict';

import mongoose from 'mongoose';

var TrainingSchema = new mongoose.Schema({
    name: String,
    info: String,
    session: {
        id: Number,
        detail: String
    }
});

export default mongoose.model('Training', TrainingSchema);