import { Metadata } from 'next';
import { GalleryGrid } from '@/components/GalleryGrid';
import { PrismaClient } from '@prisma/client';

export const metadata: Metadata = {
    title: "Gallery",
    description: "A visual journey through In The Room Church moments of worship, community, outreach, and gathering. Browse photos from Temple Christ, Faith Monti, Morning Star, and more.",
    alternates: {
        canonical: "https://www.intheroom.site/gallery",
    },
    openGraph: {
        title: "Gallery | In The Room Church",
        description: "A visual journey through moments of worship, community, and silence with In The Room Church.",
        url: "https://www.intheroom.site/gallery",
    },
};

const prisma = new PrismaClient();

const TEMPLE_CHRIST_IMAGES = [
    '/images/templechrist/5eye5y5y.jpg',
    '/images/templechrist/IMG_20251204_190939_808.jpg',
    '/images/templechrist/IMG_20251204_190942_530.jpg',
];

const FAITH_MONTI_IMAGES = [
    '/images/faithmonti/A04A0004.jpg',
    '/images/faithmonti/A04A0012.jpg',
  
];

const MORNING_STAR_IMAGES = [
    '/images/morningstar/Canon Canon EOS R-6720x4480-26441408.jpg',
    '/images/morningstar/Canon Canon EOS R-6720x4480-28494848.jpg',
    '/images/morningstar/Canon Canon EOS R-6720x4480-29567936.jpg',
    '/images/morningstar/Canon Canon EOS R-6720x4480-31989568.jpg',

];

const ATMOSPHERE_IMAGES = [
    '/images/church-atmosphere-1.jpg',
    '/images/church-atmosphere-2.jpg',
];

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const dbImages = await prisma.image.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    const dynamicImages = dbImages.map(img => img.url);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] pt-24 pb-20">
            <div className="container mx-auto px-4">
                <header className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4 font-serif">
                        The Gallery
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto font-light tracking-wide">
                        A visual journey through our moments of worship, community, and silence.
                    </p>
                </header>

                <section className="mb-24">

                    <GalleryGrid images={TEMPLE_CHRIST_IMAGES} />
                </section>

                <section className="mb-24">

                    <GalleryGrid images={FAITH_MONTI_IMAGES} />
                </section>

                <section className="mb-24">

                    <GalleryGrid images={MORNING_STAR_IMAGES} />
                </section>

                <section>
                    <GalleryGrid images={ATMOSPHERE_IMAGES} />
                </section>

                {dynamicImages.length > 0 && (
                    <section className="mt-24">
                        <header className="mb-12 text-center">
                            <h2 className="text-3xl md:text-5xl font-light tracking-tight font-serif">
                                Recent Events
                            </h2>
                            <p className="text-white/60 mt-4 max-w-2xl mx-auto font-light tracking-wide">
                                Captured moments from our latest gatherings.
                            </p>
                        </header>
                        <GalleryGrid images={dynamicImages} />
                    </section>
                )}
            </div>
        </main>
    );
}
