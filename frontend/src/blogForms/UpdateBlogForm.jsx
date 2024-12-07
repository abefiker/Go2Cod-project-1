import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useUploadFile from '../utils/useUploadFile';
const UpdateBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const { uploadFile, uploadProgress, fileUrl } = useUploadFile();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        console.log(data);
        setTitle(data.title);
        setAuthor(data.author);
        setBody(data.body);
      } catch (err) {
        toast.error('Failed to load blog details.');
      }
    };

    fetchBlog();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      author,
      body,
      thumbnail: fileUrl,
    };

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      // Check for non-2xx responses
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || 'Failed to update the blog');
      }

      const updatedBlog = await res.json();
      toast.success('Blog updated successfully!');
      console.log(updatedBlog); // Optional: Log the updated blog for debugging
      navigate('/'); // Redirect only after success
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">Update Blog</h2>
      <div className="mb-4">
        <label className="block text-gray-600">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Thumbnail</label>
        {uploadProgress !== 0 && (
          <p>Uploading Thumbnail: {uploadProgress}%</p>
        )}
        <input
          type="file"
          onChange={(e) => uploadFile(e.target.files[0])}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
      >
        Update Blog
      </button>
    </form>
  );
};

export default UpdateBlogForm;
