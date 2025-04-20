import InstagramBentoEmbed from "../instagram-bento-embed"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">R3Coffee en Instagram</h1>
        <InstagramBentoEmbed />
      </div>
    </main>
  )
}
