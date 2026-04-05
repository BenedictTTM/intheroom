import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteImage } from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    if (image.publicId) {
      await deleteImage(image.publicId);
    }

    await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json(true);
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
