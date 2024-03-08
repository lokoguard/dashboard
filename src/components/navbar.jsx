import {Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, useDisclosure,} from "@chakra-ui/react";
import {ArrowForwardIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuildingShield, faGear, faUser,} from "@fortawesome/free-solid-svg-icons";

import Logo from "../assets/logo.png";
import NotificationChannelModal from "./NotificationChannelModal.jsx";
import RegisterSenderModal from "./RegisterSenderModal.jsx";
import {Link} from "@tanstack/react-router";

export default function Navbar() {
    const {
        isOpen:isOpenNotificationChannelConfigModal,
        onOpen:onOpenNotificationChannelConfigModal,
        onClose:onCloseNotificationChannelConfigModal,
    } = useDisclosure()

    const {
        isOpen:isOpenRegisterSenderModal,
        onOpen:onOpenRegisterSenderModal,
        onClose:onCloseRegisterSenderModal,
    } = useDisclosure()

    return (<>
            {/* Modal */}
            <NotificationChannelModal
            isOpen={isOpenNotificationChannelConfigModal}
            onOpen={onOpenNotificationChannelConfigModal}
            onClose={onCloseNotificationChannelConfigModal}
            />
            <RegisterSenderModal
            isOpen={isOpenRegisterSenderModal}
            onOpen={onOpenRegisterSenderModal}
            onClose={onCloseRegisterSenderModal}
            />
            {/* Navbar */}
            <Flex
                width="100vw"
                px="4"
                py="4"
                mb="20px"
                justify="space-between"
                borderBottom="1px"
                borderColor="gray.200"
            >
                <Link to="/" ><Image src={Logo} h="10" w="10" mr="5"/></Link>
                <Flex gap="8px">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            <FontAwesomeIcon icon={faUser}/>
                            &nbsp;&nbsp;Sender
                        </MenuButton>
                        <MenuList>
                            <Link to="/">
                                <MenuItem>All Senders</MenuItem>
                            </Link>
                            <MenuItem onClick={onOpenRegisterSenderModal}>Register New</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            <FontAwesomeIcon icon={faBuildingShield}/>
                            &nbsp;&nbsp;Policy Management
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Policy List</MenuItem>
                            <MenuItem>Create new policy</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            <FontAwesomeIcon icon={faGear}/>
                            &nbsp;&nbsp;System Configuration
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpenNotificationChannelConfigModal}>Notification Channel</MenuItem>
                            <MenuItem>User Management</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Button>
                    Logout&nbsp;&nbsp;
                    <ArrowForwardIcon/>
                </Button>
            </Flex>
        </>);
}
