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
    Select,
} from "@chakra-ui/react";
import {useState} from "react";
import {formEventToJson} from "../utils.jsx";
import {post} from "../request.js";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function RegisterSenderModal({isOpen, onOpen, onClose}) {
    const [senderType, setSenderType] = useState("");
    const handleFormSubmit = (e) => {
        e.preventDefault();
        post("/api/management/senders", {}, formEventToJson(e)).then(() => {
            onClose();
            toast.success("Agent registered successfully");
            window.dispatchEvent(new Event('reload_agents'));
        }).catch((err) => {
            toast.error(err.message);
        });
    }

    return (<Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay/>
        <ModalContent as="form" onSubmit={handleFormSubmit}>
            <ModalHeader>Register New Sender</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <FormControl>
                    <FormLabel>Sender Type</FormLabel>
                    <Select name="type" value={senderType} onChange={(e) => setSenderType(e.target.value)}>
                        <option value=''>Select Type</option>
                        <option value='DEVICE'>Server</option>
                        <option value='APP'>Application</option>
                    </Select>
                </FormControl>
                {senderType === 'DEVICE' &&
                    <>
                        <FormControl mt={3}>
                            <FormLabel>Server IP</FormLabel>
                            <Input type='text' name="ip"/>
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Server Hostname</FormLabel>
                            <Input type='text' name="hostname"/>
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Server MAC</FormLabel>
                            <Input type='text' name="mac"/>
                        </FormControl>
                    </>
                }
                {senderType === 'APP' &&
                    <FormControl mt={3}>
                        <FormLabel>Application Name</FormLabel>
                        <Input type='text' name={"applicationName"}/>
                    </FormControl>
                }
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='red' mr={2} onClick={onClose}>
                    Close
                </Button>
                <Button colorScheme='teal' type="submit" isDisabled={senderType === ''}>
                    Register
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>)
}

/**
 * Type - App/Server
 * Ip - (for server)
 * Mac - (for server)
 * Hostname - (for server)
 * App Name - (for app)
 **/
