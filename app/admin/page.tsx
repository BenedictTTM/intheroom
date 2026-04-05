'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Image = {
  id: string;
  url: string;
  publicId: string;
};

type Event = {
  id: string;
  day: number;
  month: string;
  title: string;
  description: string;
  time: string;
  progress: number;
  images: Image[];
};

const EventGallery = ({ images, title }: { images: Image[]; title: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8 relative group">
      <button type="button" onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((img) => (
          <div key={img.id} className="relative h-40 w-64 md:h-48 md:w-72 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
            <img src={img.url} alt={`${title} image`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // UX: Reactive states for form feedback
  const [localProgress, setLocalProgress] = useState<number>(65);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Protect admin route on the client: require prior login via localStorage flag
    try {
      const isAdmin = typeof window !== 'undefined' ? localStorage.getItem('intheroom_admin') : null;
      if (isAdmin !== 'true') {
        router.push('/admin/login');
        return;
      }
    } catch (e) {
      router.push('/admin/login');
      return;
    }

    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...urls]);
    }
  };

  const handleDeleteExistingImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
      if (editingEvent) {
        setEditingEvent({
          ...editingEvent,
          images: editingEvent.images.filter((img) => img.id !== imageId),
        });
      }
      fetchEvents();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const scrollPreview = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingEvent) {
        // PATCH only scalar fields for now
        await fetch(`/api/events/${editingEvent.id}`, {
          method: 'PATCH',
          body: formData,
        });
      } else {
        // POST new event complete with images
        await fetch('/api/events', {
          method: 'POST',
          body: formData,
        });
      }
      setEditingEvent(null);
      setLocalProgress(65);
      setImagePreviews([]);
      (e.target as HTMLFormElement).reset();
      fetchEvents();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setLoading(true);
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    fetchEvents();
    setLoading(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setLocalProgress(event.progress);
    setImagePreviews([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setLocalProgress(65);
    setImagePreviews([]);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('intheroom_admin');
    } catch (e) {
      // ignore
    }
    router.push('/admin/login');
  };

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 md:space-y-12 overflow-x-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">Event Admin Dashboard</h1>
        <button onClick={handleLogout} className="ml-4 px-3 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
          Logout
        </button>
      </div>

      <section className="bg-white border p-4 md:p-6 rounded-2xl shadow-sm space-y-4 md:space-y-6 relative max-w-3xl">
        <button 
          onClick={cancelEdit}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Configure your event details and visibility.</p>
        </div>

        <form key={editingEvent?.id || 'new'} onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                EVENT NAME
              </label>
              <input type="text" name="title" defaultValue={editingEvent?.title} required placeholder="Design Conference 2024" className="w-full border p-2 md:p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                EVENT TYPE / DESCRIPTION
              </label>
              <input type="text" name="description" defaultValue={editingEvent?.description} required placeholder="Conference" className="w-full border p-2 md:p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div className="space-y-1.5 md:space-y-2 flex gap-2">
              <div className="flex-1 space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                  MONTH
                </label>
                <input type="text" name="month" defaultValue={editingEvent?.month} required placeholder="Oct" className="w-full border p-2 md:p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="flex-1 space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                  DAY
                </label>
                <input type="number" name="day" defaultValue={editingEvent?.day} required placeholder="15" className="w-full border p-2 md:p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                START TIME
              </label>
              <input type="text" name="time" defaultValue={editingEvent?.time} required placeholder="9:00 AM" className="w-full border p-2 md:p-2.5 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>

          {/* Planning Progress */}
          <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-100 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase">PLANNING PROGRESS</label>
              <span className="bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full transition-all">
                {localProgress}% Complete
              </span>
            </div>
            <input 
              type="range" 
              name="progress" 
              min="0" 
              max="100" 
              value={localProgress}
              onChange={(e) => setLocalProgress(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 md:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
            />
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 flex justify-between">
              <span>Update this to reflect current status to stakeholders.</span>
              <span className="font-mono text-gray-500">{localProgress}/100</span>
            </p>
          </div>

          {/* Event Banner */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase">
                {editingEvent ? "ADD MORE IMAGES (EVENT BANNER)" : "EVENT BANNER"}
              </label>
              {editingEvent && editingEvent.images && (
                <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full">
                  {editingEvent.images.length} Existing
                </span>
              )}
            </div>
            
            <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-4 md:p-6 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
              <input 
                type="file" 
                name="images" 
                multiple 
                accept="image/*" 
                required={!editingEvent} 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="bg-white p-2 md:p-3 rounded-full shadow-sm mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <p className="text-xs md:text-sm text-gray-700 font-semibold">Click to upload or drag and drop</p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
            
            {/* Image Previews (Existing + New) */}
            {((editingEvent?.images?.length || 0) > 0 || imagePreviews.length > 0) && (
              <div className="relative group/gallery">
                <button 
                  type="button" 
                  onClick={() => scrollPreview('left')} 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white border border-gray-200 text-gray-600 p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-all opacity-0 group-hover/gallery:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                
                <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto py-2 scroll-smooth scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {editingEvent?.images?.map((img) => (
                    <div key={img.id} className="relative h-24 w-36 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm group/item">
                      <img src={img.url} alt="Existing upload" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">Uploaded</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); handleDeleteExistingImage(img.id); }}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-all transform scale-90 hover:scale-100 shadow-sm z-20"
                        title="Delete image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  
                  {imagePreviews.map((url, index) => (
                    <div key={`new-${index}`} className="relative h-24 w-36 flex-shrink-0 rounded-lg overflow-hidden border-2 border-blue-500 shadow-sm group/item">
                      <img src={url} alt={`New Preview ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        New
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); handleRemoveNewImage(index); }}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-all transform scale-90 hover:scale-100 shadow-sm z-20"
                        title="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => scrollPreview('right')} 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white border border-gray-200 text-gray-600 p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-all opacity-0 group-hover/gallery:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            {editingEvent && (
              <button type="button" onClick={cancelEdit} className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50 transition-all">
              {loading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Manage Events</h2>
        {events.length === 0 && <p className="text-gray-500">No events found.</p>}
        <div className="flex flex-col gap-8">
          {events.map((event) => (
            <div key={event.id} className="relative overflow-hidden rounded-sm border border-gray-200 bg-white p-8 transition-all duration-500 hover:shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  {/* Date */}
                  <div className="flex flex-col min-w-[120px]">
                    <span className="font-sans text-6xl md:text-7xl font-extralight leading-none text-[#F7931E]">
                      {event.day}
                    </span>
                    <span className="font-serif text-xl md:text-2xl italic text-gray-400 mt-2">
                      {event.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-2 md:pt-2 min-w-0">
                    <h3 className="font-serif text-2xl md:text-3xl text-gray-900">
                      {event.title}
                    </h3>
                    <p className="font-sans text-base md:text-lg font-light text-gray-600">
                      {event.description}
                    </p>
                    <span className="mt-2 font-sans text-sm tracking-widest text-[#F7931E]">
                      {event.time}
                    </span>
                  </div>

                  {/* Top Right Action - Edit Icon (replacing Calendar) */}
                  <button
                    className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#F7931E] hover:text-[#F7931E] md:mt-0"
                    aria-label="Edit Event"
                    onClick={() => handleEdit(event)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>

                {/* Image Gallery Preview */}
                <EventGallery images={event.images} title={event.title} />
                
                {/* Progress Bar placeholder from image */}
                <div className="mt-3 w-full h-4 bg-gray-100 rounded-sm overflow-hidden">
                   <div className="h-full bg-gray-200" style={{ width: `${event.progress}%` }}></div>
                </div>
              </div>

              {/* Admin Actions Footer */}
              <div className="mt-1 flex justify-end gap-3 pt-2 border-t border-gray-50">
                <button
                  onClick={() => handleEdit(event)}
                  className="px-6 py-1 rounded-lg font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  Edit details
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-6 py-1 rounded-lg font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
