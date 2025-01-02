
import mongoose, {model, Schema} from "mongoose";
require('dotenv').config();

const uri = process.env.MONGO_URI;

mongoose.connect("mongodb+srv://rohan055:QoEKt6RX2jbWzZvv@cluster0.ppcnb.mongodb.net/brainly")
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);