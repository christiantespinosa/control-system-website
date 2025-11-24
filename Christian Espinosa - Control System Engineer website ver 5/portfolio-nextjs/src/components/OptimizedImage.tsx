'use client'

import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  // Keep the type definition clean here
  placeholder?: 'empty' | 'blur' | 'data:image' 
  blurDataURL?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      // THE FIX GOES HERE: Force TypeScript to accept 'data:image'
      placeholder={placeholder as any} 
      blurDataURL={blurDataURL}
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      // Remove loading="lazy" if priority is true to avoid conflicts, but this is fine for now
      {...props}
    />
  )
}
