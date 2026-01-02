import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPublic = () => {
  const { username } = useParams();
  const [userArt, setUserArt] = useState([]);

  useEffect(() => {
    // We fetch by username here
    axios.get(`http://localhost:5000/api/artworks/user-by-name/${username}`)
      .then(res => setUserArt(res.data))
      .catch(err => console.log(err));
  }, [username]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{username}'s Gallery</h1>
      <div className="masonry-layout">
        {userArt.map(art => (
          <div key={art._id} className="masonry-item">
            <img src={`http://localhost:5000${art.imageUrl}`} alt="work" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPublic;