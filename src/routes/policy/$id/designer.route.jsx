import { createFileRoute, useParams } from "@tanstack/react-router";
import { BlocklyWorkspace } from "react-blockly";

import toolbox from "../../../blockly/toolbox.js";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSave } from "@fortawesome/free-solid-svg-icons";
import generateCode from "../../../blockly/generator.js";
import "../../../blockly/custom_blocks.js";
import { get, put } from "../../../request.js";
import toast from "react-hot-toast";
import Highlight from "react-highlight";

import "highlight.js/styles/a11y-dark.css";

export const Route = createFileRoute("/policy/$id/designer")({
  component: Index,
});

function Index() {
  const policyId = useParams({
    from: "/policy/$id/designer",
    select: (params) => params.id,
  });

  const [initialJson, setInitialJson] = useState({});
  const [loadedInitialConfig, setLoadedInitialConfig] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const workspaceRef = useRef(null);
  const {
    isOpen: isCodeOpen,
    onOpen: onCodeOpen,
    onClose: onCodeClose,
  } = useDisclosure();

  const jsonUpdated = (json) => {
    setInitialJson(json);
  };

  const fetchPolicy = () => {
    get(`/api/management/policies/${policyId}`, {})
      .then((result) => {
        setInitialJson(result.workspace);
        setTimeout(() => {
          setLoadedInitialConfig(true);
        }, 200);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const updatePolicy = () => {
    if (!workspaceRef.current) return;
    const code = generateCode(workspaceRef.current);
    put(
      `/api/management/policies/${policyId}`,
      {},
      {
        workspace: initialJson,
        generatedCode: code,
      },
    )
      .then(() => {
        toast.success("Policy updated");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const viewCode = () => {
    if (!workspaceRef.current) return;
    setGeneratedCode(generateCode(workspaceRef.current));
    onCodeOpen();
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  return (
    <>
      <div className="blockly-container">
        {loadedInitialConfig && (
          <BlocklyWorkspace
            className="editor"
            onWorkspaceChange={(workspace) =>
              (workspaceRef.current = workspace)
            }
            initialJson={initialJson}
            onJsonChange={jsonUpdated}
            toolboxConfiguration={toolbox}
          />
        )}
        {/*  Floating button to save  */}
        <Flex
          position="absolute"
          right={10}
          top={5}
          zIndex={100}
          flexDirection="column"
          gap={2}
        >
          <Button
            size="sm"
            colorScheme="teal"
            leftIcon={<FontAwesomeIcon icon={faSave} />}
            onClick={updatePolicy}
          >
            Save Policy
          </Button>
          <Button
            size="sm"
            colorScheme="teal"
            leftIcon={<FontAwesomeIcon icon={faCode} />}
            onClick={viewCode}
          >
            View Code
          </Button>
        </Flex>
      </div>

      {/*  Modal */}
      <Modal isOpen={isCodeOpen} onClose={onCodeClose} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generated Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {generatedCode === "" && (
              <Text fontStyle="italic" fontWeight="bold" pb={5}>
                No code generated yet
              </Text>
            )}
            {generatedCode !== "" && (
              <Highlight className="js">{generatedCode}</Highlight>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
