import { Options } from "@components/Gifts/GiftOptions";
import { Steps } from "@components/Gifts/GiftSteps";
import { Hero } from "@components/Gifts/Hero";
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
    </StyledMain>
  )
}
