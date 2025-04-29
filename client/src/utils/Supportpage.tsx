import InfoIcon from "@mui/icons-material/Info";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";

export type SectionProps = {
  onScrollToSupport: () => void
};

export const INFO_LIST = [
  {
    icon: <PsychologyIcon sx={{ color: "#A891D2", fontSize: 32 }} />,
    title: "Що таке ПТСР і чому він виникає під час війни?",
    text: `Посттравматичний стресовий розлад — це природна реакція на пережиті події: бойові дії, втрату рідних або евакуацію. Симптоми можуть з’явитися не одразу — але вони реальні і важливі для лікування.`,
  },
  {
    icon: <MoodBadIcon sx={{ color: "#A891D2", fontSize: 32 }} />,
    title: "Як розпізнати емоційне вигорання серед війни?",
    text: `Виснаження, апатія, відчуття безсенсовності — часті ознаки емоційного вигорання. Воно характерне для військових, волонтерів, переселенців, які тривалий час живуть у стресі.`,
  },
  {
    icon: <InfoIcon sx={{ color: "#A891D2", fontSize: 32 }} />,
    title: "Симптоми тривожності та депресії після травматичних подій",
    text: `Панічні атаки, безсоння, відчуття безнадії чи постійна тривога можуть свідчити про розлад. Це не слабкість — це наслідок пережитого досвіду.`,
  },
  {
    icon: <VolunteerActivismIcon sx={{ color: "#A891D2", fontSize: 32 }} />,
    title: "Чому важливо звертатися за допомогою?",
    text: `Психічне здоров’я — така ж важлива частина відновлення, як фізичне. Допомога спеціаліста — це не слабкість, а сміливий крок до стабільності.`,
  },
];

export const CONTACTS_LIST = [
  {
    icon: <LocalPhoneIcon sx={{ color: "#fff", fontSize: 32 }} />,
    label: "Гаряча лінія психологічної допомоги",
    value: "0 800 500 335",
    href: "tel:0800500335",
  },
  {
    icon: <ChatIcon sx={{ color: "#fff", fontSize: 32 }} />,
    label: "Цілодобовий чат підтримки",
    value: "@your_support_bot",
    href: "https://t.me/your_support_bot",
  },
  {
    icon: <PublicIcon sx={{ color: "#fff", fontSize: 32 }} />,
    label: "Кризовий центр допомоги для постраждалих",
    value: "crisis.org.ua",
    href: "https://crisis.org.ua",
  },
];

export const GUIDES_LIST = [
  {
    title: "Дихальні техніки для зменшення тривожності",
    href: "/files/support/selfhelp/breathing_techniques.pdf",
    description: "Прості вправи для нормалізації дихання, які допомагають зменшити стрес і тривогу.",
    image: "/images/support/selfhelp/breathing.png",
  },
  {
    title: "Техніка заземлення 5-4-3-2-1",
    href: "/files/support/selfhelp/grounding.pdf",
    description: "Ефективна практика повернення у теперішній момент через органи чуття.",
    image: "/images/support/selfhelp/grounding.png",
  },
  {
    title: "Щоденник емоцій: як фіксувати свій стан",
    href: "/files/support/selfhelp/emotional_journal.pdf",
    description: "Навчіться помічати, приймати і документувати свої емоційні стани щодня.",
    image: "/images/support/selfhelp/journal.png",
  },
];
