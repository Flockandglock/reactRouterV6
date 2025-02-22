import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import Contact, {loader as contactLoader,} from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact, {action as editAction,} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  {
    path: "contacts/:contactId/edit",
    element: <EditContact />,
    loader: contactLoader,
    action: editAction,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
