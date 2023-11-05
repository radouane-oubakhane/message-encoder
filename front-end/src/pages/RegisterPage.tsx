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
  firstName: z.string().nonempty({ message: "Veuillez entrer votre prénom." }),
  lastName: z.string().nonempty({ message: "Veuillez entrer votre nom." }),
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  password: z
    .string()
    .min(8, {
      message: "Veuillez entrer un mot de passe de 8 caractères minimum.",
    }),
});

type User = z.infer<typeof schema>;

function RegisterPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<User>({ resolver: zodResolver(schema) });
  const { setSelectedTab } = useSelectedTab();
  const { register: registerUser } = useAuth();
  const history = useNavigate();
  const onSubmit = (data: FieldValues) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
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
        Inscrivez-vous
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <HStack>
          <FormControl marginTop={2}>
            <FormLabel>Prénom</FormLabel>
            <Input {...register("firstName")} type="text" id="firstName" />
            {!errors.firstName && (
              <FormHelperText>Veuillez entrer votre prénom.</FormHelperText>
            )}
            {errors.firstName && (
              <FormHelperText>{errors.firstName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={2}>
            <FormLabel>Nom</FormLabel>
            <Input {...register("lastName")} type="text" id="lastName" />
            {!errors.lastName && (
              <FormHelperText>Veuillez entrer votre nom.</FormHelperText>
            )}
            {errors.lastName && (
              <FormHelperText>{errors.lastName.message}</FormHelperText>
            )}
          </FormControl>
          </HStack>
          <FormControl marginTop={2}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} type="text" id="email" />
            {!errors.email && (
              <FormHelperText>Veuillez entrer votre email.</FormHelperText>
            )}
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={2}>
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
            S'inscrire
          </Button>
          <Button
            mt={4}
            colorScheme="twitter"
            type="reset"
            onClick={() => history("/")}>
            Se connecter
            </Button>
          </HStack>
        </form>
      </Box>
    </Center>
  );
}

export default RegisterPage;
