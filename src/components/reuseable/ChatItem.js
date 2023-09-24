import { useEffect, useState } from "react";
import { Box, Grid, InputBase, Typography } from "@mui/material";
import _ from "lodash";
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@/src/quicks-icons/SearchIcon";
import PersonIcon from "@/src/quicks-icons/PersonIcon";
import ChatProfileIcon from "./ChatProfileIcon";

function ChatItem({ sx }) {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        paddingY: "22px",
        ...sx,
      }}
    >
      <Grid item>
        <ChatProfileIcon />
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontSize: theme.typography.title.fontSize,
                fontWeight: theme.typography.title.fontWeight,
              }}
            >
              109220-Naturalization
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.body2.fontWeight,
              }}
            >
              January 1,2021 19:10
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: theme.typography.name.fontSize,
              fontWeight: theme.typography.name.fontWeight,
              display: "block",
            }}
          >
            Cameron Phillips :
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.body2.fontWeight,
              display: "block",
            }}
          >
            Please check this out!
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
          alignSelf: "flex-end",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: theme.palette.indicator.red,
            borderRadius: "50%",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default ChatItem;
