import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
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
  p: z
    .string()
    .min(1, { message: "Veuillez entrer un nombre premier." })
    .refine((key) => {
      return Number.isInteger(Number(key));
    }),
  q: z
    .string()
    .min(1, { message: "Veuillez entrer un nombre premier." })
    .refine((key) => {
      return Number.isInteger(Number(key));
    }),
});

type Message = z.infer<typeof schema>;

function RSAMessageInputForm() {
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
      key: "",
      encryptedMessage: "",
      method: "rsa-cipher",
      p: Number(data.p),
      q: Number(data.q),
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
        Chiffrement RSA
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
          <HStack>
          <FormControl marginTop={4}>
            <FormLabel>Premier nombre premier (p)</FormLabel>
            <Input {...register("p")} type="text" id="p" />
            {!errors.p && (
              <FormHelperText>
                Veuillez entrer une un nombre premier.
              </FormHelperText>
            )}
            {errors.p && (
              <FormHelperText>{errors.p.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl marginTop={4}>
            <FormLabel>Second nombre premier (q)</FormLabel>
            <Input {...register("q")} type="text" id="q" />
            {!errors.q && (
              <FormHelperText>
                Veuillez entrer une un nombre premier.
              </FormHelperText>
            )}
            {errors.q && (
              <FormHelperText>{errors.q.message}</FormHelperText>
            )}
          </FormControl>
          </HStack>
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

export default RSAMessageInputForm;
