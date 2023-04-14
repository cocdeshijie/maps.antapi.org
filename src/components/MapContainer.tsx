import React, { useRef, useEffect } from 'react';
import mapboxgl, { Map }  from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiY29jZGVzaGlqaWUiLCJhIjoiY2t6dDd2OGUwMDJ0dDJ1bnJmdzNvYTRzcSJ9.2RMz1yjYV118XJq_OStX3Q';

function MapContainer() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);

    useEffect(() => {
        if (mapContainer.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 1,
            });
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
            }
        };
    }, []);


    return (
        <div className={"h-screen w-full container relative"}>
           <div ref={mapContainer} style={{ width: '90%', height: '100%' }} />
        </div>
    );
}

export default MapContainer;