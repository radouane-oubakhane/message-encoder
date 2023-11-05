import { useQuery } from "@tanstack/react-query";
import Message from "../entities/Message";
import apiClient from "../services/api-client";
import useAuth from "./useAuth";


const useMessages = () => {
    const {user} = useAuth();
    return useQuery({
        queryKey: ["messages"],
        queryFn: () => apiClient
                            .get<Message[]>('/messages/' + user?.email)
                            .then((response) => response.data),
        staleTime: 1000 
    });

}
    
export default
 useMessages;
