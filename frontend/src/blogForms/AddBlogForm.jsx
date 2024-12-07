import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useUploadFile from '../utils/useUploadFile';
import { useNavigate } from 'react-router-dom';

const AddBlogForm = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const {uploadFile, uploadProgress , fileUrl} = useUploadFile()

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) {
      toast.error('Please wait until all files are uploaded.');
      return;
    }

    const blogData = {
      title,
      author,
      body,
      thumbnail: fileUrl,
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) {
        toast.error('Failed to create blog');
        throw new Error('Failed to create blog');
      } else {
        navigate('/');
        toast.success('Blog created successfully!');
        // Reset form inputs and thumbnail state (e.g., clear uploaded files)
      }

      // Handle the response data (e.g., show a success message or reset form)
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">Add a New Blog</h2>
      <div className="mb-4">
        <label className="block text-gray-600">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Thumbnail</label>
        {uploadProgress > 0 && <p>Uploading Thumbnail: {uploadProgress}%</p>}
        <input
          type="file"
          onChange={(e) => uploadFile(e.target.files[0])}
          accept="image/*"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded ${
          uploadProgress < 100
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-800 text-white'
        }`}
        disabled={uploadProgress < 100}
      >
        Add Blog
      </button>
    </form>
  );
};

export default AddBlogForm;
