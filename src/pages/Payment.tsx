import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { supabase, isDemoMode } from "@/lib/supabase";

export default function Payment() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In demo mode, simulate coupon validation
      if (couponCode.toLowerCase() === 'demo50') {
        setCouponApplied(true);
        setDiscountAmount(50);
        setError(null);
      } else {
        setError('Invalid coupon code');
        setCouponApplied(false);
        setDiscountAmount(0);
      }
    } catch (error) {
      setError('Error applying coupon code');
      setCouponApplied(false);
      setDiscountAmount(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // In demo mode, simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Rest of your UI code remains the same
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Payment successful! Thank you for your purchase.
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>$100.00</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discountAmount}.00</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${100 - discountAmount}.00</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleCouponSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 p-2 border rounded"
                disabled={loading || couponApplied}
              />
              <button
                type="submit"
                disabled={loading || couponApplied}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </form>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      )}
    </div>
  );
} 