import {
  BinanaceUsdIcon,
  BnbIcon,
  FacebookIcon,
  InstagramIcon,
  SecurityAuditReportIcon,
  TelegramIcon,
  TetherUsdtIcon,
  TokenExplorerBscScanIcon,
  TwitterIcon,
  UsdCoinIcon,
  WhitePaperIcon,
} from "../assets/Icons";

export const HOME_LINK =
  "https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript";

export const SOCIAL_MEDIA = [
  {
    link: "https://mui.com/material-ui/react-select/#main-content",
    icon: <TelegramIcon />,
  },
  { link: "", icon: <TwitterIcon /> },
  { link: "", icon: <InstagramIcon /> },
  { link: "", icon: <FacebookIcon /> },
  { link: "", icon: <WhitePaperIcon /> },
  { link: "", icon: <SecurityAuditReportIcon /> },
  { link: "", icon: <TokenExplorerBscScanIcon /> },
];

export const COIN_OPTIONS = [
  { icon: BinanaceUsdIcon, label: "BUSD", value: "BUSD" },
  { icon: TetherUsdtIcon, label: "USDT ", value: "USDT" },
  { icon: UsdCoinIcon, label: "USDC", value: "USDC" },
  { icon: BnbIcon, label: "BNB", value: "BNB" },
];
