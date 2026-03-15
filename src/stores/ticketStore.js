import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    events: [
      {
        id: 1,
        title: 'Concert de Youssou Ndour',
        date: '2026-07-15',
        time: '21:00',
        venue: 'Grand Théâtre de Dakar',
        address: 'Boulevard de la République, Dakar',
        price: 15000, // Prix en FCFA
        availableTickets: 500,
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
        description: 'Une soirée exceptionnelle avec le roi du mbalax'
      },
      {
        id: 2,
        title: 'Festival de Jazz de Saint-Louis',
        date: '2026-07-20',
        time: '19:30',
        venue: 'Place Faidherbe',
        address: 'Saint-Louis, Sénégal',
        price: 10000,
        availableTickets: 300,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
        description: 'Le plus grand festival de jazz d\'Afrique de l\'Ouest'
      },
      {
        id: 3,
        title: 'Match de lutte sénégalaise',
        date: '2026-07-25',
        time: '17:00',
        venue: 'Arène nationale de Pikine',
        address: 'Pikine, Dakar',
        price: 5000,
        availableTickets: 1000,
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
        description: 'Grand combat de lutte avec les meilleurs champions'
      },
      {
        id: 4,
        title: 'Exposition d\'art contemporain',
        date: '2026-08-01',
        time: '10:00',
        venue: 'Village des Arts',
        address: 'Route de Ouakam, Dakar',
        price: 3000,
        availableTickets: 200,
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
        description: 'Découvrez les artistes sénégalais émergents'
      },
      {
        id: 5,
        title: 'Festival international de folklore',
        date: '2026-08-10',
        time: '16:00',
        venue: 'Place de l\'Obélisque',
        address: 'Dakar, Sénégal',
        price: 7500,
        availableTickets: 800,
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
        description: 'Danses et musiques traditionnelles du monde'
      }
    ],
    selectedEvent: null,
    quantity: 1,
    userInfo: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      ville: 'Dakar',
      quartier: ''
    },
    reservations: [],
    regions: [
      'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga', 
      'Fatick', 'Kaolack', 'Kaffrine', 'Tambacounda', 'Kédougou',
      'Kolda', 'Sédhiou', 'Ziguinchor', 'Matam'
    ]
  }),

  getters: {
    totalPrice: (state) => {
      if (!state.selectedEvent) return 0
      return state.selectedEvent.price * state.quantity
    },
    totalPriceFormatted: (state) => {
      if (!state.selectedEvent) return '0 FCFA'
      const total = state.selectedEvent.price * state.quantity
      return new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(total)
    },
    availableTicketsForSelected: (state) => {
      if (!state.selectedEvent) return 0
      return state.selectedEvent.availableTickets
    }
  },

  actions: {
    selectEvent(event) {
      this.selectedEvent = event
      this.quantity = 1
    },
    updateQuantity(quantity) {
      if (quantity >= 1 && quantity <= this.availableTicketsForSelected) {
        this.quantity = quantity
      }
    },
    updateUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    makeReservation() {
      if (this.selectedEvent && this.quantity > 0 && this.userInfo.nom && this.userInfo.prenom && this.userInfo.email && this.userInfo.telephone) {
        const reservation = {
          id: Date.now(),
          reservationNumber: `TKT-${Date.now().toString().slice(-8)}`,
          event: this.selectedEvent,
          quantity: this.quantity,
          totalPrice: this.totalPrice,
          userInfo: { ...this.userInfo },
          date: new Date().toISOString(),
          paymentMethod: 'orange-money' // Par défaut
        }
        
        this.reservations.push(reservation)
        
        // Mettre à jour les tickets disponibles
        const eventIndex = this.events.findIndex(e => e.id === this.selectedEvent.id)
        if (eventIndex !== -1) {
          this.events[eventIndex].availableTickets -= this.quantity
        }
        
        this.selectedEvent = null
        this.quantity = 1
        this.userInfo = { 
          nom: '', 
          prenom: '',
          email: '', 
          telephone: '',
          adresse: '',
          ville: 'Dakar',
          quartier: ''
        }
        
        return reservation
      }
      return null
    }
  }
})