

import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"
import { Chat } from "./components/Chat"
import { Join } from "./components/Join"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Join />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
  ])
  return (

    <RouterProvider router={router} />
  )
}

export default App
