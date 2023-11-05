import {
  Box,
  Center,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import TabSelector from "../components/TabSelector";
import useEncryptedMessage from "../hooks/useEncryptedMessage";
import { Navigate } from "react-router-dom";
import useSelectedTab from "../hooks/useSelectedTab";

const ResultPage = () => {
  const {encryptedMessage} = useEncryptedMessage();
  const {setSelectedTab} = useSelectedTab();

  if (encryptedMessage._id === undefined) {
    setSelectedTab("form");
    return <Navigate to="/rsa" />;
  }

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
          <Stat>
            <StatLabel>Message chiffré</StatLabel>
            <StatNumber>{encryptedMessage.encryptedMessage}</StatNumber>
          </Stat>
        </Box>
      </Center>
      <Center>
        <Box
          width="lg"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          padding="5"
        >
          <Stat>
            <StatLabel>Message clair</StatLabel>
            <StatNumber>{encryptedMessage.message}</StatNumber>
          </Stat>
        </Box>
      </Center>
      <Center>
        <Box
          width="lg"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          padding="5"
        >
          {encryptedMessage.method === "vigenere-cipher" && (
            <Stat>
            <StatLabel>Clé de chiffrement</StatLabel>
            <StatNumber>{encryptedMessage.key}</StatNumber>
          </Stat>
          )}
          {
            encryptedMessage.method === "rsa-cipher" && (
              <HStack spacing={4} align="stretch">
                <Stat>
                  <StatLabel>Premier nombre premier (p)</StatLabel>
                  <StatNumber>{encryptedMessage.p}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Deuxième nombre premier (q)</StatLabel>
                  <StatNumber>{encryptedMessage.q}</StatNumber>
                </Stat>
              </HStack>
            )
          }
        </Box>
      </Center>
    </VStack>
  );
};

export default ResultPage;
