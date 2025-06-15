const backendURL = 'http://localhost:3000/api/user';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch(`${backendURL}/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        document.getElementById('mensaje').textContent = data.message;

        if (res.ok) {
          setTimeout(() => {
            window.location.href = 'perfil.html';
          }, 1000);
        }
      } catch (error) {
        console.error('Error al loguear:', error);
      }
    });
  }
});

async function logout() {
  try {
    const res = await fetch(`${backendURL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      alert('Sesión cerrada');
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
  }
}

async function mostrarPerfil() {
  try {
    const res = await fetch(`${backendURL}/perfil`, {
      method: 'GET',
      credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById('contenido').innerHTML =
        `<p>Bienvenido ${data.usuario.email}</p>`;
    } else {
      alert('No estás logueado');
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error('Error al acceder al perfil:', err);
    window.location.href = 'index.html';
  }
}
