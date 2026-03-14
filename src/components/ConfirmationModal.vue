<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🎉 Réservation confirmée !</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="success-animation">
          <div class="checkmark">✓</div>
        </div>
        
        <p class="thank-you">Merci {{ reservation?.userInfo.prenom }} {{ reservation?.userInfo.nom }} !</p>
        
        <div class="reservation-details">
          <h3>Détails de la réservation</h3>
          
          <div class="detail-row">
            <span class="detail-label">Numéro de réservation :</span>
            <span class="detail-value reservation-number">{{ reservation?.reservationNumber }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Événement :</span>
            <span class="detail-value">{{ reservation?.event.title }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Date :</span>
            <span class="detail-value">{{ formatDate(reservation?.event.date) }} à {{ reservation?.event.time }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Lieu :</span>
            <span class="detail-value">{{ reservation?.event.venue }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Adresse :</span>
            <span class="detail-value">{{ reservation?.event.address }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Nombre de places :</span>
            <span class="detail-value">{{ reservation?.quantity }}</span>
          </div>
          
          <div class="detail-row total-row">
            <span class="detail-label">Total payé :</span>
            <span class="detail-value total-price">{{ formatPrice(reservation?.totalPrice) }}</span>
          </div>
        </div>
        
        <div class="payment-info">
          <h4>💳 Informations de paiement</h4>
          <p>Paiement à effectuer sur place ou via :</p>
          <ul>
            <li>Orange Money : *144#</li>
            <li>Wave : *878#</li>
            <li>Free Money : *133#</li>
          </ul>
        </div>
        
        <div class="event-info">
          <h4>📍 Accès à l'événement</h4>
          <p>Présentez ce numéro de réservation à l'entrée :</p>
          <div class="qr-code-placeholder">
            <span class="qr-icon">📱</span>
            <strong>{{ reservation?.reservationNumber }}</strong>
          </div>
        </div>
        
        <p class="confirmation-message">
          Un email de confirmation a été envoyé à {{ reservation?.userInfo.email }}
        </p>
        
        <p class="sms-message" v-if="reservation?.userInfo.telephone">
          Vous recevrez un SMS de rappel au {{ reservation?.userInfo.telephone }}
        </p>
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary" @click="printTicket">
          🖨️ Imprimer le ticket
        </button>
        <button class="btn-primary" @click="close">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    reservation: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
    printTicket() {
      window.print()
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-SN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatPrice(price) {
      if (!price) return '0 FCFA'
      return new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-header h2 {
  color: white;
  margin: 0;
}

.close-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255,255,255,0.3);
}

.modal-body {
  padding: 2rem;
}

.success-animation {
  text-align: center;
  margin-bottom: 1.5rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #48bb78;
  color: white;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: scaleIn 0.5s ease;
}

.thank-you {
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.reservation-details {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
}

.reservation-details h3 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e0e0e0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: #666;
  font-weight: 500;
}

.detail-value {
  color: #333;
  font-weight: 600;
}

.reservation-number {
  color: #667eea;
  font-family: monospace;
  font-size: 1.1rem;
}

.total-row {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 2px solid #667eea;
}

.total-price {
  color: #667eea;
  font-size: 1.2rem;
}

.payment-info, .event-info {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.payment-info h4, .event-info h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.payment-info ul {
  margin: 0.5rem 0 0 1.5rem;
  color: #666;
}

.qr-code-placeholder {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
  border: 2px dashed #667eea;
}

.qr-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.confirmation-message {
  text-align: center;
  color: #48bb78;
  font-weight: 500;
  margin: 1rem 0;
}

.sms-message {
  text-align: center;
  color: #667eea;
  font-weight: 500;
  font-size: 0.9rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@media print {
  .modal-overlay {
    position: absolute;
    background: white;
  }
  
  .modal-header, .modal-footer, .close-btn {
    display: none;
  }
  
  .modal-content {
    box-shadow: none;
    max-height: none;
    overflow: visible;
  }
}
</style>