import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import useAuth from "../hooks/useAuth";
import useSelectedTab from "../hooks/useSelectedTab";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  password: z
    .string()
    .min(8, {
      message: "Veuillez entrer un mot de passe de 8 caractères minimum.",
    }),
});

type User = z.infer<typeof schema>;

function LoginPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<User>({ resolver: zodResolver(schema) });
  const { setSelectedTab } = useSelectedTab();
  const { login } = useAuth();
  const history = useNavigate();
  const onSubmit = (data: FieldValues) => {
    login({
      firstName: '',
      lastName: '',
      email: data.email,
      password: data.password,
    });

    setSelectedTab("form");
  };

  return (
    <Center>
      <Box
        width="lg"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        padding="5"
        marginTop="10"
      >
        Connectez-vous
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <FormControl marginTop={4}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} type="text" id="email" />
            {!errors.email && (
              <FormHelperText>Veuillez entrer votre email.</FormHelperText>
            )}
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={4}>
            <FormLabel>Mot de passe</FormLabel>
            <Input {...register("password")} type="password" id="password" />
            {!errors.password && (
              <FormHelperText>
                Veuillez entrer votre mot de passe.
              </FormHelperText>
            )}
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <HStack>
          <Button
            mt={4}
            colorScheme="twitter"
            type="submit"
            isDisabled={!isValid}
          >
            Se connecter
          </Button>
          <Button
            mt={4}
            colorScheme="twitter"
            type="reset"
            onClick={() => history("/register")}>
            S'inscrire
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default LoginPage;
