import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import { Error500, PageLoading } from "./pages";
import theme from "./theme";
import MainProvider from "./provider/MainProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error500 />}>
      <Suspense fallback={<PageLoading />}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <MainProvider>
              <Router>
                <App />
              </Router>
            </MainProvider>
          </Provider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
