import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SelectedTabProvider from "../providers/SelectedTabProvider";
import EncryptMessageProvider from "../providers/EncryptMessageProvider";
import AuthProvider from "../providers/AuthProvider";

const Layout = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <SelectedTabProvider>
          <EncryptMessageProvider>
            <Outlet />
          </EncryptMessageProvider>
        </SelectedTabProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;
