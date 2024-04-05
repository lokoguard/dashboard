import Blockly from "blockly";
import "blockly/javascript";

// Schedule Job -- for future
Blockly.Blocks["schedule_job"] = {
  init: function () {
    this.jsonInit({
      colour: "#e75204",
      message0: "run job after %1 seconds",
      args0: [
        {
          type: "field_number",
          name: "AFTER_SECONDS",
        },
      ],
      message1: "%1",
      args1: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
      output: null,
    });
  },
};

// Enqueue Job -- run as soon as possible
Blockly.Blocks["enqueue_job"] = {
  init: function () {
    this.jsonInit({
      colour: "#e75204",
      message0: "run job",
      message1: "%1",
      args1: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
      output: null,
    });
  },
};

// Delete job by ID
Blockly.Blocks["delete_job_by_id"] = {
  init: function () {
    this.jsonInit({
      colour: "#e75204",
      message0: "delete job by id %1",
      args0: [
        {
          type: "input_value",
          name: "JOB_ID",
        },
      ],
      output: null,
    });
  },
};
