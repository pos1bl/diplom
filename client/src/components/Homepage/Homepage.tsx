import { Hero } from "./Hero";
import { StyledMain } from "@components/styled/homepage";
import { About } from "./About";
import { HowItWorks } from "./HowItWorks";
import { FreeHelp } from "./FreeHelp";
import { PsychologistShowcase } from "./PsychologistShowcase";

export const HomePage = () => {
  return (
    <StyledMain>
      <Hero />
      <About/>
      <HowItWorks />
      <FreeHelp />
      <PsychologistShowcase />
    </StyledMain>
  )
};
