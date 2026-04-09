import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GlobalModalState, HistoryItem, ModalType, Restaurant } from '../types'

interface AppState {
  history: HistoryItem[]
  favorites: Restaurant[]
  lastGenerated: Restaurant[] | null
  globalModal: GlobalModalState

  addToHistory: (restaurant: Restaurant) => void
  removeFromHistory: (timestamp: number) => void
  toggleFavorite: (restaurant: Restaurant) => void
  isFavorite: (id: string) => boolean
  setLastGenerated: (restaurants: Restaurant[]) => void
  showModal: (type: ModalType, message: string) => void
  hideModal: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      history: [],
      favorites: [],
      lastGenerated: null,
      globalModal: { isOpen: false, type: 'notice', message: '' },

      addToHistory: (restaurant) =>
        set((state) => ({
          history: [{ ...restaurant, timestamp: Date.now() }, ...state.history],
        })),

      removeFromHistory: (timestamp) =>
        set((state) => ({
          history: state.history.filter((item) => item.timestamp !== timestamp),
        })),

      toggleFavorite: (restaurant) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.id === restaurant.id)
          if (exists) {
            return { favorites: state.favorites.filter((f) => f.id !== restaurant.id) }
          } else {
            return { favorites: [...state.favorites, restaurant] }
          }
        }),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      setLastGenerated: (restaurants) => set({ lastGenerated: restaurants }),

      showModal: (type, message) => set({ globalModal: { isOpen: true, type, message } }),

      hideModal: () => set({ globalModal: { isOpen: false, type: 'notice', message: '' } }),
    }),
    {
      name: 'madison-meal-spinner-storage',
      partialize: (state) => ({
        history: state.history,
        favorites: state.favorites,
        lastGenerated: state.lastGenerated,
      }),
    },
  ),
)
