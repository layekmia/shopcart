"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full">
      {/* SMALL SCREEN (mobile) */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active?._key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
          >
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              width={700}
              height={700}
              priority
              unoptimized
              className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${
                isStock === 0 ? "opacity-50" : ""
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="grid grid-cols-6 gap-2 h-20">
          {images?.map((image) => (
            <button
              key={image?._key}
              onClick={() => setActive(image)}
              className={`border rounded-md overflow-hidden ${
                active?._key === image?._key
                  ? "border-darkColor opacity-100"
                  : "opacity-80"
              }`}
            >
              <Image
                src={urlFor(image).url()}
                alt={`Thumbnail ${image._key}`}
                width={100}
                height={100}
                unoptimized
                className="w-full h-auto object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* LARGE SCREEN (md+ only) */}
      <div className="hidden md:flex md:flex-row gap-4">
        {/* LEFT — Small Vertical Thumbnails */}
        <div className="w-[90px] flex flex-col gap-2">
          <div className="flex flex-col space-y-2">
            {images?.map((image) => (
              <button
                key={image?._key}
                onClick={() => setActive(image)}
                className={`border rounded-md overflow-hidden w-20 h-20 ${
                  active?._key === image?._key
                    ? "border-darkColor opacity-100"
                    : "opacity-80"
                }`}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={`Thumbnail ${image._key}`}
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active?._key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] mx-auto max-h-[450px] min-h-[350px] border border-darkColor/10 rounded-md group overflow-hidden"
          >
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              width={400}
              height={400}
              priority
              unoptimized
              className={`w-full h-auto object-contain group-hover:scale-110 hoverEffect rounded-md ${
                isStock === 0 ? "opacity-50" : ""
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageView;
