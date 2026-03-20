import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

function FetchNews() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);

    const fetchData = async (category) => {
        try {
            setLoading(true);

            const res = await api.post(`/news/fetch?category=${category}`);

            const newLog = {
                category,
                message: res.data.message,
                inserted: res.data.inserted,
                time: new Date().toLocaleTimeString()
            };

            setLogs((prev) => [newLog, ...prev]);

        } catch (err) {
            console.log("FULL ERROR:", err);
            console.log("ERROR RESPONSE:", err.response?.data);
            alert("Error fetching news");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Header />

                <div style={{ padding: "20px" }}>
                    <h2>Fetch News</h2>

                    {/* 🔥 BUTTONS */}
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

                    {/* 🔥 LOGS SECTION */}
                    <div>
                        <h3>Fetch Logs</h3>

                        {logs.length === 0 && <p>No fetch activity yet</p>}

                        {logs.map((log, index) => (
                            <div key={index} style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px"
                            }}>
                                <strong>{log.category.toUpperCase()}</strong> <br />
                                {log.message} <br />
                                Inserted: {log.inserted} <br />
                                Time: {log.time}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FetchNews;