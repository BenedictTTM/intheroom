const fs = require('fs');

let content = fs.readFileSync('app/admin/page.tsx', 'utf-8');

// 1. Imports
content = content.replace(
    "import { useState, useEffect } from 'react';",
    "import { useState, useEffect, useRef } from 'react';"
);

// 2. Add EventImageGallery component
const gallery_component = `
const EventImageGallery = ({ images, title }: { images: Image[], title: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-8 group">
      <button 
        type="button"
        onClick={(e) => { e.preventDefault(); scroll('left'); }} 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-orange-500"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {images.map((img) => (
          <div key={img.id} className="relative h-40 w-64 md:h-48 md:w-72 flex-shrink-0 overflow-hidden rounded-md snap-start border border-gray-100">
            <img src={img.url} alt={\`\${title} image\`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      <button 
        type="button"
        onClick={(e) => { e.preventDefault(); scroll('right'); }} 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-orange-500"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default function AdminDashboard() {`;

content = content.replace("export default function AdminDashboard() {", gallery_component);

// 3. Add imageFiles state
content = content.replace(
    "const [imagePreviews, setImagePreviews] = useState<string[]>([]);",
    "const [imagePreviews, setImagePreviews] = useState<string[]>([]);\n  const [imageFiles, setImageFiles] = useState<File[]>([]);"
);

// 4. Handle Image Change
const new_image_handler = `  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...urls]);
      setImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeNewImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleDeleteExistingImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await fetch(\`/api/images/\${imageId}\`, { method: 'DELETE' });
      if (editingEvent) {
        setEditingEvent({
          ...editingEvent,
          images: editingEvent.images.filter((img) => img.id !== imageId),
        });
      }
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };`;

content = content.replace(/const handleImageChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{[\s\S]*?\};/, new_image_handler);

// 5. Handle submit
content = content.replace(
    "const formData = new FormData(e.currentTarget);",
    "const formData = new FormData(e.currentTarget);\n    imageFiles.forEach(file => formData.append('images', file));"
);

content = content.replace("setImagePreviews([]);\n      (e.target", "setImagePreviews([]);\n      setImageFiles([]);\n      (e.target");

content = content.replace(
    "window.scrollTo({ top: 0, behavior: 'smooth' });",
    "setImageFiles([]);\n    window.scrollTo({ top: 0, behavior: 'smooth' });"
);

content = content.replace(
    "setImagePreviews([]);\n  };\n",
    "setImagePreviews([]);\n    setImageFiles([]);\n  };\n"
);

// 6. HTML replace
content = content.replace(
    "<input \n                type=\"file\" \n                name=\"images\" \n                multiple \n                accept=\"image/*\" \n                required={!editingEvent} ",
    "<input \n                type=\"file\" \n                multiple \n                accept=\"image/*\" \n                required={!editingEvent && imageFiles.length === 0} "
);

const new_previews = `{/* Image Previews (Existing + New) */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {editingEvent?.images?.map((img) => (
                <div key={img.id} className="relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm opacity-60 group/img">
                  <img src={img.url} alt="Existing upload" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">UPLOADED</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteExistingImage(img.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity z-20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
              
              {imagePreviews.map((url, index) => (
                <div key={\`new-\${index}\`} className="relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-blue-500 shadow-sm group/img">
                  <img src={url} alt={\`New Preview \${index}\`} className="w-full h-full object-cover" />
                  <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 pointer-events-none">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity z-20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>`;

content = content.replace(/\{\/\* Image Previews \(Existing \+ New\) \*\/\}.*?<\/div>\s*<\/div>\s*<div className="flex justify-end"/s, new_previews + '\n          </div>\n\n          <div className="flex justify-end"');

// 7. Replace Gallery map with component
const old_gallery = `{/* Image Gallery Preview */}
                {event.images && event.images.length > 0 && (
                  <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {event.images.map((img) => (
                      <div key={img.id} className="relative h-40 w-64 md:h-48 md:w-72 flex-shrink-0 overflow-hidden rounded-md">
                        <img src={img.url} alt={\`\${event.title} image\`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}`;
content = content.replace(old_gallery, `{/* Image Gallery Preview */}
                {event.images && event.images.length > 0 && (
                  <EventImageGallery images={event.images} title={event.title} />
                )}`);

fs.writeFileSync('app/admin/page.tsx', content, 'utf-8');
