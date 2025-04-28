import {CertificateHelps} from "@components/Gifts/GiftCertificateHelps";
import { Info } from "@components/Gifts/GiftInfo";
import { Options } from "@components/Gifts/GiftOptions";
import { FAQ } from "@components/Gifts/GiftsFaq";
import { Steps } from "@components/Gifts/GiftSteps";
import { Hero } from "@components/Support/SupportHero";
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
    </StyledMain>
  )
}
