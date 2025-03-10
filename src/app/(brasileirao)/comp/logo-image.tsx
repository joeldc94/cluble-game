"use client"
import { CldImage } from 'next-cloudinary';

interface Props { src: string, width: number, height: number }

/**  A component that displays a Cloudinary image with a given
 * src, width, and height. The image is automatically cropped to a square
 * aspect ratio if the width and height are not equal.
 */
export default function LogoImage(props: Props) {

    return (
        <CldImage
            src={props.src}
            //src="cluble/clubs/brazil/athletico_paranaense_pr"
            width={props.width} // Transform the image: auto-crop to square aspect_ratio
            height={props.height}
            crop="pad"
            //aspectRatio="1:1" // Set the desired aspect ratio, e.g., "1:1" for a square
            alt="CldImage"
        />
    )
}
