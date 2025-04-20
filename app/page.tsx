import { ImageGallery } from "@/components/image-gallery"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Galería de Imágenes</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        Explora nuestra colección de imágenes. Utiliza los filtros de categoría para refinar tu selección.
      </p>

      <ImageGallery />
    </main>
  )
}
