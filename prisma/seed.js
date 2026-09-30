const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create Users (Owner, Manager, Agents)
  const password = await bcrypt.hash('admin123', 10)
  
  const owner = await prisma.user.upsert({
    where: { email: 'owner@luxury.vn' },
    update: {},
    create: {
      email: 'owner@luxury.vn',
      name: 'CEO Trần',
      password,
      role: 'OWNER',
    },
  })

  const agent1 = await prisma.user.upsert({
    where: { email: 'agent1@luxury.vn' },
    update: {},
    create: {
      email: 'agent1@luxury.vn',
      name: 'Quang Minh',
      password,
      role: 'AGENT',
    },
  })

  // Create Listings
  const listingsData = [
    {
      title: 'Penthouse The Vertex Quận 1',
      slug: 'penthouse-the-vertex-q1',
      listingCode: 'VTX-PH-01',
      type: 'Căn hộ',
      status: 'ACTIVE',
      price: 85000000000,
      area: 450,
      bedrooms: 4,
      bathrooms: 5,
      direction: 'Đông Nam',
      description: 'Siêu phẩm Penthouse trung tâm Quận 1...',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9']),
      badges: JSON.stringify(['Độc quyền', 'Mới']),
      amenities: JSON.stringify(['Hồ bơi riêng', 'Smart Home']),
      address: 'Quận 1, TP.HCM',
      isExclusive: true,
      legalVerified: true,
      agentId: owner.id
    },
    {
      title: 'Biệt Thự Ven Sông Thảo Điền',
      slug: 'biet-thu-ven-song-thao-dien',
      listingCode: 'TD-VIL-09',
      type: 'Biệt thự',
      status: 'ACTIVE',
      price: 150000000000,
      area: 800,
      landArea: 1000,
      bedrooms: 6,
      bathrooms: 7,
      direction: 'Nam',
      description: 'Biệt thự siêu sang view trực diện sông Sài Gòn...',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c']),
      badges: JSON.stringify(['Đã thẩm định pháp lý']),
      amenities: JSON.stringify(['Sân vườn', 'Bến du thuyền']),
      address: 'Thảo Điền, Quận 2, TP.HCM',
      isExclusive: true,
      legalVerified: true,
      agentId: agent1.id
    }
  ]

  for (const data of listingsData) {
    await prisma.listing.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    })
  }

  // Create CRM Leads
  const leadsData = [
    {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@gmail.com',
      budget: 90000000000,
      preferredType: 'Căn hộ',
      source: 'CONTACT_FORM',
      status: 'NEW',
      agentId: agent1.id
    },
    {
      name: 'Trần Thị B',
      phone: '0987654321',
      budget: 200000000000,
      preferredType: 'Biệt thự',
      source: 'ZALO',
      status: 'NEGOTIATING',
      agentId: owner.id
    }
  ]

  for (const ld of leadsData) {
    await prisma.lead.create({
      data: ld
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
