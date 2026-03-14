<template>
  <div class="event-list">
    <h2 class="section-title">Événements à venir au Sénégal</h2>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des événements...</p>
    </div>
    
    <div v-else-if="events.length === 0" class="no-events">
      <p>Aucun événement disponible pour le moment</p>
    </div>
    
    <div v-else class="events-grid">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @select="handleEventSelect"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticketStore'
import EventCard from './EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  setup() {
    const router = useRouter()
    const store = useTicketStore()
    
    const events = computed(() => store.events)
    const loading = computed(() => false)
    
    const handleEventSelect = (event) => {
      store.selectEvent(event)
      router.push('/reservation')
    }
    
    return {
      events,
      loading,
      handleEventSelect
    }
  }
}
</script>

<style scoped>
.event-list {
  width: 100%;
  max-width: 100%;
  padding: 1rem 0;
}

.section-title {
  font-size: 1.8rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  word-wrap: break-word;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.loading {
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-events {
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  color: #666;
  font-size: 1.1rem;
  width: 100%;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>