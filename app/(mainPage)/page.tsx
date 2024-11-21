import TechList from "@/components/shared/tech-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "config/site";
import Image from "next/image";
import { Icons } from "@/components/icons"
import Link from "next/link";
import DetailsSection from "@/components/layout/details-section";
import PricingSection from "@/components/layout/pricing-section";

export default async function Home() {
  return (
    <div className="flex flex-col">
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-dot-pattern">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-mono">
              # Transform Your Markdown Workflow
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 font-mono">
              ## The most powerful markdown platform for developers and writers.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Icons.post className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-mono">### Blog Writing</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Advanced markdown editor with real-time preview and syntax highlighting.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Icons.gitcompare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-mono">### Documentation</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Track changes and collaborate with your team seamlessly.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Icons.zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-mono">### Notes / Notion</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              One-click publishing to multiple platforms and formats.
            </p>
          </div>
        </div>
      </div>
      </section>
      <DetailsSection />
      <PricingSection/>
  </div>
  );
}
