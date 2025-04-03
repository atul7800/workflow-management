import { createContext, useState } from "react";

export const Context = createContext();

export const ProvideContext = ({ children }) => {
  const [workFlowList, setWorkFlowList] = useState([]);
  const [fileName, setFileName] = useState();
  const [workFlowNames, setWorkFlowNames] = useState([]);

  return (
    <Context.Provider
      value={{
        workFlowList,
        setWorkFlowList,
        fileName,
        setFileName,
        workFlowNames,
        setWorkFlowNames,
      }}
    >
      {children}
    </Context.Provider>
  );
};
