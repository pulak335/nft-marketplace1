"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Auction {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  timeLeft: string;
  bids: number;
  creator: string;
}

const activeAuctions: Auction[] = [
  {
    id: "1",
    name: "Golden Hour #3456",
    description: "A stunning sunset captured in digital form.",
    price: 3.2,
    image: "gradient-yellow-orange",
    timeLeft: "2h 15m",
    bids: 12,
    creator: "SunsetLover"
  },
  {
    id: "2",
    name: "Crimson Wave #7890",
    description: "Abstract art representing the power of nature.",
    price: 1.8,
    image: "gradient-red-pink",
    timeLeft: "5h 42m",
    bids: 8,
    creator: "AbstractMaster"
  },
  {
    id: "3",
    name: "Mystic Portal #1234",
    description: "A gateway to another dimension in digital art.",
    price: 4.5,
    image: "gradient-indigo-purple",
    timeLeft: "1h 23m",
    bids: 15,
    creator: "MysticArtist"
  },
  {
    id: "4",
    name: "Cosmic Dreamer #1234",
    description: "A mesmerizing digital artwork exploring the depths of space.",
    price: 2.5,
    image: "gradient-purple-pink",
    timeLeft: "3h 7m",
    bids: 9,
    creator: "CryptoArtist123"
  },
  {
    id: "5",
    name: "Neon City #5678",
    description: "A futuristic cityscape with neon lights and cyberpunk aesthetics.",
    price: 1.8,
    image: "gradient-blue-cyan",
    timeLeft: "4h 12m",
    bids: 6,
    creator: "DigitalCollector"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeAuctions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeAuctions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeAuctions.length) % activeAuctions.length);
  };

  const getGradientClass = (image: string) => {
    const gradients: { [key: string]: string } = {
      "gradient-purple-pink": "bg-gradient-to-br from-purple-400 to-pink-400",
      "gradient-blue-cyan": "bg-gradient-to-br from-blue-400 to-cyan-400",
      "gradient-green-emerald": "bg-gradient-to-br from-green-400 to-emerald-400",
      "gradient-yellow-orange": "bg-gradient-to-br from-yellow-400 to-orange-400",
      "gradient-red-pink": "bg-gradient-to-br from-red-400 to-pink-400",
      "gradient-indigo-purple": "bg-gradient-to-br from-indigo-400 to-purple-400"
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">NFT Marketplace</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-white/80 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/auctions" className="text-white/80 hover:text-white transition-colors">
                Auctions
              </Link>
              <Link href="#categories" className="text-white/80 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="#bids" className="text-white/80 hover:text-white transition-colors">
                Bids
              </Link>
              <Link href="#profile" className="text-white/80 hover:text-white transition-colors">
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover, Create & Trade
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Unique NFTs
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the future of digital art and collectibles. Buy, sell, bid, and create unique NFTs in our decentralized marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all inline-block text-center">
              Explore Marketplace
            </Link>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all">
              Start Trading
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/60">NFTs Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">5K+</div>
              <div className="text-white/60">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">$2M+</div>
              <div className="text-white/60">Total Volume</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/60">Artists</div>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Categories Section */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">NFT Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Art Category */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Digital Art</h3>
              <p className="text-white/60 mb-4">Unique digital artworks and illustrations</p>
              <div className="text-white/80 font-medium">2,500+ Items</div>
            </div>

            {/* Music Category */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Music</h3>
              <p className="text-white/60 mb-4">Exclusive music tracks and albums</p>
              <div className="text-white/80 font-medium">800+ Items</div>
            </div>

            {/* Gaming Category */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Gaming</h3>
              <p className="text-white/60 mb-4">In-game items and collectibles</p>
              <div className="text-white/80 font-medium">1,200+ Items</div>
            </div>

            {/* Collectibles Category */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Collectibles</h3>
              <p className="text-white/60 mb-4">Rare collectibles and memorabilia</p>
              <div className="text-white/80 font-medium">3,000+ Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">Featured NFTs</h2>
            <Link href="/marketplace" className="text-purple-400 hover:text-purple-300 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* NFT Card 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-400 relative">
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Hot Bid
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">Cosmic Dreamer #1234</h3>
                <p className="text-white/60 mb-4">A mesmerizing digital artwork exploring the depths of space and consciousness.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white/60 text-sm">Current Bid</div>
                    <div className="text-white font-bold">2.5 ETH</div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>

            {/* NFT Card 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-cyan-400 relative">
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  For Sale
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">Neon City #5678</h3>
                <p className="text-white/60 mb-4">A futuristic cityscape with neon lights and cyberpunk aesthetics.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white/60 text-sm">Price</div>
                    <div className="text-white font-bold">1.8 ETH</div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-medium hover:from-blue-600 hover:to-cyan-600 transition-all">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* NFT Card 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
              <div className="h-64 bg-gradient-to-br from-green-400 to-emerald-400 relative">
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Auction
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">Nature's Symphony #9012</h3>
                <p className="text-white/60 mb-4">A harmonious blend of natural elements and digital artistry.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white/60 text-sm">Min Bid</div>
                    <div className="text-white font-bold">0.5 ETH</div>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                    Bid Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Bid Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Recent Bids</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Bid 1 */}
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">CryptoArtist123</div>
                      <div className="text-white/60 text-sm">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">2.8 ETH</div>
                    <div className="text-white/60 text-sm">Bid placed</div>
                  </div>
                </div>
                <div className="text-white/80 text-sm">on "Cosmic Dreamer #1234"</div>
              </div>

              {/* Recent Bid 2 */}
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">DigitalCollector</div>
                      <div className="text-white/60 text-sm">5 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">1.5 ETH</div>
                    <div className="text-white/60 text-sm">Bid placed</div>
                  </div>
                </div>
                <div className="text-white/80 text-sm">on "Neon City #5678"</div>
              </div>

              {/* Recent Bid 3 */}
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">ArtEnthusiast</div>
                      <div className="text-white/60 text-sm">8 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">0.8 ETH</div>
                    <div className="text-white/60 text-sm">Bid placed</div>
                  </div>
                </div>
                <div className="text-white/80 text-sm">on "Nature's Symphony #9012"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Time Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Trading Hours & Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">Trading Hours</div>
              <div className="text-white/40 text-sm mt-2">Always Open</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">15s</div>
              <div className="text-white/60">Avg. Transaction</div>
              <div className="text-white/40 text-sm mt-2">Lightning Fast</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/60">Uptime</div>
              <div className="text-white/40 text-sm mt-2">Reliable</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/60">Daily Trades</div>
              <div className="text-white/40 text-sm mt-2">Active Market</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Auctions Carousel Section */}
      <section id="bids" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">Active Auctions</h2>
            <Link href="/auctions" className="text-purple-400 hover:text-purple-300 font-medium">
              View All Auctions →
            </Link>
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {activeAuctions.map((auction) => (
                  <div key={auction.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                      {activeAuctions.slice(0, 3).map((item) => (
                        <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                          <div className={`h-48 ${getGradientClass(item.image)} rounded-xl mb-4 relative`}>
                            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                              Auction
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                              {item.timeLeft}
                            </div>
                          </div>
                          <h3 className="text-white font-bold text-xl mb-2">{item.name}</h3>
                          <p className="text-white/60 mb-4">{item.description}</p>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-white/60">Current Bid:</span>
                              <span className="text-white font-bold">{item.price} ETH</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">Time Left:</span>
                              <span className="text-white font-bold">{item.timeLeft}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">Bids:</span>
                              <span className="text-white font-bold">{item.bids}</span>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <input type="number" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40" placeholder="Enter bid amount" step="0.01" />
                            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                              Place Bid
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {activeAuctions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Connect Wallet</h3>
              <p className="text-white/60">
                Connect your digital wallet (MetaMask, WalletConnect, etc.) to start trading NFTs securely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Browse & Bid</h3>
              <p className="text-white/60">
                Explore thousands of unique NFTs, place bids on auctions, or buy directly from creators.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">Own & Trade</h3>
              <p className="text-white/60">
                Own your NFTs, trade them with other collectors, or list them for sale in our marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-3">What is an NFT?</h3>
              <p className="text-white/60">
                NFT stands for Non-Fungible Token. It's a unique digital asset that represents ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies, each NFT is unique and cannot be exchanged on a one-to-one basis.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-3">How do I buy an NFT?</h3>
              <p className="text-white/60">
                To buy an NFT, you need to connect your digital wallet (like MetaMask) to our platform, browse the marketplace, and either place a bid on an auction or buy directly at the listed price. All transactions are conducted using cryptocurrency.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-3">What cryptocurrencies do you accept?</h3>
              <p className="text-white/60">
                We currently accept Ethereum (ETH) for all transactions. We're working on adding support for other major cryptocurrencies like Bitcoin, Polygon, and Solana in the near future.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-3">How do I create and sell my own NFT?</h3>
              <p className="text-white/60">
                To create an NFT, you need to upload your digital artwork, music, or other content, fill in the details, set a price, and mint it on the blockchain. Once minted, you can list it for sale in our marketplace.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-3">Are there any fees?</h3>
              <p className="text-white/60">
                Yes, there are small transaction fees (gas fees) for blockchain transactions, and we charge a 2.5% marketplace fee on successful sales. These fees help maintain the platform and cover operational costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-white font-bold text-xl">NFT Marketplace</span>
              </div>
              <p className="text-white/60">
                The future of digital art and collectibles is here. Join our community of creators and collectors.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Marketplace</h3>
              <ul className="space-y-2">
                <li><Link href="/marketplace" className="text-white/60 hover:text-white transition-colors">All NFTs</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Art</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Music</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Gaming</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Partners</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Newsletter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60">&copy; 2024 NFT Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
