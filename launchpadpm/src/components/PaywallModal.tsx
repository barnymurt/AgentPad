'use client';

import { useState } from 'react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  skillId: string;
  onEmailSubmit: (email: string) => Promise<void>;
  remainingPacks?: number | 'unlimited';
  resetTime?: string | null;
}

export default function PaywallModal({
  isOpen,
  onClose,
  skillName,
  skillId,
  onEmailSubmit,
  remainingPacks,
  resetTime,
}: PaywallModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const isValidationPack = skillId === 'validation-pack';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await onEmailSubmit(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatResetTime = (isoTime: string | null) => {
    if (!isoTime) return '';
    const resetDate = new Date(isoTime);
    const now = new Date();
    const diff = resetDate.getTime() - now.getTime();
    
    if (diff <= 0) return '';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isValidationPack ? 'Get Your Validation Pack' : `Unlock ${skillName}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isValidationPack && remainingPacks !== undefined && remainingPacks !== 'unlimited' && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 text-sm">
              You have{' '}
              <span className="font-semibold">
                {remainingPacks} Validation Pack{remainingPacks !== 1 ? 's' : ''} remaining
              </span>
              {resetTime && (
                <> (resets in {formatResetTime(resetTime)})</>
              )}
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            {isValidationPack
              ? 'Enter your email to generate your Validation Pack. This free download includes comprehensive market validation, competitive analysis, and MVP recommendations.'
              : `To run "${skillName}", you need a Pro subscription.`}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{isValidationPack ? 'Free market validation analysis' : 'Unlimited skill executions'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{isValidationPack ? 'Competitive positioning map' : 'All 78+ skills unlocked'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Join {isValidationPack ? 'thousands' : 'hundreds'} of validated founders</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {isValidationPack ? 'Enter your email' : 'Email address'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {error && (
            <p className="mb-4 text-sm text-red-600">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : isValidationPack ? 'Get My Validation Pack' : 'Sign In to Continue'}
          </button>
        </form>
        
        {!isValidationPack && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button className="text-blue-600 hover:underline">
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
