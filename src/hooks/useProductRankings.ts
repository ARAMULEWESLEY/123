import { useState, useEffect, useCallback } from "react";

const RANKINGS_KEY = "product_order_rankings";

interface ProductRanking {
  name: string;
  orderCount: number;
}

export const useProductRankings = () => {
  const [rankings, setRankings] = useState<ProductRanking[]>([]);

  // Load rankings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RANKINGS_KEY);
    if (stored) {
      try {
        setRankings(JSON.parse(stored));
      } catch {
        setRankings([]);
      }
    }
  }, []);

  // Increment order count for a product
  const incrementOrderCount = useCallback((productName: string, quantity: number = 1) => {
    setRankings((prev) => {
      const existing = prev.find((p) => p.name === productName);
      let updated: ProductRanking[];
      
      if (existing) {
        updated = prev.map((p) =>
          p.name === productName
            ? { ...p, orderCount: p.orderCount + quantity }
            : p
        );
      } else {
        updated = [...prev, { name: productName, orderCount: quantity }];
      }
      
      // Sort by order count descending
      updated.sort((a, b) => b.orderCount - a.orderCount);
      
      // Persist to localStorage
      localStorage.setItem(RANKINGS_KEY, JSON.stringify(updated));
      
      return updated;
    });
  }, []);

  // Get order count for a specific product
  const getOrderCount = useCallback((productName: string): number => {
    const product = rankings.find((p) => p.name === productName);
    return product?.orderCount || 0;
  }, [rankings]);

  // Get ranking position (1-based)
  const getRankPosition = useCallback((productName: string): number => {
    const index = rankings.findIndex((p) => p.name === productName);
    return index === -1 ? rankings.length + 1 : index + 1;
  }, [rankings]);

  return {
    rankings,
    incrementOrderCount,
    getOrderCount,
    getRankPosition,
  };
};

// Export standalone function for use outside React components
export const incrementProductOrder = (productName: string, quantity: number = 1) => {
  const stored = localStorage.getItem(RANKINGS_KEY);
  let rankings: ProductRanking[] = [];
  
  if (stored) {
    try {
      rankings = JSON.parse(stored);
    } catch {
      rankings = [];
    }
  }

  const existing = rankings.find((p) => p.name === productName);
  
  if (existing) {
    rankings = rankings.map((p) =>
      p.name === productName
        ? { ...p, orderCount: p.orderCount + quantity }
        : p
    );
  } else {
    rankings = [...rankings, { name: productName, orderCount: quantity }];
  }
  
  rankings.sort((a, b) => b.orderCount - a.orderCount);
  localStorage.setItem(RANKINGS_KEY, JSON.stringify(rankings));
};

export const getProductRankings = (): ProductRanking[] => {
  const stored = localStorage.getItem(RANKINGS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};
