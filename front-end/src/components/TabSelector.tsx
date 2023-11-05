import { Button, Center, HStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectedTab from "../hooks/useSelectedTab";

const TabSelector = () => {
  const { selectedTab, setSelectedTab } = useSelectedTab();
  const history = useNavigate();

  return (
    <Center>
      <HStack padding={5}>
        <Button
          colorScheme="twitter"
          variant={selectedTab == "form" ? "solid" : "ghost"}
          onClick={() => {
            setSelectedTab("form");
            history("/rsa");
          }}
        >
          Chiffrement
        </Button>

        <Button
          colorScheme="twitter"
          variant={selectedTab == "result" ? "solid" : "ghost"}
          onClick={() => {
            setSelectedTab("result");
            history("/result");
          }}
        >
          Resultat de chiffrement
        </Button>
      </HStack>
    </Center>
  );
};

export default TabSelector;
