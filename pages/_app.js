import Layout from "../components/layout";
import { UserContext } from "../lib/UserContext";
import { ThemeProvider } from "@magiclabs/ui";
import "@magiclabs/ui/dist/cjs/index.css";
import { useState, useEffect } from "react";
import Router from "next/router";
import { checkIsLoggedInMagic } from "../lib/magic";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // If JWT is valid, set the UserContext with returned value from /api/user
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setUser({ loading: true });
    const isLoggedIn = async () => {
      await checkIsLoggedInMagic(
        () => setUser({ email: "wnctestuser@yopmail.com", issuer: "..." }),
        () => Router.push("/login") && setUser({ user: null })
      );
    };
    isLoggedIn();
  }, []);

  return (
    <ThemeProvider root>
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
