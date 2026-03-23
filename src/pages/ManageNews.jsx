import { useState } from "react";
import api from "../services/api";

const ManageNews = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
    category: "general"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/news/create", form);
      alert("News added successfully");
    } catch (err) {
      console.log(err);
      alert("Error adding news");
    }
  };

  return (
    <div>
      <h2>Add News</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="url" placeholder="News Link" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />

      <button onClick={handleSubmit}>Add News</button>
    </div>
  );
};

export default ManageNews;