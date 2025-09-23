const features = [
  {
    icon: "🌳",
    title: "Solid Wood",
    subtitle: "Construction"
  },
  {
    icon: "🍃", 
    title: "Non-toxic",
    subtitle: "Finishes"
  },
  {
    icon: "1️⃣",
    title: "1-Year", 
    subtitle: "Warranty"
  },
  {
    icon: "🌲",
    title: "Sustainably",
    subtitle: "Harvested Wood"
  },
  {
    icon: "💡",
    title: "Danish Design,",
    subtitle: "German Engineering"
  },
  {
    icon: "⚾",
    title: "Exceeds",
    subtitle: "Safety Standards"
  }
];

export const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Makes Us Cool(er)
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};