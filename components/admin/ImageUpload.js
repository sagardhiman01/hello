'use client';
import { useState } from 'react';

export default function ImageUpload({ onUploadSuccess, currentUrl, label = "Upload Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onUploadSuccess(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('System error during upload');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-image-upload">
      <label className="upload-label">{label}</label>
      <div className="upload-container">
        {currentUrl && (
          <div className="image-preview">
            <img src={currentUrl} alt="Preview" />
          </div>
        )}
        <div className="upload-controls">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            id={`file-upload-${label.replace(/\s+/g, '-')}`}
            className="hidden-file-input"
          />
          <label 
            htmlFor={`file-upload-${label.replace(/\s+/g, '-')}`} 
            className={`admin-btn-outline ${uploading ? 'disabled' : ''}`}
          >
            {uploading ? '⏳ Uploading...' : '📁 Choose File'}
          </label>
          <p className="upload-hint">JPG, PNG, WEBP, GIF (Max 5MB)</p>
          {error && <p className="upload-error">{error}</p>}
        </div>
      </div>

      <style jsx>{`
        .admin-image-upload {
          margin-bottom: 1rem;
        }
        .upload-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: #888;
        }
        .upload-container {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: rgba(255,255,255,0.03);
          padding: 1rem;
          border-radius: 12px;
          border: 1px dashed rgba(255,255,255,0.1);
        }
        .image-preview {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          flex-shrink: 0;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .upload-controls {
          flex-grow: 1;
        }
        .hidden-file-input {
          display: none;
        }
        .admin-btn-outline {
          cursor: pointer;
          display: inline-block;
        }
        .admin-btn-outline.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .upload-hint {
          font-size: 0.75rem;
          color: #666;
          margin-top: 0.5rem;
        }
        .upload-error {
          font-size: 0.8rem;
          color: #ff4444;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
