import { createFileRoute, useParams } from "@tanstack/react-router";
import DataTable from "react-data-table-component";
// TODO: delete it
import { useEffect, useMemo, useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { get } from "../../../request.js";
import toast from "react-hot-toast";
import { getFormattedDateTime } from "../../../utils.jsx";

export const Route = createFileRoute("/sender/$id/issues")({
  component: Index,
});

export default function Index() {
  const senderId = useParams({
    from: "/sender/$id",
    select: (params) => params.id,
  });
  const [issues, setIssues] = useState([]);

  const columns = [
    {
      name: "Issue Report",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
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
  const filteredItems = issues.filter(
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

  const fetchIssues = async () => {
    get(`/api/management/senders/${senderId}/issues`, {})
      .then((result) => {
        setIssues(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchIssues();
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
