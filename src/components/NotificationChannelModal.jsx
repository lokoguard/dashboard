import {
    Button,
    Code,
    Flex, FormControl, FormHelperText, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function NotificationChannelModal({isOpen, onOpen, onClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Configure Notification Channel</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Administrator Email address</FormLabel>
                        <Input type='text' />
                    </FormControl>
                    <FormControl mt={8}>
                        <FormLabel>Ntfy.sh Endpoint</FormLabel>
                        <Input type='text' />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={2} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='teal' onClick={onClose}>
                        Update Configuration
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}