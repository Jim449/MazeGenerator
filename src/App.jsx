import Index from "./pages/index.jsx"
import Maze from "./pages/maze.jsx"
import About from "./pages/about.jsx"
import NotFound from "./pages/not_found.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([{
  path: "/",
  element: <Index />,
  errorElement: <NotFound />
},
{
  path: "/about",
  element: <About />
},
{
  path: "/maze",
  element: <Maze />
}]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>
}
