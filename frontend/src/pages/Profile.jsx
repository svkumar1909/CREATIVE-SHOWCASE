import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [myArt, setMyArt] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Fetch logged-in user's artworks
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/artworks/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyArt(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/artworks/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add new artwork to state without reloading
      setMyArt((prev) => [...prev, res.data]);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {username}</h1>

      <div className="upload-section">
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit">Upload Artwork</button>
        </form>
      </div>

      <div className="grid">
        {myArt.map((art) => (
          <img
            key={art._id}
            src={`http://localhost:5000${art.imageUrl}`}
            alt="artwork"
          />
        ))}
      </div>

      {myArt.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          You haven't uploaded any artwork yet. Start sharing your creativity!
        </p>
      )}
    </div>
  );
};

export default Profile;
