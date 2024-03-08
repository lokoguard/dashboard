import {createFileRoute} from "@tanstack/react-router";
import DataTable from "react-data-table-component";
// TODO: delete it
import {faker} from '@faker-js/faker';
import {useMemo, useState} from "react";
import {Box, Flex, Input} from "@chakra-ui/react";

export const Route = createFileRoute("/sender/$id/issues")({
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