import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/artworks/all')
      .then(res => setArtworks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Community Showcase</h2>
      
      {/* Masonry Layout Wrapper */}
      <div className="masonry-layout">
        {artworks.map(art => (
          <div key={art._id} className="masonry-item">
            <img 
              src={`http://localhost:5000${art.imageUrl}`} 
              alt="artwork" 
            />
            <div style={{ padding: '10px' }}>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Artist: 
                <Link 
                  to={`/profile/${art.user.username}`} 
                  style={{ marginLeft: '5px', fontWeight: 'bold', color: '#646cff' }}
                >
                  {art.user.username}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {artworks.length === 0 && (
        <p style={{ textAlign: 'center' }}>No artwork uploaded yet. Be the first!</p>
      )}
    </div>
  );
};

export default Landing;