"use client";

import { useState } from "react";
import Link from "next/link";

interface Auction {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  creator: string;
  likes: number;
  bids: number;
  timeLeft: string;
  endTime: string;
  minBid: number;
  currentBid: number;
  bidders: number;
}

const mockAuctions: Auction[] = [
  {
    id: "1",
    name: "Golden Hour #3456",
    description: "A stunning sunset captured in digital form with vibrant colors and dramatic lighting.",
    price: 3.2,
    image: "gradient-yellow-orange",
    category: "Digital Art",
    creator: "SunsetLover",
    likes: 445,
    bids: 12,
    timeLeft: "2h 15m",
    endTime: "2024-12-25T18:00:00Z",
    minBid: 0.1,
    currentBid: 3.2,
    bidders: 8
  },
  {
    id: "2",
    name: "Crimson Wave #7890",
    description: "Abstract art representing the power of nature with flowing red and pink hues.",
    price: 1.8,
    image: "gradient-red-pink",
    category: "Digital Art",
    creator: "AbstractMaster",
    likes: 167,
    bids: 8,
    timeLeft: "5h 42m",
    endTime: "2024-12-25T21:00:00Z",
    minBid: 0.05,
    currentBid: 1.8,
    bidders: 5
  },
  {
    id: "3",
    name: "Mystic Portal #1234",
    description: "A gateway to another dimension in digital art with mystical elements.",
    price: 4.5,
    image: "gradient-indigo-purple",
    category: "Digital Art",
    creator: "MysticArtist",
    likes: 298,
    bids: 15,
    timeLeft: "1h 23m",
    endTime: "2024-12-25T16:00:00Z",
    minBid: 0.2,
    currentBid: 4.5,
    bidders: 12
  },
  {
    id: "4",
    name: "Cosmic Dreamer #1234",
    description: "A mesmerizing digital artwork exploring the depths of space and consciousness.",
    price: 2.5,
    image: "gradient-purple-pink",
    category: "Digital Art",
    creator: "CryptoArtist123",
    likes: 234,
    bids: 9,
    timeLeft: "3h 7m",
    endTime: "2024-12-25T20:00:00Z",
    minBid: 0.1,
    currentBid: 2.5,
    bidders: 6
  },
  {
    id: "5",
    name: "Neon City #5678",
    description: "A futuristic cityscape with neon lights and cyberpunk aesthetics.",
    price: 1.8,
    image: "gradient-blue-cyan",
    category: "Digital Art",
    creator: "DigitalCollector",
    likes: 156,
    bids: 6,
    timeLeft: "4h 12m",
    endTime: "2024-12-25T22:00:00Z",
    minBid: 0.05,
    currentBid: 1.8,
    bidders: 4
  },
  {
    id: "6",
    name: "Digital Symphony #5678",
    description: "An electronic music NFT with unique visual patterns and audio elements.",
    price: 0.8,
    image: "gradient-blue-purple",
    category: "Music",
    creator: "MusicProducer",
    likes: 123,
    bids: 7,
    timeLeft: "6h 30m",
    endTime: "2024-12-26T00:00:00Z",
    minBid: 0.02,
    currentBid: 0.8,
    bidders: 3
  },
  {
    id: "7",
    name: "Gaming Legend #9012",
    description: "Rare in-game character with exclusive abilities and unique design.",
    price: 2.1,
    image: "gradient-green-blue",
    category: "Gaming",
    creator: "GameDev",
    likes: 334,
    bids: 21,
    timeLeft: "8h 45m",
    endTime: "2024-12-26T02:00:00Z",
    minBid: 0.1,
    currentBid: 2.1,
    bidders: 15
  },
  {
    id: "8",
    name: "Nature's Symphony #9012",
    description: "A harmonious blend of natural elements and digital artistry.",
    price: 0.5,
    image: "gradient-green-emerald",
    category: "Digital Art",
    creator: "ArtEnthusiast",
    likes: 89,
    bids: 5,
    timeLeft: "12h 20m",
    endTime: "2024-12-26T06:00:00Z",
    minBid: 0.01,
    currentBid: 0.5,
    bidders: 2
  }
];

const categories = ["All", "Digital Art", "Music", "Gaming", "Collectibles"];
const sortOptions = ["Ending Soon", "Price: Low to High", "Price: High to Low", "Most Bids", "Most Popular"];

export default function AuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Ending Soon");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAuctions = mockAuctions.filter(auction => {
    const matchesCategory = selectedCategory === "All" || auction.category === selectedCategory;
    const matchesSearch = auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = auction.currentBid >= priceRange[0] && auction.currentBid <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.currentBid - b.currentBid;
      case "Price: High to Low":
        return b.currentBid - a.currentBid;
      case "Most Bids":
        return b.bids - a.bids;
      case "Most Popular":
        return b.likes - a.likes;
      case "Ending Soon":
        // Sort by time left (simplified - in real app you'd parse the time)
        return a.timeLeft.localeCompare(b.timeLeft);
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

  const getTimeColor = (timeLeft: string) => {
    const hours = parseInt(timeLeft.split('h')[0]);
    if (hours < 2) return "text-red-400";
    if (hours < 6) return "text-yellow-400";
    return "text-green-400";
  };

  const AuctionCard = ({ auction }: { auction: Auction }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
      {/* Auction Image */}
      <div className={`h-48 ${getGradientClass(auction.image)} relative`}>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          Auction
        </div>
        <div className={`absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm ${getTimeColor(auction.timeLeft)}`}>
          {auction.timeLeft}
        </div>
      </div>

      {/* Auction Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-lg">{auction.name}</h3>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="text-white/60 text-sm">{auction.likes}</span>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-4 line-clamp-2">{auction.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-white/60 text-sm">Creator</div>
            <div className="text-white font-medium">{auction.creator}</div>
          </div>
          <div>
            <div className="text-white/60 text-sm">Category</div>
            <div className="text-white font-medium">{auction.category}</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-white/60 text-sm">Current Bid:</span>
            <span className="text-white font-bold">{auction.currentBid} ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60 text-sm">Min Bid:</span>
            <span className="text-white font-medium">{auction.minBid} ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60 text-sm">Bids:</span>
            <span className="text-white font-medium">{auction.bids} ({auction.bidders} bidders)</span>
          </div>
        </div>

        <div className="space-y-2">
          <input 
            type="number" 
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40" 
            placeholder={`Min bid: ${auction.minBid} ETH`} 
            step="0.01" 
            min={auction.minBid}
          />
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );

  const AuctionListItem = ({ auction }: { auction: Auction }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:transform hover:scale-105 transition-all">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Auction Image */}
        <div className={`w-full md:w-48 h-48 ${getGradientClass(auction.image)} rounded-xl relative flex-shrink-0`}>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Auction
          </div>
          <div className={`absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm ${getTimeColor(auction.timeLeft)}`}>
            {auction.timeLeft}
          </div>
        </div>

        {/* Auction Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">{auction.name}</h3>
              <p className="text-white/60 text-sm mb-4">{auction.description}</p>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="text-white/60 text-sm">{auction.likes}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-white/60 text-sm">Creator</div>
              <div className="text-white font-medium">{auction.creator}</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Category</div>
              <div className="text-white font-medium">{auction.category}</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Current Bid</div>
              <div className="text-white font-bold">{auction.currentBid} ETH</div>
            </div>
            <div>
              <div className="text-white/60 text-sm">Min Bid</div>
              <div className="text-white font-medium">{auction.minBid} ETH</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div>
                <span className="text-white/60 text-sm">Bids: </span>
                <span className="text-white font-medium">{auction.bids} ({auction.bidders} bidders)</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <input 
                type="number" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 w-32" 
                placeholder={`Min: ${auction.minBid}`} 
                step="0.01" 
                min={auction.minBid}
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              <Link href="/auctions" className="text-white font-medium">
                Auctions
              </Link>
              <Link href="/categories" className="text-white/80 hover:text-white transition-colors">
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

      {/* Auctions Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Active Auctions</h1>
          <p className="text-white/60">Bid on unique NFTs and win exclusive digital assets</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                placeholder="Search auctions..."
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

        {/* Results Count and View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/60">
            Showing {sortedAuctions.length} of {mockAuctions.length} auctions
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "grid" 
                  ? "bg-white/20 text-white" 
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Grid View</span>
              </div>
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "list" 
                  ? "bg-white/20 text-white" 
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>List View</span>
              </div>
            </button>
          </div>
        </div>

        {/* Auctions Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedAuctions.map((auction) => (
              <AuctionListItem key={auction.id} auction={auction} />
            ))}
          </div>
        )}

        {/* Load More */}
        {sortedAuctions.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Load More Auctions
            </button>
          </div>
        )}

        {/* No Results */}
        {sortedAuctions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/60 text-lg mb-4">No auctions found matching your criteria</div>
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
