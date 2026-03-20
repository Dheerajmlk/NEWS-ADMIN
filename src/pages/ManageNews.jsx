import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";
import NewsCard from "../components/NewsCard";

function ManageNews() {
  const [news, setNews] = useState([]);

  const load = async () => {
    const res = await api.get("/news?limit=50");
    setNews(res.data.data);
  };

  const deleteNews = async (id) => {
    await api.delete(`/news/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>
          {news.map((item) => (
            <NewsCard key={item._id} item={item} onDelete={deleteNews} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageNews;