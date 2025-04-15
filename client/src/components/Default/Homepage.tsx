import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGE } from "@utils/NavigationList";
import hero from "@images/homepage/hero.png"
import "@layout/Homepage.scss";

export const HomePage = () => {
  return (
    <main className="homepage">
      <section className="homepage__hero hero">
        <h1 className="hero__title">Психологічна підтримка поруч.</h1>
        <p className="hero__subtitle">
          Для кожного, хто шукає опору, турботу та шлях до себе. Безкоштовна підтримка для захисників та тих, кого торкнулась війна.
        </p>
        <Link to={DEFAULT_PAGE.FORM as "/"}>
          <Button>
            Знайти саме свого спеціаліста
          </Button>
        </Link>
        <Link to={DEFAULT_PAGE.HELP as "/"}>
          <Button>
            Безкоштовна підтримка для військових і постраждалих
          </Button>
        </Link>
        <img src={hero} alt="hero" />
      </section>
    </main>
  )
};
