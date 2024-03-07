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

// eslint-disable-next-line react/prop-types
export default function RegisterSenderModal({isOpen, onOpen, onClose}) {
    const [senderType, setSenderType] = useState("");

    return (<Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Register New Sender</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Sender Type</FormLabel>
                        <Select value={senderType} onChange={(e)=>setSenderType(e.target.value)}>
                            <option value=''>Select Type</option>
                            <option value='server'>Server</option>
                            <option value='app'>Application</option>
                        </Select>
                    </FormControl>
                    { senderType === 'server' &&
                        <>
                            <FormControl mt={3}>
                                <FormLabel>Server IP</FormLabel>
                                <Input type='text'/>
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Server Hostname</FormLabel>
                                <Input type='text'/>
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Server MAC</FormLabel>
                                <Input type='text'/>
                            </FormControl>
                        </>
                    }
                    { senderType === 'app' &&
                        <FormControl mt={3}>
                            <FormLabel>Application Name</FormLabel>
                            <Input type='text'/>
                        </FormControl>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={2} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='teal' onClick={onClose} isDisabled={senderType === ''} >
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
