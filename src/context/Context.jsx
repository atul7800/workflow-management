import { createContext, useState } from "react";

export const Context = createContext();

export const ProvideContext = ({children}) => {
    const [workFlowList, setWorkFlowList] = useState([])

    return (
        <Context.Provider value={{workFlowList, setWorkFlowList}}>
            {children}
        </Context.Provider>
    )
}