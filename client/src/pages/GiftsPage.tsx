import {CertificateHelps} from "@components/Gifts/GiftCertificateHelps";
import { Info } from "@components/Gifts/GiftInfo";
import { Options } from "@components/Gifts/GiftOptions";
import { FAQ } from "@components/Gifts/GiftsFaq";
import { Steps } from "@components/Gifts/GiftSteps";
import { Hero } from "@components/Gifts/GiftsHero";
import { StyledMain } from "@components/styled/base";
import { useRef } from "react";

export const GiftsPage = () => {
  const giftOptionsRef = useRef<HTMLDivElement>(null);

  const handleScrollToOptions = () => {
    giftOptionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledMain>
      <Hero onScrollToOptions={handleScrollToOptions} />
      <Steps onScrollToOptions={handleScrollToOptions} />
      <Options ref={giftOptionsRef} />
      <Info />
      <CertificateHelps onScrollToOptions={handleScrollToOptions}/>
      <FAQ />
    </StyledMain>
  )
}
