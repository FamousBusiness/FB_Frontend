"use client";

import { useParams } from "next/navigation";
import { useMapboxLocation } from "@/lib/location";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/services/LocationDetector/GlobalState";
import Page from "../page";



function LocationPage() {
    const { location } = useParams()
    const [paramsLocation, setParamsLocation] = useState();
    const { locationData, error, locationOptions } = useMapboxLocation(location)
    const { setLocationCity } = useGlobalState()
    // console.log('first option',locationOptions[0]?.value)
    
    useEffect(()=> {
        if (locationOptions?.length > 0 && locationOptions[0]?.value) {
            setParamsLocation(locationOptions[0]?.value)
            setLocationCity(locationOptions[0]?.value)

        } else {
            setLocationCity('New Delhi')
            // window.location.href = '/'
        }
    }, [locationOptions, setLocationCity]);


    return (
        <Page />
    );
};


export default LocationPage;