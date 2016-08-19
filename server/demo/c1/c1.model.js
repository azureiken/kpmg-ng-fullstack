'use strict';

import mongoose from 'mongoose';

var C1Schema = new mongoose.Schema({
    id: Number,
    name: String
});

export default mongoose.model("C1", C1Schema);