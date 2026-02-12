import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Submit from "./Submit";
import Show from "./Show";


const router = createBrowserRouter([
  {
    path: "/user",
    element: <Submit />,
  },
  {
    path: "/admin",
    element: <Show />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
