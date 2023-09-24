import { Box, Grid, InputBase } from "@mui/material";
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

function ChatProfileIcon({ isFriend }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        marginRight: 3,
      }}
    >
      <CircleWrapper
        sx={{
          backgroundColor: theme.palette.button.white,
        }}
      >
        <PersonIcon size={18} color={"#0000008A"} />
      </CircleWrapper>
      <CircleWrapper
        sx={{
          backgroundColor: theme.palette.button.main,
          marginLeft: -2,
        }}
      >
        <PersonIcon size={18} />
      </CircleWrapper>
    </Box>
  );
}

export default ChatProfileIcon;
