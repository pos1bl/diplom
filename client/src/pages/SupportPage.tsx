import { EmergencyContacts } from "@components/Support/EmergencyContacts";
import { SelfHelpMethods } from "@components/Support/SelfHelpMethods";
import { Hero } from "@components/Support/SupportHero";
import { Info } from "@components/Support/SupportInfo";
import { InspiringStories } from "@components/Support/SupportInspiringStories";
import { StyledMain } from "@components/styled/base";
import { useRef } from "react";

export const SupportPage = () => {
  const supportRef = useRef<HTMLDivElement>(null);

  const handleScrollToSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledMain>
      <Hero onScrollToSupport={handleScrollToSupport} />
      <Info />
      <EmergencyContacts />
      <SelfHelpMethods />
      <InspiringStories />
    </StyledMain>
  )
}
