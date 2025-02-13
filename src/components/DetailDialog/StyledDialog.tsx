import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }: any) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[10],
  },
}));
