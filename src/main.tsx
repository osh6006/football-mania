import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import Theme from "./styles/theme";
import "./styles/index.css";

import { store } from "./store";
import { Provider } from "react-redux";
import router from "./util/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
