import React, { useRef } from 'react';
import {
    Map,
    MapRef,
    Source,
    Layer,
    MapLayerMouseEvent,
    GeoJSONSource,
    LngLatLike
} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from "@/components/Map/Layers";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Point } from "geojson";

function MapContainer({}) {
    const mapRef = useRef<MapRef>(null);

    const onClick = (event: MapLayerMouseEvent) => {
        if (event.features?.length) {
            const feature = event.features[0];
            const clusterId = feature.properties!.cluster_id;
            const mapboxSource = mapRef.current!.getSource('species_records') as GeoJSONSource;
            const point = feature.geometry as Point;
            mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) {
                    return;
                }

                mapRef.current!.easeTo({
                    center: point.coordinates as LngLatLike,
                    zoom,
                    duration: 500
                });
            });
        }

    };

    return (
        // TODO: w-11/12 for now, but should be w-full
        <div className="h-screen w-11/12 container relative">
            <Map
                initialViewState={{
                    latitude: 40.67,
                    longitude: -103.59,
                    zoom: 3
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken="pk.eyJ1IjoiY29jZGVzaGlqaWUiLCJhIjoiY2t6dDd2OGUwMDJ0dDJ1bnJmdzNvYTRzcSJ9.2RMz1yjYV118XJq_OStX3Q"
                onClick={onClick}
                interactiveLayerIds={[clusterLayer.id as string]}
                ref={mapRef}
                style={{width: '100%', height: '100%'}}>
                <Source
                    id="species_records"
                    type="geojson"
                    data="https://api.antapi.org/records_geojson/Camponotus/fragilis"
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}>
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            </Map>
        </div>
    )
}

export default MapContainer;