import "blockly/javascript";
import Blockly from "blockly";

// Dump output
Blockly.Blocks["dump_output"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "%1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      previousStatement: null,
      nextStatement: null,
    });
  },
};

// Script Runner
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
          name: "SERVER_ID",
        },
      ],
      output: "String",
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
Blockly.Blocks["search_regex_pattern"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "search pattern %1",
      args0: [
        {
          type: "input_value",
          name: "PATTERN",
          check: "String",
          align: "RIGHT",
        },
      ],
      message1: "in text %1",
      args1: [
        {
          type: "input_value",
          name: "TEXT",
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
          name: "GROUP",
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
          name: "TEXT",
          check: "String",
          align: "RIGHT",
        },
      ],
      output: "String",
    });
  },
};

Blockly.Blocks["join_with_separator"] = {
  init: function () {
    this.jsonInit({
      colour: "#6707b4",
      message0: "join %1",
      args0: [
        {
          type: "input_value",
          name: "VALUES",
        },
      ],
      message1: "with separator %1",
      args1: [
        {
          type: "input_value",
          name: "SEPARATOR",
        },
      ],
      output: "String",
    });
  },
};
