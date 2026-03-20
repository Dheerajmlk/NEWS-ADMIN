import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "240px",
      background: "#0f172a",
      color: "#fff",
      height: "100vh",
      padding: "20px"
    }}>
      <h2>Admin Panel</h2>

      <p onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        📊 Dashboard
      </p>

      <p onClick={() => navigate("/news")} style={{ cursor: "pointer" }}>
        📰 Manage News
      </p>

      <p onClick={() => navigate("/fetch")} style={{ cursor: "pointer" }}>
        ⚡ Fetch News
      </p>

      <hr />

      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;