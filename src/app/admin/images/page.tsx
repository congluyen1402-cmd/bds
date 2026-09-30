"use client";

import { useState, useEffect } from "react";
import { Save, History, RefreshCcw, Target, Image as ImageIcon, Trash2, Plus, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type SiteImage = {
  slotKey: string;
  sectionName: string;
  description: string | null;
  imageUrl: string;
  altText: string;
  recommendedSize: string | null;
  focalPointX: number;
  focalPointY: number;
  history: string;
};

type Listing = {
  id: string;
  title: string;
  type: string;
  price: number;
  area: number;
  address: string;
  images: string; // JSON array of urls
};

export default function ImagesAdminPage() {
  const [activeTab, setActiveTab] = useState<"site" | "listings">("site");
  
  const [images, setImages] = useState<SiteImage[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/site-images").then(res => res.json()),
      fetch("/api/listings").then(res => res.json())
    ]).then(([siteData, listingsData]) => {
      setImages(siteData);
      setListings(listingsData);
      setLoading(false);
    });
  }, []);

  const handleUploadSiteImage = async (file: File, slotKey: string) => {
    setUploading(slotKey);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "site");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setImages(prev => prev.map(img => img.slotKey === slotKey ? { ...img, imageUrl: data.url } : img));
      }
    } catch (e) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleSaveSiteImage = async (img: SiteImage) => {
    setSaving(img.slotKey);
    try {
      const res = await fetch("/api/site-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(img),
      });
      if (res.ok) {
        const updated = await res.json();
        setImages(prev => prev.map(i => i.slotKey === img.slotKey ? updated : i));
        alert("Đã lưu thành công!");
      }
    } catch (e) {
      alert("Lưu thất bại");
    } finally {
      setSaving(null);
    }
  };

  const handleFocalPoint = (e: React.MouseEvent<HTMLDivElement>, slotKey: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setImages(prev => prev.map(img => img.slotKey === slotKey ? { ...img, focalPointX: x, focalPointY: y } : img));
  };

  const handleRestore = (slotKey: string, oldUrl: string) => {
    if (confirm("Khôi phục ảnh này?")) {
      setImages(prev => prev.map(img => img.slotKey === slotKey ? { ...img, imageUrl: oldUrl } : img));
    }
  };

  // Listings Handlers
  const handleCreateListing = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Bất động sản mới" })
      });
      if (res.ok) {
        const newListing = await res.json();
        setListings(prev => [newListing, ...prev]);
        alert("Đã tạo mục mới!");
      }
    } catch (e) {
      alert("Tạo thất bại");
    } finally {
      setCreating(false);
    }
  };

  const handleUploadListingImage = async (file: File, listingId: string) => {
    setUploading(listingId);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "listings");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setListings(prev => prev.map(l => {
          if (l.id === listingId) {
            const arr = l.images ? JSON.parse(l.images) : [];
            arr.push(data.url);
            return { ...l, images: JSON.stringify(arr) };
          }
          return l;
        }));
      }
    } catch (e) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveListingImage = (listingId: string, indexToRemove: number) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        const arr = l.images ? JSON.parse(l.images) : [];
        arr.splice(indexToRemove, 1);
        return { ...l, images: JSON.stringify(arr) };
      }
      return l;
    }));
  };

  // Drag and drop ordering
  const handleDragStart = (e: React.DragEvent, listingId: string, index: number) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ listingId, index }));
  };

  const handleDrop = (e: React.DragEvent, listingId: string, dropIndex: number) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.listingId === listingId && data.index !== dropIndex) {
        setListings(prev => prev.map(l => {
          if (l.id === listingId) {
            const arr = l.images ? JSON.parse(l.images) : [];
            const [movedItem] = arr.splice(data.index, 1);
            arr.splice(dropIndex, 0, movedItem);
            return { ...l, images: JSON.stringify(arr) };
          }
          return l;
        }));
      }
    } catch (err) {}
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleUpdateListingField = (listingId: string, field: string, value: any) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, [field]: value } : l));
  };

  const handleSaveListing = async (listing: Listing) => {
    setSaving(listing.id);
    try {
      const res = await fetch("/api/listings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: listing.id, 
          images: listing.images,
          title: listing.title,
          price: listing.price,
          area: listing.area,
          type: listing.type,
          address: listing.address
        }),
      });
      if (res.ok) {
        alert("Đã lưu thông tin và thư viện ảnh!");
      }
    } catch (e) {
      alert("Lưu thất bại");
    } finally {
      setSaving(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-navy/50">Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-navy mb-2">Quản lý Hình ảnh & Danh mục</h1>
        <p className="text-navy/70">Đồng bộ toàn bộ hình ảnh và dữ liệu BĐS ra giao diện khách hàng. Màu chữ đã được điều chỉnh cho rõ ràng trên nền sáng.</p>
      </div>

      <div className="flex border-b border-navy/20">
        <button 
          onClick={() => setActiveTab("site")}
          className={cn("px-6 py-3 font-semibold transition-colors border-b-2", activeTab === "site" ? "border-gold text-gold" : "border-transparent text-navy/50 hover:text-navy")}
        >
          Hình nền & Layout
        </button>
        <button 
          onClick={() => setActiveTab("listings")}
          className={cn("px-6 py-3 font-semibold transition-colors border-b-2", activeTab === "listings" ? "border-gold text-gold" : "border-transparent text-navy/50 hover:text-navy")}
        >
          Bộ Sưu Tập BĐS
        </button>
      </div>

      {activeTab === "site" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {images.map((img) => {
            const historyArr = JSON.parse(img.history || "[]");
            return (
              <div key={img.slotKey} className="bg-white shadow-sm p-6 rounded-2xl flex flex-col h-full border border-navy/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-navy">{img.sectionName}</h3>
                    <code className="text-xs font-semibold text-gold mt-1 block">{img.slotKey}</code>
                  </div>
                </div>

                <div 
                  className="relative w-full aspect-video bg-navy/5 rounded-xl overflow-hidden mb-6 cursor-crosshair border border-navy/10 group"
                  onClick={(e) => handleFocalPoint(e, img.slotKey)}
                >
                  {img.imageUrl ? (
                    <img 
                      src={img.imageUrl} 
                      alt={img.altText} 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      style={{ objectPosition: `${img.focalPointX}% ${img.focalPointY}%` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-navy/20"><ImageIcon className="w-12 h-12" /></div>
                  )}
                  {img.imageUrl && (
                    <div 
                      className="absolute w-6 h-6 -ml-3 -mt-3 text-gold drop-shadow-md pointer-events-none"
                      style={{ left: `${img.focalPointX}%`, top: `${img.focalPointY}%` }}
                    ><Target className="w-full h-full" /></div>
                  )}
                  <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none transition-opacity">
                    <span className="text-white text-sm font-semibold drop-shadow-md">Click để chọn tâm điểm (Focal Point)</span>
                  </div>
                  {uploading === img.slotKey && (
                    <div className="absolute inset-0 bg-navy/80 flex items-center justify-center z-10"><RefreshCcw className="w-8 h-8 text-gold animate-spin" /></div>
                  )}
                </div>

                <div className="space-y-4 mt-auto">
                  <div>
                    <input 
                      type="file" accept="image/*"
                      className="w-full text-sm text-navy/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-navy/10 file:font-semibold file:text-navy hover:file:bg-navy/20 cursor-pointer"
                      onChange={(e) => e.target.files?.[0] && handleUploadSiteImage(e.target.files[0], img.slotKey)}
                    />
                  </div>
                  {historyArr.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {historyArr.map((h: any, idx: number) => (
                        <button key={idx} onClick={() => handleRestore(img.slotKey, h.imageUrl)} className="w-10 h-10 shrink-0 rounded overflow-hidden border border-navy/20 hover:border-gold">
                          <img src={h.imageUrl} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={() => handleSaveSiteImage(img)} disabled={saving === img.slotKey}
                    className="w-full bg-gold text-white hover:bg-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    {saving === img.slotKey ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "listings" && (
        <div className="space-y-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleCreateListing} disabled={creating}
              className="bg-navy text-white px-6 py-3 rounded-lg flex items-center gap-2 font-bold hover:bg-gold transition-colors"
            >
              {creating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Thêm Bất Động Sản Mới
            </button>
          </div>

          {listings.map((listing) => {
            const arr = listing.images ? JSON.parse(listing.images) : [];
            return (
              <div key={listing.id} className="bg-white shadow-sm p-6 rounded-2xl border border-navy/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-navy/10 gap-4">
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div>
                      <label className="text-xs font-bold text-navy/60 uppercase mb-1 block">Tên BĐS</label>
                      <input 
                        type="text" value={listing.title} 
                        onChange={(e) => handleUpdateListingField(listing.id, 'title', e.target.value)}
                        className="w-full bg-transparent border-b border-navy/20 py-1 text-navy font-semibold focus:border-gold outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy/60 uppercase mb-1 block">Loại hình</label>
                      <select 
                        value={listing.type} 
                        onChange={(e) => handleUpdateListingField(listing.id, 'type', e.target.value)}
                        className="w-full bg-transparent border-b border-navy/20 py-1 text-navy font-semibold focus:border-gold outline-none"
                      >
                        <option>Căn hộ cao cấp</option>
                        <option>Biệt thự</option>
                        <option>Nhà phố</option>
                        <option>Đất nền</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-navy/60 uppercase mb-1 block">Giá (Tỷ)</label>
                        <input 
                          type="number" value={listing.price} 
                          onChange={(e) => handleUpdateListingField(listing.id, 'price', e.target.value)}
                          className="w-full bg-transparent border-b border-navy/20 py-1 text-navy font-semibold focus:border-gold outline-none" 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-navy/60 uppercase mb-1 block">Diện tích</label>
                        <input 
                          type="number" value={listing.area} 
                          onChange={(e) => handleUpdateListingField(listing.id, 'area', e.target.value)}
                          className="w-full bg-transparent border-b border-navy/20 py-1 text-navy font-semibold focus:border-gold outline-none" 
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleSaveListing(listing)} disabled={saving === listing.id}
                    className="bg-gold text-white hover:bg-navy px-6 py-2 rounded-lg flex items-center gap-2 font-bold shrink-0 transition-colors"
                  >
                    {saving === listing.id ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Lưu BĐS
                  </button>
                </div>

                <div className="mb-2 text-sm text-navy/70 font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Thư viện ảnh (Kéo thả để sắp xếp thứ tự)
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                  {arr.map((url: string, i: number) => (
                    <div 
                      key={i} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, listing.id, i)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, listing.id, i)}
                      className="aspect-square relative rounded-lg overflow-hidden group border border-navy/10 cursor-move bg-navy/5"
                    >
                      <img src={url} className="w-full h-full object-cover pointer-events-none" />
                      
                      <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <GripHorizontal className="text-white w-6 h-6" />
                      </div>

                      <button 
                        onClick={() => handleRemoveListingImage(listing.id, i)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      {i === 0 && (
                        <div className="absolute top-2 left-2 bg-gold text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                          Ảnh bìa
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Add New Button */}
                  <label className="aspect-square rounded-lg border-2 border-dashed border-navy/20 hover:border-gold bg-navy/5 flex flex-col items-center justify-center cursor-pointer text-navy/50 hover:text-gold transition-colors relative">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold">Thêm ảnh</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleUploadListingImage(e.target.files[0], listing.id)}
                    />
                    {uploading === listing.id && (
                      <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg">
                        <RefreshCcw className="w-6 h-6 animate-spin text-gold" />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
