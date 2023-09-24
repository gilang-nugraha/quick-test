import { Box, Grid, InputBase, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@/src/quicks-icons/PersonIcon";

const CircleWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "34px",
  height: "34px",
}));

function ChatPersonalIcon({ name }) {
  const theme = useTheme();
  const splitName =
    name?.length >= 2
      ? (name[0].charAt(0) + name[1].charAt(0)).toUpperCase()
      : name.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        marginRight: 3,
      }}
    >
      <CircleWrapper
        sx={{
          backgroundColor: theme.palette.button.main,
        }}
      >
        <Typography color="white">{splitName}</Typography>
      </CircleWrapper>
    </Box>
  );
}

export default ChatPersonalIcon;
