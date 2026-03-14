<template>
  <div class="reservation-form">
    <h2 class="form-title">Formulaire de réservation</h2>
    
    <div v-if="selectedEvent" class="selected-event">
      <h3>{{ selectedEvent.title }}</h3>
      <div class="event-details-compact">
        <p><strong>Lieu :</strong> {{ selectedEvent.venue }}</p>
        <p><strong>Adresse :</strong> {{ selectedEvent.address }}</p>
        <p><strong>Date :</strong> {{ formatDate(selectedEvent.date) }} à {{ selectedEvent.time }}</p>
      </div>
    </div>
    
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-section">
        <h3 class="section-title">
          <span class="section-icon">👤</span>
          Informations personnelles
        </h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="prenom">Prénom <span class="required">*</span></label>
            <input 
              type="text" 
              id="prenom" 
              :value="localUserInfo.prenom"
              @input="updateUserInfoField('prenom', $event.target.value)"
              placeholder="Votre prénom"
              class="form-input"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="nom">Nom <span class="required">*</span></label>
            <input 
              type="text" 
              id="nom" 
              :value="localUserInfo.nom"
              @input="updateUserInfoField('nom', $event.target.value)"
              placeholder="Votre nom"
              class="form-input"
              required
            >
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email <span class="required">*</span></label>
          <input 
            type="email" 
            id="email" 
            :value="localUserInfo.email"
            @input="updateUserInfoField('email', $event.target.value)"
            placeholder="exemple@email.sn"
            class="form-input"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="telephone">Téléphone <span class="required">*</span></label>
          <div class="phone-input">
            <span class="phone-prefix">+221</span>
            <input 
              type="tel" 
              id="telephone" 
              :value="localUserInfo.telephone"
              @input="updateUserInfoField('telephone', $event.target.value)"
              placeholder="77 123 45 67"
              class="form-input phone-number"
              required
            >
          </div>
          <small class="help-text">Format: 77 123 45 67 ou 78 123 45 67</small>
        </div>
      </div>
      
      <div class="form-section">
        <h3 class="section-title">
          <span class="section-icon">🏠</span>
          Adresse de résidence
        </h3>
        
        <div class="form-group">
          <label for="ville">Région <span class="required">*</span></label>
          <select 
            id="ville" 
            :value="localUserInfo.ville"
            @change="updateUserInfoField('ville', $event.target.value)"
            class="form-select"
            required
          >
            <option value="" disabled>Sélectionnez une région</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="quartier">Quartier / Commune <span class="required">*</span></label>
          <input 
            type="text" 
            id="quartier" 
            :value="localUserInfo.quartier"
            @input="updateUserInfoField('quartier', $event.target.value)"
            placeholder="Ex: Médina, Ouakam, Mermoz..."
            class="form-input"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="adresse">Adresse complète</label>
          <textarea 
            id="adresse" 
            :value="localUserInfo.adresse"
            @input="updateUserInfoField('adresse', $event.target.value)"
            placeholder="Numéro, rue, point de repère..."
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>
      </div>
      
      <div class="form-section">
        <h3 class="section-title">
          <span class="section-icon">🎫</span>
          Détails de la réservation
        </h3>
        
        <div class="form-group">
          <label for="quantity">Nombre de places <span class="required">*</span></label>
          <div class="quantity-selector">
            <button 
              type="button"
              @click="decrementQuantity" 
              :disabled="quantity <= 1"
              class="quantity-btn"
            >−</button>
            <input 
              type="number" 
              id="quantity" 
              :value="quantity"
              @input="updateQuantityFromInput($event)"
              min="1"
              :max="availableTickets"
              class="quantity-input"
              readonly
            >
            <button 
              type="button"
              @click="incrementQuantity" 
              :disabled="quantity >= availableTickets"
              class="quantity-btn"
            >+</button>
          </div>
          <p class="available-text">{{ availableTickets }} places disponibles</p>
        </div>
      </div>
      
      <div class="price-summary">
        <h3 class="section-title">
          <span class="section-icon">💰</span>
          Récapitulatif
        </h3>
        
        <div class="price-details">
          <div class="price-row">
            <span>Prix unitaire</span>
            <span>{{ formatPrice(selectedEvent?.price) }}</span>
          </div>
          <div class="price-row">
            <span>Quantité</span>
            <span>{{ quantity }}</span>
          </div>
          <div class="price-row total">
            <span>Total à payer</span>
            <span class="total-amount">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>
        
        <div class="payment-info">
          <p class="payment-title">Moyens de paiement acceptés :</p>
          <div class="payment-methods">
            <span class="payment-badge">📱 Orange Money</span>
            <span class="payment-badge">🌊 Wave</span>
            <span class="payment-badge">💚 Free Money</span>
            <span class="payment-badge">💳 Carte bancaire</span>
          </div>
        </div>
      </div>
      
      <button 
        type="submit"
        :disabled="!isFormValid"
        class="btn-submit"
      >
        Confirmer la réservation
      </button>
      
      <p class="required-note"><span class="required">*</span> Champs obligatoires</p>
    </form>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useTicketStore } from '@/stores/ticketStore'

export default {
  name: 'ReservationForm',
  props: {
    selectedEvent: {
      type: Object,
      default: null
    },
    quantity: {
      type: Number,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    availableTickets: {
      type: Number,
      required: true
    }
  },
  emits: ['update:quantity', 'update:userInfo', 'submit'],
  setup(props, { emit }) {
    const store = useTicketStore()
    const regions = store.regions
    
    const localUserInfo = ref({ ...props.userInfo })
    
    watch(() => props.userInfo, (newValue) => {
      localUserInfo.value = { ...newValue }
    }, { deep: true })
    
    watch(localUserInfo, (newValue) => {
      emit('update:userInfo', newValue)
    }, { deep: true })
    
    const incrementQuantity = () => {
      if (props.quantity < props.availableTickets) {
        emit('update:quantity', props.quantity + 1)
      }
    }
    
    const decrementQuantity = () => {
      if (props.quantity > 1) {
        emit('update:quantity', props.quantity - 1)
      }
    }
    
    const updateQuantityFromInput = (event) => {
      const value = parseInt(event.target.value)
      if (!isNaN(value) && value >= 1 && value <= props.availableTickets) {
        emit('update:quantity', value)
      }
    }
    
    const updateUserInfoField = (field, value) => {
      localUserInfo.value = {
        ...localUserInfo.value,
        [field]: value
      }
    }
    
    const formatPrice = (price) => {
      if (!price) return '0 FCFA'
      return new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    }
    
    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('fr-SN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const isFormValid = computed(() => {
      return props.quantity > 0 && 
             props.quantity <= props.availableTickets &&
             localUserInfo.value.prenom?.trim() &&
             localUserInfo.value.nom?.trim() &&
             localUserInfo.value.email?.includes('@') &&
             localUserInfo.value.email?.includes('.') &&
             localUserInfo.value.telephone?.length >= 9 &&
             localUserInfo.value.ville &&
             localUserInfo.value.quartier?.trim()
    })
    
    const handleSubmit = () => {
      if (isFormValid.value) {
        emit('submit')
      }
    }
    
    return {
      localUserInfo,
      regions,
      incrementQuantity,
      decrementQuantity,
      updateQuantityFromInput,
      updateUserInfoField,
      isFormValid,
      handleSubmit,
      formatPrice,
      formatDate
    }
  }
}
</script>

<style scoped>
.reservation-form {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.form-title {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  padding: 1.5rem;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.selected-event {
  background: #f0f7ff;
  padding: 1.25rem;
  margin: 1rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.selected-event h3 {
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.event-details-compact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.event-details-compact p {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
  word-wrap: break-word;
}

.form-container {
  padding: 1.5rem;
}

.form-section {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 1.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.section-icon {
  font-size: 1.2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
}

.required {
  color: #e53e3e;
  font-weight: bold;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #667eea;
}

.phone-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.phone-prefix {
  background: #f0f0f0;
  padding: 0.75rem;
  border-radius: 8px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.phone-number {
  flex: 1;
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: #999;
  font-size: 0.85rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 200px;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  background: #f9f9f9;
}

.available-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #48bb78;
}

.price-summary {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
}

.price-details {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.price-row:last-child {
  border-bottom: none;
}

.price-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 2px solid #667eea;
}

.total-amount {
  color: #667eea;
}

.payment-info {
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.payment-title {
  color: #666;
  margin: 0 0 0.75rem 0;
  font-weight: 500;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.payment-badge {
  background: #f0f0f0;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #555;
  white-space: nowrap;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.required-note {
  margin-top: 1rem;
  color: #999;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 768px) {
  .form-title {
    font-size: 1.3rem;
    padding: 1rem;
  }
  
  .form-container {
    padding: 1rem;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .selected-event {
    margin: 0.75rem;
    padding: 1rem;
  }
  
  .quantity-selector {
    max-width: 100%;
  }
  
  .payment-methods {
    flex-direction: column;
  }
  
  .payment-badge {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .phone-input {
    flex-direction: column;
    align-items: stretch;
  }
  
  .phone-prefix {
    text-align: center;
  }
  
  .price-row {
    font-size: 0.95rem;
  }
  
  .price-row.total {
    font-size: 1.1rem;
  }
}
</style>