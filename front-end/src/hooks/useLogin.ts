import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import User from "../entities/User";

const useLogin = (onLoginSuccess: (user: User) => void) => {

  return useMutation<User, Error, User>({
    mutationFn: (user: User) =>
      apiClient.post<User>("/users/login", user).then((response) => response.data),
    onSuccess: (user) => {
      onLoginSuccess(user)
    },
  });
};

export default useLogin;
