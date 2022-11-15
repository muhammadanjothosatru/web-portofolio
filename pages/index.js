import {
  Container,
  useColorMode,
  Heading,
  Text,
  Button,
  HStack,
  Box,
  Link,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import saveAs from "file-saver";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import myGif from "/public/coder.gif";

export default function Home() {
  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: "gray.700",
    dark: "gray.400",
  };
  const saveFile = () => {
    saveAs(
      "https://drive.google.com/file/d/1TihnMT0tmJcVRd20Klfn-o8Khfb3Sagv/view?usp=share_link"
    );
  };
  return (
    <>
      <Head>
        <title>Home - Muhammad Anjotho Satru</title>
      </Head>

      <Container maxW="container.md" py={5} justifyContent="center">
        <Center m={10}>
          <div style={{ borderRadius: "5px", overflow: "hidden" }}>
            <Image width={300} height={300} src={myGif} />
          </div>
        </Center>
        <Container px={5} maxW="container.md">
          <Heading mb={2}>Hi, I'm Muhammad Anjotho Satru</Heading>
          <Text mb={5} color={colorSecondary[colorMode]}>
            Graduate from Computer Engineering at Institut Teknologi Sepuluh
            Nopember. I have passion in technology. Especially in Web
            Development, Cloud Computing, and Network
          </Text>

          <HStack spacing="24px" mt={5}>
            <Box>
              <Button onClick={saveFile}>View Resume</Button>
            </Box>
            <Box>
              <Link href="https://github.com/muhammadanjothosatru">
                <FaGithub size={28} />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.instagram.com/muhammad_anjotho/">
                <FaInstagram size={28} />
              </Link>
            </Box>
            <Box>
              <Link href="https://www.facebook.com/profile.php?id=100008383939181">
                <FaFacebook size={28} />
              </Link>
            </Box>
          </HStack>
        </Container>
      </Container>
    </>
  );
}
