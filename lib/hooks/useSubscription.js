// lib/hooks/useSubscription.js

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for subscription management
 */
export function useSubscription(options = {}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [plan, setPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [expiryDate, setExpiryDate] = useState(null);
  const [remainingDays, setRemainingDays] = useState(0);
  const [isYearly, setIsYearly] = useState(false);

  const fetchSubscription = useCallback(async () => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/subscription/plans');
      const data = await response.json();
      
      if (response.ok) {
        setPlans(data.plans || []);
        const currentPlan = data.currentSubscription;
        
        if (currentPlan && currentPlan.planId !== 'free') {
          setIsPremium(true);
          setPlan(currentPlan);
          setFeatures(currentPlan.features || []);
          setExpiryDate(currentPlan.currentPeriodEnd ? new Date(currentPlan.currentPeriodEnd) : null);
          
          if (currentPlan.currentPeriodEnd) {
            const days = Math.ceil((new Date(currentPlan.currentPeriodEnd) - new Date()) / (1000 * 60 * 60 * 24));
            setRemainingDays(Math.max(0, days));
          }
        } else {
          setIsPremium(false);
          setPlan(null);
          setFeatures([]);
          setExpiryDate(null);
          setRemainingDays(0);
        }
      } else {
        setError(data.error || 'Failed to fetch subscription');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const subscribe = useCallback(async (planId, priceId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, priceId })
      });
      
      const data = await response.json();
      
      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
        return { success: true };
      } else {
        setError(data.error || 'Failed to create checkout session');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        await fetchSubscription();
        return { success: true };
      } else {
        setError(data.error || 'Failed to cancel subscription');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchSubscription]);

  const checkFeatureAccess = useCallback((featureName) => {
    if (isPremium) return true;
    
    // Free tier features
    const freeFeatures = ['basic-drills', 'basic-analytics', 'leaderboard', 'profile'];
    return freeFeatures.includes(featureName);
  }, [isPremium]);

  const getPlanById = useCallback((planId) => {
    return plans.find(p => p.id === planId);
  }, [plans]);

  const getCurrentPlanName = useCallback(() => {
    if (!plan) return 'Free';
    const planNames = {
      pro: 'Pro',
      premium: 'Premium',
      pro_yearly: 'Pro Yearly'
    };
    return planNames[plan.planId] || 'Free';
  }, [plan]);

  const getCurrentPlanPrice = useCallback(() => {
    if (!plan) return 0;
    const planData = getPlanById(plan.planId);
    return isYearly ? planData?.yearlyPrice : planData?.price;
  }, [plan, isYearly, getPlanById]);

  const getUpgradeUrl = useCallback((planId) => {
    const plan = getPlanById(planId);
    if (!plan) return null;
    return `/api/subscription/checkout?planId=${planId}&priceId=${isYearly ? plan.yearlyPriceId : plan.priceId}`;
  }, [isYearly, getPlanById]);

  const formatExpiryDate = useCallback(() => {
    if (!expiryDate) return null;
    return expiryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [expiryDate]);

  const isExpiringSoon = useCallback(() => {
    return remainingDays <= 7 && remainingDays > 0;
  }, [remainingDays]);

  return {
    loading,
    error,
    isPremium,
    plan,
    plans,
    features,
    expiryDate,
    remainingDays,
    isYearly,
    setIsYearly,
    refresh: fetchSubscription,
    subscribe,
    cancelSubscription,
    checkFeatureAccess,
    getPlanById,
    getCurrentPlanName,
    getCurrentPlanPrice,
    getUpgradeUrl,
    formatExpiryDate,
    isExpiringSoon
  };
}

export default useSubscription;