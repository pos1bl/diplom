import { AboutPlatform } from "@components/Career/CareerAboutPlatform"
import { Hero } from "@components/Career/CareerHero"
import { Testimonials } from "@components/Career/CareerTestimonials"
import { WhoWeNeed } from "@components/Career/CareerWhoWeNeed"
import { WorkStyle } from "@components/Career/CareerWorkStyle"
import { StyledMain } from "@components/styled/base"


export const CareerPage = () => {
  return (
    <StyledMain>
      <Hero />
      <AboutPlatform />
      <WhoWeNeed />
      <WorkStyle />
      <Testimonials />
    </StyledMain>
  )
}
