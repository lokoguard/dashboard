import Blockly from "blockly";
import "blockly/javascript";

Blockly.Blocks["on_new_log"] = {
  init: function () {
    this.jsonInit({
      colour: "#5CA699",
      message0: "On New Log %1 %2",
      args0: [
        {
          type: "field_variable",
          name: "LOG_ID",
          variable: "log_id",
        },
        {
          type: "field_variable",
          name: "LOG_CONTENT",
          variable: "log_content",
        },
      ],
      message1: "From Server %1 %2",
      args1: [
        {
          type: "field_variable",
          name: "SERVER_ID",
          variable: "server_id",
        },
        {
          type: "field_variable",
          name: "SERVER_HOSTNAME",
          variable: "server_hostname",
        },
      ],
      message2: "Of type %1 %2",
      args2: [
        {
          type: "field_variable",
          name: "FACILITY_LEVEL",
          variable: "facility_level",
        },
        {
          type: "field_variable",
          name: "SEVERITY_LEVEL",
          variable: "severity_level",
        },
      ],
      message3: "%1",
      args3: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
      onchange: function () {
        if (!this.workspace.variableMap_.getVariableById("log_content")) {
          this.workspace.createVariable("log_content", "Type", "log_content");
        }
        if (!this.workspace.variableMap_.getVariableById("server_id")) {
          this.workspace.createVariable("server_id", "Type", "server_id");
        }
        if (!this.workspace.variableMap_.getVariableById("server_hostname")) {
          this.workspace.createVariable(
            "server_hostname",
            "Type",
            "server_hostname",
          );
        }
        if (!this.workspace.variableMap_.getVariableById("facility_level")) {
          this.workspace.createVariable(
            "facility_level",
            "Type",
            "facility_level",
          );
        }
        if (!this.workspace.variableMap_.getVariableById("severity_level")) {
          this.workspace.createVariable(
            "severity_level",
            "Type",
            "severity_level",
          );
        }
      },
    });
  },
};

Blockly.Blocks["on_file_event"] = {
  init: function () {
    this.jsonInit({
      colour: "#5CA699",
      message0: "On File %1",
      args0: [
        {
          type: "field_variable",
          name: "EVENT",
          variable: "event",
        },
      ],
      message1: "For %1",
      args1: [
        {
          type: "field_variable",
          name: "FILE_NAME",
          variable: "file_name",
        },
      ],
      message2: "On Server %1 %2",
      args2: [
        {
          type: "field_variable",
          name: "SERVER_ID",
          variable: "server_id",
        },
        {
          type: "field_variable",
          name: "SERVER_HOSTNAME",
          variable: "server_hostname",
        },
      ],
      message3: "%1",
      args3: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
    });
  },
  onchange: function () {
    if (!this.workspace.variableMap_.getVariableById("server_id")) {
      this.workspace.createVariable("server_id", "Type", "server_id");
    }
    if (!this.workspace.variableMap_.getVariableById("server_hostname")) {
      this.workspace.createVariable(
        "server_hostname",
        "Type",
        "server_hostname",
      );
    }
    if (!this.workspace.variableMap_.getVariableById("event")) {
      this.workspace.createVariable("event", "Type", "event");
    }
    if (!this.workspace.variableMap_.getVariableById("file_name")) {
      this.workspace.createVariable("file_name", "Type", "file_name");
    }
  },
};

Blockly.Blocks["on_disk_usage_update"] = {
  init: function () {
    this.jsonInit({
      colour: "#5CA699",
      message0: "On %1% on %2",
      args0: [
        {
          type: "field_variable",
          name: "USAGE_PERCENT",
          variable: "usage_percent",
        },
        {
          type: "field_variable",
          name: "DISK",
          variable: "disk",
        },
      ],
      message1: "On Server %1 %2",
      args1: [
        {
          type: "field_variable",
          name: "SERVER_ID",
          variable: "server_id",
        },
        {
          type: "field_variable",
          name: "SERVER_HOSTNAME",
          variable: "server_hostname",
        },
      ],
      message2: "Info %1 %2 %3",
      args2: [
        {
          type: "field_variable",
          name: "TOTAL_DISK_GB",
          variable: "total_disk_gb",
        },
        {
          type: "field_variable",
          name: "FREE_DISK_GB",
          variable: "free_disk_gb",
        },
        {
          type: "field_variable",
          name: "USED_DISK_GB",
          variable: "used_disk_gb",
        },
      ],
      message3: "%1",
      args3: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
    });
  },
  onchange: function () {
    if (!this.workspace.variableMap_.getVariableById("server_id")) {
      this.workspace.createVariable("server_id", "Type", "server_id");
    }
    if (!this.workspace.variableMap_.getVariableById("server_hostname")) {
      this.workspace.createVariable(
        "server_hostname",
        "Type",
        "server_hostname",
      );
    }
    if (!this.workspace.variableMap_.getVariableById("usage_percent")) {
      this.workspace.createVariable("usage_percent", "Type", "usage_percent");
    }
    if (!this.workspace.variableMap_.getVariableById("disk")) {
      this.workspace.createVariable("disk", "Type", "disk");
    }
    if (!this.workspace.variableMap_.getVariableById("total_disk_gb")) {
      this.workspace.createVariable("total_disk_gb", "Type", "total_disk_gb");
    }
    if (!this.workspace.variableMap_.getVariableById("free_disk_gb")) {
      this.workspace.createVariable("free_disk_gb", "Type", "free_disk_gb");
    }
    if (!this.workspace.variableMap_.getVariableById("used_disk_gb")) {
      this.workspace.createVariable("used_disk_gb", "Type", "used_disk_gb");
    }
  },
};

Blockly.Blocks["on_memory_usage_update"] = {
  init: function () {
    this.jsonInit({
      colour: "#5CA699",
      message0: "On %1%",
      args0: [
        {
          type: "field_variable",
          name: "MEMORY_USAGE_PERCENT",
          variable: "memory_usage_percent",
        },
      ],
      message1: "On Server %1 %2",
      args1: [
        {
          type: "field_variable",
          name: "SERVER_ID",
          variable: "server_id",
        },
        {
          type: "field_variable",
          name: "SERVER_HOSTNAME",
          variable: "server_hostname",
        },
      ],
      message2: "Info %1 %2 %3",
      args2: [
        {
          type: "field_variable",
          name: "TOTAL_MEMORY_GB",
          variable: "total_memory_gb",
        },
        {
          type: "field_variable",
          name: "FREE_MEMORY_GB",
          variable: "free_memory_gb",
        },
        {
          type: "field_variable",
          name: "USED_MEMORY_GB",
          variable: "used_memory_gb",
        },
      ],
      message3: "%1",
      args3: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
    });
  },
  onchange: function () {
    if (!this.workspace.variableMap_.getVariableById("server_id")) {
      this.workspace.createVariable("server_id", "Type", "server_id");
    }
    if (!this.workspace.variableMap_.getVariableById("server_hostname")) {
      this.workspace.createVariable(
        "server_hostname",
        "Type",
        "server_hostname",
      );
    }
    if (!this.workspace.variableMap_.getVariableById("memory_usage_percent")) {
      this.workspace.createVariable(
        "memory_usage_percent",
        "Type",
        "memory_usage_percent",
      );
    }
    if (!this.workspace.variableMap_.getVariableById("total_memory_gb")) {
      this.workspace.createVariable(
        "total_memory_gb",
        "Type",
        "total_memory_gb",
      );
    }
    if (!this.workspace.variableMap_.getVariableById("free_memory_gb")) {
      this.workspace.createVariable("free_memory_gb", "Type", "free_memory_gb");
    }
    if (!this.workspace.variableMap_.getVariableById("used_memory_gb")) {
      this.workspace.createVariable("used_memory_gb", "Type", "used_memory_gb");
    }
  },
};

Blockly.Blocks["on_cpu_usage_update"] = {
  init: function () {
    this.jsonInit({
      colour: "#5CA699",
      message0: "On %1%",
      args0: [
        {
          type: "field_variable",
          name: "AVG_CPU_USAGE_PERCENT",
          variable: "average_cpu_usage_percent",
        },
      ],
      message1: "On Server %1 %2",
      args1: [
        {
          type: "field_variable",
          name: "SERVER_ID",
          variable: "server_id",
        },
        {
          type: "field_variable",
          name: "SERVER_HOSTNAME",
          variable: "server_hostname",
        },
      ],
      message2: "%1",
      args2: [
        {
          type: "input_statement",
          name: "MAIN",
        },
      ],
    });
  },
};
