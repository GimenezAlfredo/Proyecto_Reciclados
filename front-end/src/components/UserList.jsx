import { useEffect, useState } from 'react'
import axios from 'axios'

const UserList = () => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/user/showList') // No necesitas http://localhost:3000 si tenés proxy en Vite
        setUsuarios(res.data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error.message)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Usuarios registrados</h2>
      <ul>
        {usuarios.map((user, index) => (
          <li key={index}>{user.nombre} {user.apellido}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
