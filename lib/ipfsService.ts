import axios from 'axios';

// Pinata configuration
const PINATA_API_KEY = process.env.PINATA_API_KEY || '';
const PINATA_API_SECRET = process.env.PINATA_API_SECRET || '';
const PINATA_JWT = process.env.PINATA_JWT || '';
const PINATA_API_URL = 'https://api.pinata.cloud';

export interface UploadResult {
  cid: string;
  url: string;
  size: number;
}

/**
 * Upload a file to IPFS using Pinata
 */
export async function uploadToIPFS(file: File): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${PINATA_API_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${PINATA_JWT}`,
        },
      }
    );

    const cid = response.data.IpfsHash;
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    return {
      cid,
      url,
      size: response.data.PinSize,
    };
  } catch (error: any) {
    console.error('Pinata upload failed:', error);
    throw new Error(`Failed to upload to IPFS: ${error.message}`);
  }
}

/**
 * Upload multiple files to IPFS
 */
export async function uploadMultipleToIPFS(files: File[]): Promise<UploadResult[]> {
  const uploads = files.map(file => uploadToIPFS(file));
  return Promise.all(uploads);
}

/**
 * Upload image with compression
 */
export async function uploadImageToIPFS(file: File, maxWidth: number = 1920): Promise<UploadResult> {
  try {
    // Compress image before upload
    const compressedFile = await compressImage(file, maxWidth);
    return uploadToIPFS(compressedFile);
  } catch (error: any) {
    console.error('Image upload failed:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/**
 * Compress image before upload
 */
async function compressImage(file: File, maxWidth: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          0.85 // Quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

/**
 * Upload evidence photos to IPFS
 */
export async function uploadEvidencePhotos(photos: File[]): Promise<string[]> {
  try {
    const results = await uploadMultipleToIPFS(photos);
    return results.map(r => r.url);
  } catch (error: any) {
    console.error('Evidence upload failed:', error);
    throw new Error(`Failed to upload evidence: ${error.message}`);
  }
}

/**
 * Get IPFS URL from CID
 */
export function getIPFSUrl(cid: string): string {
  return `https://ipfs.io/ipfs/${cid}`;
}

/**
 * Pin file to ensure it stays on IPFS (already pinned by Pinata)
 */
export async function pinFile(cid: string): Promise<void> {
  // Files are automatically pinned by Pinata
  console.log(`File ${cid} is pinned on Pinata`);
}
