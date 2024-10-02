"use client"
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [likes, setLikes] = useState(false);
  const [sessionToken, setSessionToken] = useState(uuidv4());
  const [locationState, setLocationState] = useState({
    city: "New Delhi",
    pincode: "110012",
    locality: null,
    state: "Delhi",
    coordinates: null,
  });

  const [apiCallCount, setApiCallCount] = useState(0);
  const updateLiveLocation = (newLocation) => {
    setLocationState(newLocation);
  }

  const updateLikes = () => {
    setLikes(!likes);
  };

  const liveLocation = useCallback(async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.NEXT_PUBLIC_GEO_API_KEY}&country=IN`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const city = getPlaceContext(data.features[0], 'place');
        const pincode = getPlaceContext(data.features[0], 'postcode');
        const locality = data.features[0].place_name;
        const state = getPlaceContext(data.features[0], 'region');

        console.log("From live ", city, pincode, locality, state);

        const newLocationState = {
          coordinates: `${latitude}, ${longitude}`,
          pincode: pincode,
          city: city,
          locality: locality,
          state: state,
        };

        // Set the location state in localStorage
        localStorage.setItem('liveLocation', JSON.stringify(newLocationState));

        setLocationState((prevLocationState) => ({
          ...prevLocationState,
          ...newLocationState,
        }));
      }
    } catch (error) {
      console.error('Error updating live location:', error.message);
    }
  }, []);

  const getPlaceContext = (feature, contextType) => {
    const context = feature.context.find((context) => context.id.startsWith(contextType));
    return context ? context.text : null;
  };


  const handleButtonClick = useCallback(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              liveLocation(position);
            },
            (error) => {
              console.error('Error getting location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching location:', error.message);
      }
    };

    fetchLocation();
  }, [liveLocation]);

  const updateSessionToken = useCallback(() => {
    // console.log('apicall count',apiCallCount)
    if (apiCallCount >= 70) {
      setSessionToken(uuidv4());
      setApiCallCount(0);
    }
  }, [apiCallCount]);

  useEffect(() => {
    const storedLocation = localStorage.getItem('liveLocation');
    if (storedLocation) {
      setLocationState((prevLocationState) => ({
        ...prevLocationState,
        ...JSON.parse(storedLocation),
      }));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSessionToken();
    }, 1000); // Check every second, adjust as needed

    return () => clearInterval(interval);
  }, [updateSessionToken]);


  const updateCallCount = () => {
    setApiCallCount(prevCount => prevCount + 1);
  }

  return (
    <GlobalStateContext.Provider value={{ locationState, likes, updateLikes, updateLiveLocation, handleButtonClick, updateCallCount }}>
      {children}
    </GlobalStateContext.Provider>
  );
};


export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
