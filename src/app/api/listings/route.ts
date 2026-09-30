import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, images, title, type, price, area, address } = body;
    
    const updateData: any = {};
    if (images !== undefined) updateData.images = images;
    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (area !== undefined) updateData.area = parseFloat(area);
    if (address !== undefined) updateData.address = address;

    const updated = await prisma.listing.update({
      where: { id },
      data: updateData
    });
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // generate a unique slug and listing code
    const slug = "listing-" + Date.now();
    const listingCode = "L-" + Math.floor(Math.random() * 10000);

    const newListing = await prisma.listing.create({
      data: {
        title: body.title || "Bất động sản mới",
        slug: slug,
        listingCode: listingCode,
        type: body.type || "Căn hộ cao cấp",
        status: "ACTIVE",
        price: parseFloat(body.price) || 0,
        area: parseFloat(body.area) || 0,
        address: body.address || "TP.HCM",
        description: "Mô tả đang cập nhật...",
        images: "[]",
        badges: "[]",
        amenities: "[]",
        isExclusive: true
      }
    });
    revalidatePath("/");
    return NextResponse.json(newListing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
