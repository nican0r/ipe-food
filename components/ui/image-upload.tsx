'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function ImageUpload({ value, onChange, required }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            value={value}
            onChange={handleUrlChange}
            placeholder="Enter image URL or upload a file"
            required={required}
          />
        </div>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {value && (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
          {value.startsWith('data:') || value.startsWith('http') ? (
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 