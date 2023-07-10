import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DayPicture.css';

const DayPicture = () => {
  const [dayPicture, setDayPicture] = useState(null);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        const response = await axios.get(
          'https://api.nasa.gov/planetary/apod?api_key=fNFOUCufenf8P2UdO7yHaD9EoxRe0UHZMl5ah2Ad',
        );

        if (response.status === 200) {
          setDayPicture(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPicture();
  }, []);

  return (
    <div className="day-picture">
      <h1 className="day-picture-title">Astronomy Picture of the Day</h1>
      {dayPicture ? (
        <div>
          <h2 className="day-picture-subtitle">{dayPicture.title}</h2>
          <img
            src={dayPicture.url}
            alt={dayPicture.title}
            className="day-picture-image"
          />
          <p className="day-picture-description">{dayPicture.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DayPicture;
