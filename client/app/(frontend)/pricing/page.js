"use client"
import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    monthly: [
      {
        name: 'Free',
        price: '₹0',
        storage: '20 GB',
        features: ['Secure storage', 'Upload and share', 'Access from any device'],
        cta: 'Get Started',
        highlight: false,
      },
      {
        name: 'Pro',
        price: '₹199/mo',
        storage: '200 GB',
        features: ['All Free features', 'Advanced search & filters', 'Priority support'],
        cta: 'Upgrade to Pro',
        highlight: true,
      },
      {
        name: 'Premium',
        price: '₹499/mo',
        storage: '1 TB',
        features: ['All Pro features', 'Custom branding', 'Collaboration tools'],
        cta: 'Go Premium',
        highlight: false,
      },
    ],
    annually: [
      {
        name: 'Free',
        price: '₹0',
        storage: '20 GB',
        features: ['Secure storage', 'Upload and share', 'Access from any device'],
        cta: 'Get Started',
        highlight: false,
      },
      {
        name: 'Pro',
        price: '₹1990/yr',
        storage: '200 GB',
        features: ['All Free features', 'Advanced search & filters', 'Priority support'],
        cta: 'Upgrade to Pro',
        highlight: true,
      },
      {
        name: 'Premium',
        price: '₹4990/yr',
        storage: '1 TB',
        features: ['All Pro features', 'Custom branding', 'Collaboration tools'],
        cta: 'Go Premium',
        highlight: false,
      },
    ],
  };

  return (
    <div className=" bg-white px-6 py-2 text-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-gray-600 mb-6">Choose the plan that fits your needs. Start free and upgrade anytime.</p>

        {/* Toggle */}
        <div className="inline-flex bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              billingCycle === 'monthly' ? 'bg-purple-500 text-white' : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              billingCycle === 'annually' ? 'bg-purple-500 text-white' : 'text-gray-600'
            }`}
          >
            Annually
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans[billingCycle].map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg border px-8 py-10 text-center shadow-sm ${
              plan.highlight ? 'border-purple-500' : 'border-gray-200'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-2">{plan.price}</p>
            <p className="text-gray-500 mb-4">{plan.storage} Storage</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <a
              href="#"
              className={`inline-block px-6 py-3 rounded-md font-medium text-white ${
                plan.highlight ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
