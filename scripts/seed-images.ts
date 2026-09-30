import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_IMAGES = [
  {
    slotKey: 'hero_background',
    sectionName: 'Nền đầu trang (Hero)',
    description: 'Ảnh nền toàn màn hình cho phần hero. Khuyên dùng ảnh tối hoặc có độ tương phản tốt để chữ nổi bật.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000',
    altText: 'Biệt thự sang trọng lúc hoàng hôn',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'hero_video_poster',
    sectionName: 'Ảnh đại diện Video (Hero)',
    description: 'Ảnh hiển thị trước khi video bắt đầu chạy (nếu có tính năng video).',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000',
    altText: 'Video thumbnail',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'services_investment',
    sectionName: 'Dịch vụ: Tư vấn đầu tư',
    description: 'Hình ảnh cho dịch vụ tư vấn đầu tư.',
    imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1200',
    altText: 'Tư vấn đầu tư bất động sản',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'services_legal',
    sectionName: 'Dịch vụ: Thẩm định pháp lý',
    description: 'Hình ảnh cho dịch vụ thẩm định pháp lý.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200',
    altText: 'Thẩm định pháp lý',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'services_mortgage',
    sectionName: 'Dịch vụ: Hỗ trợ vay vốn',
    description: 'Hình ảnh cho dịch vụ vay ngân hàng.',
    imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1200',
    altText: 'Hỗ trợ vay ngân hàng',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'services_valuation',
    sectionName: 'Dịch vụ: Định giá',
    description: 'Hình ảnh cho dịch vụ định giá.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
    altText: 'Định giá bất động sản',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'services_rental',
    sectionName: 'Dịch vụ: Quản lý cho thuê',
    description: 'Hình ảnh cho dịch vụ cho thuê.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200',
    altText: 'Quản lý cho thuê',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'services_aftersales',
    sectionName: 'Dịch vụ: Chăm sóc sau bán',
    description: 'Hình ảnh cho dịch vụ sau bán hàng.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200',
    altText: 'Chăm sóc sau bán',
    recommendedSize: '800x1000px'
  },
  {
    slotKey: 'story_chapter_1',
    sectionName: 'Câu chuyện: Tầm nhìn',
    description: 'Hình nền cho chương 1 của Câu chuyện thương hiệu.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    altText: 'Tầm nhìn chiến lược',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'story_chapter_2',
    sectionName: 'Câu chuyện: Chọn lọc',
    description: 'Hình nền cho chương 2.',
    imageUrl: 'https://images.unsplash.com/photo-1600573472592-401b489a8039?q=80&w=1200',
    altText: 'Chọn lọc khắt khe',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'story_chapter_3',
    sectionName: 'Câu chuyện: Đồng hành',
    description: 'Hình nền cho chương 3.',
    imageUrl: 'https://images.unsplash.com/photo-1560250057-3b24ddb59f3d?q=80&w=1200',
    altText: 'Đồng hành trọn đời',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'story_chapter_4',
    sectionName: 'Câu chuyện: Bàn giao',
    description: 'Hình nền cho chương 4.',
    imageUrl: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1200',
    altText: 'Bàn giao chìa khóa',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'contact_office',
    sectionName: 'Hình nền liên hệ',
    description: 'Hình ảnh văn phòng làm nền cho form liên hệ.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
    altText: 'Văn phòng trụ sở',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'tour_preview_cover',
    sectionName: 'Ảnh xem trước 360°',
    description: 'Ảnh đại diện khi chưa load Iframe 360.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
    altText: 'Virtual Tour Preview',
    recommendedSize: '1200x800px'
  },
  {
    slotKey: 'trust_section_bg',
    sectionName: 'Nền phần Uy tín',
    description: 'Hình nền tĩnh mờ dưới phần Uy tín & Đội ngũ.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    altText: 'Tòa nhà sang trọng',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'viewing_cta_bg',
    sectionName: 'Nền phần CTA Đặt lịch',
    description: 'Hình nền khi khách hàng chuẩn bị đặt lịch xem nhà.',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200',
    altText: 'Không gian ấm cúng',
    recommendedSize: '1920x1080px'
  },
  {
    slotKey: 'map_placeholder',
    sectionName: 'Ảnh thay thế Bản đồ',
    description: 'Ảnh hiển thị thay bản đồ Google Maps khi chưa load.',
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200',
    altText: 'Bản đồ khu vực',
    recommendedSize: '800x600px'
  },
  {
    slotKey: 'footer_bg',
    sectionName: 'Nền chân trang (Footer)',
    description: 'Hình nền cho Footer, nên để rất mờ hoặc tối.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    altText: 'Nền tối Footer',
    recommendedSize: '1920x800px'
  }
]

async function main() {
  console.log(`Bắt đầu seed dữ liệu ảnh website...`)
  for (const img of INITIAL_IMAGES) {
    await prisma.siteImage.upsert({
      where: { slotKey: img.slotKey },
      update: {},
      create: img
    })
    console.log(`Đã thêm/kiểm tra ảnh: ${img.slotKey}`)
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
