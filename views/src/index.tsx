import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import App from "./App";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </React.StrictMode>
    );
}
