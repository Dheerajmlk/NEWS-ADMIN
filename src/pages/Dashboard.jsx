import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    tech: 0,
    sports: 0,
    business: 0,
  });

  const [recent, setRecent] = useState([]);

  const loadData = async () => {
    const res = await api.get("/news?limit=20");
    const data = res.data.data;

    setStats({
      total: res.data.total,
      tech: data.filter(n => n.category === "technology").length,
      sports: data.filter(n => n.category === "sports").length,
      business: data.filter(n => n.category === "business").length,
    });

    setRecent(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "20px" }}>
          
          {/* 🔥 STATS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px"
          }}>
            <Card title="Total" value={stats.total} />
            <Card title="Tech" value={stats.tech} />
            <Card title="Sports" value={stats.sports} />
            <Card title="Business" value={stats.business} />
          </div>

          {/* 🔥 NEWS CARDS */}
          <div style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px"
          }}>
            {recent.map((item) => (
              <div key={item._id} style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                overflow: "hidden"
              }}>
                <img src={item.image} width="100%" height="150" />

                <div style={{ padding: "10px" }}>
                  <h4>{item.title}</h4>
                  <small>{item.category}</small>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "#1e293b",
      color: "#fff",
      padding: "20px",
      borderRadius: "10px"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;