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
import { useSwipeable } from "react-swipeable";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StyleddTestimonials } from "@components/styled/career";
import { StyledSubtitle } from "@components/styled/base";
import { ROTATION_INTERVAL, TESTIMONIALS_LIST } from "@utils/Careerpage";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const prevIndex = (activeIndex - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length;
  const nextIndex = (activeIndex + 1) % TESTIMONIALS_LIST.length;

  const goToIndex = (index: number) => setActiveIndex(index);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(goNext, ROTATION_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, isHovered]);

  const renderCard = (index: number, isActive = false, isBlur = false) => {
    const item = TESTIMONIALS_LIST[index];

    return (
      <Paper
        key={index}
        elevation={3}
        sx={{
          p: 4,
          mx: 1,
          flex: isActive ? "0 0 60%" : "0 0 20%",
          opacity: isActive ? 1 : 0.5,
          filter: isBlur ? "blur(2px)" : "none",
          borderRadius: 3,
          bgcolor: "#F5F1FA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "all 0.3s ease",
          maxHeight: 320,
          minWidth: isMobile ? "100%" : "auto",
        }}
      >
        <Avatar src={item.avatar} alt={item.name} sx={{ width: 100, height: 100, mb: 4 }} />
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
    <StyleddTestimonials sx={{ position: "relative" }}>
      <Container maxWidth="md">
        <Stack spacing={4} textAlign="center" mb={4}>
          <StyledSubtitle>
            Що кажуть наші спеціалісти?
          </StyledSubtitle>
          <Typography variant="body1" color="text.secondary">
            Відгуки тих, хто вже допомагає людям разом з нами
          </Typography>
        </Stack>

        <Box
          {...swipeHandlers}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            overflow: "hidden",
            px: 2,
            py: 1,
            position: "relative",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderCard(prevIndex, false, true)}
          {renderCard(activeIndex, true)}
          {renderCard(nextIndex, false, true)}
        </Box>

        {/* Стрілки навігації */}
        {!isMobile && (
          <>
            <IconButton
              onClick={goPrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 16,
                transform: "translateY(-50%)",
                bgcolor: "#ffffffdd",
                "&:hover": { bgcolor: "#ffffff" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={goNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 16,
                transform: "translateY(-50%)",
                bgcolor: "#ffffffdd",
                "&:hover": { bgcolor: "#ffffff" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </>
        )}

        <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
          {TESTIMONIALS_LIST.map((_, index) => (
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
    </StyleddTestimonials>
  );
};
