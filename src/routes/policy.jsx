// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { deleteReq, get } from "../request.js";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { Box, Button, Flex } from "@chakra-ui/react";

export const Route = createFileRoute("/policy")({
  component: Index,
});

export default function Index() {
  const [policies, setPolicies] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <Flex gap={6}>
          <Button colorScheme="teal" size="sm">
            Open Policy Designer
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => deletePolicy(row.id)}
          >
            Delete Policy
          </Button>
        </Flex>
      ),
      sortable: true,
      right: true,
      style: {
        maxWidth: "500px",
      },
    },
  ];
  const [resetPaginationToggle] = useState(false);

  const fetchPolicies = async () => {
    get(`/api/management/policies/`, {})
      .then((result) => {
        setPolicies(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deletePolicy = async (id) => {
    deleteReq(`/api/management/policies/${id}`, {})
      .then(() => {
        toast.success("Policy Deleted");
        window.dispatchEvent(new Event("reload_policies"));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchPolicies();
    window.addEventListener("reload_policies", fetchPolicies);
    return () => window.removeEventListener("reload_policies", fetchPolicies);
  }, []);

  return (
    <Box p={6}>
      <DataTable
        columns={columns}
        data={policies}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        persistTableHead
      />
    </Box>
  );
}
