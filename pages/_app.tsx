import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../mui.config";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer";
import Router, { useRouter } from "next/router";
import classNames from "classnames";
import GlobalStateProvide, {
  GlobalContext,
} from "../components/common/api/globalState";
import { useContext, FC } from "react";
import { NextComponentType, NextPageContext } from "next";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Prayer Chain</title>
      </Head>
      <GlobalStateProvide>
        <BaseLayout component={Component} pageProps={pageProps} />
      </GlobalStateProvide>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

interface BaseLayoutProps {
  component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const BaseLayout: FC<BaseLayoutProps> = ({
  component: Component,
  pageProps,
}) => {
  const [globalState, dispatch] = useContext(GlobalContext);

  const { pathname } = useRouter();

  Router.events.on("routeChangeComplete", () => {
    document.getElementById("main")!.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  const hideFooterLocations = ["/prayer-request", "/profile"];

  return (
    <div className="overflow-hidden h-screen w-screen">
      <div
        id="main"
        className={classNames(
          "overflow-y-auto overflow-x-hidden fixed top-0 bottom-20 left-0 right-0",
          {
            "!bottom-0": hideFooterLocations.includes(pathname),
          }
        )}
      >
        <Component {...pageProps} />
      </div>
      {pathname !== "/prayer-request" && !globalState?.hideFooter && (
        <div className="fixed top-auto bottom-0 left-0 right-0 bg-white">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
