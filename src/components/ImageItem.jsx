import React, { useState } from 'react';
import { useImages } from '../context/ImageContext';

const ImageItem = ({ image }) => {
  const { removeImage, updateImageName, updateImageTags } = useImages();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(image.name);
  const [tags, setTags] = useState(image.tags || "");

  const handleSave = () => {
    if (newName.trim() === "") return;
    updateImageName(image.id, newName);
    if (updateImageTags) {
      updateImageTags(image.id, tags);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Bu şəkli silmək istədiyinizə əminsiniz?")) {
      removeImage(image.id);
    }
  };

  return (
    <div className="image-card">
      {/* Şəkil Önizləmə */}
      <img src={image.previewUrl} alt={image.name} />

      <div className="image-info">
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Fayl adı"
              autoFocus
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Etiketlər (vergüllə ayır)..."
              style={{ marginTop: '5px', fontSize: '12px' }}
            />
            <button onClick={handleSave} className="btn-save">Yadda saxla</button>
          </div>
        ) : (
          <div>
            <p className="image-name">{image.name}</p>
            
            {/* Metaməlumatlar: Növ və Ölçü */}
            <p className="image-metadata">
              <span>{image.type.split('/')[1].toUpperCase()}</span> • {(image.size / 1024).toFixed(2)} KB
            </p>

            {/* Etiketlər / Qruplaşdırma */}
            <div className="tag-container">
              {image.tags ? (
                image.tags.split(',').map((tag, index) => (
                  <span key={index} className="tag-pill">{tag.trim()}</span>
                ))
              ) : (
                <span style={{ fontSize: '10px', color: '#ccc' }}>Etiket yoxdur</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="button-group">
        <button onClick={() => setIsEditing(!isEditing)} className="btn-edit">
          {isEditing ? 'Ləğv et' : 'Redaktə'}
        </button>
        <button onClick={handleDelete} className="btn-delete">Sil</button>
      </div>
    </div>
  );
};

export default ImageItem;