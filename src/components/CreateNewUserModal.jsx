import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { formEventToJson } from "../utils.jsx";
import { post } from "../request.js";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function CreateNewUserModal({ isOpen, onClose }) {
  const [userName, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    post("/api/management/users", {}, formEventToJson(e))
      .then(() => {
        onClose();
        toast.success("New User Created");
        window.dispatchEvent(new Event("reload_users"));
        setUsername("");
        setEmailAddress("");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleFormSubmit}>
        <ModalHeader>Create New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={5}>
            <FormControl>
              <FormLabel>User Full Name</FormLabel>
              <Input
                name="name"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>User E-mail ID</FormLabel>
              <Input
                name="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={2} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="teal" type="submit" isDisabled={userName === ""}>
            Create Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
