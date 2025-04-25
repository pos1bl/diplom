import { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useSwipeable } from "react-swipeable";

const testimonials = [
  {
    name: "Олена К.",
    role: "Психолог",
    text: "Я вперше працюю в місці, де відчувається цінність того, що ти робиш. Команда надихає, а клієнти — мотивують.",
    avatar: "/avatars/olena.jpg",
  },
  {
    name: "Марко Л.",
    role: "Кризовий консультант",
    text: "Платформа дуже зручна, підтримка команди на рівні. Є відчуття, що я на своєму місці.",
    avatar: "/avatars/marko.jpg",
  },
  {
    name: "Ірина М.",
    role: "Психотерапевт",
    text: "Супервізії та відкритість команди — це те, чого не вистачало мені в попередніх місцях роботи.",
    avatar: "/avatars/iryna.jpg",
  },
];

const ROTATION_INTERVAL = 7000;

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (activeIndex + 1) % testimonials.length;

  const goToIndex = (index: number) => setActiveIndex(index);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(next, ROTATION_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, isHovered]);

  const renderCard = (
    index: number,
    isActive = false,
    blur = false
  ) => {
    const item = testimonials[index];

    return (
      <Paper
        key={index}
        elevation={3}
        sx={{
          p: 4,
          mx: 1,
          flex: isActive ? "0 0 60%" : "0 0 20%",
          opacity: isActive ? 1 : 0.6,
          filter: blur ? "blur(2px)" : "none",
          transform: isActive ? "scale(1)" : "scale(0.95)",
          borderRadius: 3,
          bgcolor: "#F5F1FA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.5s ease",
          minWidth: isMobile ? "100%" : "auto",
        }}
      >
        <Avatar
          src={item.avatar}
          alt={item.name}
          sx={{ width: 64, height: 64, mb: 2 }}
        />
        <Typography variant="body1" color="text.primary" mb={2}>
          "{item.text}"
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
          {item.name}, {item.role}
        </Typography>
      </Paper>
    );
  };

  return (
    <Box
      sx={{ py: { xs: 8, md: 10 }, bgcolor: "#ffffff", overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container maxWidth="md">
        <Stack spacing={4} textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={600} color="primary">
            Що кажуть наші спеціалісти
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Відгуки тих, хто вже допомагає людям разом з нами
          </Typography>
        </Stack>

        {/* Swipeable wrapper */}
        <Box
          {...swipeHandlers}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            overflow: "hidden",
            px: 2,
          }}
        >
          {renderCard(prevIndex, false, true)}
          {renderCard(activeIndex, true, false)}
          {renderCard(nextIndex, false, true)}
        </Box>

        {/* Індикатори */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
          {testimonials.map((_, index) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => goToIndex(index)}
              sx={{ color: index === activeIndex ? "#AC98D1" : "#D0C9E0" }}
            >
              <CircleIcon fontSize="inherit" />
            </IconButton>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
