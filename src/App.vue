<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎟️</span>
          <span class="logo-text">TicketMaster Sénégal</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/reservation" class="nav-link">Réservation</router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link.router-link-exact-active {
  color: #667eea;
  font-weight: 600;
}

.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-links {
    justify-content: center;
  }
  
  .main-content {
    padding: 0.5rem;
  }
}
</style>