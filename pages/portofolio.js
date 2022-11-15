import {
  Container,
  Heading,
  InputGroup,
  SimpleGrid,
  Box,
  Center,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card'
import { Input, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Projects } from "./data/data";
export default function Portofolio() {
  const colorSecondary = {
    light: "white.700",
    dark: "white.400",
  };
  return (
    <>
      <Container maxW="container.md" py={5} justifyContent="center">
        <Heading mb={5}>My Projects</Heading>
        <InputGroup>
          <Input placeholder="Search" size="md" />
          <InputRightElement children={<FaSearch color="gray" />} />
        </InputGroup>
        <Center>
          <SimpleGrid py={5} columns={4} spacing={5}>
            {Projects.map((Projects) => (
              <Box><Card bg='whiteAlpha.500' w='150px' h='150px'>
                <CardHeader>{Projects.name}</CardHeader>
                <CardBody>{Projects.description}</CardBody>
                <CardFooter> {Projects.github_url}</CardFooter>
                </Card></Box>
            ))}
          </SimpleGrid>
        </Center>
      </Container>
    </>
  );
}
