import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

function FetchNews() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [news, setNews] = useState([]);

  // ✅ LOAD EXISTING NEWS
  const loadNews = async () => {
    const res = await api.get("/news?limit=20");
    setNews(res.data.data);
  };

  useEffect(() => {
    loadNews();
  }, []);

  // ✅ FETCH FROM API
  const fetchData = async (category) => {
    try {
      setLoading(true);

      const res = await api.post(`/fetch?category=${category}`);

      const newLog = {
        category,
        message: res.data.message,
        inserted: res.data.inserted,
        time: new Date().toLocaleTimeString()
      };

      setLogs((prev) => [newLog, ...prev]);

      // 🔥 reload news after fetch
      loadNews();

    } catch (err) {
      console.log(err);
      alert("Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE NEWS
  const handleDelete = async (id) => {
    try {
      await api.delete(`/news/${id}`);
      setNews((prev) => prev.filter(n => n._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "20px" }}>
          <h2>Fetch News</h2>

          {/* 🔥 FETCH BUTTONS */}
          <div style={{ marginBottom: "20px" }}>
            {["general", "technology", "sports", "business"].map((cat) => (
              <button
                key={cat}
                onClick={() => fetchData(cat)}
                disabled={loading}
                style={{ marginRight: "10px" }}
              >
                {loading ? "Fetching..." : `Fetch ${cat}`}
              </button>
            ))}
          </div>

          {/* 🔥 LOGS */}
          <div>
            <h3>Fetch Logs</h3>
            {logs.map((log, i) => (
              <div key={i}>
                {log.category} → {log.inserted}
              </div>
            ))}
          </div>

          {/* 🔥 NEWS LIST */}
          <div style={{ marginTop: "30px" }}>
            <h3>News List</h3>

            {news.map((item) => (
              <div key={item._id} style={{
                display: "flex",
                gap: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px"
              }}>
                <img src={item.image} width="100" />

                <div style={{ flex: 1 }}>
                  <h4>{item.title}</h4>
                  <small>{item.category}</small>
                </div>

                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default FetchNews;