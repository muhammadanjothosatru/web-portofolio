import {
  Container,
  Heading,
  InputGroup,
  SimpleGrid,
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorMode,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Input, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import githubGif from "/public/github.gif";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";

const Porto2 = () => {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [paginate, setpaginate] = useState(6);

  useEffect(() => {
    const request_headers = new Headers();
    request_headers.append("Content-Type", "application/json");

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch(
      "https://api.github.com/users/muhammadanjothosatru/repos",
      request_options
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(items);

  function search(data) {
    return items.filter((item) =>
      item.name.toString().toLowerCase().includes(query)
    );
  }

  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 3);
  };

  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: "white",
    dark: "gray.900",
  };

  const { colorMode2 } = useColorMode();
  const colorSecondary2 = {
    light: "gray.700",
    dark: "white",
  };

  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return (
      <>
        <Container maxW="container.md" py={5} justifyContent="center">
            <Center height={"100vh"}>
              <Spinner size="xl" />
            </Center>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Portofolio - Muhammad Anjotho Satru</title>
        </Head>
        <Container maxW="container.md" py={5} justifyContent="center">
          <Heading mb={5}>My Projects</Heading>
          <InputGroup>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search"
              size="md"
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputRightElement>
              <FaSearch color="gray" />
            </InputRightElement>
          </InputGroup>
        </Container>
        <Center py={3}>
          <SimpleGrid px={150} columns={3} spacing={8}>
            {search(data)
              .slice(0, paginate)
              .map((item) => (
                <Box
                  maxW={"400px"}
                  key={item.id}
                  w={"full"}
                  bg={colorSecondary[colorMode]}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  p={6}
                  overflow={"hidden"}
                >
                  <Box
                    h={"150px"}
                    bg={"gray.100"}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={"relative"}
                  >
                    <Image src={githubGif} alt="" layout={"fill"} />
                  </Box>
                  <Stack>
                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"sm"}
                      letterSpacing={1.1}
                    >
                      {item.language}
                    </Text>
                    <Heading
                      color={colorSecondary2[colorMode2]}
                      fontSize="2xl"
                      fontFamily="body"
                    >
                      {item.name}
                    </Heading>
                    <a href={item.clone_url}>
                      <Text color="gray.500">{item.clone_url}</Text>
                    </a>
                  </Stack>
                  <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar
                      src={
                        "https://avatars.githubusercontent.com/u/83998371?v=4"
                      }
                      alt={"Author"}
                    />
                    <Stack direction="column" spacing={0} fontSize="sm">
                      <Text fontWeight={600}>muhammadanjothosatru</Text>
                      <Text color="gray.500">{item.pushed_at}</Text>
                    </Stack>
                  </Stack>
                </Box>
              ))}
          </SimpleGrid>
        </Center>
        <Center py={5}>
          <Button
            size="md"
            height="48px"
            width="200px"
            borderColor="gray.900"
            rounded="full"
            onClick={load_more}
          >
            Load More
          </Button>
        </Center>
      </>
    );
  }
};

export default Porto2;
