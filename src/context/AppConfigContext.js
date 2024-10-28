import { createContext } from "react";

export const AppConfigContext = createContext({});

export const AppConfigProvider = ({ children }) => {
    const config = {
        backendUrl: "http://localhost:8080",
    };

    return (
        <AppConfigContext.Provider value={config}>
            {children}
        </AppConfigContext.Provider>
    );
};
