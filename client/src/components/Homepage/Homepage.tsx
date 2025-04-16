import "@layout/Homepage.scss";
import { Hero } from "./Hero";
import { StyledMain } from "@components/styled/homepage";
import { About } from "./About";
import { HowItWorks } from "./HowItWorks";

export const HomePage = () => {
  return (
    <StyledMain>
      <Hero />
      <About/>
      <HowItWorks />
    </StyledMain>
  )
};
