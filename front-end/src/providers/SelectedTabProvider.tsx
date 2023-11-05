import { ReactNode, useState } from "react";
import SelectedTabContext from "../contexts/SelectedTabContext";


interface Props {
  children: ReactNode;
}

const SelectedTabProvider = ({ children }: Props) => {
    const [selectedTab, setSelectedTab] = useState("form");
  
  return (
    <SelectedTabContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </SelectedTabContext.Provider>
  );
};

export default SelectedTabProvider;