<template>
  <div class="ticket-summary">
    <h3 class="summary-title">Récapitulatif de votre commande</h3>
    
    <div v-if="reservation" class="ticket">
      <div class="ticket-header">
        <div class="event-info">
          <h4>{{ reservation.event.title }}</h4>
          <p>{{ formatDate(reservation.event.date) }} à {{ reservation.event.time }}</p>
          <p>{{ reservation.event.venue }}</p>
        </div>
        <div class="ticket-icon">🎟️</div>
      </div>
      
      <div class="ticket-body">
        <div class="info-row">
          <span>Nombre de places</span>
          <strong>{{ reservation.quantity }}</strong>
        </div>
        <div class="info-row">
          <span>Prix unitaire</span>
          <strong>{{ reservation.event.price }} €</strong>
        </div>
        <div class="info-row total">
          <span>Total</span>
          <strong>{{ reservation.totalPrice }} €</strong>
        </div>
      </div>
      
      <div class="ticket-footer">
        <p>Réservation #{{ reservation.id }}</p>
        <p>{{ formatDateTime(reservation.date) }}</p>
      </div>
    </div>
    
    <div v-else class="no-reservation">
      <p>Aucune réservation en cours</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketSummary',
  props: {
    reservation: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatDateTime(date) {
      if (!date) return ''
      return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.ticket-summary {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.summary-title {
  padding: 1.5rem;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.25rem;
}

.ticket {
  padding: 1.5rem;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed #e0e0e0;
}

.event-info h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.event-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.ticket-icon {
  font-size: 3rem;
  opacity: 0.2;
}

.ticket-body {
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: #666;
}

.info-row.total {
  border-top: 2px solid #e0e0e0;
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-weight: bold;
  color: #333;
}

.ticket-footer {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  color: #999;
  font-size: 0.85rem;
}

.ticket-footer p {
  margin: 0.25rem 0;
}

.no-reservation {
  padding: 3rem;
  text-align: center;
  color: #999;
}
</style>