import React from "react";


interface SelectedTabContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const SelectedTabContext = React.createContext<SelectedTabContextType>(
  {} as SelectedTabContextType
);

export default SelectedTabContext;