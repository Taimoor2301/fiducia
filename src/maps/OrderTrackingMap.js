import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  return (
    <div className='h-[400px] md:h-full w-full'>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={[24.774265, 46.738586]}
        zoom={16}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: MarkerShadow.src,
              shadowSize: [41, 41]
            })
          }
          position={[24.774265, 46.738586]}
        >
          <Popup>Current Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
