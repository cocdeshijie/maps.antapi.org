import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map} from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY29jZGVzaGlqaWUiLCJhIjoiY2t6dDd2OGUwMDJ0dDJ1bnJmdzNvYTRzcSJ9.2RMz1yjYV118XJq_OStX3Q';

interface DataItem {
    genus: string;
    species: string;
    subspecies: string;
    data_source: string;
    specimen_code: string;
    date: string;
    latitude: number;
    longitude: number;
}

interface FetchedData {
    full_name: string;
    records_count: number;
    records: DataItem[];
}

function MapContainer() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);
    const [data, setData] = useState<GeoJSON.Feature[] | null>(null);

    useEffect(() => {
        fetch('https://api.antapi.org/records/Pogonomymex/cali')
            .then((response) => response.json())
            .then((fetchedData: FetchedData) => {
                setData(
                    fetchedData.records.map((item: DataItem) => ({
                        type: 'Feature',
                        properties: item,
                        geometry: {
                            type: 'Point',
                            coordinates: [item.longitude, item.latitude],
                        },
                    })),
                );
            });
    }, []);

    useEffect(() => {
        if (!data) return;

        if (mapContainer.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [0, 0],
                zoom: 1,
            });

            const map = mapInstance.current;

            map.on('load', () => {
                // Add a new source from the data.
                map.addSource('ants', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: data,
                    },
                    cluster: true,
                    clusterMaxZoom: 14,
                    clusterRadius: 50,
                });

                // Create a layer for clusters.
                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'ants',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            100,
                            '#f1f075',
                            750,
                            '#f28cb1',
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40,
                        ],
                    },
                });

                // Create a layer for the individual points within the clusters.
                map.addLayer({
                    id: 'unclustered-points',
                    type: 'circle',
                    source: 'ants',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff',
                    },
                });
            });
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
            }
        };
    }, [data]);

    return (
        <div className="h-screen w-full container relative">
            <div ref={mapContainer} style={{ width: '90%', height: '100%' }} />
        </div>
    );
}

export default MapContainer;
