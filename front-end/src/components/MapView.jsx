import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'

function MapView() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/con-coordenadas') // Ajustá la ruta según tu backend
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <MapContainer center={[-27.362137, -55.900874]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {users.map((user, index) => (
        <Marker key={index} position={[user.latitud, user.longitud]}>
          <Popup>
            {user.nombre} {user.apellido}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapView
