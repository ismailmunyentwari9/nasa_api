/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MediaDetails from './MediaDetails';
import './Media.css';
import './search.css';

const Media = () => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://images-api.nasa.gov/search?q=moon';

        if (mediaType === 'video') {
          url += '&media_type=video';
        } else if (mediaType === 'image') {
          url += '&media_type=image';
        }

        const response = await axios.get(url);

        if (response.status === 200) {
          setItems(response.data.collection.items);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [mediaType]);

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    setSearchQuery(query);
  };

  const handleItemClick = (itemId) => {
    navigate(`/media/${itemId}`);
  };

  const filteredItems = items.filter((item) => {
    const title = item.data[0]?.title?.toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container media-tank">
      <h1>NASA Images and Videos Library</h1>

      <div className="mb-3">
        <label htmlFor="both" className="me-2">
          <input
            type="radio"
            id="both"
            value="both"
            checked={mediaType === 'both'}
            onChange={handleMediaTypeChange}
          />
          All
        </label>
        <label htmlFor="image" className="me-2">
          <input
            type="radio"
            id="image"
            value="image"
            checked={mediaType === 'image'}
            onChange={handleMediaTypeChange}
          />
          Images
        </label>
        <label htmlFor="video" className="me-2">
          <input
            type="radio"
            id="video"
            value="video"
            checked={mediaType === 'video'}
            onChange={handleMediaTypeChange}
          />
          Videos
        </label>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>

      <h2>Media:</h2>

      <div className="media-container">
        {filteredItems.map((item) => {
          const mediaType = item.data[0]?.media_type;
          const title = item.data[0]?.title;
          const href = item.links?.[0]?.href;

          if ((mediaType === 'image' || mediaType === 'video') && title && href) {
            return (
              <div
                className="media-item"
                key={item.data[0].nasa_id}
                onClick={() => handleItemClick(item.data[0].nasa_id)}
              >
                {mediaType === 'image' && (
                  <>
                    <img src={href} alt={title} className="img-fluid" />
                    <p>{title}</p>
                  </>
                )}

                {mediaType === 'video' && (
                  <>
                    <div className="embed-responsive embed-responsive-16by9">
                      {/* Embed the video */}
                      <video controls className="embed-responsive-item">
                        <source src={href} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p>{title}</p>
                  </>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Render the MediaDetails component with the match prop */}
      <MediaDetails />
    </div>
  );
};

export default Media;
