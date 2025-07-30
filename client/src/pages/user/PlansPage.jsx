import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useAuthContext } from "../../hooks/useAuthContext";

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    storage: "10 GB",
    features: ["Basic storage", "Limited sharing", "Community support"],
    razorpayAmount: 0,
    key: "free",
  },
  {
    name: "Pro Plan",
    price: "₹99/mo",
    storage: "50 GB",
    features: ["Priority support", "File versioning", "Advanced sharing"],
    razorpayAmount: 9900,
    key: "pro",
  },
  {
    name: "Business Plan",
    price: "₹199/mo",
    storage: "100 GB",
    features: ["Team accounts", "Unlimited sharing", "Admin tools"],
    razorpayAmount: 19900,
    key: "premium",
  },
];


export default function Plans() {
  const { user, dispatch } = useAuthContext();


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (plan) => {
    const res = await fetch("http://localhost:8001/api/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ amount: plan.razorpayAmount }),
    });

    const data = await res.json();

    if (!data || !data.id) {
        console.log(data);
        
      alert("Failed to initiate payment. Please try again.");
      return;
    }

    dispatch({ type: "LOGIN", payload: user });


    const options = {
      key: "rzp_test_WduyZdyblClGcr",
      amount: plan.razorpayAmount,
      currency: "INR",
      name: "Storio",
      description: `Upgrade to ${plan.name}`,
      order_id: data.id,
      handler: async function (response) {
        // Verify payment on server
        const verifyRes = await fetch(
          "http://localhost:8001/api/payment/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan.name,
            }),
          }
        );

        const verifyData = await verifyRes.json();
        alert(verifyData.message);
        window.location.reload();
      },
      prefill: {
        name: user.user.name,
        email: user.user.email,
      },
      theme: {
        color: "#8B5CF6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl shadow-lg p-6 border ${
              user.user.plan === plan.key
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white"
            } flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {plan.price}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {plan.storage} Storage
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              {user.user.plan === plan.key ? (
                <span className="inline-block text-sm font-semibold text-purple-600">
                  Current Plan
                </span>
              ) : (
                <button
                  onClick={() => handlePayment(plan)}
                  className="w-full mt-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
