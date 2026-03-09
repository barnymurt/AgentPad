'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for exploring LaunchPad',
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: '3',
    features: [
      '3 validations/month',
      'Basic validation pack',
      'Community support',
      'Essential skills access',
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Professional',
    description: 'For serious builders who want more',
    monthlyPrice: 29,
    yearlyPrice: 24,
    credits: 'Unlimited',
    features: [
      'Unlimited validations',
      'All 78+ skills unlocked',
      'Full validation pack',
      'Export to Notion',
      'Priority support',
      'Advanced analytics',
      'AI Builder access',
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
];

export default function UpgradeModal() {
  const { data: session, update, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openUpgradeModal', handleOpen);
    return () => window.removeEventListener('openUpgradeModal', handleOpen);
  }, []);

  const handleUpgrade = async () => {
    if (!session?.user?.id) {
      setError('You must be logged in to upgrade');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-tier',
          userId: session.user.id,
          tier: 'premium',
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        await update({ tier: 'premium' });
        setIsOpen(false);
      } else {
        setError(data.error || 'Upgrade failed');
      }
    } catch (err) {
      console.error('Upgrade failed:', err);
      setError('An error occurred during upgrade');
    } finally {
      setLoading(false);
    }
  };

  const handleDowngrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-tier',
          userId: session?.user?.id,
          tier: 'free',
        }),
      });

      if (res.ok) {
        await update({ tier: 'free' });
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Downgrade failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentTier = session?.user?.tier || 'free';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 px-8 py-10 text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Choose Your Plan
          </h2>
          <p className="text-white/80 text-lg">
            Start for free. Upgrade when you're ready.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center bg-white/10 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Yearly (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-8 -mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan) => {
              const isCurrentPlan = currentTier === plan.id || (currentTier === 'admin' && plan.id === 'premium');
              const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
              
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-6 transition-all ${
                    plan.popular
                      ? 'border-blue-500 shadow-xl scale-105 bg-white'
                      : 'border-gray-100 shadow-sm hover:shadow-md bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {billingCycle === 'yearly' && price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually (${plan.yearlyPrice * 12}/year)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-xl font-medium cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : plan.id === 'free' ? (
                    <button
                      onClick={handleDowngrade}
                      disabled={loading}
                      className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Downgrade'}
                    </button>
                  ) : (
                    <>
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                          <p className="text-xs text-red-600">{error}</p>
                        </div>
                      )}
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl mb-4">
                        <p className="text-xs text-blue-700">
                          <strong>Demo Mode:</strong> Click to instantly upgrade. No payment required.
                        </p>
                      </div>
                      <button
                        onClick={handleUpgrade}
                        disabled={loading || status === 'loading'}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/25"
                      >
                        {loading ? 'Processing...' : plan.cta}
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trust Badge */}
          <p className="text-center text-gray-400 text-sm mt-8">
            Trusted by 10,000+ entrepreneurs building their dreams
          </p>
        </div>
      </div>
    </div>
  );
}
