"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = require("mongoose");
const ContentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    //tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    //userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
