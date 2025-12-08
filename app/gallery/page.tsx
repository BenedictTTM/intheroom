import { GalleryGrid } from '@/components/GalleryGrid';

const TEMPLE_CHRIST_IMAGES = [
    '/images/templechrist/5eye5y5y.jpg',
    '/images/templechrist/IMG_20251204_190939_808.jpg',
    '/images/templechrist/IMG_20251204_190942_530.jpg',
    '/images/templechrist/IMG_20251204_190951_412.jpg',
    '/images/templechrist/IMG_20251204_190955_272.jpg',
    '/images/templechrist/IMG_20251204_191003_676.jpg',
    '/images/templechrist/IMG_20251204_191037_465.jpg',
    '/images/templechrist/IMG_20251204_191042_799.jpg',
    '/images/templechrist/IMG_20251204_191102_785.jpg',
    '/images/templechrist/djdfjdhj.jpg',
    '/images/templechrist/egeebgdgb.jpg',
    '/images/templechrist/home.jpg',
    '/images/templechrist/vuiuibnin.jpg',
    '/images/templechrist/wsxqwxqxsswaaaaa.jpg',
    '/images/templechrist/yuviubub.jpg',
];

const FAITH_MONTI_IMAGES = [
    '/images/faithmonti/A04A0004.jpg',
    '/images/faithmonti/A04A0012.jpg',
    '/images/faithmonti/A04A0043.jpg',
    '/images/faithmonti/A04A0049.jpg',
    '/images/faithmonti/A04A0056.jpg',
    '/images/faithmonti/A04A0059.jpg',
    '/images/faithmonti/A04A0060-1.jpg',
    '/images/faithmonti/A04A9915.jpg',
    '/images/faithmonti/A04A9931.jpg',
    '/images/faithmonti/A04A9935.jpg',
    '/images/faithmonti/A04A9942.jpg',
    '/images/faithmonti/A04A9946.jpg',
    '/images/faithmonti/A04A9951.jpg',
    '/images/faithmonti/A04A9958.jpg',
    '/images/faithmonti/A04A9980.jpg',
    '/images/faithmonti/A04A9992.jpg',
    '/images/faithmonti/A04A9994.jpg',
];

const MORNING_STAR_IMAGES = [
    '/images/morningstar/A04A9917.jpg',
    '/images/morningstar/A04A9922.jpg',
    '/images/morningstar/A04A9959.jpg',
    '/images/morningstar/A04A9960.jpg',
    '/images/morningstar/A04A9995.jpg',
];

const ATMOSPHERE_IMAGES = [
    '/images/church-atmosphere-1.jpg',
    '/images/church-atmosphere-2.jpg',
    '/images/church-atmosphere-3.jpg',
    '/images/church-atmosphere-4.jpg',
    '/images/church-detail-1.jpg',
    '/images/church-detail-2.jpg',
    '/images/church-interior-1.jpg',
    '/images/people-1.jpg',
    '/images/people-2.jpg',
    '/images/people-3.jpg',
];

export default function GalleryPage() {
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
            </div>
        </main>
    );
}
