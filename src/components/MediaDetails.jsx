/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MediaDetails.css';

const MediaDetails = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://images-api.nasa.gov/search?nasa_id=${id}`);
        console.log(response.data.collection);

        if (response.status === 200) {
          const { items } = response.data.collection;

          if (items && items.length > 0) {
            setMedia(items[0]);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!media) {
    return (
      <div className="container ">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const {
    title, description, media_type, links,
  } = media.data[0] || {};

  return (
    <div className="container details-tank">
      <h2>{title}</h2>
      {media_type === 'image' && links && links.length > 0 && (
        <img src={links[0].href} alt={title} />
      )}
      {media_type === 'video' && links && links.length > 0 && (
        <div className="embed-responsive embed-responsive-16by9">
          <video controls className="embed-responsive-item">
            <source src="{links[0].href}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <p>{description}</p>
    </div>
  );
};

export default MediaDetails;
