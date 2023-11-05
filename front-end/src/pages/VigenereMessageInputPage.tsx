import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useEncryptedMessage from "../hooks/useEncryptedMessage";
import useSelectedTab from "../hooks/useSelectedTab";
import TabSelector from "../components/TabSelector";

const schema = z.object({
  message: z.string().min(1, { message: "Veuillez entrer un message." }),
  key: z
    .string()
    .min(1, { message: "Veuillez entrer une clé." })
    .refine((key) => {
      return !key.match(/[^a-zA-Z]/);
    }),
});

type Message = z.infer<typeof schema>;

function VigenereMessageInputForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<Message>({ resolver: zodResolver(schema) });
  const history = useNavigate();
  const { setSelectedTab } = useSelectedTab();
  const { encryptMessage } = useEncryptedMessage();

  const onSubmit = (data: FieldValues) => {
    encryptMessage({
      message: data.message,
      key: data.key,
      encryptedMessage: "",
      method: "vigenere-cipher",
      _id: "",
      timestamp: 0,
    });
    history("/result");
    setSelectedTab("result");
  };

  return (
    <VStack spacing={4} align="stretch" marginBottom={3}>
      <TabSelector />
    <Center>
      <Box
        width="lg"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        padding="5"
        marginTop="10"
      >
        <Center>
        Chiffrement de Vigenère
        </Center>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <FormControl marginTop={4}>
            <FormLabel>Message à chiffrer</FormLabel>
            <Input {...register("message")} type="text" id="message" />
            {!errors.message && (
              <FormHelperText>
                Veuillez entrer un message à chiffrer.
              </FormHelperText>
            )}
            {errors.message && (
              <FormHelperText>{errors.message.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={4}>
            <FormLabel>Clé de chiffrement</FormLabel>
            <Input {...register("key")} type="text" id="key" />
            {!errors.key && (
              <FormHelperText>
                Veuillez entrer une clé de chiffrement.
              </FormHelperText>
            )}
            {errors.key && (
              <FormHelperText>{errors.key.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            mt={4}
            colorScheme="twitter"
            type="submit"
            isDisabled={!isValid}
          >
            Chiffrer
          </Button>
        </form>
      </Box>
    </Center>
    </VStack>
  );
}

export default VigenereMessageInputForm;
