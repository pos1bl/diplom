import { AboutPlatform } from "@components/Career/CareerAboutPlatform"
import { ApplicationForm } from "@components/Career/CareerApplicationForm"
import { FAQ } from "@components/Career/CareerFaq"
import { Hero } from "@components/Career/CareerHero"
import { JoinSteps } from "@components/Career/CareerJoinSteps"
import { JoinUs } from "@components/Career/CareerJoinUs"
import { Support } from "@components/Career/CareerSupport"
import { Testimonials } from "@components/Career/CareerTestimonials"
import { WhoWeNeed } from "@components/Career/CareerWhoWeNeed"
import { WorkStyle } from "@components/Career/CareerWorkStyle"
import { StyledMain } from "@components/styled/base"
import { useRef } from "react"


export const CareerPage = () => {
  const careerFormRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToForm = () => {
    careerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledMain>
      <Hero onScrollToForm={handleScrollToForm} />
      <AboutPlatform />
      <WhoWeNeed />
      <WorkStyle />
      <Testimonials />
      <JoinSteps onScrollToForm={handleScrollToForm} />
      <ApplicationForm ref={careerFormRef} />
      <JoinUs onScrollToForm={handleScrollToForm} />
      <FAQ />
      <Support />
    </StyledMain>
  )
}
