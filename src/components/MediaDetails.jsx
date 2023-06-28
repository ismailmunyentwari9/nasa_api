/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

const MediaDetails = ({ item }) => (
  <div className="media-details">
    {/* Render the details of the item */}
    <h3>{item.data[0]?.title}</h3>
    <p>{item.data[0]?.description}</p>
    <p>Additional Details:</p>
    <ul>
      {item.data[0]?.keywords && (
        <li>
          <strong>Keywords:</strong>
          {' '}
          {item.data[0]?.keywords.join(', ')}
        </li>
      )}
      {item.data[0]?.date_created && (
        <li>
          <strong>Date Created:</strong>
          {' '}
          {item.data[0]?.date_created}
        </li>
      )}
      {/* Add more details as needed */}
    </ul>
    {item.data[0]?.media_type === 'image' && (
      <div>
        <h4>Image:</h4>
        <img
          src={item.links[0]?.href}
          alt={item.data[0]?.title}
          className="img-fluid details-img"
        />
      </div>
    )}
    {item.data[0]?.media_type === 'video' && (
      <div>
        <h4>Video:</h4>
        <div className="embed-responsive embed-responsive-16by9">
          <video controls className="embed-responsive-item">
            {item.data[0]?.caption && (
              <track kind="captions" src={item.data[0]?.caption} label="English" />
            )}
            <source src={item.links[0]?.href} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    )}
  </div>
);

MediaDetails.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string),
        date_created: PropTypes.string,
        media_type: PropTypes.string,
        caption: PropTypes.string, // Include caption prop type
        // Add more prop types for additional details if needed
      }),
    ),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        // Add more prop types for additional link details if needed
      }),
    ),
  }).isRequired,
};

export default MediaDetails;
