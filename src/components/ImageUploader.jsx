import React from 'react';
import { useImages } from '../context/ImageContext';

const ImageUploader = () => {
  const { addImages } = useImages();

  const handleFileChange = (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      const processedImages = files.map((file) => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} şəkil formatında deyil!`);
        }
        return {
          id: crypto.randomUUID(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl: URL.createObjectURL(file),
          category: 'Default'
        };
      });

      addImages(processedImages);
      e.target.value = null;
    } catch (err) {
      console.error("Xəta:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="uploader" style={{ border: '2px dashed #646cff', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} id="upload-btn" hidden />
      <label htmlFor="upload-btn" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        📁 Şəkilləri Seç və Yüklə
      </label>
    </div>
  );
};

export default ImageUploader;