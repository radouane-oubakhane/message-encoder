import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ColorModeSwitch from "./ColorModeSwitch";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("rsa");
  const {user} = useAuth(); 
  

  return (
    <HStack justifyContent="space-between" padding={6}>
      <HStack justifyContent="space-between" spacing={10}>
        <Link to="/rsa">
          <Text
            as="b"
            color={selectedAlgorithm === "rsa" ? "blue.500" : "gray.500"}
            onClick={() => {
              setSelectedAlgorithm("rsa");
            }}
          >
            Chiffrement RSA
          </Text>
        </Link>
        <Link to="/vigenere">
          <Text
            as="b"
            color={selectedAlgorithm === "vigenere" ? "blue.500" : "gray.500"}
            onClick={() => {
              setSelectedAlgorithm("vigenere");
            }}
          >
            Chiffrement de Vigenère
          </Text>
        </Link>
        <Link to="/history">
          <Text
            as="b"
            onClick={() => {
              setSelectedAlgorithm("");
            }}
          >
            Historique
          </Text>
        </Link>
      </HStack>
      <HStack>
        {user && <LogoutButton />}
      <ColorModeSwitch />
        </HStack>
    </HStack>
  );
};

export default NavBar;
