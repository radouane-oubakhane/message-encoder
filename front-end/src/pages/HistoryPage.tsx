import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Badge,
} from "@chakra-ui/react";
import useMessages from "../hooks/useMessages";

const HistoryPage = () => {
  const { data: messages, error } = useMessages();
  if (error) {
    return (
      <Text fontSize="2xl" textAlign="center">
        Une erreur est survenue
      </Text>
    );
  }
  console.log(messages);
  if (messages?.length === 0) {
    return (
      <Center>
        <Text fontSize="2xl" as="b" padding={4}>
          Aucun message chiffré
        </Text>
      </Center>
    );
  }

  return (
    <VStack spacing={4} align="stretch" paddingX={6} paddingBottom={6}>
      <Center>
        <Text fontSize="2xl" as="b" padding={4}>
          Historique des messages chiffrés
        </Text>
      </Center>
      <TableContainer borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Text>Message</Text>
                <Text>clair</Text>
                </Th>
              <Th>
                <Text>Message</Text>
                <Text>chiffré</Text>
                </Th>
              <Th>
                <Text>Clé de chiffrement de Vigenère</Text>
                <Text>ou p et q de RSA</Text>
              </Th>
              <Th>
                <Text>Méthode de</Text>
                <Text>chiffrement</Text>
                </Th>
            </Tr>
          </Thead>
          <Tbody>
            {messages?.map((message) => {
              return (
                <Tr>
                  <Td>{message.message}</Td>
                  <Td>{message.encryptedMessage}</Td>
                  {message.method == "vigenere-cipher" ? (
                    <Td>{message.key}</Td>
                  ) : (
                    <Td>
                      <Badge>P</Badge> {message.p} <Badge>Q</Badge> {message.q}
                    </Td>
                  )}
                  <Td>
                    {message.method == "vigenere-cipher"
                      ? "Chiffrement de Vigenère"
                      : "Chiffrement RSA"}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default HistoryPage;
