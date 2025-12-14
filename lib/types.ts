export interface InviteFormData {
  eventTitle: string
  eventType: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventDescription: string
  name1: string
  name2: string
  email: string
  phone: string
  photos: string[]
  message: string
  musicUrl: string
}

export interface InviteData extends InviteFormData {
  id: string
  theme: string
  plan: string
  createdAt: string
}

export interface RsvpData {
  name: string
  email: string
  attending: 'yes' | 'maybe' | 'no'
}

export interface Prices {
  [key: string]: {
    amount: string
    currency: string
  }
}

export type Plan = 'basic' | 'premium'
