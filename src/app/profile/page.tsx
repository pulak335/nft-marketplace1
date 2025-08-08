"use client";

import { useState } from "react";
import Link from "next/link";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  location: string;
  website: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  stats: {
    nftsOwned: number;
    nftsCreated: number;
    totalValue: number;
    followers: number;
    following: number;
  };
}

interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  status: "owned" | "created" | "listed";
  date: string;
}

interface Activity {
  id: string;
  type: "purchase" | "sale" | "bid" | "creation" | "listing";
  title: string;
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

const mockUserProfile: UserProfile = {
  id: "1",
  username: "CryptoArtist123",
  email: "artist@example.com",
  avatar: "gradient-purple-pink",
  bio: "Digital artist and NFT enthusiast. Creating unique digital artworks and exploring the future of digital ownership.",
  joinDate: "2023-01-15",
  location: "New York, NY",
  website: "https://cryptoartist123.com",
  socialLinks: {
    twitter: "@cryptoartist123",
    instagram: "@cryptoartist123",
    discord: "CryptoArtist123#1234"
  },
  stats: {
    nftsOwned: 24,
    nftsCreated: 12,
    totalValue: 45.8,
    followers: 1247,
    following: 89
  }
};

const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Cosmic Dreamer #1234",
    image: "gradient-purple-pink",
    price: 2.5,
    category: "Digital Art",
    status: "owned",
    date: "2024-12-20"
  },
  {
    id: "2",
    name: "Neon City #5678",
    image: "gradient-blue-cyan",
    price: 1.8,
    category: "Digital Art",
    status: "created",
    date: "2024-12-18"
  },
  {
    id: "3",
    name: "Golden Hour #3456",
    image: "gradient-yellow-orange",
    price: 3.2,
    category: "Digital Art",
    status: "listed",
    date: "2024-12-15"
  },
  {
    id: "4",
    name: "Mystic Portal #1234",
    image: "gradient-indigo-purple",
    price: 4.5,
    category: "Digital Art",
    status: "owned",
    date: "2024-12-12"
  },
  {
    id: "5",
    name: "Digital Symphony #5678",
    image: "gradient-blue-purple",
    price: 0.8,
    category: "Music",
    status: "created",
    date: "2024-12-10"
  },
  {
    id: "6",
    name: "Nature's Beauty #3456",
    image: "gradient-green-emerald",
    price: 1.5,
    category: "Photography",
    status: "owned",
    date: "2024-12-08"
  }
];

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "purchase",
    title: "Purchased Cosmic Dreamer #1234",
    description: "Successfully purchased NFT for 2.5 ETH",
    amount: 2.5,
    date: "2024-12-20T14:30:00Z",
    status: "completed"
  },
  {
    id: "2",
    type: "creation",
    title: "Created Neon City #5678",
    description: "Minted new NFT collection",
    date: "2024-12-18T10:15:00Z",
    status: "completed"
  },
  {
    id: "3",
    type: "sale",
    title: "Sold Golden Hour #3456",
    description: "NFT sold for 3.2 ETH",
    amount: 3.2,
    date: "2024-12-15T16:45:00Z",
    status: "completed"
  },
  {
    id: "4",
    type: "bid",
    title: "Placed bid on Mystic Portal #1234",
    description: "Bid 4.5 ETH on auction",
    amount: 4.5,
    date: "2024-12-12T09:20:00Z",
    status: "completed"
  },
  {
    id: "5",
    type: "listing",
    title: "Listed Digital Symphony #5678",
    description: "NFT listed for sale at 0.8 ETH",
    amount: 0.8,
    date: "2024-12-10T11:30:00Z",
    status: "completed"
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "nfts" | "activity" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        );
      case "sale":
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case "bid":
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "creation":
        return (
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case "listing":
        return (
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <Link href="/categories" className="text-white/80 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/bids" className="text-white/80 hover:text-white transition-colors">
                Bids
              </Link>
              <Link href="/profile" className="text-white font-medium">
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

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className={`w-32 h-32 ${getGradientClass(mockUserProfile.avatar)} rounded-full relative`}>
                <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">
                    {mockUserProfile.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{mockUserProfile.username}</h1>
                  <p className="text-white/60 mb-2">{mockUserProfile.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>Joined {formatDate(mockUserProfile.joinDate)}</span>
                    <span>•</span>
                    <span>{mockUserProfile.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{mockUserProfile.stats.nftsOwned}</div>
                  <div className="text-white/60 text-sm">NFTs Owned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{mockUserProfile.stats.nftsCreated}</div>
                  <div className="text-white/60 text-sm">Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{mockUserProfile.stats.totalValue.toFixed(1)} ETH</div>
                  <div className="text-white/60 text-sm">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{mockUserProfile.stats.followers}</div>
                  <div className="text-white/60 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{mockUserProfile.stats.following}</div>
                  <div className="text-white/60 text-sm">Following</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {mockUserProfile.socialLinks.twitter && (
                  <a href={`https://twitter.com/${mockUserProfile.socialLinks.twitter.replace('@', '')}`} 
                     className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
                {mockUserProfile.socialLinks.instagram && (
                  <a href={`https://instagram.com/${mockUserProfile.socialLinks.instagram.replace('@', '')}`} 
                     className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                    </svg>
                  </a>
                )}
                {mockUserProfile.socialLinks.discord && (
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-2xl p-1 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "overview"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("nfts")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "nfts"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            My NFTs ({mockNFTs.length})
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "activity"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Activity ({mockActivities.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === "settings"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent NFTs */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Recent NFTs</h3>
              <div className="space-y-4">
                {mockNFTs.slice(0, 3).map((nft) => (
                  <div key={nft.id} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${getGradientClass(nft.image)} rounded-lg flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{nft.name}</div>
                      <div className="text-white/60 text-sm">{nft.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{nft.price} ETH</div>
                      <div className="text-white/60 text-sm">{formatDate(nft.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                onClick={() => setActiveTab("nfts")}
                className="block text-center mt-4 text-purple-400 hover:text-purple-300 font-medium"
              >
                View All NFTs →
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {mockActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{activity.title}</div>
                      <div className="text-white/60 text-sm">{activity.description}</div>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <div className="text-white font-bold">{activity.amount} ETH</div>
                      )}
                      <div className="text-white/60 text-sm">{formatDate(activity.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                onClick={() => setActiveTab("activity")}
                className="block text-center mt-4 text-purple-400 hover:text-purple-300 font-medium"
              >
                View All Activity →
              </Link>
            </div>
          </div>
        )}

        {/* NFTs Tab */}
        {activeTab === "nfts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">My NFTs</h2>
              <div className="flex space-x-2">
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Filter
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  Create NFT
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.map((nft) => (
                <div key={nft.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all">
                  <div className={`h-48 ${getGradientClass(nft.image)} relative`}>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm bg-black/50 text-white">
                      {nft.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{nft.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{nft.category}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-white font-bold text-lg">{nft.price} ETH</div>
                      <div className="text-white/60 text-sm">{formatDate(nft.date)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Activity History</h2>
            {mockActivities.map((activity) => (
              <div key={activity.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:transform hover:scale-105 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{activity.title}</h3>
                    <p className="text-white/60">{activity.description}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <div className="text-white font-bold text-lg">{activity.amount} ETH</div>
                    )}
                    <div className="text-white/60 text-sm">{formatTime(activity.date)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
            
            {/* Profile Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue={mockUserProfile.username}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={mockUserProfile.email}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={mockUserProfile.location}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue={mockUserProfile.website}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/60 text-sm mb-2">Bio</label>
                  <textarea
                    defaultValue={mockUserProfile.bio}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
