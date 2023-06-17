import { createBrowserRouter } from "react-router-dom";

import RootPage from "./routes/RootPage.tsx";
import LoginPage from "./routes/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
      path: "/",
      element: <RootPage />,
    },
  ]);

export default router;