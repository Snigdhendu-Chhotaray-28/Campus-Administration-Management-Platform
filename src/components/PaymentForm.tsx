'use client';
import { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentForm({ studentId, amount, purpose }: { studentId: string, amount: number, purpose: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment API call
    setTimeout(async () => {
      await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: {
            object: {
              metadata: { studentId, purpose },
              amount: amount * 100,
              id: 'txn_' + Math.random().toString(36).substring(7)
            }
          }
        })
      });
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--secondary)' }}>
        <h3 style={{ color: 'var(--secondary)' }}>Payment Successful!</h3>
        <p style={{ color: 'var(--text-muted)' }}>Your transaction has been securely processed.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>Complete Payment</h3>
      <div className="flex justify-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <span>Purpose</span>
        <strong>{purpose}</strong>
      </div>
      <div className="flex justify-between" style={{ marginBottom: '2rem' }}>
        <span>Amount</span>
        <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>${amount}</strong>
      </div>
      <button 
        onClick={handlePayment} 
        disabled={loading} 
        className="btn btn-primary" 
        style={{ width: '100%' }}
      >
        {loading ? 'Processing...' : (
          <>
            <CreditCard size={18} style={{ marginRight: '8px' }} /> Pay Now
          </>
        )}
      </button>
    </div>
  );
}
