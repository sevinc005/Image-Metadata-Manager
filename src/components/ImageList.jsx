import React, { useState } from 'react';
import { useImages } from '../context/ImageContext';
import ImageItem from './ImageItem';

const ImageList = () => {
  const { images } = useImages();
  const [filter, setFilter] = useState("");

  // Şəkilləri süzgəcdən keçiririk
  const filteredImages = images.filter(img => {
    // Əgər axtarış qutusu boşdursa, hamısını göstər
    if (filter.trim() === "") return true;

    // Əks halda ad və ya etiketlərdə axtar
    const fileName = img.name ? img.name.toLowerCase() : "";
    const fileTags = img.tags ? img.tags.toLowerCase() : "";
    const searchTerm = filter.toLowerCase();

    return fileName.includes(searchTerm) || fileTags.includes(searchTerm);
  });

  return (
    <div>
      {/* Qruplaşdırma/Axtarış Paneli */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Kateqoriya və ya etiketə görə qruplaşdır..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '70%',
            borderRadius: '25px',
            border: '2px solid #5d7d95',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>

      <div className="image-grid">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999', gridColumn: '1/-1' }}>
            {images.length === 0 ? "Hələ şəkil yüklənməyib." : "Axtarışa uyğun şəkil tapılmadı."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageList;