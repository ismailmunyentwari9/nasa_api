/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Media.css';
import MediaDetails from './MediaDetails';

const Media = () => {
  const [mediaType, setMediaType] = useState('both');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

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

      <h2>Media:</h2>

      <div className="media-container">
        {items.map((item) => {
          if (
            mediaType === 'both'
            || (mediaType === 'image' && item.data[0]?.media_type === 'image')
            || (mediaType === 'video' && item.data[0]?.media_type === 'video')
          ) {
            if (item.data[0]?.media_type === 'image') {
              return (
                <div
                  className="media-item"
                  key={item.data[0].nasa_id}
                  onClick={() => handleItemClick(item)}
                >
                  <img
                    src={item.links[0].href}
                    alt={item.data[0].title}
                    className="img-fluid"
                  />
                </div>
              );
            } if (item.data[0]?.media_type === 'video') {
              const previewLink = item.links.find((link) => link.rel === 'preview');
              const videoUrl = previewLink.href.replace('preview.', '');
              const captionLink = item.links.find((link) => link.rel === 'captions');
              const captionSrc = captionLink ? captionLink.href : null;

              return (
                <div
                  className="media-item"
                  key={item.data[0].nasa_id}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="embed-responsive embed-responsive-16by9">
                    <video controls className="embed-responsive-item">
                      {captionSrc && <track kind="captions" src={captionSrc} label="English" />}
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </div>

      {selectedItem && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeDetails}>
              &times;
            </span>
            <MediaDetails item={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
