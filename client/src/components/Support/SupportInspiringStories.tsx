import { FC } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

const stories = [
  {
    id: 1,
    name: "Анонім, 34 роки",
    content:
      "Після втрати дому й евакуації я почувався повністю розбитим. Спочатку не вірив, що психологічна допомога щось змінить. Але вже після кількох сесій я відчув, що знову можу дихати. Вдячний за підтримку.",
  },
  {
    id: 2,
    name: "Військовий, 29 років",
    content:
      "Повернувшись з фронту, я не міг спати, тримався від усіх подалі. Завдяки фахівцю, до якого мене скерували через платформу, я знову навчився довіряти людям і говорити про те, що відчуваю.",
  },
  {
    id: 3,
    name: "Марина, волонтерка",
    content:
      "Працюючи волонтером, я виснажувалась емоційно. Звернення по допомогу було нелегким, але правильним кроком. Тепер я краще розумію свої межі й відновлююся без почуття провини.",
  },
];

export const InspiringStories: FC = () => (
  <Box
    component="section"
    sx={{
      py: 8,
      px: { xs: 2, md: 6 },
      backgroundColor: "#f5f5fa",
    }}
  >
    <Typography
      variant="h4"
      component="h2"
      sx={{
        textAlign: "center",
        color: "#A891D2",
        fontWeight: 600,
        mb: 6,
      }}
    >
      Надихаючі історії
    </Typography>

    <Stack
      direction="row"
      spacing={3}
      sx={{
        overflowX: "auto",
        pb: 2,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {stories.map((story) => (
        <Paper
          key={story.id}
          sx={{
            minWidth: 300,
            maxWidth: 360,
            px: 3,
            py: 4,
            flexShrink: 0,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: 3,
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            “{story.content}”
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontStyle: "italic", textAlign: "right" }}
          >
            — {story.name}
          </Typography>
        </Paper>
      ))}
    </Stack>
  </Box>
);
