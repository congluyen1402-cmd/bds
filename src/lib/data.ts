export type Property = {
  id: string;
  title: string;
  price: number;
  priceStr: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  images: string[];
  badges: string[];
  direction: string;
  legalStatus: string;
  type: string;
  pricePerSqm: number;
  amenities: string[];
  distanceToKeyPlaces: { name: string; time: string }[];
};

// Mock data to be swapped with public read-only API later
export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Penthouse The Vertex",
    price: 85000000000,
    priceStr: "85 Tỷ",
    area: 450,
    bedrooms: 4,
    bathrooms: 5,
    location: "Quận 1, TP.HCM",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687931-cebf559d3326?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    badges: ["Độc quyền", "Đã thẩm định pháp lý"],
    direction: "Đông Nam",
    legalStatus: "Sổ hồng sở hữu lâu dài",
    type: "Căn hộ cao cấp",
    pricePerSqm: 188000000,
    amenities: ["Hồ bơi vô cực", "Phòng Gym", "Khu BBQ", "Smart Home"],
    distanceToKeyPlaces: [
      { name: "Sân bay Tân Sơn Nhất", time: "20 phút" },
      { name: "Chợ Bến Thành", time: "5 phút" }
    ]
  },
  {
    id: "p2",
    title: "Biệt Thự Chateau Quận 7",
    price: 150000000000,
    priceStr: "150 Tỷ",
    area: 800,
    bedrooms: 6,
    bathrooms: 7,
    location: "Phú Mỹ Hưng, Quận 7",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    badges: ["Mới", "Đã thẩm định pháp lý"],
    direction: "Nam",
    legalStatus: "Sổ hồng hoàn công",
    type: "Biệt thự",
    pricePerSqm: 187500000,
    amenities: ["Sân vườn", "Hồ bơi riêng", "Phòng rượu", "Bến du thuyền"],
    distanceToKeyPlaces: [
      { name: "TTTM Crescent Mall", time: "3 phút" },
      { name: "Bệnh viện FV", time: "5 phút" }
    ]
  },
  {
    id: "p3",
    title: "Sky Villa Thủ Thiêm",
    price: 65000000000,
    priceStr: "65 Tỷ",
    area: 320,
    bedrooms: 3,
    bathrooms: 4,
    location: "Thủ Thiêm, TP. Thủ Đức",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    badges: ["Đã bán"],
    direction: "Đông",
    legalStatus: "Sổ hồng",
    type: "Căn hộ cao cấp",
    pricePerSqm: 203000000,
    amenities: ["Thang máy riêng", "Vườn treo", "Sảnh đón sang trọng"],
    distanceToKeyPlaces: [
      { name: "Quận 1", time: "5 phút" }
    ]
  }
];
