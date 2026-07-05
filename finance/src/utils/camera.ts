/**
 * Utility Service for client-side HTML5 camera processing, compression, and geolocation tagging.
 */

/**
 * Resizes and compresses an image base64 data URI to conform to maximum bounds.
 * Outputs a compressed JPEG image with a target quality of 80%.
 */
export function compressImage(base64Str: string, maxWidth: number = 1920, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Restrict width to maximum boundary, scale height proportionally
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context not supported'));
        return;
      }

      // Draw image onto canvas to clean EXIF orientation parameters naturally
      ctx.drawImage(img, 0, 0, width, height);

      // Export to compressed JPEG string format
      const compressedDataUri = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUri);
    };
    img.onerror = (err) => reject(err);
  });
}

/**
 * Rotates a base64 image 90 degrees clockwise.
 */
export function rotateImage90(base64Str: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Swap width and height for 90 degree rotation
      canvas.width = img.height;
      canvas.height = img.width;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context not supported'));
        return;
      }

      // Move center of drawing to center of rotated canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const rotatedDataUri = canvas.toDataURL('image/jpeg', 0.9);
      resolve(rotatedDataUri);
    };
    img.onerror = (err) => reject(err);
  });
}

/**
 * Grabs GPS coordinate tagging parameters with explicit permission checks.
 */
export function getGeotag(): Promise<{ latitude: number; longitude: number } | undefined> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(undefined);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        // User denied geolocation permissions or lookup failed, ignore geotagging silently
        resolve(undefined);
      },
      { timeout: 5000, maximumAge: 600000 }
    );
  });
}
