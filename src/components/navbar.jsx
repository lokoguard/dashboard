import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingShield,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/logo.png";
import RegisterSenderModal from "./RegisterSenderModal.jsx";
import { Link } from "@tanstack/react-router";
import CreateNewPolicyModal from "./CreateNewPolicyModal.jsx";

export default function Navbar() {
  const {
    isOpen: isOpenRegisterSenderModal,
    onOpen: onOpenRegisterSenderModal,
    onClose: onCloseRegisterSenderModal,
  } = useDisclosure();

  const {
    isOpen: isOpenNewPolicyModal,
    onOpen: onOpenNewPolicyModal,
    onClose: onCloseNewPolicyModal,
  } = useDisclosure();

  return (
    <>
      {/* Modal */}
      <RegisterSenderModal
        isOpen={isOpenRegisterSenderModal}
        onOpen={onOpenRegisterSenderModal}
        onClose={onCloseRegisterSenderModal}
      />
      <CreateNewPolicyModal
        isOpen={isOpenNewPolicyModal}
        onOpen={onOpenNewPolicyModal}
        onClose={onCloseNewPolicyModal}
      />
      {/* Navbar */}
      <Flex
        width="100vw"
        px="4"
        py="4"
        mb="20px"
        justify="space-between"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Link to="/">
          <Image src={Logo} h="10" w="10" mr="5" />
        </Link>
        <Flex gap="8px">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;&nbsp;Agent
            </MenuButton>
            <MenuList>
              <Link to="/">
                <MenuItem>All Agents</MenuItem>
              </Link>
              <MenuItem onClick={onOpenRegisterSenderModal}>
                Register New
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <FontAwesomeIcon icon={faBuildingShield} />
              &nbsp;&nbsp;Policy Management
            </MenuButton>
            <MenuList>
              <Link to="/policy">
                <MenuItem>Policy List</MenuItem>
              </Link>
              <MenuItem onClick={onOpenNewPolicyModal}>
                Create new policy
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <FontAwesomeIcon icon={faGear} />
              &nbsp;&nbsp;System Configuration
            </MenuButton>
            <MenuList>
              <MenuItem>User Management</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Button>
          Logout&nbsp;&nbsp;
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </>
  );
}
