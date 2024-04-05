import {
  Button,
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
export default function CreateNewPolicyModal({ isOpen, onClose }) {
  const [policyName, setPolicyName] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    post("/api/management/policies", {}, formEventToJson(e))
      .then(() => {
        onClose();
        toast.success("New Policy Created");
        window.dispatchEvent(new Event("reload_policies"));
        setPolicyName("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleFormSubmit}>
        <ModalHeader>Create New Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Policy Name</FormLabel>
            <Input
              name="name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              placeholder="Enter a policy name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={2} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            isDisabled={policyName === ""}
          >
            Create Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
