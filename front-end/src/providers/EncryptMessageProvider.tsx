import { ReactNode, useState } from "react";
import EncryptedMessageContext from "../contexts/EncryptedMessageContext";
import Message from "../entities/Message";
import useEncryptMessage from "../hooks/useEncryptMessage";


interface Props {
  children: ReactNode;   
}

const EncryptMessageProvider = ({ children }: Props) => {
    const [encryptedMessage, setEncryptedMessage] = useState<Message>({} as Message);
    const {mutate} = useEncryptMessage(
      (message: Message) => 
        setEncryptedMessage(message)
    );




    const encryptMessage = (message: Message) => {
        mutate(message);
        setEncryptedMessage(message);
        return encryptedMessage;
    }
  
  return (
    <EncryptedMessageContext.Provider
      value={{
        encryptedMessage,
        encryptMessage,
      }}
    >
      {children}
    </EncryptedMessageContext.Provider>
  );
};

export default EncryptMessageProvider;