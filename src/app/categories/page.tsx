"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  itemCount: number;
  totalVolume: string;
  floorPrice: string;
  featuredNFTs: {
    id: string;
    name: string;
    image: string;
    price: number;
    creator: string;
  }[];
}

const categories: Category[] = [
  {
    id: "digital-art",
    name: "Digital Art",
    description: "Unique digital artworks, illustrations, and creative pieces from talented artists around the world.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z",
    gradient: "from-purple-400 to-pink-400",
    itemCount: 2547,
    totalVolume: "1.2M ETH",
    floorPrice: "0.15 ETH",
    featuredNFTs: [
      { id: "1", name: "Cosmic Dreamer #1234", image: "gradient-purple-pink", price: 2.5, creator: "CryptoArtist123" },
      { id: "2", name: "Neon City #5678", image: "gradient-blue-cyan", price: 1.8, creator: "DigitalCollector" },
      { id: "3", name: "Golden Hour #3456", image: "gradient-yellow-orange", price: 3.2, creator: "SunsetLover" }
    ]
  },
  {
    id: "music",
    name: "Music",
    description: "Exclusive music tracks, albums, and audio experiences from emerging and established artists.",
    icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
    gradient: "from-blue-400 to-cyan-400",
    itemCount: 823,
    totalVolume: "450K ETH",
    floorPrice: "0.08 ETH",
    featuredNFTs: [
      { id: "4", name: "Digital Symphony #5678", image: "gradient-blue-purple", price: 0.8, creator: "MusicProducer" },
      { id: "5", name: "Harmonic Waves #9012", image: "gradient-indigo-purple", price: 1.2, creator: "SoundArtist" },
      { id: "6", name: "Rhythm Flow #3456", image: "gradient-blue-cyan", price: 0.6, creator: "BeatMaker" }
    ]
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Rare in-game items, characters, skins, and collectibles from popular gaming universes.",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    gradient: "from-green-400 to-emerald-400",
    itemCount: 1247,
    totalVolume: "890K ETH",
    floorPrice: "0.12 ETH",
    featuredNFTs: [
      { id: "7", name: "Gaming Legend #9012", image: "gradient-green-blue", price: 2.1, creator: "GameDev" },
      { id: "8", name: "Cyber Warrior #5678", image: "gradient-green-emerald", price: 1.5, creator: "GameStudio" },
      { id: "9", name: "Dragon Slayer #1234", image: "gradient-green-400", price: 3.8, creator: "RPGMaster" }
    ]
  },
  {
    id: "collectibles",
    name: "Collectibles",
    description: "Unique collectible items, trading cards, and rare digital memorabilia from various collections.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    gradient: "from-yellow-400 to-orange-400",
    itemCount: 1892,
    totalVolume: "670K ETH",
    floorPrice: "0.05 ETH",
    featuredNFTs: [
      { id: "10", name: "Rare Card #7890", image: "gradient-yellow-orange", price: 0.9, creator: "CardCollector" },
      { id: "11", name: "Vintage Item #3456", image: "gradient-red-pink", price: 1.7, creator: "VintageHunter" },
      { id: "12", name: "Limited Edition #9012", image: "gradient-indigo-purple", price: 2.3, creator: "LimitedEd" }
    ]
  },
  {
    id: "photography",
    name: "Photography",
    description: "Stunning photographic works, from nature and wildlife to urban landscapes and portraits.",
    icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    gradient: "from-red-400 to-pink-400",
    itemCount: 756,
    totalVolume: "320K ETH",
    floorPrice: "0.09 ETH",
    featuredNFTs: [
      { id: "13", name: "Sunset Capture #5678", image: "gradient-red-pink", price: 1.2, creator: "PhotoArtist" },
      { id: "14", name: "Urban Life #9012", image: "gradient-blue-cyan", price: 0.8, creator: "StreetPhoto" },
      { id: "15", name: "Nature's Beauty #3456", image: "gradient-green-emerald", price: 1.5, creator: "NatureLens" }
    ]
  },
  {
    id: "virtual-worlds",
    name: "Virtual Worlds",
    description: "Virtual real estate, avatars, and digital assets from metaverse platforms and virtual worlds.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9",
    gradient: "from-indigo-400 to-purple-400",
    itemCount: 634,
    totalVolume: "280K ETH",
    floorPrice: "0.18 ETH",
    featuredNFTs: [
      { id: "16", name: "Virtual Land #1234", image: "gradient-indigo-purple", price: 4.5, creator: "MetaverseDev" },
      { id: "17", name: "Digital Avatar #5678", image: "gradient-purple-pink", price: 2.8, creator: "AvatarCreator" },
      { id: "18", name: "Virtual Building #9012", image: "gradient-blue-purple", price: 3.2, creator: "VirtualArchitect" }
    ]
  }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getGradientClass = (image: string) => {
    const gradients: { [key: string]: string } = {
      "gradient-purple-pink": "bg-gradient-to-br from-purple-400 to-pink-400",
      "gradient-blue-cyan": "bg-gradient-to-br from-blue-400 to-cyan-400",
      "gradient-green-emerald": "bg-gradient-to-br from-green-400 to-emerald-400",
      "gradient-yellow-orange": "bg-gradient-to-br from-yellow-400 to-orange-400",
      "gradient-red-pink": "bg-gradient-to-br from-red-400 to-pink-400",
      "gradient-indigo-purple": "bg-gradient-to-br from-indigo-400 to-purple-400",
      "gradient-blue-purple": "bg-gradient-to-br from-blue-400 to-purple-400",
      "gradient-green-blue": "bg-gradient-to-br from-green-400 to-blue-400",
      "gradient-green-400": "bg-gradient-to-br from-green-400 to-green-500"
    };
    return gradients[image] || "bg-gradient-to-br from-gray-400 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-white font-bold text-xl">NFT Marketplace</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-white/80 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/auctions" className="text-white/80 hover:text-white transition-colors">
                Auctions
              </Link>
              <Link href="/categories" className="text-white font-medium">
                Categories
              </Link>
              <Link href="/bids" className="text-white/80 hover:text-white transition-colors">
                Bids
              </Link>
              <Link href="/profile" className="text-white/80 hover:text-white transition-colors">
                Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/connect-wallet">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  Connect Wallet
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">NFT Categories</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore diverse NFT categories and discover unique digital assets from talented creators worldwide
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:transform hover:scale-105 transition-all cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.itemCount.toLocaleString()} items</p>
                </div>
              </div>

              {/* Category Description */}
              <p className="text-white/60 text-sm mb-6">{category.description}</p>

              {/* Category Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white/60 text-xs">Total Volume</div>
                  <div className="text-white font-bold">{category.totalVolume}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white/60 text-xs">Floor Price</div>
                  <div className="text-white font-bold">{category.floorPrice}</div>
                </div>
              </div>

              {/* Featured NFTs */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Featured NFTs</h4>
                <div className="space-y-2">
                  {category.featuredNFTs.slice(0, 2).map((nft) => (
                    <div key={nft.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-2">
                      <div className={`w-8 h-8 ${getGradientClass(nft.image)} rounded-lg flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">{nft.name}</div>
                        <div className="text-white/60 text-xs">{nft.creator}</div>
                      </div>
                      <div className="text-white font-bold text-sm">{nft.price} ETH</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  href={`/marketplace?category=${category.name}`}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all text-center"
                >
                  Browse {category.name}
                </Link>
                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Details Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedCategory && (
                <div>
                  <p className="text-white/60 mb-6">
                    {categories.find(c => c.id === selectedCategory)?.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm">Total Items</div>
                      <div className="text-white font-bold text-xl">
                        {categories.find(c => c.id === selectedCategory)?.itemCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm">Total Volume</div>
                      <div className="text-white font-bold text-xl">
                        {categories.find(c => c.id === selectedCategory)?.totalVolume}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm">Floor Price</div>
                      <div className="text-white font-bold text-xl">
                        {categories.find(c => c.id === selectedCategory)?.floorPrice}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white font-bold text-lg mb-4">Featured NFTs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.find(c => c.id === selectedCategory)?.featuredNFTs.map((nft) => (
                        <div key={nft.id} className="bg-white/5 rounded-lg p-4">
                          <div className={`h-24 ${getGradientClass(nft.image)} rounded-lg mb-3`}></div>
                          <div className="text-white font-medium">{nft.name}</div>
                          <div className="text-white/60 text-sm">{nft.creator}</div>
                          <div className="text-white font-bold">{nft.price} ETH</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href={`/marketplace?category=${categories.find(c => c.id === selectedCategory)?.name}`}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all text-center"
                    >
                      Browse All {categories.find(c => c.id === selectedCategory)?.name}
                    </Link>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-white/60">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">7,899</div>
              <div className="text-white/60">Total NFTs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">3.82M</div>
              <div className="text-white/60">Total Volume (ETH)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <div className="text-white/60">Active Creators</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
