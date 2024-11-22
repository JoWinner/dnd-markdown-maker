import Footer from "@/components/layout/footer"
import Nav from "@/components/layout/nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  return (
    <>
     <Nav  />
        
 

          {children}

      
      <Footer  />
    </>
  )
}