import { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // Yeni şəkillər əlavə etmək üçün
  const addImages = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  // Fərdi şəkli silmək üçün
  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find(i => i.id === id);
      if (img && img.previewUrl) {
        URL.revokeObjectURL(img.previewUrl); // Yaddaşı təmizləyirik
      }
      return prev.filter(i => i.id !== id);
    });
  };

  // Fayl adını dəyişmək üçün
  const updateImageName = (id, newName) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, name: newName } : img))
    );
  };

  // Etiketləri və qruplaşdırmanı yeniləmək üçün (BU ÇOX VACİBDİR)
  const updateImageTags = (id, tags) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, tags: tags } : img))
    );
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        addImages,
        removeImage,
        updateImageName,
        updateImageTags, // Funksiyanı buraya əlavə etdik
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Digər komponentlərdə istifadə etmək üçün custom hook
export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};