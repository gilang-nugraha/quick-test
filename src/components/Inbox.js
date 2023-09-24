import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Slide,
  Typography,
} from "@mui/material";
import _ from "lodash";
import SearchBar from "./reuseable/SearchBar";
import ChatItem from "./reuseable/ChatItem";
import { useTheme } from "@mui/material/styles";
import ChatList from "../mock/ChatList";
import ChatDetail from "./reuseable/ChatDetail";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetcher = async (url) => {
  await delay(10);
  const response = await axios.get(url);
  return response.data;
};

function Inbox({ open }) {
  const theme = useTheme();
  const { data, error, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/comments",
    fetcher
  );
  const userId = 3;
  const groupedByName = _.groupBy(data, "name");
  const [newMessage, setNewMessage] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [dataChats, setDataChats] = useState((ChatList && ChatList.data) || []);
  const [detailChat, setDetailChat] = useState(null);

  return (
    <Box
      sx={{
        display: open ? "block" : "none",
        backgroundColor: "white",
        width: "40vw",
        height: "60vh",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        marginBottom: 2,
      }}
    >
      {/* loading state */}
      {!data && !error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            background: "white",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography
            variant="body1"
            sx={{
              fontSize: theme.typography.title.fontSize,
              fontWeight: theme.typography.title.fontWeight,
            }}
          >
            Loading Chats ...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            background: "white",
            zIndex: 1,
          }}
        >
          <div>Error loading messages.</div>
        </Box>
      )}
      <Slide
        direction={showDetail ? "left" : "right"}
        in={!showDetail}
        timeout={{ enter: 500, exit: 500 }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: "24px",
          }}
        >
          <SearchBar />

          <div
            style={{
              position: "relative",
              height: "calc(100% - 44px)",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {dataChats?.map((chat, index) => (
              <ButtonBase
                onClick={() => setShowDetail(chat.id)}
                sx={{ textAlign: "left" }}
                key={index}
              >
                <ChatItem
                  chat={chat}
                  userId={userId}
                  sx={
                    index + 1 !== dataChats.length && {
                      borderBottom: "1px solid",
                      borderColor: theme.palette.button.lightGrey,
                    }
                  }
                />
              </ButtonBase>
            ))}
          </div>
        </div>
      </Slide>
      <Slide
        direction={showDetail ? "left" : "right"}
        in={Boolean(showDetail)}
        timeout={{ enter: 500, exit: 500 }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ChatDetail
            chatId={showDetail}
            userId={userId}
            onClose={() => {
              setShowDetail(false);
            }}
          />
        </div>
      </Slide>
      {
        // Object.keys(groupedByName).map((name) => (
        //   <div key={name} onClick={() => setSelectedName(name)}>
        //     {name} ({groupedByName[name].length})
        //   </div>
        // )
        // )
      }

      {selectedName && (
        <div>
          <h2>Chats from {selectedName}</h2>
          {groupedByName[selectedName].map((chat) => (
            <div key={chat.id}>
              <strong>{chat.email}</strong>: {chat.body}
            </div>
          ))}
        </div>
      )}
    </Box>
  );
}

export default Inbox;
