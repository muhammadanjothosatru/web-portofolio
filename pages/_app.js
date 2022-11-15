import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import NavbarTest from './components/navbar'

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider>
      <NavbarTest/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
