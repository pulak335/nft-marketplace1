"use client";

import { useState } from "react";
import Link from "next/link";

interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  creator: string;
  likes: number;
  bids: number;
  timeLeft?: string;
  status: "for-sale" | "auction" | "sold";
}

const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Cosmic Dreamer #1234",
    description: "A mesmerizing digital artwork exploring the depths of space and consciousness.",
    price: 2.5,
    image: "gradient-purple-pink",
    category: "Digital Art",
    creator: "CryptoArtist123",
    likes: 234,
    bids: 12,
    status: "auction",
    timeLeft: "2h 15m"
  },
  {
    id: "2",
    name: "Neon City #5678",
    description: "A futuristic cityscape with neon lights and cyberpunk aesthetics.",
    price: 1.8,
    image: "gradient-blue-cyan",
    category: "Digital Art",
    creator: "DigitalCollector",
    likes: 156,
    bids: 8,
    status: "for-sale"
  },
  {
    id: "3",
    name: "Nature's Symphony #9012",
    description: "A harmonious blend of natural elements and digital artistry.",
    price: 0.5,
    image: "gradient-green-emerald",
    category: "Digital Art",
    creator: "ArtEnthusiast",
    likes: 89,
    bids: 5,
    status: "auction",
    timeLeft: "5h 42m"
  },
  {
    id: "4",
    name: "Golden Hour #3456",
    description: "A stunning sunset captured in digital form.",
    price: 3.2,
    image: "gradient-yellow-orange",
    category: "Digital Art",
    creator: "SunsetLover",
    likes: 445,
    bids: 23,
    status: "auction",
    timeLeft: "1h 23m"
  },
  {
    id: "5",
    name: "Crimson Wave #7890",
    description: "Abstract art representing the power of nature.",
    price: 1.8,
    image: "gradient-red-pink",
    category: "Digital Art",
    creator: "AbstractMaster",
    likes: 167,
    bids: 15,
    status: "for-sale"
  },
  {
    id: "6",
    name: "Mystic Portal #1234",
    description: "A gateway to another dimension in digital art.",
    price: 4.5,
    image: "gradient-indigo-purple",
    category: "Digital Art",
    creator: "MysticArtist",
    likes: 298,
    bids: 18,
    status: "auction",
    timeLeft: "3h 7m"
  },
  {
    id: "7",
    name: "Digital Symphony #5678",
    description: "An electronic music NFT with unique visual patterns.",
    price: 0.8,
    image: "gradient-blue-purple",
    category: "Music",
    creator: "MusicProducer",
    likes: 123,
    bids: 7,
    status: "for-sale"
  },
  {
    id: "8",
    name: "Gaming Legend #9012",
    description: "Rare in-game character with exclusive abilities.",
    price: 2.1,
    image: "gradient-green-blue",
    category: "Gaming",
    creator: "GameDev",
    likes: 334,
    bids: 21,
    status: "auction",
    timeLeft: "4h 12m"
  }
];

const categories = ["All", "Digital Art", "Music", "Gaming", "Collectibles"];
const sortOptions = ["Recently Listed", "Price: Low to High", "Price: High to Low", "Most Popular", "Ending Soon"];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recently Listed");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);

  const filteredNFTs = mockNFTs.filter(nft => {
    const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = nft.price >= priceRange[0] && nft.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Most Popular":
        return b.likes - a.likes;
      case "Ending Soon":
        return a.timeLeft ? -1 : 1;
      default:
        return 0;
    }
  });

  const getGradientClass = (image: string) => {
    const gradients: { [key: string]: string } = {
      "gradient-purple-pink": "bg-gradient-to-br from-purple-400 to-pink-400",
      "gradient-blue-cyan": "bg-gradient-to-br from-blue-400 to-cyan-400",
      "gradient-green-emerald": "bg-gradient-to-br from-green-400 to-emerald-400",
      "gradient-yellow-orange": "bg-gradient-to-br from-yellow-400 to-orange-400",
      "gradient-red-pink": "bg-gradient-to-br from-red-400 to-pink-400",
      "gradient-indigo-purple": "bg-gradient-to-br from-indigo-400 to-purple-400",
      "gradient-blue-purple": "bg-gradient-to-br from-blue-400 to-purple-400",
      "gradient-green-blue": "bg-gradient-to-br from-green-400 to-blue-400"
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
              <Link href="/marketplace" className="text-white font-medium">
                Marketplace
              </Link>
              <Link href="/#categories" className="text-white/80 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/#bids" className="text-white/80 hover:text-white transition-colors">
                Bids
              </Link>
              <Link href="/#profile" className="text-white/80 hover:text-white transition-colors">
                Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Marketplace Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">NFT Marketplace</h1>
          <p className="text-white/60">Discover, buy, and sell unique digital assets</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option} className="bg-gray-800">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Price Range (ETH)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseFloat(e.target.value) || 0, priceRange[1]])}
                  className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value) || 10])}
                  className="w-1/2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/60">
            Showing {sortedNFTs.length} of {mockNFTs.length} NFTs
          </p>
          <div className="flex space-x-2">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Grid View
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-4 py-2 rounded-lg transition-colors">
              List View
            </button>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedNFTs.map((nft) => (
            <div key={nft.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
              {/* NFT Image */}
              <div className={`h-48 ${getGradientClass(nft.image)} relative`}>
                {nft.status === "auction" && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    Auction
                  </div>
                )}
                {nft.status === "for-sale" && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    For Sale
                  </div>
                )}
                {nft.timeLeft && (
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {nft.timeLeft}
                  </div>
                )}
              </div>

              {/* NFT Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg">{nft.name}</h3>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span className="text-white/60 text-sm">{nft.likes}</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-4 line-clamp-2">{nft.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-white/60 text-sm">Creator</div>
                    <div className="text-white font-medium">{nft.creator}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Category</div>
                    <div className="text-white font-medium">{nft.category}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white/60 text-sm">
                      {nft.status === "auction" ? "Current Bid" : "Price"}
                    </div>
                    <div className="text-white font-bold text-lg">{nft.price} ETH</div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                    {nft.status === "auction" ? "Place Bid" : "Buy Now"}
                  </button>
                </div>

                {nft.bids > 0 && (
                  <div className="mt-3 text-center">
                    <span className="text-white/60 text-sm">{nft.bids} bids placed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {sortedNFTs.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Load More NFTs
            </button>
          </div>
        )}

        {/* No Results */}
        {sortedNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/60 text-lg mb-4">No NFTs found matching your criteria</div>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setPriceRange([0, 10]);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
