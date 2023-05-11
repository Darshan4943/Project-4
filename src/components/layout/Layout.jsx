import  React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function BasicCard() {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        To Do
      </Typography>

      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
      < MoreHorizIcon/>
      </IconButton>

      <Box sx={{ display: "flex" }}>
        <div>
          <AddIcon />
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
          >
            Add to Card
          </Button>
          <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
      < MoreHorizIcon/>
      </IconButton>
        </div>
      </Box>
    </Card>
  );
}
