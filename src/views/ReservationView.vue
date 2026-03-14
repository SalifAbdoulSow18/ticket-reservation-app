<template>
  <div class="reservation-view">
    <div class="container">
      <h1 class="page-title">Réservation de tickets</h1>
      
      <div v-if="!selectedEvent" class="no-event-card">
        <div class="no-event-content">
          <span class="no-event-icon">🎟️</span>
          <p>Aucun événement sélectionné</p>
          <p class="no-event-sub">Veuillez choisir un événement depuis la page d'accueil</p>
          <router-link to="/" class="btn-back">
            Voir les événements
          </router-link>
        </div>
      </div>
      
      <div v-else class="reservation-content">
        <ReservationForm
          :selected-event="selectedEvent"
          :quantity="quantity"
          :user-info="userInfo"
          :total-price="totalPrice"
          :available-tickets="availableTickets"
          @update:quantity="updateQuantity"
          @update:userInfo="updateUserInfo"
          @submit="handleReservation"
        />
      </div>
    </div>
    
    <ConfirmationModal
      :show="showConfirmation"
      :reservation="lastReservation"
      @close="closeConfirmation"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticketStore'
import ReservationForm from '@/components/ReservationForm.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

export default {
  name: 'ReservationView',
  components: {
    ReservationForm,
    ConfirmationModal
  },
  setup() {
    const router = useRouter()
    const store = useTicketStore()
    const showConfirmation = ref(false)
    const lastReservation = ref(null)
    
    const selectedEvent = computed(() => store.selectedEvent)
    const quantity = computed({
      get: () => store.quantity,
      set: (value) => store.updateQuantity(value)
    })
    const userInfo = computed({
      get: () => store.userInfo,
      set: (value) => store.updateUserInfo(value)
    })
    const totalPrice = computed(() => store.totalPrice)
    const availableTickets = computed(() => store.availableTicketsForSelected)
    
    const updateQuantity = (value) => {
      store.updateQuantity(value)
    }
    
    const updateUserInfo = (value) => {
      store.updateUserInfo(value)
    }
    
    const handleReservation = () => {
      const reservation = store.makeReservation()
      if (reservation) {
        lastReservation.value = reservation
        showConfirmation.value = true
      }
    }
    
    const closeConfirmation = () => {
      showConfirmation.value = false
      router.push('/')
    }
    
    return {
      selectedEvent,
      quantity,
      userInfo,
      totalPrice,
      availableTickets,
      updateQuantity,
      updateUserInfo,
      handleReservation,
      showConfirmation,
      lastReservation,
      closeConfirmation
    }
  }
}
</script>

<style scoped>
.reservation-view {
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 1rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
}

.page-title {
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  word-wrap: break-word;
}

.no-event-card {
  background: white;
  border-radius: 15px;
  padding: 3rem 1.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
}

.no-event-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.no-event-icon {
  font-size: 4rem;
  opacity: 0.3;
}

.no-event-card p {
  color: #666;
  font-size: 1.2rem;
  margin: 0;
}

.no-event-sub {
  color: #999;
  font-size: 1rem !important;
}

.btn-back {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 1rem;
  transition: transform 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-2px);
}

.reservation-content {
  animation: fadeIn 0.5s ease;
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .no-event-card {
    padding: 2rem 1rem;
  }
  
  .no-event-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .page-title {
    font-size: 1.3rem;
  }
}
</style>