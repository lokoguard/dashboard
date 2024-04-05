import { javascriptGenerator, Order } from "blockly/javascript";

// Types custom blocks
javascriptGenerator.forBlock["text"] = function (block) {
  const value = block.getFieldValue("VALUE");
  return [`"${value}"`, Order.ATOMIC];
};

javascriptGenerator.forBlock["file_event_type"] = function (block) {
  const value = block.getFieldValue("VALUE");
  return [`"${value}"`, Order.ATOMIC];
};

javascriptGenerator.forBlock["syslog_facility_level"] = function (block) {
  const value = block.getFieldValue("VALUE");
  return [`"${value}"`, Order.ATOMIC];
};

javascriptGenerator.forBlock["syslog_severity_level"] = function (block) {
  const value = block.getFieldValue("VALUE");
  return [`"${value}"`, Order.ATOMIC];
};

// Utilities custom blocks
javascriptGenerator.forBlock["dump_output"] = function (block, generator) {
  const inputStatement = generator.valueToCode(block, "VALUE", Order.ATOMIC);
  return `${inputStatement};\n`;
};

javascriptGenerator.forBlock["script_runner"] = function (block, generator) {
  const script = generator.valueToCode(block, "SCRIPT", Order.ATOMIC);
  const args = generator.valueToCode(block, "ARGS", Order.ATOMIC);
  const server = generator.valueToCode(block, "SERVER_ID", Order.ATOMIC);
  const timeout = block.getFieldValue("TIMEOUT");
  return [
    `await run_script(${script}, ${args}, ${timeout}, ${server})`,
    Order.ATOMIC,
  ];
};

javascriptGenerator.forBlock["report_issue"] = function (block, generator) {
  const issue = generator.valueToCode(block, "ISSUE", Order.ATOMIC);
  const server = generator.valueToCode(block, "SERVER_ID", Order.ATOMIC);
  const action = generator.valueToCode(block, "ACTION", Order.ATOMIC);
  return `await report_issue(${issue}, ${action}, ${server});\n`;
};

javascriptGenerator.forBlock["send_notification"] = function (
  block,
  generator,
) {
  const notification = generator.valueToCode(
    block,
    "NOTIFICATION",
    Order.ATOMIC,
  );
  return `await send_notification(${notification});\n`;
};

javascriptGenerator.forBlock["search_regex_pattern"] = function (
  block,
  generator,
) {
  const pattern = generator.valueToCode(block, "PATTERN", Order.ATOMIC);
  const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);
  return [`search_regex_pattern(${pattern}, ${text})`, Order.ATOMIC];
};

javascriptGenerator.forBlock["fetch_regex_named_group"] = function (
  block,
  generator,
) {
  const group = generator.valueToCode(block, "GROUP", Order.ATOMIC);
  const pattern = generator.valueToCode(block, "PATTERN", Order.ATOMIC);
  const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);
  return [
    `fetch_regex_named_group(${group}, ${pattern}, ${text})`,
    Order.ATOMIC,
  ];
};

javascriptGenerator.forBlock["join_with_separator"] = function (
  block,
  generator,
) {
  const separator = generator.valueToCode(block, "SEPARATOR", Order.ATOMIC);
  const values = generator.valueToCode(block, "VALUES", Order.ATOMIC);
  return [`join_with_separator(${separator}, ${values})`, Order.ATOMIC];
};

// Hooks custom blocks
javascriptGenerator.forBlock["on_new_log"] = function (block, generator) {
  const logId = generator.getVariableName(block.getFieldValue("LOG_ID"));
  const logContent = generator.getVariableName(
    block.getFieldValue("LOG_CONTENT"),
  );
  const serverId = generator.getVariableName(block.getFieldValue("SERVER_ID"));
  const serverHostname = generator.getVariableName(
    block.getFieldValue("SERVER_HOSTNAME"),
  );
  const facilityLevel = generator.getVariableName(
    block.getFieldValue("FACILITY_LEVEL"),
  );
  const severityLevel = generator.getVariableName(
    block.getFieldValue("SEVERITY_LEVEL"),
  );
  const inputStatement = generator.statementToCode(block, "MAIN");
  return `async function on_new_log(${logId}, ${logContent}, ${facilityLevel}, ${severityLevel}, ${serverId}, ${serverHostname}) {
${inputStatement}}\n`;
};

javascriptGenerator.forBlock["on_file_event"] = function (block, generator) {
  const event = generator.getVariableName(block.getFieldValue("EVENT"));
  const fileName = generator.getVariableName(block.getFieldValue("FILE_NAME"));
  const serverId = generator.getVariableName(block.getFieldValue("SERVER_ID"));
  const serverHostname = generator.getVariableName(
    block.getFieldValue("SERVER_HOSTNAME"),
  );
  const inputStatement = generator.statementToCode(block, "MAIN");
  return `async function on_file_event(${event}, ${fileName}, ${serverId}, ${serverHostname}) {
${inputStatement}}\n`;
};

javascriptGenerator.forBlock["on_disk_usage_update"] = function (
  block,
  generator,
) {
  const usagePercent = generator.getVariableName(
    block.getFieldValue("USAGE_PERCENT"),
  );
  const disk = generator.getVariableName(block.getFieldValue("DISK"));
  const serverId = generator.getVariableName(block.getFieldValue("SERVER_ID"));
  const serverHostname = generator.getVariableName(
    block.getFieldValue("SERVER_HOSTNAME"),
  );
  const totalDiskGb = generator.getVariableName(
    block.getFieldValue("TOTAL_DISK_GB"),
  );
  const freeDiskGb = generator.getVariableName(
    block.getFieldValue("FREE_DISK_GB"),
  );
  const usedDiskGb = generator.getVariableName(
    block.getFieldValue("USED_DISK_GB"),
  );
  const inputStatement = generator.statementToCode(block, "MAIN");
  return `async function on_disk_usage_update(${usagePercent}, ${disk}, ${totalDiskGb}, ${freeDiskGb}, ${usedDiskGb}, ${serverId}, ${serverHostname}) {
${inputStatement}}\n`;
};

javascriptGenerator.forBlock["on_memory_usage_update"] = function (
  block,
  generator,
) {
  const memoryUsagePercent = generator.getVariableName(
    block.getFieldValue("MEMORY_USAGE_PERCENT"),
  );
  const totalMemoryGb = generator.getVariableName(
    block.getFieldValue("TOTAL_MEMORY_GB"),
  );
  const freeMemoryGb = generator.getVariableName(
    block.getFieldValue("FREE_MEMORY_GB"),
  );
  const usedMemoryGb = generator.getVariableName(
    block.getFieldValue("USED_MEMORY_GB"),
  );
  const serverId = generator.getVariableName(block.getFieldValue("SERVER_ID"));
  const serverHostname = generator.getVariableName(
    block.getFieldValue("SERVER_HOSTNAME"),
  );
  const inputStatement = generator.statementToCode(block, "MAIN");
  return `async function on_memory_usage_update(${memoryUsagePercent}, ${totalMemoryGb}, ${freeMemoryGb}, ${usedMemoryGb}, ${serverId}, ${serverHostname}) {
${inputStatement}}\n`;
};

javascriptGenerator.forBlock["on_cpu_usage_update"] = function (
  block,
  generator,
) {
  const avgCpuUsagePercent = generator.getVariableName(
    block.getFieldValue("AVG_CPU_USAGE_PERCENT"),
  );
  const serverId = generator.getVariableName(block.getFieldValue("SERVER_ID"));
  const serverHostname = generator.getVariableName(
    block.getFieldValue("SERVER_HOSTNAME"),
  );
  const inputStatement = generator.statementToCode(block, "MAIN");
  return `async function on_cpu_usage_update(${avgCpuUsagePercent}, ${serverId}, ${serverHostname}) {
${inputStatement}}\n`;
};
