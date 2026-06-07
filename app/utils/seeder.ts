import { faker } from '@faker-js/faker'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

export const SeederService = {
  generateSingleUser(): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.personPortrait(),
      role: faker.person.jobTitle(),
    }
  },

  generateUsers(count: number = 5): User[] {
    return Array.from({ length: count }, () => this.generateSingleUser())
  },

  clearUsers(): User[] {
    return []
  }
}