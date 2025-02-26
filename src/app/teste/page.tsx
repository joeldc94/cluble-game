"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <CldImage
            src="cluble/clubs/brazil/atletico_mineiro_mg" // Use this sample image or upload your own via the Media Explorer
            //src="cluble/clubs/brazil/athletico_paranaense_pr"
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            crop="pad"
            //aspectRatio="1:1" // Set the desired aspect ratio, e.g., "1:1" for a square
            alt="CldImage"
        />
    );
}