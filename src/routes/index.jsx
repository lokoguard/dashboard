import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Badge,
  Box,
  Button,
  Center,
  Code,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { get, getHttpBaseUrl, post } from "../request.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isOnline, RelativeTimeDisplay } from "../utils.jsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [senders, setSenders] = useState([]);
  const [generatedAuthToken, setGeneratedAuthToken] = useState("");
  const [generatedAuthTokenAppType, setGeneratedAuthTokenAppType] =
    useState("");
  const fetchSenders = () => {
    get("/api/management/senders")
      .then((result) => {
        setSenders([...result]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const agentConfigureGuide = (id, type) => {
    setGeneratedAuthTokenAppType(type);
    post(`/api/management/senders/${id}/auth`, {}, {})
      .then((res) => {
        setGeneratedAuthToken(res.token ?? "[ERROR]");
        toast.success("Generated agent auth token");
        onOpen();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchSenders();
    window.addEventListener("reload_agents", fetchSenders);
    return () => window.removeEventListener("reload_agents", fetchSenders);
  }, []);

  return (
    <Center>
      <Box mx="5" w="75%">
        <TableContainer borderWidth="1px" borderRadius="md">
          <Table variant="simple">
            {senders.length === 0 && (
              <TableCaption>No agents registered yet</TableCaption>
            )}
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Name</Th>
                <Th>Configure</Th>
                <Th>Last Seen</Th>
                <Th isNumeric>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {senders.map((sender) => {
                return (
                  <Tr key={sender.id}>
                    <Td>
                      <Badge
                        variant="solid"
                        colorScheme="teal"
                        rounded="full"
                        px="10px"
                        py="2px"
                      >
                        {sender.type}
                      </Badge>
                    </Td>
                    <Td>
                      <Link to={`/sender/${sender.id}/analytics`}>
                        {sender.type === "DEVICE"
                          ? sender.hostname
                          : sender.applicationName}
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="teal"
                        size="xs"
                        onClick={() =>
                          agentConfigureGuide(sender.id, sender.type)
                        }
                      >
                        Configure Agent
                      </Button>
                    </Td>
                    <Td>
                      {<RelativeTimeDisplay dateTimeStr={sender.lastSeen} />}
                    </Td>
                    <Td isNumeric>
                      {isOnline(sender.lastSeen) ? (
                        <Badge
                          variant="solid"
                          colorScheme="green"
                          rounded="full"
                          px="10px"
                          py="2px"
                        >
                          Online
                        </Badge>
                      ) : (
                        <Badge
                          variant="solid"
                          colorScheme="red"
                          rounded="full"
                          px="10px"
                          py="2px"
                        >
                          Offline
                        </Badge>
                      )}
                    </Td>
                  </Tr>
                );
              })}
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
            {generatedAuthTokenAppType === "DEVICE" && (
              <Flex flexDirection="column">
                <b>Download Lokoguard Agent and run the following command</b>
                <Code mt={5} p={5}>
                  lokoguard_agent_token={generatedAuthToken}{" "}
                  lokoguard_agent_endpoint={getHttpBaseUrl()} lokoagent
                </Code>
              </Flex>
            )}
            {generatedAuthTokenAppType === "APP" && (
              <Flex flexDirection="column">
                <b>Use the generated token to configure in tracing library</b>
                <Code mt={5} p={5}>
                  {generatedAuthToken}
                </Code>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
