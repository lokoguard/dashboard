// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { deleteReq, get } from "../request.js";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { Box, Button } from "@chakra-ui/react";

export const Route = createFileRoute("/users")({
  component: Index,
});

export default function Index() {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <Button colorScheme="red" size="sm" onClick={() => deleteUser(row.id)}>
          Delete User
        </Button>
      ),
      sortable: false,
    },
  ];
  const [resetPaginationToggle] = useState(false);

  const fetchUsers = async () => {
    get(`/api/management/users/`, {})
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deleteUser = async (id) => {
    deleteReq(`/api/management/users/${id}`, {})
      .then(() => {
        toast.success("User Deleted");
        window.dispatchEvent(new Event("reload_users"));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
    window.addEventListener("reload_users", fetchUsers);
    return () => window.removeEventListener("reload_users", fetchUsers);
  }, []);

  return (
    <Box p={6}>
      <DataTable
        columns={columns}
        data={users}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        persistTableHead
      />
    </Box>
  );
}
