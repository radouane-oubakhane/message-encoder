import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import User from "../entities/User";

const useRegister = (onRegisterSuccess: (user: User) => void) => {

  return useMutation<User, Error, User>({
    mutationFn: (user: User) =>
      apiClient.post<User>("/users/register", user).then((response) => response.data),
    onSuccess: (user) => {
      onRegisterSuccess(user);
    },
  });
};

export default useRegister;
