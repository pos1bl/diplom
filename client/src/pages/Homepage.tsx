import { Hero } from "@components/Homepage/Hero";
import { StyledMain } from "@components/styled/base";
import { About } from "@components/Homepage/About";
import { HowItWorks } from "@components/Homepage/HowItWorks";
import { FreeHelp } from "@components/Homepage/FreeHelp";
import { PsychologistShowcase } from "@components/Homepage/PsychologistShowcase";
import { FAQ } from "@components/Homepage/FAQ";

export const HomePage = () => (
  <StyledMain>
    <Hero />
    <About/>
    <HowItWorks />
    <FreeHelp />
    <PsychologistShowcase />
    <FAQ />
  </StyledMain>
);
