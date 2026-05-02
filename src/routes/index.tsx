import HeroSection from '#/components/shadcn-space/blocks/hero-01/hero'
import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/shadcn-space/blocks/hero-01/header';
import Footer from '#/components/footer';
import { Separator } from '#/components/ui/separator';
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Header/>
    <HeroSection/>
    <Separator/>
    <Footer/>
  </div>
}
