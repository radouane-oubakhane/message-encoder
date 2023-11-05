import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const LogoutButton = () => {
  const {user, logout} = useAuth(); 
  return (
    <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  <Text as="b" color="gray.500">
          {user?.firstName} {user?.lastName}
        </Text>
  </MenuButton>
  <MenuList>
    <MenuItem>
      <Text as="b" color="gray.500" onClick={() => logout()}>
            Déconnexion
          </Text>
    </MenuItem>
    
  </MenuList>
</Menu>
  )
}

export default LogoutButton