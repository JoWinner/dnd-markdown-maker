
export default function DetailsSection() {
  return (
    <div className="w-full space-y-32 bg-zinc-100 text-black dark:bg-black  dark:text-white py-16" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(55 55 55 / 0.15) 1px, transparent 0)',
      backgroundSize: '24px 24px'
    }}>
      {/* More Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-mono text-3xl">
            <span className="text-gray-500">### </span>
            More Powerful Features
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-mono">
            Transform your markdown workflow with advanced capabilities
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          {[
            {
              title: "Smart Editing",
              description: "Advanced markdown editor with real-time preview and syntax highlighting."
            },
            {
              title: "Version Control",
              description: "Track changes and collaborate with your team seamlessly."
            },
            {
              title: "Custom Themes",
              description: "Personalize your editing environment with custom themes and layouts."
            },
            {
              title: "Cross Platform",
              description: "Work seamlessly across all your devices with cloud synchronization."
            }
          ].map((feature, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-mono text-xl">
                <span className="text-gray-500">### </span>
                {feature.title}
              </h3>
              <p className="text-gray-500 font-mono">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}