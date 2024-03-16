import {createFileRoute, useParams} from "@tanstack/react-router";
import DataTable from "react-data-table-component";
// TODO: delete it
import {faker} from '@faker-js/faker';
import {useEffect, useMemo, useState} from "react";
import {Box, Flex, Input} from "@chakra-ui/react";
import {get} from "../../../request.js";
import toast from "react-hot-toast";

export const Route = createFileRoute("/sender/$id/logs")({
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

const createUsers = (numUsers = 5) => new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);

export default function Index() {
    const senderId = useParams({
        from: '/sender/$id', select: (params) => params.id,
    })
    const [logs, setLogs] = useState([])

    const columns = [{
        name: 'Name', selector: row => row.name, sortable: true,
    }, {
        name: 'Email', selector: row => row.email, sortable: true,
    }, {
        name: 'Address', selector: row => row.address, sortable: true,
    },];
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),);

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                                 filterText={filterText}/>);
    }, [filterText, resetPaginationToggle]);


    const expandableRowsComponent = ({data}) => {
        console.log(data);
        return <Box>Extra info</Box>;
    }

    const fetchLogs = async () => {
        get(`/api/management/senders/${senderId}/logs`, {}).then((result) => {
            setLogs(result);
            console.log(result);
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    return <div>

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

    </div>;
}

// eslint-disable-next-line react/prop-types
const FilterComponent = ({filterText, onFilter, onClear}) => (<Flex flexDirection="row">
    <Input type='text' value={filterText} onChange={onFilter} placeholder="Filter"/>
</Flex>);