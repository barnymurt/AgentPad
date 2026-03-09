'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for exploring LaunchPad',
    price: 0,
    credits: '25',
    features: [
      'Core LaunchPad features',
      '3 validations/month',
      'Basic validation pack',
      'Community support',
    ],
    notIncluded: [
      'Advanced skills',
      'AI Builder',
      'Export to Notion',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    id: 'builder',
    name: 'Builder',
    description: 'Take your idea to the next level',
    price: 40,
    credits: '250',
    features: [
      'Everything in Starter',
      '10,000 integration credits',
      'In-app code edits',
      'Backend functions',
      'AI model select',
      'Connect a domain',
    ],
    notIncluded: [
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Building',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Access advanced tools for complex apps',
    price: 80,
    credits: '500',
    features: [
      'Everything in Builder',
      '20,000 integration credits',
      'Priority support',
      'Advanced analytics',
      'Early access to beta features',
      '25 credits to share with a friend',
    ],
    notIncluded: [],
    cta: 'Get Pro',
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Scale with top credits and dedicated support',
    price: 160,
    credits: '1,200',
    features: [
      'Everything in Pro',
      '50,000 integration credits',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Premium training',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function UpgradePage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    if (!session?.user?.id) {
      setError('You must be logged in to upgrade');
      return;
    }
    
    if (planId === 'free') {
      setLoading(planId);
      try {
        const res = await fetch('/api/auth-api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update-tier',
            userId: session.user.id,
            tier: 'free',
          }),
        });

        if (res.ok) {
          await update({ tier: 'free' });
        }
      } catch (err) {
        console.error('Failed:', err);
      } finally {
        setLoading(null);
      }
      return;
    }
    
    setLoading(planId);
    setError(null);
    try {
      const res = await fetch('/api/auth-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-tier',
          userId: session.user.id,
          tier: planId === 'pro' || planId === 'elite' ? 'premium' : planId,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        await update({ tier: 'premium' });
        router.push('/dashboard');
      } else {
        setError(data.error || 'Upgrade failed');
      }
    } catch (err) {
      console.error('Upgrade failed:', err);
      setError('An error occurred during upgrade');
    } finally {
      setLoading(null);
    }
  };

  const currentTier = session?.user?.tier || 'free';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">LaunchPad</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {status === 'unauthenticated' && (
                <Link
                  href="/api/auth/signin"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans from first idea to full scale
          </h1>
          <p className="text-xl text-white/80">
            Start for free. Upgrade when you're ready.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => {
            const isCurrentPlan = currentTier === plan.id || (currentTier === 'admin' && plan.id === 'pro');
            
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 transition-all ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl bg-white scale-[1.02] z-10'
                    : 'border-gray-100 shadow-lg bg-white hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {plan.credits} credits / month
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={`not-${idx}`} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading !== null}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-600/25'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading === plan.id ? 'Processing...' : plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Demo Mode Notice */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> Click any plan to instantly upgrade. No payment required.
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <p className="text-center text-gray-400 text-sm mt-12">
          Trusted by 10,000+ entrepreneurs building their dreams
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Eliminate costly, complex add-ons. Every plan includes:
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'AI-Powered Validation',
                description: 'Get instant feedback on your startup ideas with our AI analysis'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: '78+ Specialized Skills',
                description: 'Access a library of skills for research, design, and growth'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Track Your Progress',
                description: 'Monitor your validation results and iterate on your ideas'
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
