import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteImage, uploadImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch the event with its nested images
    const event = await prisma.event.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Delete images from Cloudinary
    for (const image of event.images) {
      if (image.publicId) {
        await deleteImage(image.publicId);
      }
    }

    // Delete the event from the database
    // Prisma `onDelete: Cascade` will automatically delete the related images
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Event and associated images deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const formData = await request.formData();
    
    // Parse fields safely (assuming partial updates)
    const data: any = {};
    if (formData.has('day')) data.day = parseInt(formData.get('day') as string);
    if (formData.has('month')) data.month = formData.get('month') as string;
    if (formData.has('title')) data.title = formData.get('title') as string;
    if (formData.has('description')) data.description = formData.get('description') as string;
    if (formData.has('time')) data.time = formData.get('time') as string;
    if (formData.has('progress')) data.progress = parseFloat(formData.get('progress') as string);

    // Process any new images added during an edit
    const imageFiles = formData.getAll('images') as File[];
    const uploadedImages = [];

    // Filter out empty file objects (which can happen if the input is left blank)
    const validFiles = imageFiles.filter((file) => file.size > 0);

    for (const file of validFiles) {
      const uploaded = await uploadImage(file);
      uploadedImages.push(uploaded);
    }

    if (uploadedImages.length > 0) {
      data.images = {
        create: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      };
    }
    
    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
