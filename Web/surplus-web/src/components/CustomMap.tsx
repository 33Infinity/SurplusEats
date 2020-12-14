import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import LocationModel from "../Models/LocationModel";
import { LatLngTuple } from "leaflet";

interface IMappingProperties {
  centerLatitude: number;
  centerLongitude: number;
  zoom: number;
  locationModels: LocationModel[];
}

const CustomMap: React.FC<IMappingProperties> = (props) => {
  const centeredPosition: LatLngTuple = [
    props.centerLatitude,
    props.centerLongitude,
  ];
  const map = (
    <MapContainer center={centeredPosition} zoom={props.zoom}>
      <TileLayer
        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {getMarkers(props.locationModels)}
    </MapContainer>
  );
  return map;
};

function getMarkers(locationModels) {
  return locationModels.map((eachLocation) => {
    const position: LatLngTuple = [
      eachLocation.Latitude!,
      eachLocation.Longitude!,
    ];
    return (
      <Marker key={eachLocation.Id} position={position}>
        <Tooltip permanent>{eachLocation.Name}</Tooltip>
      </Marker>
    );
  });
}

export default CustomMap;
