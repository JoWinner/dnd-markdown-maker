import { Icons } from "@/components/icons";import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingSection() {
  return (
    <div className="w-full space-y-32 bg-zinc-100 text-black dark:bg-black  dark:text-white py-16" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(55 55 55 / 0.15) 1px, transparent 0)',
      backgroundSize: '24px 24px'
    }}>
      {/* Pricing Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-mono text-3xl">
            <span className="text-gray-500">### </span>
            Simple Pricing
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-mono">
            Choose the plan that works best for you
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              title: "Monthly",
              price: "$8.50",
              period: "/month",
              features: [
                "Unlimited markdown files",
                "Real-time preview",
                "Version control",
                "Custom themes",
                  "Priority support",
                ""
              ]
            },
            {
              title: "Yearly",
              price: "$5.00",
              period: "/month",
              save: "Save 41% yearly",
              features: [
                "Everything in Monthly plan",
                "Advanced analytics",
                "Team collaboration",
                "API access",
                "24/7 premium support"
              ]
            }
          ].map((plan, index) => (
            <Card key={index} className="bg-white text-black dark:bg-black  dark:text-white border border-border">
              <CardHeader>
                <CardTitle className="font-mono text-2xl">
                  <span className="text-gray-500">### </span>
                  {plan.title}
                </CardTitle>
                <div className="mt-4 font-mono">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                {plan.save && (
                  <span className="inline-block mt-2 text-sm font-mono text-black dark:text-white bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                    {plan.save}
                  </span>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 font-mono">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-gray-400">
                      <Icons.check className="h-6 w-6 text-black dark:text-white " />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full font-mono" 
                  variant={index === 1 ? "default" : "outline"}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}