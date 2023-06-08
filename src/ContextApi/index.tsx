import { createContext, useContext } from "react";

// ******************* create context and its type ***************
export interface ContexApiType {
    theme: "dark" | "light",
};

const Context = createContext<ContexApiType>({} as ContexApiType);
// ***************************************************************

interface ContextApiProviderType {
    children: React.ReactNode,
    value?: Partial<ContexApiType>,
}

const ContextApi = ({ children, value }: ContextApiProviderType) => {
    const defaltValue: ContexApiType = {
        theme: "dark",
    };
    console.log("values, default value:", defaltValue, value);
    return (<Context.Provider value={{ ...defaltValue, ...value }}>
        {children}
    </Context.Provider>
    )
}

export function useApiContext() {
    const context = useContext(Context);
    return context;
}

export default ContextApi;