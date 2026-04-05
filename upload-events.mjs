import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const events = [
    {
        id: 1,
        date: "02",
        month: "November",
        title: "Morning Star School",
        description: "A service of light and silence.",
        time: "23:00",
        images: [
            "/images/morningstar/Canon Canon EOS R-6720x4480-32889472-1.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-26441408.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-28494848.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-29567936.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-31989568.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-34389120.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-38757632.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-38898240.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-44260608.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-44553088.jpg",
            "/images/morningstar/Canon Canon EOS R-6720x4480-46484480.jpg",
            "/images/morningstar/IMG_20251110_225206_154.jpg",
            "/images/morningstar/IMG_20251112_023421_853.jpg",
            "/images/morningstar/IMG_20251112_024134_742.jpg",
            "/images/morningstar/IMG_20251112_024243_215.jpg",
            "/images/morningstar/IMG_20251113_201108_776.jpg",
        ],
    },
    {
        id: 2,
        date: "11",
        month: "October",
        title: "Temple Christian",
        description: "Open table. Everyone welcome.",
        time: "18:00",
        images: [
            "/images/templechrist/vuiuibnin.jpg",
            "/images/templechrist/wsxqwxqxsswaaaaa.jpg",
            "/images/templechrist/yuviubub.jpg",
            "/images/templechrist/5eye5y5y.jpg",
            "/images/templechrist/IMG_20251204_190939_808.jpg",
            "/images/templechrist/IMG_20251204_190942_530.jpg",
            "/images/templechrist/IMG_20251204_190951_412.jpg",
            "/images/templechrist/IMG_20251204_190955_272.jpg",
            "/images/templechrist/IMG_20251204_191003_676.jpg",
            "/images/templechrist/IMG_20251204_191037_465.jpg",
            "/images/templechrist/IMG_20251204_191042_799.jpg",
            "/images/templechrist/IMG_20251204_191102_785.jpg",
            "/images/templechrist/djdfjdhj.jpg",
            "/images/templechrist/home.jpg",
            "/images/templechrist/egeebgdgb.jpg",
        ],
    },
    {
        id: 4,
        date: "16",
        month: "October",
        title: "Faith Montessori",
        description: "A day of guided contemplation.",
        time: "09:00 - 16:00",
        images: [
            "/images/faithmonti/A04A0012.jpg",
            "/images/faithmonti/A04A0056.jpg",
            "/images/faithmonti/A04A9935.jpg",
            "/images/faithmonti/A04A9958.jpg",
            "/images/faithmonti/A04A9980.jpg",
            "/images/faithmonti/A04A0004.jpg",
            "/images/faithmonti/A04A0043.jpg",
            "/images/faithmonti/A04A0049.jpg",
            "/images/faithmonti/A04A0059.jpg",
            "/images/faithmonti/A04A0060-1.jpg",
            "/images/faithmonti/A04A9931.jpg",
            "/images/faithmonti/A04A9915.jpg",
            "/images/faithmonti/A04A9942.jpg",
            "/images/faithmonti/A04A9946.jpg",
            "/images/faithmonti/A04A9951.jpg",
            "/images/faithmonti/A04A9992.jpg",
            "/images/faithmonti/A04A9994.jpg",
        ],
    },
];

async function uploadEvents() {
    console.log('Starting upload...');

    for (const event of events) {
        console.log(`\nUploading event: ${event.title}`);

        try {
            const formData = new FormData();
            formData.append('day', event.date);
            formData.append('month', event.month);
            formData.append('title', event.title);
            formData.append('description', event.description);
            formData.append('time', event.time);
            formData.append('progress', '100'); // Dummy progress

            // Process images
            for (const imgPath of event.images) {
                const fullPath = path.join(process.cwd(), 'public', imgPath);

                if (fs.existsSync(fullPath)) {
                    const fileBuffer = fs.readFileSync(fullPath);
                    const fileName = path.basename(fullPath);
                    // Determine mime type correctly if possible or default array buffer
                    const mimeType = fileName.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
                    const blob = new Blob([fileBuffer], { type: mimeType });

                    formData.append('images', blob, fileName);
                    console.log(`Found image: ${fileName}`);
                } else {
                    console.warn(`File not found: ${fullPath}`);
                }
            }

            const postRes = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                body: formData
            });

            const postData = await postRes.json();
            console.log(`Upload status for ${event.title}:`, postRes.status);
            console.log('Response:', postData);

        } catch (err) {
            console.error(`Failed to upload ${event.title}:`, err.message);
        }
    }
}

uploadEvents();