import "blockly/javascript";
import Blockly from "blockly";

// Script Runner Output
Blockly.Blocks["script_runner"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "run bash script %1",
      args0: [
        {
          type: "input_value",
          name: "SCRIPT",
        },
      ],
      message1: "on server %1",
      args1: [
        {
          type: "input_value",
          name: "SERVER",
        },
      ],
      output: "String",
      previousStatement: null,
      nextStatement: null,
    });
  },
};

// Send notification
Blockly.Blocks["send_notification"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "send notification %1",
      args0: [
        {
          type: "input_value",
          name: "NOTIFICATION",
        },
      ],
      previousStatement: null,
      nextStatement: null,
    });
  },
};
