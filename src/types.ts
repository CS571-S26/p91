export interface Restaurant {
  id: string
  name: string
  description: string
  foodTypes: string[]
  budget: number // 1-4 ($ to $$$$)
  distance: number // in miles from Bascom Hill
  rating: number
  imageUrl: string
  address: string
  hours: string
  phone: string
  website: string
}

export interface HistoryItem extends Restaurant {
  timestamp: number
}

export type ModalType = 'success' | 'alert' | 'notice' | 'fail'

export interface GlobalModalState {
  isOpen: boolean
  type: ModalType
  message: string
}
