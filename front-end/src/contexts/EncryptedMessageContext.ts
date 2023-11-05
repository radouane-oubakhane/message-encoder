import React from "react";
import Message from "../entities/Message";

interface EncryptedMessageContextType {
  encryptedMessage: Message;
  encryptMessage: (message: Message) => Message;
}

const EncryptedMessageContext =
  React.createContext<EncryptedMessageContextType>(
    {} as EncryptedMessageContextType
  );

export default EncryptedMessageContext;
