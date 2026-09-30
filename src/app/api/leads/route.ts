import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal('')),
  preferredType: z.string().optional(),
  budget: z.number().optional(),
  source: z.string().default('CONTACT_FORM'),
  notes: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = leadSchema.parse(body);

    // Create the lead
    const lead = await prisma.lead.create({
      data: {
        ...validated,
        status: 'NEW',
      }
    });

    // In a real scenario, trigger email/Zalo webhook notification to the assigned agent here
    
    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to submit contact' }, { status: 500 });
  }
}
