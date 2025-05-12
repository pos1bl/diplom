import { AboutPlatform } from "@components/default/Career/CareerAboutPlatform"
import { ApplicationForm } from "@components/default/Career/CareerApplicationForm"
import { FAQ } from "@components/default/Career/CareerFaq"
import { Hero } from "@components/default/Career/CareerHero"
import { JoinSteps } from "@components/default/Career/CareerJoinSteps"
import { JoinUs } from "@components/default/Career/CareerJoinUs"
import { Support } from "@components/default/Career/CareerSupport"
import { Testimonials } from "@components/default/Career/CareerTestimonials"
import { WhoWeNeed } from "@components/default/Career/CareerWhoWeNeed"
import { WorkStyle } from "@components/default/Career/CareerWorkStyle"
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
