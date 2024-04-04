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

// Search text
// {
//     "type": "search_text",
//     "output": "Boolean",
//     "colour": 63,
//     "message0": 'search text %1',
//     "args0": [
//     {
//         "type": "input_value",
//         "name": "TEXT",
//         "check": "String",
//         "align": "RIGHT"
//     }
// ],
//     "message1": "in %1",
//     "args1": [
//     {
//         "type": "input_value",
//         "name": "IN",
//         "check": "String",
//         "align": "RIGHT"
//     }
// ]
// },
Blockly.Blocks["search_regex_pattern"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "search pattern %1",
      args0: [
        {
          type: "input_value",
          name: "TEXT",
          check: "String",
          align: "RIGHT",
        },
      ],
      message1: "in text %1",
      args1: [
        {
          type: "input_value",
          name: "IN",
          check: "String",
          align: "RIGHT",
        },
      ],
      output: "Boolean",
    });
  },
};

Blockly.Blocks["fetch_regex_named_group"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "fetch named group %1",
      args0: [
        {
          type: "input_value",
          name: "TEXT",
          check: "String",
          align: "RIGHT",
        },
      ],
      message1: "of pattern %1",
      args1: [
        {
          type: "input_value",
          name: "PATTERN",
          check: "String",
          align: "RIGHT",
        },
      ],
      message2: "in text %1",
      args2: [
        {
          type: "input_value",
          name: "IN",
          check: "String",
          align: "RIGHT",
        },
      ],
      output: "String",
    });
  },
};
