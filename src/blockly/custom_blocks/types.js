import Blockly from "blockly";
import "blockly/javascript";

// File event type -- create, access, write, delete
Blockly.Blocks["file_event_type"] = {
  init: function () {
    this.jsonInit({
      colour: "#2272e7",
      message0: "file event %1",
      args0: [
        {
          type: "field_dropdown",
          name: "VALUE",
          options: [
            ["create", "create"],
            ["access", "access"],
            ["write", "write"],
            ["delete", "delete"],
          ],
        },
      ],
      output: "String",
    });
  },
};

Blockly.Blocks["syslog_facility_level"] = {
  init: function () {
    this.jsonInit({
      colour: "#2272e7",
      message0: "syslog facility level %1",
      args0: [
        {
          type: "field_dropdown",
          name: "VALUE",
          options: [
            ["kern", "kern"],
            ["user", "user"],
            ["mail", "mail"],
            ["daemon", "daemon"],
            ["auth", "auth"],
            ["syslog", "syslog"],
            ["lpr", "lpr"],
            ["news", "news"],
            ["uucp", "uucp"],
            ["cron", "cron"],
            ["authpriv", "authpriv"],
            ["ftp", "ftp"],
            ["ntp", "ntp"],
            ["security", "security"],
            ["console", "console"],
            ["cron2", "cron2"],
            ["local0", "local0"],
            ["local1", "local1"],
            ["local2", "local2"],
            ["local3", "local3"],
            ["local4", "local4"],
            ["local5", "local5"],
            ["local6", "local6"],
            ["local7", "local7"],
          ],
        },
      ],
      output: "String",
    });
  },
};

// Syslog Severity level
// 0: "emergency",
//     1: "alert",
//     2: "critical",
//     3: "error",
//     4: "warning",
//     5: "notice",
//     6: "informational",
//     7: "debug",
// }

Blockly.Blocks["syslog_severity_level"] = {
  init: function () {
    this.jsonInit({
      colour: "#2272e7",
      message0: "syslog severity level %1",
      args0: [
        {
          type: "field_dropdown",
          name: "VALUE",
          options: [
            ["emergency", "emergency"],
            ["alert", "alert"],
            ["critical", "critical"],
            ["error", "error"],
            ["warning", "warning"],
            ["notice", "notice"],
            ["informational", "informational"],
            ["debug", "debug"],
          ],
        },
      ],
      output: "String",
    });
  },
};
