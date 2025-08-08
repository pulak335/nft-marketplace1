"use client";

import { useState } from "react";
import Link from "next/link";

interface Wallet {
  id: string;
  name: string;
  icon: string;
  description: string;
  isPopular?: boolean;
  isInstalled?: boolean;
  isConnected?: boolean;
  balance?: string;
  address?: string;
}

interface WalletConnection {
  walletId: string;
  address: string;
  balance: string;
  network: string;
  connectedAt: string;
}

const availableWallets: Wallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "The most popular Ethereum wallet",
    isPopular: true,
    isInstalled: true,
    isConnected: false
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect any wallet via QR code",
    isPopular: true,
    isInstalled: true,
    isConnected: false
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🪙",
    description: "Secure wallet from Coinbase",
    isPopular: false,
    isInstalled: true,
    isConnected: false
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Multi-chain mobile wallet",
    isPopular: false,
    isInstalled: false,
    isConnected: false
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Solana wallet for DeFi & NFTs",
    isPopular: false,
    isInstalled: false,
    isConnected: false
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "🌈",
    description: "Beautiful, simple Ethereum wallet",
    isPopular: false,
    isInstalled: false,
    isConnected: false
  }
];

const mockConnectedWallet: WalletConnection | null = null;

export default function ConnectWalletPage() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<WalletConnection | null>(mockConnectedWallet);
  const [showQRCode, setShowQRCode] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
    setConnectionError(null);
  };

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true);
    setConnectionError(null);

    // Simulate wallet connection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const wallet = availableWallets.find(w => w.id === walletId);
      if (wallet) {
        const mockConnection: WalletConnection = {
          walletId: walletId,
          address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
          balance: "2.45 ETH",
          network: "Ethereum Mainnet",
          connectedAt: new Date().toISOString()
        };
        
        setConnectedWallet(mockConnection);
        
        // Update wallet status
        const updatedWallets = availableWallets.map(w => 
          w.id === walletId ? { ...w, isConnected: true } : w
        );
        
        setSelectedWallet(null);
      }
    } catch (error) {
      setConnectionError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    // Update wallet status
    const updatedWallets = availableWallets.map(w => ({ ...w, isConnected: false }));
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkIcon = (network: string) => {
    switch (network.toLowerCase()) {
      case "ethereum mainnet":
        return "🔵";
      case "polygon":
        return "🟣";
      case "binance smart chain":
        return "🟡";
      default:
        return "⚪";
    }
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
              <Link href="/profile" className="text-white/80 hover:text-white transition-colors">
                Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/connect-wallet">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Connect Wallet Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Connect your wallet to start buying, selling, and trading NFTs. Choose from popular wallets or connect via WalletConnect.
          </p>
        </div>

        {/* Connected Wallet Status */}
        {connectedWallet && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Wallet Connected</h3>
                  <p className="text-white/60 text-sm">
                    {availableWallets.find(w => w.id === connectedWallet.walletId)?.name} • {connectedWallet.network}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{connectedWallet.balance}</div>
                <div className="text-white/60 text-sm">{formatAddress(connectedWallet.address)}</div>
              </div>
              <button
                onClick={handleDisconnect}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Wallet Options */}
        {!connectedWallet && (
          <div className="space-y-6">
            {/* Popular Wallets */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Popular Wallets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableWallets.filter(w => w.isPopular).map((wallet) => (
                  <div
                    key={wallet.id}
                    className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all ${
                      selectedWallet === wallet.id
                        ? "ring-2 ring-purple-400 bg-white/20"
                        : "hover:bg-white/15 hover:transform hover:scale-105"
                    }`}
                    onClick={() => handleWalletSelect(wallet.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{wallet.icon}</div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                          <p className="text-white/60 text-sm">{wallet.description}</p>
                        </div>
                      </div>
                      {wallet.isPopular && (
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-white/60 text-sm">
                        {wallet.isInstalled ? "Installed" : "Not Installed"}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(wallet.id);
                        }}
                        disabled={!wallet.isInstalled || isConnecting}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          wallet.isInstalled
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                            : "bg-white/10 text-white/40 cursor-not-allowed"
                        }`}
                      >
                        {isConnecting && selectedWallet === wallet.id ? "Connecting..." : "Connect"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Wallets */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Other Wallets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableWallets.filter(w => !w.isPopular).map((wallet) => (
                  <div
                    key={wallet.id}
                    className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all ${
                      selectedWallet === wallet.id
                        ? "ring-2 ring-purple-400 bg-white/20"
                        : "hover:bg-white/15 hover:transform hover:scale-105"
                    }`}
                    onClick={() => handleWalletSelect(wallet.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{wallet.icon}</div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                          <p className="text-white/60 text-sm">{wallet.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-white/60 text-sm">
                        {wallet.isInstalled ? "Installed" : "Not Installed"}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (wallet.isInstalled) {
                            handleConnect(wallet.id);
                          } else {
                            // Open wallet download page
                            window.open(`https://${wallet.name.toLowerCase().replace(' ', '')}.com`, '_blank');
                          }
                        }}
                        disabled={isConnecting}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          wallet.isInstalled
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {wallet.isInstalled ? (isConnecting && selectedWallet === wallet.id ? "Connecting..." : "Connect") : "Install"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Error */}
            {connectionError && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-400 font-medium">{connectionError}</span>
                </div>
              </div>
            )}

            {/* WalletConnect QR Code Modal */}
            {showQRCode && selectedWallet === "walletconnect" && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full">
                  <div className="text-center">
                    <h3 className="text-white font-bold text-xl mb-4">Connect with WalletConnect</h3>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-gray-500">QR Code Placeholder</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mb-4">
                      Scan this QR code with your mobile wallet to connect
                    </p>
                    <button
                      onClick={() => setShowQRCode(false)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wallet Information */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why Connect a Wallet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Buy & Sell NFTs</h3>
              <p className="text-white/60 text-sm">
                Purchase unique digital assets and list your own NFTs for sale
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Participate in Auctions</h3>
              <p className="text-white/60 text-sm">
                Bid on exclusive NFTs and participate in live auctions
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Create & Mint</h3>
              <p className="text-white/60 text-sm">
                Create your own NFTs and mint them to the blockchain
              </p>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Security & Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">🔒 Secure Connection</h3>
                <p className="text-white/60 text-sm">
                  All wallet connections are encrypted and secure. We never store your private keys.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">🛡️ Privacy First</h3>
                <p className="text-white/60 text-sm">
                  Your personal data and wallet information are protected and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Need help?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 font-medium">
              View our wallet connection guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
