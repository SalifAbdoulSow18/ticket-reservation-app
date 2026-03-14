<template>
  <div class="event-card" @click="handleClick">
    <div class="event-image">
      <img :src="event.image" :alt="event.title" loading="lazy">
      <div class="event-badge" :class="availabilityClass">
        {{ event.availableTickets }} places
      </div>
    </div>
    
    <div class="event-details">
      <h3 class="event-title">{{ event.title }}</h3>
      
      <div class="event-info-grid">
        <div class="info-item">
          <span class="info-icon">📅</span>
          <span class="info-text">{{ formatDate(event.date) }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">⏰</span>
          <span class="info-text">{{ event.time }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📍</span>
          <span class="info-text">{{ event.venue }}</span>
        </div>
      </div>
      
      <p class="event-description">{{ truncateText(event.description, 80) }}</p>
      
      <div class="event-address">
        <span class="info-icon">🏠</span>
        <span class="address-text">{{ truncateText(event.address, 50) }}</span>
      </div>
      
      <div class="event-footer">
        <span class="event-price">{{ formatPrice(event.price) }}</span>
        <button class="btn-reserve">Réserver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    availabilityClass() {
      if (this.event.availableTickets > 100) return 'badge-high'
      if (this.event.availableTickets > 50) return 'badge-medium'
      return 'badge-low'
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-SN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatPrice(price) {
      return new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    },
    truncateText(text, maxLength) {
      if (!text) return ''
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },
    handleClick() {
      this.$emit('select', this.event)
    }
  }
}
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.event-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  flex-shrink: 0;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  z-index: 1;
  white-space: nowrap;
  max-width: calc(100% - 1.5rem);
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-high {
  background: #48bb78;
}

.badge-medium {
  background: #ecc94b;
  color: #333;
}

.badge-low {
  background: #f56565;
}

.event-details {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background: #f7fafc;
  padding: 0.75rem;
  border-radius: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #666;
  min-width: 0;
}

.info-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.info-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-address {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #888;
  font-size: 0.85rem;
  background: #f0f0f0;
  padding: 0.5rem;
  border-radius: 6px;
}

.address-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #e0e0e0;
}

.event-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #667eea;
  white-space: nowrap;
}

.btn-reserve {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;
}

.btn-reserve:hover {
  transform: scale(1.05);
}

.btn-reserve:active {
  transform: scale(0.95);
}

@media (max-width: 480px) {
  .event-image {
    height: 150px;
  }
  
  .event-details {
    padding: 1rem;
  }
  
  .event-info-grid {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
  
  .event-price {
    font-size: 1.1rem;
  }
  
  .btn-reserve {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
}
</style>