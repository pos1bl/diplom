import { StyledTitle } from "@components/styled/base";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGE } from "@utils/NavigationList";
import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledHero, StyledImageBox, StyledHeroInfoBlock } from "@components/styled/career";

export const Hero = () => (
  <StyledHero>
    <StyledHeroInfoBlock>
      <StyledTitle>
        Ми шукаємо тих,
        <br />
        хто хоче змінювати життя.
      </StyledTitle>
      <p>Наша команда об’єднує спеціалістів, які щодня підтримують людей, постраждалих від війни, та тих, хто шукає психічну рівновагу. Приєднуйся до нас!</p>
      <Link to={DEFAULT_PAGE.CAREER as "/"}>
        <ContainedButton>
          Подарувати сертифікат
        </ContainedButton>
      </Link>
    </StyledHeroInfoBlock>
    <StyledImageBox>
      <img width="100%" src="/images/career/hero.png" alt="specialists" />
    </StyledImageBox>
  </StyledHero>
)