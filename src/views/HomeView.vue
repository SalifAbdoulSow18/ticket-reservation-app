<template>
  <div class="home">
    <div class="hero">
      <h1>Découvrez les meilleurs événements au Sénégal</h1>
      <p>Réservez vos billets en quelques clics</p>
    </div>
    
    <div class="events-wrapper">
      <EventList />
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList.vue'

export default {
  name: 'HomeView',
  components: {
    EventList
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  color: white;
  width: 100%;
  box-sizing: border-box;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.events-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  flex: 1;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }
  
  .hero h1 {
    font-size: 1.8rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 1.5rem;
  }
  
  .events-wrapper {
    padding: 0.5rem;
  }
}
</style>