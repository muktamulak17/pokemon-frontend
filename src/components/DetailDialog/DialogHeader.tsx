import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const DialogHeader = styled(Box)(({ theme }: any) => ({
  background: `linear-gradient(45deg,${theme.palette.primary.main},#bccfd2)`,
  color: "#fff",
  padding: theme.spacing(2),
  borderRadius: "16px 16px 0 0",
  textAlign: "center",
}));
