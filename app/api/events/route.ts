import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse fields
    const day = parseInt(formData.get('day') as string);
    const month = formData.get('month') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const time = formData.get('time') as string;
    const progress = parseFloat(formData.get('progress') as string);
    
    // Validate required fields
    if (isNaN(day) || !month || !title || !description || !time || isNaN(progress)) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }

    const imageFiles = formData.getAll('images') as File[];
    const uploadedImages = [];

    // Upload images to Cloudinary
    for (const file of imageFiles) {
      if (file instanceof File) {
        const uploaded = await uploadImage(file);
        uploadedImages.push(uploaded);
      }
    }

    // Create event and images in database
    const event = await prisma.event.create({
      data: {
        day,
        month,
        title,
        description,
        time,
        progress,
        images: {
          create: uploadedImages.map((img) => ({
            url: img.url,
            publicId: img.publicId,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
