import {
  Flex,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuildingShield,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <Flex
      width="100vw"
      px="4"
      py="4"
      mb="20px"
      justify="space-between"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Image src={Logo} h="10" w="10" mr="5" />
      <Flex gap="8px">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;&nbsp;Sender
          </MenuButton>
          <MenuList>
            <MenuItem>All Senders</MenuItem>
            <MenuItem>Register New</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <FontAwesomeIcon icon={faBuildingShield} />
            &nbsp;&nbsp;Policy Management
          </MenuButton>
          <MenuList>
            <MenuItem>Policy List</MenuItem>
            <MenuItem>Create new policy</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <FontAwesomeIcon icon={faGear} />
            &nbsp;&nbsp;System Configuration
          </MenuButton>
          <MenuList>
            <MenuItem>Notification Channel</MenuItem>
            <MenuItem>User Management</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Button>
        Logout&nbsp;&nbsp;
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );
}
