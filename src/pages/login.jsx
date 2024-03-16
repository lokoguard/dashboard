import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Image,
    Center,
} from "@chakra-ui/react";
import Logo from "../assets/logo.png";
import {post} from "../request.js";
import toast from "react-hot-toast";

export default function LoginPage() {
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        post("/api/management/auth/login", {}, {email, password})
            .then((data) => {
                toast.success("Login successful")
                let token = data.token
                localStorage.setItem("token", token)
                window.dispatchEvent(new Event('login_state'))
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }


    return (
        <Center height="100vh" bg="gray.50">
            <Container maxW="lg" py="24" px="0">
                <Stack spacing="8">
                    <Center>
                        <Image src={Logo} w="20"/>
                    </Center>
                    <Box py="10" px="10" bg="white" boxShadow="md" borderRadius="xl" as="form"
                         onSubmit={formSubmitHandler}>
                        <Stack spacing="10">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email"/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password"/>
                                </FormControl>
                            </Stack>
                            <Button borderRadius="full" variant="solid" colorScheme="teal" type="submit">
                                Sign in
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Center>
    );
}
