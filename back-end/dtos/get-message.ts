export default interface GetMessageDTO {
    _id: string;
    message: string;
    encryptedMessage: string;
    key: string; 
    timestamp: number;
    method: string;
    p: string;
    q: string;
}
