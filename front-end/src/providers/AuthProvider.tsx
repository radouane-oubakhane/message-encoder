import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import User from "../entities/User";
import useRegister from "../hooks/useRegister";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { mutate: mutateRegister } = useRegister((user) => {
    setUser(user);
  });
  const { mutate: mutateLogin } = useLogin((user) => {
    setUser(user);
  });

  const history = useNavigate();

  useEffect(() => {
    if (user) {
      history("/rsa");
    }
  },[user])
  


 
  const login = (user: User) => {
    mutateLogin(user);
  };

  const register = (user: User) => {
    mutateRegister(user);
  };

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
