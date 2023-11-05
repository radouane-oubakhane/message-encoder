import { useContext } from "react";
import SelectedTabContext from "../contexts/SelectedTabContext";



const useSelectedTab = () => useContext(SelectedTabContext);


export default useSelectedTab;