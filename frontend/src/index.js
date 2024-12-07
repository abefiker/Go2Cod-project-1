import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddBlogForm from './blogForms/AddBlogForm';
import UpdateBlogForm from './blogForms/UpdateBlogForm';
import BlogPostScreen from './screens/BlogPostScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<BlogPostScreen />} />
      <Route path="/blogDetail/:id" element={<BlogDetailScreen />} />
      <Route path="/addBlog" element={<AddBlogForm />} />
      <Route path="/updateBlog/:id" element={<UpdateBlogForm />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
