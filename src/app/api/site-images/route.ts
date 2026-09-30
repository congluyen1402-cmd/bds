import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const images = await prisma.siteImage.findMany();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site images" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { slotKey, imageUrl, mobileImageUrl, altText, focalPointX, focalPointY } = body;

    // Get current to push to history if imageUrl changed
    const current = await prisma.siteImage.findUnique({ where: { slotKey } });
    let historyStr = current?.history || "[]";
    
    if (current && current.imageUrl !== imageUrl) {
      let historyArr = JSON.parse(historyStr);
      historyArr.unshift({
        imageUrl: current.imageUrl,
        date: current.updatedAt
      });
      // Keep last 5
      historyArr = historyArr.slice(0, 5);
      historyStr = JSON.stringify(historyArr);
    }

    const updated = await prisma.siteImage.update({
      where: { slotKey },
      data: {
        imageUrl,
        mobileImageUrl,
        altText,
        focalPointX,
        focalPointY,
        history: historyStr
      }
    });

    revalidateTag("site-images");
    revalidatePath("/");

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site image" }, { status: 500 });
  }
}
