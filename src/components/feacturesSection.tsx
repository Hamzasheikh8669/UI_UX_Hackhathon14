import React from "react";
import { Shield, Truck, Headphones, Star } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      Icon: Star,
      title: "High Quality",
      description: "Crafted from top-notch materials",
    },
    {
      Icon: Shield,
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      Icon: Truck,
      title: "Free Shipping",
      description: "Order over 150$",
    },
    {
      Icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <section className="bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg hover:bg-white transition-colors duration-300"
            >
              <feature.Icon
                className="w-16 h-16 mb-4 text-amber-700"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
