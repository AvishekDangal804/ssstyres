import Image from "next/image";
import styles from "./FullVehicleImage.module.css";

/**
 * Shows a whole vehicle photo, never cropped. The photo is fitted inside its
 * box and any spare room is filled by a heavily blurred copy of the same
 * picture, so wide or tall frames still read as full-bleed.
 *
 * Fills its nearest positioned ancestor. A parent can leave room along the
 * bottom (e.g. for a caption) by setting `--photo-bottom` on itself, and can
 * feather the photo's edges into the blurred backdrop with `--photo-mask` (a
 * CSS mask-image value).
 */
export default function FullVehicleImage({
  src,
  alt,
  sizes,
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className={styles.frame}>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className={styles.backdrop}
      />
      <div className={styles.photoBox}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className={styles.photo}
        />
      </div>
    </div>
  );
}
