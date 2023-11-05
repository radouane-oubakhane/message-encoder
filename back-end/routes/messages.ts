import { Router } from "express";
import CreateMessageDTO from "../dtos/create-message";
import GetMessageDTO from "../dtos/get-message";
import Message from "../models/message.model";
import User from "../models/user.model";
import {
  vigenereCipherEncryption,
  vigenereCipherDecryption,
} from "../cryptography/vigenere-cipher";
import { rsaEncryption, rsaDecryption } from "../cryptography/rsa";
import constants from "../constants";

const messagesRouter = Router();

// GET /messages/:email
messagesRouter.get("/:email", async (request, response) => {
  try {
    const { email } = request.params;

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return response.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const messages = await Message.find({ senderEmail: email }).sort({
      timestamp: -1,
    });

    const getMessagesDTO: GetMessageDTO[] = messages.map((message) => {
      switch (message.method) {
        case "vigenere-cipher":
          return {
            _id: message._id.toString(),
            message: vigenereCipherDecryption(
              message.encryptedMessage,
              message.key as string
            ),
            encryptedMessage: message.encryptedMessage,
            key: message.key,
            timestamp: message.timestamp,
            method: message.method,
          } as GetMessageDTO;
        case "rsa-cipher":
          return {
            _id: message._id.toString(),
            message: rsaDecryption(message.encryptedMessage, {
              p: parseInt(message.p as string),
              q: parseInt(message.q as string),
            }),
            encryptedMessage: message.encryptedMessage,
            p: message.p,
            q: message.q,
            timestamp: message.timestamp,
            method: message.method,
          } as GetMessageDTO;
        default:
          return {} as GetMessageDTO;
      }
    });

    console.log("Messages retrieved: ", getMessagesDTO);

    return response.status(200).json(getMessagesDTO);
  } catch (error) {
    console.log("Error in GET /messages: ", error);
    return response.status(500).json({ error: error });
  }
});

// POST /messages/:email
messagesRouter.post("/:email", async (request, response) => {
  try {
    const { email } = request.params;

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return response.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const { message, key, method, p, q } = request.body as CreateMessageDTO;
    let encryptedMessage;

    switch (method) {
      case "vigenere-cipher":
        encryptedMessage = vigenereCipherEncryption(message.trim(), key);
        break;
      case "rsa-cipher":
        encryptedMessage = rsaEncryption(message.trim(), {
          p: parseInt(p),
          q: parseInt(q),
        });
        break;
      default:
        return response
          .status(400)
          .json({ message: "Méthode de chiffrement non reconnue" });
    }

    const timestamp = Date.now();
    const newMessage = new Message({
      encryptedMessage,
      key: key ? key : "",
      p: p ? p : "",
      q: q ? q : "",
      timestamp,
      senderEmail: email,
      method,
    });
    const savedMessage = await newMessage.save();

    const getMessageDTO: GetMessageDTO = {
      _id: savedMessage._id.toString(),
      message: message.trim(),
      encryptedMessage: savedMessage.encryptedMessage,
      key: savedMessage.key as string,
      p: savedMessage.p as string,
      q: savedMessage.q as string,
      timestamp: savedMessage.timestamp,
      method: savedMessage.method,
    };

    console.log("Message saved: ", getMessageDTO);
    return response.status(201).json(getMessageDTO);
  } catch (error) {
    console.log("Error in POST /messages: ", error);
    return response.status(500).json({ error: error });
  }
});

export default messagesRouter;
