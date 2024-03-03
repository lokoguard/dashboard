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
import Logo from "../assets/logo.jpg";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Auth,
});

export default function Auth() {
  return (
    <Center height="100vh" bg="gray.50">
      <Container maxW="lg" py="24" px="0">
        <Stack spacing="8">
          <Center>
            <Image src={Logo} w="20" />
          </Center>
          <Box py="10" px="10" bg="white" boxShadow="md" borderRadius="xl">
            <Stack spacing="10">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </Stack>
              <Button borderRadius="full" variant="solid" colorScheme="teal">
                Sign in
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}
