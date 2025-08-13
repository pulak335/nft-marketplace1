"use client";

import { useState } from "react";
import Link from "next/link";

interface Bid {
  id: string;
  nftId: string;
  nftName: string;
  nftImage: string;
  bidAmount: number;
  bidTime: string;
  status: "active" | "won" | "lost" | "outbid";
  auctionEndTime: string;
  timeLeft: string;
  totalBids: number;
  highestBid: number;
  creator: string;
  category: string;
}

interface BidHistory {
  id: string;
  nftId: string;
  nftName: string;
  nftImage: string;
  bidAmount: number;
  bidTime: string;
  status: "won" | "lost" | "outbid" | "cancelled";
  finalPrice?: number;
  creator: string;
  category: string;
}

const mockActiveBids: Bid[] = [
  {
    id: "1",
    nftId: "nft1",
    nftName: "Cosmic Dreamer #1234",
    nftImage: "gradient-purple-pink",
    bidAmount: 2.5,
    bidTime: "2024-12-24T10:30:00Z",
    status: "active",
    auctionEndTime: "2024-12-25T18:00:00Z",
    timeLeft: "2h 15m",
    totalBids: 12,
    highestBid: 2.8,
    creator: "CryptoArtist123",
    category: "Digital Art"
  },
  {
    id: "2",
    nftId: "nft2",
    nftName: "Golden Hour #3456",
    nftImage: "gradient-yellow-orange",
    bidAmount: 3.2,
    bidTime: "2024-12-24T09:15:00Z",
    status: "outbid",
    auctionEndTime: "2024-12-25T16:00:00Z",
    timeLeft: "1h 23m",
    totalBids: 23,
    highestBid: 3.5,
    creator: "SunsetLover",
    category: "Digital Art"
  },
  {
    id: "3",
    nftId: "nft3",
    nftName: "Mystic Portal #1234",
    nftImage: "gradient-indigo-purple",
    bidAmount: 4.5,
    bidTime: "2024-12-24T08:45:00Z",
    status: "active",
    auctionEndTime: "2024-12-25T20:00:00Z",
    timeLeft: "3h 7m",
    totalBids: 15,
    highestBid: 4.5,
    creator: "MysticArtist",
    category: "Digital Art"
  },
  {
    id: "4",
    nftId: "nft4",
    nftName: "Gaming Legend #9012",
    nftImage: "gradient-green-blue",
    bidAmount: 2.1,
    bidTime: "2024-12-24T07:20:00Z",
    status: "active",
    auctionEndTime: "2024-12-26T02:00:00Z",
    timeLeft: "8h 45m",
    totalBids: 21,
    highestBid: 2.1,
    creator: "GameDev",
    category: "Gaming"
  }
];

const mockBidHistory: BidHistory[] = [
  {
    id: "h1",
    nftId: "nft5",
    nftName: "Neon City #5678",
    nftImage: "gradient-blue-cyan",
    bidAmount: 1.8,
    bidTime: "2024-12-20T14:30:00Z",
    status: "won",
    finalPrice: 1.8,
    creator: "DigitalCollector",
    category: "Digital Art"
  },
  {
    id: "h2",
    nftId: "nft6",
    nftName: "Crimson Wave #7890",
    nftImage: "gradient-red-pink",
    bidAmount: 1.8,
    bidTime: "2024-12-19T16:45:00Z",
    status: "lost",
    finalPrice: 2.2,
    creator: "AbstractMaster",
    category: "Digital Art"
  },
  {
    id: "h3",
    nftId: "nft7",
    nftName: "Digital Symphony #5678",
    nftImage: "gradient-blue-purple",
    bidAmount: 0.8,
    bidTime: "2024-12-18T11:20:00Z",
    status: "outbid",
    finalPrice: 1.1,
    creator: "MusicProducer",
    category: "Music"
  },
  {
    id: "h4",
    nftId: "nft8",
    nftName: "Nature's Symphony #9012",
    nftImage: "gradient-green-emerald",
    bidAmount: 0.5,
    bidTime: "2024-12-17T13:15:00Z",
    status: "won",
    finalPrice: 0.5,
    creator: "ArtEnthusiast",
    category: "Digital Art"
  }
];

export default function BidsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "won":
        return "text-green-400";
      case "lost":
        return "text-red-400";
      case "outbid":
        return "text-yellow-400";
      default:
        return "text-white/60";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "won":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "lost":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "outbid":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalActiveBids = mockActiveBids.length;
  const totalWonBids = mockBidHistory.filter(bid => bid.status === "won").length;
  const totalSpent = mockBidHistory
    .filter(bid => bid.status === "won")
    .reduce((sum, bid) => sum + (bid.finalPrice || 0), 0);

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
              <Link href="/categories" className="text-white/80 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/bids" className="text-white font-medium">
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

      {/* Bids Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Bids</h1>
          <p className="text-white/60">Manage your active bids and view bid history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-sm">Active Bids</div>
                <div className="text-2xl font-bold text-white">{totalActiveBids}</div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-sm">Won Auctions</div>
                <div className="text-2xl font-bold text-white">{totalWonBids}</div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-sm">Total Spent</div>
                <div className="text-2xl font-bold text-white">{totalSpent.toFixed(1)} ETH</div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-2xl p-1 mb-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "active"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Active Bids ({mockActiveBids.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "history"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Bid History ({mockBidHistory.length})
          </button>
        </div>

        {/* Active Bids */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {mockActiveBids.map((bid) => (
              <div key={bid.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:transform hover:scale-105 transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* NFT Image */}
                  <div className={`w-full md:w-48 h-48 ${getGradientClass(bid.nftImage)} rounded-xl relative flex-shrink-0`}>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm border ${getStatusBadge(bid.status)}`}>
                      {bid.status === "active" ? "Active" : "Outbid"}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {bid.timeLeft}
                    </div>
                  </div>

                  {/* Bid Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2">{bid.nftName}</h3>
                        <p className="text-white/60 text-sm">by {bid.creator} • {bid.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-sm">Your Bid</div>
                        <div className="text-white font-bold text-xl">{bid.bidAmount} ETH</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <div className="text-white/60 text-sm">Highest Bid</div>
                        <div className="text-white font-bold">{bid.highestBid} ETH</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Total Bids</div>
                        <div className="text-white font-medium">{bid.totalBids}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Bid Time</div>
                        <div className="text-white font-medium">{formatTime(bid.bidTime)}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">End Time</div>
                        <div className="text-white font-medium">{formatTime(bid.auctionEndTime)}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        {bid.status === "outbid" && (
                          <div className="text-yellow-400 text-sm font-medium">
                            You&apos;ve been outbid! Current highest: {bid.highestBid} ETH
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {bid.status === "outbid" && (
                          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
                            Increase Bid
                          </button>
                        )}
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          View Auction
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bid History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {mockBidHistory.map((bid) => (
              <div key={bid.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:transform hover:scale-105 transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* NFT Image */}
                  <div className={`w-full md:w-48 h-48 ${getGradientClass(bid.nftImage)} rounded-xl relative flex-shrink-0`}>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm border ${getStatusBadge(bid.status)}`}>
                      {bid.status === "won" ? "Won" : bid.status === "lost" ? "Lost" : "Outbid"}
                    </div>
                  </div>

                  {/* Bid Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2">{bid.nftName}</h3>
                        <p className="text-white/60 text-sm">by {bid.creator} • {bid.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-sm">Your Bid</div>
                        <div className="text-white font-bold text-xl">{bid.bidAmount} ETH</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-white/60 text-sm">Final Price</div>
                        <div className="text-white font-bold">{bid.finalPrice || "N/A"} ETH</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Bid Time</div>
                        <div className="text-white font-medium">{formatTime(bid.bidTime)}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Status</div>
                        <div className={`font-medium ${getStatusColor(bid.status)}`}>
                          {bid.status === "won" ? "Won" : bid.status === "lost" ? "Lost" : "Outbid"}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        {bid.status === "won" && (
                          <div className="text-green-400 text-sm font-medium">
                            Congratulations! You won this auction
                          </div>
                        )}
                        {bid.status === "lost" && (
                          <div className="text-red-400 text-sm font-medium">
                            Auction ended. Final price: {bid.finalPrice} ETH
                          </div>
                        )}
                        {bid.status === "outbid" && (
                          <div className="text-yellow-400 text-sm font-medium">
                            You were outbid. Final price: {bid.finalPrice} ETH
                          </div>
                        )}
                      </div>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {activeTab === "active" && mockActiveBids.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">No Active Bids</h3>
            <p className="text-white/60 mb-6">You don&apos;t have any active bids at the moment.</p>
            <Link
              href="/auctions"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Browse Auctions
            </Link>
          </div>
        )}

        {activeTab === "history" && mockBidHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">No Bid History</h3>
            <p className="text-white/60 mb-6">You haven&apos;t placed any bids yet.</p>
            <Link
              href="/auctions"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Start Bidding
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
