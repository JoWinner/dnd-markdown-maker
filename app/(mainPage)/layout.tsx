import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export default async function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />

      <main>{children}</main>

      <Footer />
      <Analytics />
    </>
  );
}
