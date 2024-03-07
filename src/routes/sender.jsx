// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import {createFileRoute, Link, Outlet, useParams} from '@tanstack/react-router'
import {Box, Button, Flex, Text} from "@chakra-ui/react";

export const Route = createFileRoute('/sender')({
    component: LayoutComponent,
})

function LayoutComponent() {
    const senderId = useParams({
        from: '/sender/$id', select: (params) => params.id,
    })

    function linkbutton(label, isActive) {
        console.log("hemlo")
        return <Button colorScheme={isActive ? "teal" : "gray"} rounded="full">{label}</Button>
    }

    return (<Box p={10} pt={0}>
        <Flex flexDirection="row" gap={3} mb={5}>
            <Text mr={6} fontSize="2xl" fontWeight="bold">{senderId}</Text>
            <Link to={`/sender/${senderId}/analytics`} children={({isActive}) => linkbutton("Analytics", isActive)} />
            <Link to={`/sender/${senderId}/logs`} children={({isActive}) => linkbutton("Collected Logs", isActive)} />
            <Link to={`/sender/${senderId}/crashlytics`} children={({isActive}) => linkbutton("Crashlytics", isActive)}/>
            <Link to={`/sender/${senderId}/issues`} children={({isActive}) => linkbutton("Issue Reporting", isActive)} />
        </Flex>
        <Outlet/>
    </Box>)
}

