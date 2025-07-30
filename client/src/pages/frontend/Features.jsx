import { FaCloudUploadAlt, FaSearch, FaShareAlt, FaSync, FaMobileAlt, FaChartBar } from 'react-icons/fa';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

export default function Features() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const featureList = [
    {
      icon: <FaCloudUploadAlt className="text-3xl text-purple-600" />,
      title: 'Fast & Secure Uploads',
      desc: 'Upload and access files with blazing speed and encrypted storage.',
    },
    {
      icon: <FaSearch className="text-3xl text-purple-600" />,
      title: 'Advanced Search',
      desc: 'Find files quickly with smart filters, tags, and metadata search.',
    },
    {
      icon: <FaShareAlt className="text-3xl text-purple-600" />,
      title: 'Smart Sharing',
      desc: 'Share files securely with password protection and expiration dates.',
    },
    {
      icon: <FaMobileAlt className="text-3xl text-purple-600" />,
      title: 'Multi-Device Access',
      desc: 'Access your files from mobile, desktop, and tablet seamlessly.',
    },
    {
      icon: <FaSync className="text-3xl text-purple-600" />,
      title: 'Real-time Sync',
      desc: 'Keep all your devices updated with automatic file synchronization.',
    },
    {
      icon: <FaChartBar className="text-3xl text-purple-600" />,
      title: 'Usage Insights',
      desc: 'Track your storage and file history with smart dashboards.',
    },
  ];

  return (
    <div className=" bg-white px-6 py-2 text-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Everything You Need, Nothing You Don't</h2>
        <p className="text-lg text-gray-600">Discover how Storio makes cloud storage smarter and simpler.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featureList.map((feature, i) => (
          <div
            key={i}
            className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-purple-600">{feature.title}</h3>
            <p className="text-gray-700">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
