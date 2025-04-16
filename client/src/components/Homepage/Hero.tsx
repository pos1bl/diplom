import { StyledHero, StyledHeroButton, StyledHeroInfoBlock, StyledTitle, StyledImageBox } from "@components/styled/homepage";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGE } from "@utils/NavigationList";
import hero from "@images/homepage/hero.png"

export const Hero = () => (
  <StyledHero>
    <StyledImageBox>
      <img width="100%" src={hero} alt="hero" />
    </StyledImageBox>
    <StyledHeroInfoBlock>
      <StyledTitle className="hero__title">
        Психологічна підтримка <span style={{color: "#8164B9"}}>поруч.</span>
      </StyledTitle>
      <p className="hero__subtitle" style={{ maxWidth: '750px' }}>
        Для кожного, хто шукає опору, турботу та шлях до себе. Безкоштовна підтримка для захисників та тих, кого торкнулась війна.
      </p>
      <Box display="flex" gap="20px">
        <Link to={DEFAULT_PAGE.FORM as "/"}>
          <StyledHeroButton variant="contained">
            Знайти саме свого спеціаліста
          </StyledHeroButton>
        </Link>
        <Link to={DEFAULT_PAGE.HELP as "/"}>
          <StyledHeroButton variant="contained"> 
            Безкоштовна підтримка для військових і постраждалих
          </StyledHeroButton>
        </Link>
      </Box>
    </StyledHeroInfoBlock>
  </StyledHero>
)