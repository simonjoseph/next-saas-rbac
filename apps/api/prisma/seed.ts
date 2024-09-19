import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@me.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/50570879?v=4',
      passwordHash,
    },
  })

  const anotherUSer = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  const anotherUser2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'SaaS (Admin)',
      slug: 'saas',
      domain: 'saas.com',
      shouldAttachUsersByDomain: false,
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUSer.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'SaaS (Member)',
      slug: 'saas-member',
      domain: 'saas.ao',
      shouldAttachUsersByDomain: false,
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUSer.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'SaaS (Biling)',
      slug: 'saas-billing',
      domain: 'saas.com.ao',
      shouldAttachUsersByDomain: false,
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUSer.id,
                anotherUser2.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'BILLING',
            },
            {
              userId: anotherUSer.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(function () {
  console.log('Seeding done')
})
