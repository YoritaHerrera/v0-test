"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Bookmark, ExternalLink, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function InstagramBentoEmbed() {
  const [isFollowing, setIsFollowing] = useState(false)

  const instagramUsername = "r3coffee_"
  const instagramUrl = "https://www.instagram.com/r3coffee_"

  // Datos de ejemplo basados en la cuenta r3coffee_
  const posts = [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=600&width=600",
      likes: 124,
      comments: 12,
      caption: "Disfruta de nuestro café de especialidad ☕",
      size: "large",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=400&width=400",
      likes: 98,
      comments: 8,
      caption: "Barista preparando un flat white perfecto",
      size: "medium",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=300&width=300",
      likes: 76,
      comments: 5,
      caption: "Granos de café recién tostados",
      size: "small",
    },
    {
      id: 4,
      imageUrl: "/placeholder.svg?height=500&width=500",
      likes: 145,
      comments: 18,
      caption: "Latte art que enamora",
      size: "medium",
    },
    {
      id: 5,
      imageUrl: "/placeholder.svg?height=350&width=350",
      likes: 89,
      comments: 7,
      caption: "Desayuno perfecto con nuestro café",
      size: "small",
    },
    {
      id: 6,
      imageUrl: "/placeholder.svg?height=450&width=450",
      likes: 112,
      comments: 14,
      caption: "Visítanos en nuestra nueva ubicación",
      size: "medium",
    },
  ]

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // En una implementación real, aquí podrías abrir la página de Instagram en una nueva pestaña
    window.open(instagramUrl, "_blank")
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt={`${instagramUsername} profile`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg flex items-center gap-1">
              {instagramUsername}
              <Instagram className="h-4 w-4 text-pink-500" />
            </h2>
            <p className="text-sm text-gray-500">Café de especialidad</p>
          </div>
        </div>
        <Button
          onClick={handleFollow}
          className={isFollowing ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-pink-500 hover:bg-pink-600"}
        >
          {isFollowing ? "Siguiendo" : "Seguir"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        {posts.map((post) => (
          <Card
            key={post.id}
            className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
              post.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : post.size === "medium"
                  ? "md:col-span-1 md:row-span-1"
                  : ""
            }`}
          >
            <CardContent className="p-0 relative group">
              <div className="relative aspect-square w-full">
                <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm line-clamp-2">{post.caption}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-3">
                    <Heart className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer" />
                    <MessageCircle className="h-4 w-4 text-gray-500 hover:text-blue-500 cursor-pointer" />
                  </div>
                  <Bookmark className="h-4 w-4 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href={instagramUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
        >
          Ver más en Instagram
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
