import { createFileRoute, useParams } from "@tanstack/react-router";
import DataTable from "react-data-table-component";
import { useEffect, useMemo, useState } from "react";
import { Box, Flex, Input } from "@chakra-ui/react";
import { get } from "../../../request.js";
import toast from "react-hot-toast";
import { getFormattedDateTime } from "../../../utils.jsx";

export const Route = createFileRoute("/sender/$id/logs")({
  component: Index,
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
      right: true,
      style: {
        maxWidth: "200px",
      },
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
      <Box p={3} mt={4} bg="gray.100" rounded="md">
        {data.message}
      </Box>
    );
  };

  const fetchLogs = async () => {
    get(`/api/management/senders/${senderId}/logs`, {})
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
        paginationPerPage={10}
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
