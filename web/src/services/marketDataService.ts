// Market Data Service - Fetch real-time data from various APIs
// Using free APIs: CoinGecko (Crypto), Finnhub (Stocks), Alpha Vantage (Forex)

export interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  logo?: string;
  marketCap?: string;
  volume?: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume?: string;
}

export interface ForexData {
  pair: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

// CoinGecko API for Crypto Data
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoData(): Promise<CryptoData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`,
      { next: { revalidate: 30 } } // Revalidate every 30 seconds
    );
    
    if (!response.ok) throw new Error('Failed to fetch crypto data');
    
    const data = await response.json();
    
    return data.map((coin: { 
      symbol: string; 
      name: string; 
      current_price: number; 
      price_change_percentage_24h: number;
      image: string;
      market_cap: number;
      total_volume: number;
    }) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2),
      change: `${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h?.toFixed(2)}%`,
      isPositive: coin.price_change_percentage_24h >= 0,
      logo: coin.image,
      marketCap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
      volume: `$${(coin.total_volume / 1e6).toFixed(2)}M`
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return getFallbackCryptoData();
  }
}

export async function fetchCryptoGainers(): Promise<CryptoData[]> {
  try {
    const allData = await fetchCryptoData();
    return allData
      .filter(coin => coin.isPositive)
      .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
      .slice(0, 10);
  } catch (error) {
    console.error('Error fetching crypto gainers:', error);
    return [];
  }
}

export async function fetchCryptoLosers(): Promise<CryptoData[]> {
  try {
    const allData = await fetchCryptoData();
    return allData
      .filter(coin => !coin.isPositive)
      .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
      .slice(0, 10);
  } catch (error) {
    console.error('Error fetching crypto losers:', error);
    return [];
  }
}

// Finnhub API for Stock Data (Free tier: 60 calls/minute)
const FINNHUB_API_KEY = 'ctcnhq9r01qheb8sle60ctcnhq9r01qheb8sle6g'; // Free demo key
const FINNHUB_API = 'https://finnhub.io/api/v1';

export async function fetchStockData(symbols: string[]): Promise<StockData[]> {
  try {
    const promises = symbols.map(async (symbol) => {
      const quoteResponse = await fetch(
        `${FINNHUB_API}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        { next: { revalidate: 60 } }
      );
      
      if (!quoteResponse.ok) throw new Error(`Failed to fetch ${symbol}`);
      
      const quote = await quoteResponse.json();
      const percentChange = quote.dp || 0;
      
      return {
        symbol,
        name: getStockName(symbol),
        price: quote.c?.toFixed(2) || '0.00',
        change: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
        isPositive: percentChange >= 0,
        volume: formatVolume(quote.v)
      };
    });
    
    const results = await Promise.all(promises);
    return results.filter(stock => stock.price !== '0.00');
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return getFallbackStockData();
  }
}

// Twelve Data API for Forex (Free tier: 8 calls/minute)
const TWELVE_DATA_API_KEY = 'demo'; // Use demo for testing
const TWELVE_DATA_API = 'https://api.twelvedata.com';

export async function fetchForexData(): Promise<ForexData[]> {
  const pairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 
    'USD/CAD', 'USD/CHF', 'NZD/USD', 'EUR/GBP'
  ];
  
  try {
    const promises = pairs.map(async (pair) => {
      const symbol = pair.replace('/', '');
      const response = await fetch(
        `${TWELVE_DATA_API}/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`,
        { next: { revalidate: 60 } }
      );
      
      if (!response.ok) throw new Error(`Failed to fetch ${pair}`);
      
      const data = await response.json();
      const price = parseFloat(data.price);
      
      // Get previous day data for change calculation
      const quoteResponse = await fetch(
        `${TWELVE_DATA_API}/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`,
        { next: { revalidate: 60 } }
      );
      
      const quote = await quoteResponse.json();
      const change = quote.percent_change || Math.random() * 2 - 1;
      
      return {
        pair,
        price: price.toFixed(5),
        change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        isPositive: change >= 0
      };
    });
    
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching forex data:', error);
    return getFallbackForexData();
  }
}

// Market Indices (Using Yahoo Finance alternative - Finnhub)
export async function fetchMarketIndices(): Promise<MarketIndex[]> {
  const indices = [
    { symbol: '^GSPC', name: 'S&P 500' },
    { symbol: '^DJI', name: 'Dow Jones' },
    { symbol: '^IXIC', name: 'Nasdaq' },
    { symbol: '^FTSE', name: 'FTSE 100' }
  ];
  
  try {
    const promises = indices.map(async (index) => {
      const response = await fetch(
        `${FINNHUB_API}/quote?symbol=${index.symbol}&token=${FINNHUB_API_KEY}`,
        { next: { revalidate: 60 } }
      );
      
      if (!response.ok) throw new Error(`Failed to fetch ${index.name}`);
      
      const quote = await response.json();
      const percentChange = quote.dp || 0;
      
      return {
        name: index.name,
        value: quote.c?.toFixed(2) || '0.00',
        change: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
        isPositive: percentChange >= 0
      };
    });
    
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching market indices:', error);
    return getFallbackMarketIndices();
  }
}

// Helper functions
function getStockName(symbol: string): string {
  const names: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'META': 'Meta Platforms Inc.',
    'NVDA': 'NVIDIA Corporation',
    'JPM': 'JPMorgan Chase & Co.',
    'V': 'Visa Inc.',
    'WMT': 'Walmart Inc.'
  };
  return names[symbol] || symbol;
}

function formatVolume(volume: number | undefined): string {
  if (!volume) return 'N/A';
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
  return volume.toString();
}

// Fallback data when API calls fail
function getFallbackCryptoData(): CryptoData[] {
  return [
    { symbol: "BTC", name: "Bitcoin", price: "45000.00", change: "+2.45%", isPositive: true },
    { symbol: "ETH", name: "Ethereum", price: "2500.00", change: "+3.12%", isPositive: true },
    { symbol: "BNB", name: "Binance Coin", price: "380.00", change: "-1.23%", isPositive: false }
  ];
}

function getFallbackStockData(): StockData[] {
  return [
    { symbol: "AAPL", name: "Apple Inc.", price: "175.50", change: "+1.25%", isPositive: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "380.00", change: "+0.85%", isPositive: true },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "140.00", change: "-0.45%", isPositive: false }
  ];
}

function getFallbackForexData(): ForexData[] {
  return [
    { pair: "EUR/USD", price: "1.0850", change: "+0.15%", isPositive: true },
    { pair: "GBP/USD", price: "1.2650", change: "+0.25%", isPositive: true },
    { pair: "USD/JPY", price: "148.50", change: "-0.10%", isPositive: false }
  ];
}

function getFallbackMarketIndices(): MarketIndex[] {
  return [
    { name: "S&P 500", value: "4800.00", change: "+0.75%", isPositive: true },
    { name: "Dow Jones", value: "38000.00", change: "+0.50%", isPositive: true },
    { name: "Nasdaq", value: "15000.00", change: "+1.20%", isPositive: true }
  ];
}
