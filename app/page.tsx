import { ImageGallery } from "@/components/image-gallery"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Image Gallery</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Browse through our collection of images. Use the category filters below to narrow down your selection.
      </p>

      <ImageGallery />
    </main>
  )
}
