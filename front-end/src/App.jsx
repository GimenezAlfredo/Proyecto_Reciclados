import UserList from './components/UserList'
import MapView from './components/MapView'
import 'leaflet/dist/leaflet.css'


function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>CRUD de Usuarios</h1>

      {/* Listado de usuarios */}
      <UserList />

      <h2 style={{ marginTop: '2rem' }}>Mapa con usuarios</h2>

      {/* Mapa */}
      <MapView />
    </div>
  )
}

export default App
