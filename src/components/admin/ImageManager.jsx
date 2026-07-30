import { useRef, useState } from 'react';
import { api, fileToBase64 } from '../../lib/api';

export default function ImageManager({ projectId, images = [], coverImageUrl, onUpdate }) {
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [replacingId, setReplacingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const imageData = await fileToBase64(file);
      const setAsCover = images.length === 0;
      await api.uploadImage(projectId, imageData, setAsCover);
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replacingId) return;

    setUploading(true);
    setError('');
    try {
      const imageData = await fileToBase64(file);
      await api.replaceImage(projectId, replacingId, imageData);
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setReplacingId(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleDelete = async (imageId) => {
    if (!confirm('Delete this image?')) return;
    setError('');
    try {
      await api.deleteImage(projectId, imageId);
      onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetCover = async (image) => {
    setError('');
    try {
      await api.updateProject(projectId, {
        coverImageUrl: image.url,
        coverCloudinaryId: image.cloudinary_public_id,
      });
      onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMove = async (image, direction) => {
    const idx = images.findIndex((img) => img.id === image.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= images.length) return;

    setError('');
    try {
      await api.reorderImage(projectId, image.id, images[swapIdx].sort_order);
      await api.reorderImage(projectId, images[swapIdx].id, image.sort_order);
      onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-stone-500">
          Gallery Images ({images.length})
        </h3>
        <label className="px-4 py-2 bg-stone-800 text-stone-200 font-bold uppercase text-[10px] tracking-widest rounded-sm hover:bg-stone-700 transition-colors cursor-pointer">
          {uploading ? 'Uploading...' : '+ Add Photo'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <input
          ref={replaceInputRef}
          type="file"
          accept="image/*"
          onChange={handleReplace}
          className="hidden"
        />
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-sm">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <p className="text-stone-600 text-sm py-8 text-center border border-dashed border-stone-700 rounded-sm">
          No images yet. Upload photos to build the gallery.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, idx) => {
            const isCover = image.url === coverImageUrl;
            return (
              <div key={image.id} className="relative group border border-stone-800 rounded-sm overflow-hidden bg-stone-900/50">
                <img src={image.url} alt="" className="w-full aspect-square object-cover" />
                {isCover && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#ff4500] text-white text-[9px] font-black uppercase tracking-wider rounded-sm">
                    Cover
                  </span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                  {!isCover && (
                    <button
                      onClick={() => handleSetCover(image)}
                      className="w-full px-2 py-1 bg-stone-100 text-stone-950 text-[9px] font-black uppercase tracking-wider rounded-sm cursor-pointer hover:bg-[#ff4500] hover:text-white transition-colors"
                    >
                      Set Cover
                    </button>
                  )}
                  <button
                    onClick={() => { setReplacingId(image.id); replaceInputRef.current?.click(); }}
                    className="w-full px-2 py-1 bg-stone-700 text-stone-100 text-[9px] font-black uppercase tracking-wider rounded-sm cursor-pointer hover:bg-stone-600 transition-colors"
                  >
                    Replace
                  </button>
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => handleMove(image, 'up')}
                      disabled={idx === 0}
                      className="flex-1 px-2 py-1 bg-stone-800 text-stone-300 text-[9px] font-bold rounded-sm cursor-pointer disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMove(image, 'down')}
                      disabled={idx === images.length - 1}
                      className="flex-1 px-2 py-1 bg-stone-800 text-stone-300 text-[9px] font-bold rounded-sm cursor-pointer disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="w-full px-2 py-1 bg-red-950 text-red-300 text-[9px] font-black uppercase tracking-wider rounded-sm cursor-pointer hover:bg-red-900 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
