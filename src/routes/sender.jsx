// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect } from "react";
import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { get } from "../request.js";

export const Route = createFileRoute("/sender")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const [agentName, setAgentName] = React.useState("");
  const senderId = useParams({
    from: "/sender/$id",
    select: (params) => params.id,
  });

  function linkbutton(label, isActive) {
    return (
      <Button colorScheme={isActive ? "teal" : "gray"} rounded="full">
        {label}
      </Button>
    );
  }

  function fetchAgentName() {
    get(`/api/management/senders/${senderId}`, {})
      .then((data) => {
        if (data.type === "APP") {
          setAgentName(data.applicationName);
        } else {
          setAgentName(data.hostname);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchAgentName();
  }, [senderId]);

  return (
    <Box p={10} pt={0}>
      <Flex flexDirection="row" gap={3} mb={5}>
        <Text mr={3} fontSize="2xl" fontWeight="bold">
          {agentName}
        </Text>
        <Link
          to={`/sender/${senderId}/analytics`}
          children={({ isActive }) => linkbutton("Analytics", isActive)}
        />
        <Link
          to={`/sender/${senderId}/logs`}
          children={({ isActive }) => linkbutton("Collected Logs", isActive)}
        />
        <Link
          to={`/sender/${senderId}/crashlytics`}
          children={({ isActive }) => linkbutton("Crashlytics", isActive)}
        />
        <Link
          to={`/sender/${senderId}/issues`}
          children={({ isActive }) => linkbutton("Issue & Reports", isActive)}
        />
      </Flex>
      <Outlet />
    </Box>
  );
}
