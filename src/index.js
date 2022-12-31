import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor  from './Editor/Editor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DocumentList from './DocumentList/DocumentList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DocumentList />,
    errorElement: <div>404, not found sorry!!!</div>
  },
  {
    path: "viewer/:id",
    element: <Editor/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
