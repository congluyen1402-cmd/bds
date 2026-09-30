import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_LISTINGS = [
  {
    id: "p1",
    title: "Biệt Thự Ven Sông Thảo Điền",
    slug: "biet-thu-ven-song-thao-dien",
    listingCode: "BT-001",
    type: "Biệt thự",
    status: "ACTIVE",
    price: 150,
    area: 800,
    bedrooms: 6,
    bathrooms: 7,
    address: "Quận 2, TP.HCM",
    description: "Biệt thự ven sông đẳng cấp.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1613490908578-752119eb1499?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600607687931-cebf559d3326?q=80&w=1200'
    ]),
    badges: JSON.stringify(["Độc quyền"]),
    amenities: JSON.stringify([]),
    isExclusive: true
  },
  {
    id: "p2",
    title: "Penthouse The Vertex",
    slug: "penthouse-the-vertex",
    listingCode: "PH-001",
    type: "Căn hộ cao cấp",
    status: "ACTIVE",
    price: 85,
    area: 450,
    bedrooms: 4,
    bathrooms: 5,
    address: "Quận 1, TP.HCM",
    description: "Penthouse trung tâm.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200'
    ]),
    badges: JSON.stringify(["Mới"]),
    amenities: JSON.stringify([]),
    isExclusive: true
  },
  {
    id: "p3",
    title: "Nhà Phố Hiện Đại",
    slug: "nha-pho-hien-dai",
    listingCode: "NP-001",
    type: "Nhà phố",
    status: "ACTIVE",
    price: 45,
    area: 200,
    bedrooms: 4,
    bathrooms: 5,
    address: "Quận 3, TP.HCM",
    description: "Nhà phố trung tâm.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200', 
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600573472592-401b489a8039?q=80&w=1200'
    ]),
    badges: JSON.stringify(["Đã thẩm định pháp lý"]),
    amenities: JSON.stringify([]),
    isExclusive: true
  },
  {
    id: "p4",
    title: "Căn Hộ Hạng Sang",
    slug: "can-ho-hang-sang",
    listingCode: "CH-001",
    type: "Căn hộ cao cấp",
    status: "ACTIVE",
    price: 32,
    area: 150,
    bedrooms: 3,
    bathrooms: 3,
    address: "Quận 1, TP.HCM",
    description: "Căn hộ cao cấp.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1200', 
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200'
    ]),
    badges: JSON.stringify([]),
    amenities: JSON.stringify([]),
    isExclusive: false
  },
  {
    id: "p5",
    title: "Biệt Thự Vườn",
    slug: "biet-thu-vuon",
    listingCode: "BT-002",
    type: "Biệt thự",
    status: "ACTIVE",
    price: 110,
    area: 600,
    bedrooms: 5,
    bathrooms: 6,
    address: "Quận 7, TP.HCM",
    description: "Biệt thự vườn phong cách nghỉ dưỡng.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200', 
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'
    ]),
    badges: JSON.stringify(["Mới"]),
    amenities: JSON.stringify([]),
    isExclusive: false
  },
  {
    id: "p6",
    title: "Căn Hộ Ven Sông",
    slug: "can-ho-ven-song",
    listingCode: "CH-002",
    type: "Căn hộ cao cấp",
    status: "ACTIVE",
    price: 28,
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    address: "Thủ Thiêm, TP. Thủ Đức",
    description: "Căn hộ view sông Sài Gòn.",
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200', 
      'https://images.unsplash.com/photo-1560250057-3b24ddb59f3d?q=80&w=1200', 
      'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1200'
    ]),
    badges: JSON.stringify([]),
    amenities: JSON.stringify([]),
    isExclusive: false
  }
]

async function main() {
  console.log(`Bắt đầu seed listings...`)
  for (const listing of INITIAL_LISTINGS) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: listing,
      create: listing
    })
    console.log(`Đã seed: ${listing.title}`)
  }
  console.log(`Seeding hoàn tất!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
