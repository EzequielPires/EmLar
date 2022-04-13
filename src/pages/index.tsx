import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'
import { SectionHighlights } from '../components/SectionHighlights'
import { SectionOuther } from '../components/SectionOuther'
import { SectionSteps } from '../components/SectionSteps'

export default function Home() {
  return (
    <div>
      <Banner />
      <SectionSteps />
      <SectionHighlights />
      <SectionOuther />
      <Footer />
    </div>
  )
}
