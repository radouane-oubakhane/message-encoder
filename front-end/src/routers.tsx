import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import RSAMessageInputForm from "./pages/RSAMessageInputPage";
import RegisterPage from "./pages/RegisterPage";
import ResultPage from "./pages/ResultPage";
import VigenereMessageInputForm from "./pages/VigenereMessageInputPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/history",
            element: <HistoryPage />,
          },
          {
            path: "/vigenere",
            element: <VigenereMessageInputForm />,
          },
          {
            path: "/rsa",
            element: <RSAMessageInputForm />,
          },
          {
            path: "/result",
            element: <ResultPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
