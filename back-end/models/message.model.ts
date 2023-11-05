import { Schema, model } from "mongoose";


const messageSchema = new Schema({
    encryptedMessage: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: false,
    },
    p: {
        type: String,
        required: false,
    },
    q: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    senderEmail: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
});

const Message = model("Message", messageSchema);

export default Message;


