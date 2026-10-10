// The Agency's office and contact point.

export interface Office {
  id: string
  nameKey: string
  addressKey: string
  hoursKey: string
  phone: string
}

export const offices: Office[] = [
  {
    id: 'headquarters',
    nameKey: 'contact.offices.headquarters.name',
    addressKey: 'contact.offices.headquarters.address',
    hoursKey: 'contact.offices.headquarters.hours',
    phone: '+042408033310',
  },
]
