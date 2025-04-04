import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const Context = createContext();

export const ProvideContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workFlowList, setWorkFlowList] = useState([]);
  const [fileName, setFileName] = useState();
  const [workFlowNames, setWorkFlowNames] = useState([]);

  // Sync user on login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Load user data from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkFlowList(data.workFlowList || []);
          setFileName(data.fileName || "");
          setWorkFlowNames(data.workFlowNames || []);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto save to Firestore on data change
  const saveToFirestore = (newData) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, newData, { merge: true });
    }
  };

  // Wrapped setters to sync with Firestore
  const updateWorkFlowList = (list) => {
    setWorkFlowList(list);
    saveToFirestore({ workFlowList: list });
  };

  const updateFileName = (name) => {
    setFileName(name);
    saveToFirestore({ fileName: name });
  };

  const updateWorkFlowNames = (names) => {
    setWorkFlowNames(names);
    saveToFirestore({ workFlowNames: names });
  };

  return (
    <Context.Provider
      value={{
        setUser,
        workFlowList,
        setWorkFlowList,
        updateWorkFlowList,
        fileName,
        setFileName,
        updateFileName,
        workFlowNames,
        setWorkFlowNames,
        updateWorkFlowNames,
      }}
    >
      {children}
    </Context.Provider>
  );
};
