import { TableHead, TableRow, TableCell } from "@mui/material";

interface ListHeaderProps {
  headings: string[];
}

export const ListHeader = ({ headings }: ListHeaderProps) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "primary.main" }}>
        {headings.map((text) => (
          <TableCell
            key={text}
            sx={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: "primary.main",
            }}
          >
            {text}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
