import Head from "next/head";
import '../styles/globals.css';
import '../styles/icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterScrollProvider } from '@moxy/next-router-scroll';
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";
import { AlertContext, AlertProvider } from "../contexts/AlertContext";
import { Alert } from "../components/Alert";
import { UserProvider } from "../contexts/UserContext";
import ImgDefault from "../assets/images/image_og.png";

function MyApp({ Component, pageProps }) {
  const [url, setUrl] = useState('');
  const router = useRouter();
  const [visibleHeader, setVisibleHeader] = useState(true);
  const verify = () => {
    router.asPath === "/login" ||
      router.asPath === "/new-user" ||
      router.asPath === "/imoveis" ||
      router.asPath === "/admin" ||
      router.asPath === "/admin/imoveis" ||
      router.asPath === "/admin/opcoes"
      ? setVisibleHeader(false) : setVisibleHeader(true);
  }
  useEffect(() => {
    verify();
    setUrl(location.href);
  }, [router]);

  return (
    <RouterScrollProvider>
      <AuthProvider>
        <AlertProvider>
          <UserProvider>
            <div>
              <Head>
                <title>EmLar - Imobiliária em Catalão, Campo Alegre, Ouvidor, Três Ranchos, Ipameri, Caldas Novas e Região.</title>
                <meta name="description" content="Se você está procurando uma lar para você e sua fámilia, o EmLar pode te ajudar. Encontre casas, apartamentos, kitnets e muito mais de forma fácil e rápido e já agente sua visita." />
                <meta property="og:image" content={`https://emlar.com.br/${ImgDefault.src}`} />
                <meta name="author" content="Ezequiel Pires e Silva" />
                <meta name="title" content={"EmLar - Imobiliária em Catalão, Campo Alegre, Ouvidor, Três Ranchos, Ipameri, Caldas Novas e Região."} />
                <meta property="og:title" content={"EmLar - Imobiliária em Catalão, Campo Alegre, Ouvidor, Três Ranchos, Caldas Novas e Região."} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Se você está procurando uma lar para você e sua fámilia, o EmLar pode te ajudar. Encontre casas, apartamentos, kitnets e muito mais de forma fácil e rápido e já agente sua visita." />
                <meta property="og:url" content={url} />
              </Head>
              {visibleHeader && <Header />}
              <Component {...pageProps} />
              <Alert />
            </div>
          </UserProvider>
        </AlertProvider>
      </AuthProvider>
    </RouterScrollProvider>
  )
}

export default MyApp
