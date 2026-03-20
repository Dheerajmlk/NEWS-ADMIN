function NewsCard({ item, onDelete }) {
  return (
    <div style={{
      background: "#1e293b",
      padding: "15px",
      borderRadius: "10px",
      color: "#fff"
    }}>
      {item.image && (
        <img src={item.image} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
      )}

      <h4>{item.title}</h4>
      <p>{item.description}</p>

      <small>{item.category}</small>

      <br /><br />

      <button onClick={() => onDelete(item._id)}>
        Delete
      </button>
    </div>
  );
}

export default NewsCard;