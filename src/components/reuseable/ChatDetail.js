import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Popper,
  Paper,
  TextField,
  Button,
  InputBase,
  Snackbar,
  Slide,
  CircularProgress,
} from "@mui/material";
import _ from "lodash";
import { styled, alpha } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import ArrowLeft from "@/src/quicks-icons/ArrowLeft";
import Close from "@/src/quicks-icons/Close";
import ChatList from "@/src/mock/ChatList";
import ChatGroup from "@/src/mock/ChatGroup";
import ChatPersonal from "@/src/mock/ChatPersonal";
import ChatSupport from "@/src/mock/ChatSupport";
import Dots from "@/src/quicks-icons/Dots";

function ChatMessage({
  messageId,
  sender,
  message,
  isOwnMessage,
  bgColor,
  tooltipColor,
}) {
  const theme = useTheme();
  const [activePopper, setActivePopper] = useState(null);

  const anchorRef = useRef(null);

  const handleToggle = (id) => {
    if (activePopper === id) {
      setActivePopper(null);
    } else {
      setActivePopper(id);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setActivePopper(null);
  };

  const getOptions = () => {
    if (isOwnMessage) {
      return ["Edit", "Delete"];
    } else {
      return ["Share", "Reply"];
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isOwnMessage ? "flex-end" : "flex-start",
        marginBottom: 2,
        position: "relative",
        "& button": {
          display: activePopper && "block",
          right: isOwnMessage ? "unset" : "-24px",
          left: isOwnMessage ? "-24px" : "unset",
          top: "-8px",
        },
        "&:hover button": {
          display: "block",
        },
      }}
    >
      <Typography
        variant="body2"
        color={isOwnMessage ? theme.palette.chat.purpleTooltip : tooltipColor}
        sx={{
          fontSize: theme.typography.name.fontSize,
          fontWeight: theme.typography.name.fontWeight,
        }}
      >
        {isOwnMessage ? "You" : sender}
      </Typography>
      <Box
        sx={{
          maxWidth: "70%",
          position: "relative",
          padding: 1,
          borderRadius: 2,
          backgroundColor: isOwnMessage ? theme.palette.chat.purple : bgColor,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: theme.typography.body3.fontSize,
            fontWeight: theme.typography.body3.fontWeight,
          }}
        >
          {message}
        </Typography>
        <IconButton
          aria-label="more"
          aria-haspopup="true"
          onClick={() => handleToggle(messageId)}
          size="small"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "none",
          }}
          ref={anchorRef}
        >
          <Dots color={theme.palette.button.grey} size={16} />
        </IconButton>
        <Popper
          open={activePopper === messageId}
          anchorEl={anchorRef.current}
          placement="bottom-end"
        >
          <Paper>
            {getOptions().map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Paper>
        </Popper>
      </Box>
    </Box>
  );
}

const NewMessageTextWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center",
  "&:before": {
    content: '""',
    width: "100%",
    height: "1px",
  },
  "&:after": {
    content: '""',
    width: "100%",
    height: "1px",
  },
}));

function ChatDetail({ sx, chatId, userId, onClose }) {
  const theme = useTheme();
  const headerRef = useRef(null);
  const chatBoxRef = useRef(null);
  const messageRef = useRef(null);
  const [chatData, setChatData] = useState(null);
  // const [chatHeight, setChatHeight] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (headerRef.current && chatBoxRef.current && messageRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const chatBoxheight = chatBoxRef.current.offsetHeight;
      const messageHeight = `calc(100% - ${headerHeight + chatBoxheight}px`;
      messageRef.current.style.height = messageHeight;
      messageRef.current.style.maxHeight = messageHeight;
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    if (chatData?.type == "support") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } else {
      setLoading(false);
    }
  }, [chatData]);

  useMemo(() => {
    const findChat = _.find(ChatList && ChatList.data, { id: chatId });
    switch (findChat?.type) {
      case "group":
        setChatData(ChatGroup);
        break;
      case "personal":
        setChatData(ChatPersonal);
        break;
      case "support":
        setChatData(ChatSupport);
        break;
      default:
        break;
    }
  }, [chatId]);

  const handleClose = () => {
    onClose();
  };
  function getBgColor(type, index) {
    switch (type) {
      case "personal":
        return theme.palette.chat.orange;
      case "group":
        if (index == 1) return theme.palette.chat.orange;
        if (index == 2) return theme.palette.chat.green;
      case "support":
        return "#F8F8F8";
      default:
        return theme.palette.chat.purple;
    }
  }
  function getTooltipColor(type, index) {
    switch (type) {
      case "personal":
        return theme.palette.chat.orangeTooltip;
      case "group":
        if (index == 1) return theme.palette.chat.orangeTooltip;
        if (index == 2) return theme.palette.chat.greenTooltip;
      case "support":
        return theme.palette.button.main;
      default:
        return theme.palette.chat.purpleTooltip;
    }
  }
  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setChatData((prevMessages) => ({
        ...prevMessages,
        chats: [
          ...prevMessages.chats,
          {
            id: chatData.chats.length + 1,
            value: inputValue,
            date: "22-09-2023 11:23",
            user: {
              id: userId,
              name: "Gilang",
            },
          },
        ],
      }));

      setInputValue("");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...sx,
        backgroundColor: "white",
        padding: "24px",
      }}
    >
      {!chatData ? (
        <></>
      ) : (
        <>
          <Grid
            ref={headerRef}
            container
            sx={{
              paddingBottom: "11px",
              borderBottom: "1px solid #BDBDBD",
            }}
          >
            <Grid item md={1}>
              <ButtonBase onClick={() => handleClose()}>
                <ArrowLeft color="#333333" size={24} />
              </ButtonBase>
            </Grid>
            <Grid item md={10}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: theme.typography.name.fontSize,
                  fontWeight: theme.typography.name.fontWeight,
                  color: theme.palette.button.main,
                  wordWrap: "break-word",
                  hyphens: "auto",
                  marginBottom: 0.25,
                }}
              >
                {chatData.name}
              </Typography>
              {chatData.participants && (
                <Typography
                  variant="body3"
                  sx={{
                    fontSize: theme.typography.body3.fontSize,
                    fontWeight: theme.typography.body3.fontWeight,
                    // color: theme.palette.button.main,
                    wordWrap: "break-word",
                    hyphens: "auto",
                    marginBottom: 0.5,
                  }}
                >
                  {chatData.participants.length} participants
                </Typography>
              )}
            </Grid>
            <Grid item md={1} textAlign={"right"}>
              <ButtonBase onClick={() => handleClose()}>
                <Close color="#333333" size={14} />
              </ButtonBase>
            </Grid>
          </Grid>
          <Box
            ref={messageRef}
            sx={{
              paddingTop: "11px",
              overflow: "auto",
            }}
          >
            {chatData.chats.map((chat, i) => (
              <div key={i}>
                {chatData.unread &&
                  chatData.chats.length == i + 1 &&
                  chat.user?.id !== userId && (
                    <Box>
                      <NewMessageTextWrapper
                        sx={{
                          "&:before, &:after": {
                            backgroundColor: theme.palette.indicator.red,
                          },
                          margin: "12px 0",
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.indicator.red,
                            fontSize: theme.typography.title.fontSize,
                            fontWeight: theme.typography.title.fontWeight,
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          New Message
                        </Typography>
                      </NewMessageTextWrapper>
                    </Box>
                  )}
                <ChatMessage
                  key={i}
                  sender={chat.user?.name || chatData.name}
                  messageId={i}
                  message={chat.value}
                  bgColor={getBgColor(chatData.type, chat.user?.id)}
                  tooltipColor={getTooltipColor(chatData.type, chat.user?.id)}
                  isOwnMessage={chat.user?.id == userId}
                />
              </div>
            ))}
          </Box>

          <Box
            ref={chatBoxRef}
            sx={{
              width: "100%",
              paddingTop: "11px",
              position: "relative",
            }}
          >
            <Slide direction="up" in={loading} mountOnEnter unmountOnExit>
              <Box
                p={1}
                sx={{
                  position: "absolute",
                  top: "-32px",
                  left: "0",
                  width: "100%",
                  borderRadius: 1,
                  backgroundColor: theme.palette.sticker.grey,
                  color: theme.palette.button.grey,
                  fontSize: theme.typography.body3.fontSize,
                  fontWeight: theme.typography.body3.fontWeight,
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={16} color="primary" />
                Please wait while we connect you with one of our team...
              </Box>
            </Slide>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item width={`calc(100% - 64px - 12px)`}>
                <InputBase
                  fullWidth
                  placeholder="Type a new message"
                  sx={{
                    border: "1px solid",
                    borderColor: theme.palette.button.lightGrey,
                    borderRadius: 1,
                    padding: "0 12px",
                    color: theme.palette.button.grey,
                    fontSize: theme.typography.body3.fontSize,
                    fontWeight: theme.typography.body3.fontWeight,
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatDetail;
