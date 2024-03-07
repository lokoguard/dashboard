import {createFileRoute, Link} from "@tanstack/react-router";
import {
    useDisclosure,
    Badge, Box, Button, Center, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Code,
} from "@chakra-ui/react";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <Center>
        <Box mx="5" w='75%'>
            <TableContainer borderWidth="1px" borderRadius="md">
                <Table variant="simple">
                    <TableCaption>All the registered servers and agents are shown here</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Name</Th>
                            <Th>Last Seen</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td><Badge variant='solid' colorScheme="teal">Server</Badge></Td>
                            <Td><Link to={`/sender/tanmoy-laptop/analytics`}>tanmoy-laptop</Link></Td>
                            <Td>2m ago</Td>
                            <Td><Badge variant='solid' colorScheme="green">Online&nbsp;</Badge></Td>
                        </Tr>
                        <Tr>
                            <Td><Badge variant='solid' colorScheme="teal">Server</Badge></Td>
                            <Td>tanmoy-laptop</Td>
                            <Td>
                                <Button colorScheme='teal' size='xs' onClick={onOpen}>
                                    Configure Agent
                                </Button>
                            </Td>
                            <Td><Badge variant='solid' colorScheme="red">Offline</Badge></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>

        {/* Register Agent */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Setup Agent</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection="column">
                        <b>Follow the steps to setup agent on your system.</b>
                        Hello ! blah blah

                        <Code mt={10} p={5}>lokoguard_token=i@2UGd&D72savJ lokoagent start</Code>
                    </Flex>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Center>;
}