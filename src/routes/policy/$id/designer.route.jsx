import {createFileRoute} from "@tanstack/react-router";
import {BlocklyWorkspace} from "react-blockly";
import toolbox from "../../../blockly/toolbox.js";

export const Route = createFileRoute("/policy/$id/designer")({
    component: Index,
});


function Index() {
    return <div className="blockly-container">
        <BlocklyWorkspace
            className="editor"
            toolboxConfiguration={toolbox}
        />
    </div>

}