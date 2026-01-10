/**
 * Komprese obrázku před odesláním do API
 * Zmenší base64 data URL na rozumnou velikost pro rychlejší network transfer
 */
export async function compressImage(
    dataUrl: string,
    maxWidth: number = 1024,
    maxHeight: number = 1024,
    quality: number = 0.85
): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            // Vypočítat nové rozměry se zachováním poměru stran
            let { width, height } = img;

            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }

            // Vytvořit canvas pro změnu velikosti
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Nakreslit zmenšený obrázek
            ctx.drawImage(img, 0, 0, width, height);

            // Převést zpět na data URL s kompresí
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image for compression'));
        };

        img.src = dataUrl;
    });
}

/**
 * Komprese pole obrázků
 */
export async function compressImages(
    dataUrls: string[],
    maxWidth: number = 1024,
    maxHeight: number = 1024,
    quality: number = 0.85
): Promise<string[]> {
    return Promise.all(
        dataUrls.map(url => compressImage(url, maxWidth, maxHeight, quality))
    );
}
