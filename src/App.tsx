import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";
import { useState } from "react";

function MyComponent() {
  const [position, setPosition] = useState<any>(null)
  const map = useMapEvents({
    click(e) {
      map.locate()
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      console.log("🚀 ~ click ~ e.latlng:", e.latlng)
    },
    // locationfound(e) {
    //   console.log("🚀 ~ locationfound ~ e:", e)
    //   setPosition(e.latlng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function App() {

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/550/550907.png',
    iconSize: [38, 38] // size of the icon
  });

  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1"
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2"
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3"
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid red', width: '50vw' }}>
      <MapContainer center={[34.714821074396646, 36.71128964420859]} zoom={20}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker position={marker.geocode as [number, number]} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        <MyComponent />

      </MapContainer>
    </div>
  );

}

export default App;
