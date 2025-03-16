"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useGlobalState } from "@/services/LocationDetector/GlobalState";




export function useMapboxLocation(location) {
    const [sessionToken, setSessionToken] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [error, setError]               = useState(null);
    const [locationOptions, setLocationOptions] = useState([
        { value: 'New Delhi', label: 'New Delhi' }
    ])
    const { updateCallCount } = useGlobalState();

    const generateSessionToken = () => Math.random().toString(36).slice(2);


    useEffect(() => {
        let storedToken = sessionStorage.getItem("sessionToken");
        if (!storedToken) {
            storedToken = generateSessionToken();
            sessionStorage.setItem("sessionToken", storedToken);
        }
        setSessionToken(storedToken);
    }, []);


    ///// Generate new Session Token for mapbox
    useEffect(() => {
        if (!location || !sessionToken) return; // Prevent API calls if location is empty

        const fetchLocation = async () => {
            try {
                const response = await axios.get(
                    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${location}&language=en&country=in&types=city&access_token=${process.env.NEXT_PUBLIC_GEO_API_KEY}&session_token=${sessionToken}`
                );
                // console.log('API response', response.data.suggestions)

                if (!response.data.suggestions || response.data.suggestions.length === 0) {
                    setOptions([]); // No results
                    return;
                }
                setLocationData(response.data);

                const cities = response.data.suggestions.map((feature)=> ({
                    value: feature.name || "Unknown",
                    label: feature.name || "Unknown",
                    all: feature.context || {}
                }))
                // console.log('Mapped cities', cities)

                setLocationOptions(cities)
                setLocationData(response.data);
                updateCallCount();

            } catch (err) {
                setError(err.message);
            }
        };

        fetchLocation();

    }, [location, sessionToken]);

    // console.log('1st options', options)

    return { locationData, error, locationOptions };
}



