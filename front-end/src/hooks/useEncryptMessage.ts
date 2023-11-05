import { useMutation, useQueryClient } from "@tanstack/react-query";
import Message from "../entities/Message";
import apiClient from "../services/api-client";
import useAuth from "./useAuth";

const useEncryptMessage = (
  onEncryptMessageSuccess: (message: Message) => void
) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<Message, Error, Message>({
    mutationFn: (message: Message) =>
      apiClient
        .post<Message>("/messages/" + user?.email, message)
        .then((response) => response.data),
    onSuccess: (message) => {
      onEncryptMessageSuccess(message);
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};

export default useEncryptMessage;
