import { javascriptGenerator } from "blockly/javascript";

function generateCode(workspace) {
  return javascriptGenerator.workspaceToCode(workspace);
}

export default generateCode;
