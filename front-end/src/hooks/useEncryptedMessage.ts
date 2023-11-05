import { useContext } from "react";
import EncryptedMessageContext from "../contexts/EncryptedMessageContext";


const useEncryptedMessage = () => useContext(EncryptedMessageContext);


export default useEncryptedMessage;