import { createFileRoute } from "@tanstack/react-router";
import { BlocklyWorkspace } from "react-blockly";

import toolbox from "../../../blockly/toolbox.js";
import { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import generateCode from "../../../blockly/generator.js";
import "../../../blockly/custom_blocks.js";

export const Route = createFileRoute("/policy/$id/designer")({
  component: Index,
});

function Index() {
  const [initialJson, setInitialJson] = useState({});
  const workspaceRef = useRef(null);

  const jsonUpdated = (json) => {
    setInitialJson(json);
  };

  const generateAndSaveCode = () => {
    if (workspaceRef.current) {
      const code = generateCode(workspaceRef.current);
      console.log(code);
    }
  };

  return (
    <>
      <div className="blockly-container">
        <BlocklyWorkspace
          className="editor"
          onWorkspaceChange={(workspace) => (workspaceRef.current = workspace)}
          initialJson={initialJson}
          onJsonChange={jsonUpdated}
          toolboxConfiguration={toolbox}
        />
        {/*  Floating button to save  */}
        <Button
          size="md"
          colorScheme="teal"
          position="absolute"
          right={10}
          top={5}
          zIndex={100}
          leftIcon={<FontAwesomeIcon icon={faSave} />}
          onClick={generateAndSaveCode}
        >
          Save Policy
        </Button>
      </div>
    </>
  );
}
