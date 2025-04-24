import { StyledHero, StyledHeroInfoBlock, StyledImageBox } from "@components/styled/gifts";
import { StyledTitle } from "@components/styled/base";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGE } from "@utils/NavigationList";
import { ContainedButton } from "@components/shared/ContainedButton";
import { FC } from "react";
import { SectionProps } from "@utils/Giftspage";

export const Hero:FC<SectionProps> = ({ onScrollToOptions }) => (
  <StyledHero>
    <StyledHeroInfoBlock>
      <StyledTitle>
        Подаруй підтримку — зміни чиєсь життя
      </StyledTitle>
      <p>Замість матеріального подарунка — допомога тим, хто цього найбільше потребує</p>
      <Link to={DEFAULT_PAGE.GIFTS as "/"}>
        <ContainedButton onClick={onScrollToOptions}>
          Подарувати сертифікат
        </ContainedButton>
      </Link>
    </StyledHeroInfoBlock>
    <StyledImageBox>
      <img width="100%" src="/images/gifts/otter-gift.png" alt="otter with gift" />
    </StyledImageBox>
  </StyledHero>
)