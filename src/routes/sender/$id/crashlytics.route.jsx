import { createFileRoute, useParams } from "@tanstack/react-router";
import DataTable from "react-data-table-component";
// TODO: delete it
import { faker } from "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { get } from "../../../request.js";
import toast from "react-hot-toast";
import { getFormattedDateTime } from "../../../utils.jsx";

export const Route = createFileRoute("/sender/$id/crashlytics")({
  component: Index,
});

const createUser = () => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  bio: faker.lorem.sentence(),
  image: faker.image.avatar(),
});

export default function Index() {
  const senderId = useParams({
    from: "/sender/$id",
    select: (params) => params.id,
  });
  const [logs, setLogs] = useState([]);

  const columns = [
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: false,
    },
    {
      name: "Datetime",
      selector: (row) => getFormattedDateTime(row.timestamp * 1000),
      sortable: true,
    },
  ];
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = logs.filter(
    (item) =>
      item.message &&
      item.message.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const expandableRowsComponent = ({ data }) => {
    return (
      <Flex flexDirection="column">
        <Text mt={4} fontWeight="bold">
          Stack Trace
        </Text>
        <Box p={3} bg="gray.100" rounded="md">
          {data.stackTrace}
        </Box>
        <Text mt={4} fontWeight="bold">
          Other Info
        </Text>
        <Box p={3} bg="gray.100" rounded="md">
          {JSON.stringify(data.otherInfo)}
        </Box>
      </Flex>
    );
  };

  const fetchLogs = async () => {
    get(`/api/management/senders/${senderId}/crashlogs`, {})
      .then((result) => {
        setLogs(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        expandableRows
        expandableRowsComponent={expandableRowsComponent}
        persistTableHead
      />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Flex flexDirection="row">
    <Input
      type="text"
      value={filterText}
      onChange={onFilter}
      placeholder="Filter"
    />
  </Flex>
);
