'use client';

import { useState, useCallback } from 'react';
import type { DerivWS } from '../ws';
import type { ProposalInfo, BuyResponse, BuyResult } from '../types';

export interface BuyError {
  message: string;
  code?: string;
}

interface UseBuyReturn {
  buyContract: (proposal: ProposalInfo) => Promise<void>;
  isBuying: boolean;
  buyResult: BuyResult | null;
  buyError: BuyError | null;
  clearBuyResult: () => void;
}

export function useBuy(
  ws: DerivWS | null,
  isConnected: boolean
): UseBuyReturn {
  const [isBuying, setIsBuying] = useState(false);
  const [buyResult, setBuyResult] = useState<BuyResult | null>(null);
  const [buyError, setBuyError] = useState<BuyError | null>(null);

  const clearBuyResult = useCallback(() => {
    setBuyResult(null);
    setBuyError(null);
  }, []);

  const buyContract = useCallback(async (proposal: ProposalInfo) => {
    if (!ws || !isConnected) return;

    setIsBuying(true);
    setBuyError(null);
    setBuyResult(null);

    try {
      const response = await ws.send<BuyResponse>({
        buy: proposal.id,
        price: String(proposal.askPrice),
      });

      if (response.buy) {
        setBuyResult({
          contractId: response.buy.contract_id,
          buyPrice: response.buy.buy_price,
          payout: response.buy.payout,
          longcode: response.buy.longcode,
          balanceAfter: response.buy.balance_after,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setBuyError({
          message: err.message,
          code: (err as unknown as Record<string, unknown>).code as string | undefined,
        });
      } else {
        setBuyError({ message: 'Purchase failed' });
      }
    } finally {
      setIsBuying(false);
    }
  }, [ws, isConnected]);

  return { buyContract, isBuying, buyResult, buyError, clearBuyResult };
}
