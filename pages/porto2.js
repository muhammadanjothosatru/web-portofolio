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
  useColorModeValue,
} from "@chakra-ui/react";
import { Input, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import githubGif from "/public/github.gif";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Paginations from "../components/Pagination";
import { paginate } from "./../utils/paginate";

const Porto2 = () => {
  const [posts, setPosts] = useState([]);
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
        "https://api.github.com/users/muhammadanjothosatru/repos"
      );
      setPosts(res);
    };
    getPosts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevChange = (page) => {
    if (currentPage === 1) {
        setCurrentPage(page);
      } else {
        setCurrentPage(page - 1);
      }
    
  };

  const handleNextChange = (page) => {
    if (currentPage === 3) {
        setCurrentPage(page);
      } else {
        setCurrentPage(page + 1);
      }
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);
  console.log(paginatePosts)

  return (
    <>
      <Head>
        <title>Portofolio - Muhammad Anjotho Satru</title>
      </Head>
      <Container maxW="container.md" py={5} justifyContent="center">
        <Heading mb={5}>My Projects</Heading>
        <InputGroup>
          <Input
            placeholder="Search"
            size="md"
            // onChange={({ target }) => setSearch(target.value)}
          />
          <InputRightElement children={<FaSearch color="gray" />} />
        </InputGroup>
      </Container>
      <Center py={3}>
        <SimpleGrid px={150} columns={3} spacing={8}>
          {paginatePosts.map((repos) => (
            <Box
              maxW={"400px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.900")}
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
                  {repos.language}
                </Text>
                <Heading
                  color={useColorModeValue("gray.700", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {repos.name}
                </Heading>
                <a href={repos.clone_url}>
                  <Text color={"gray.500"}>{repos.clone_url}</Text>
                </a>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Avatar
                  src={"https://avatars.githubusercontent.com/u/83998371?v=4"}
                  alt={"Author"}
                />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>muhammadanjothosatru</Text>
                  <Text color={"gray.500"}>{repos.pushed_at}</Text>
                </Stack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
      <Center py={5}>
        <Paginations
          items={posts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          prevPages={handlePrevChange}
          nextPages={handleNextChange}
          onPageChange={handlePageChange}
        />
      </Center>
    </>
  );
};

export default Porto2;
