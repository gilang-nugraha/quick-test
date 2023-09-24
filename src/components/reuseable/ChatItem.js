import { useEffect, useState } from "react";
import { Box, Grid, InputBase, Typography } from "@mui/material";
import _ from "lodash";
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@/src/quicks-icons/SearchIcon";
import PersonIcon from "@/src/quicks-icons/PersonIcon";
import ChatProfileIcon from "./ChatProfileIcon";
import ChatPersonalIcon from "./ChatPersonalIcon";

function ChatItem({ sx, chat, userId }) {
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
        {chat.type == "group" ? (
          <ChatProfileIcon />
        ) : (
          <ChatPersonalIcon
            name={chat.name ? chat.name : chat.chats.user.name}
          />
        )}
      </Grid>
      <Grid item xs sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs>
            <Typography
              variant="body1"
              sx={{
                fontSize: theme.typography.title.fontSize,
                fontWeight: theme.typography.title.fontWeight,
                color: theme.palette.button.main,
                wordWrap: "break-word",
                hyphens: "auto",
                marginBottom: 0.5,
              }}
            >
              {chat.name ? chat.name : chat.chats.user.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              sx={{
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.body2.fontWeight,
                marginLeft: theme.spacing(2),
              }}
            >
              {chat.chats.date}
            </Typography>
          </Grid>
        </Grid>
        {chat.type == "group" && (
          <Typography
            sx={{
              fontSize: theme.typography.name.fontSize,
              fontWeight: theme.typography.name.fontWeight,
              display: "block",
            }}
          >
            {chat.chats.user.id == userId ? "You" : chat.chats.user.name} :
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.body2.fontWeight,
            display: "block",
          }}
        >
          {chat.chats.value}
        </Typography>
      </Grid>
      <Grid
        item
        md={1}
        sx={{
          alignSelf: "flex-end",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {chat.unread && (
          <Box
            sx={{
              width: 10,
              height: 10,
              backgroundColor: theme.palette.indicator.red,
              borderRadius: "50%",
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default ChatItem;
