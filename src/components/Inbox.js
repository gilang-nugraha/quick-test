import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import _ from "lodash";
import SearchBar from "./reuseable/SearchBar";
import ChatItem from "./reuseable/ChatItem";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetcher = async (url) => {
  await delay(10);
  const response = await axios.get(url);
  return response.data;
};

function Inbox({ open }) {
  const { data, error, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/comments",
    fetcher
  );

  const groupedByName = _.groupBy(data, "name");
  const [newMessage, setNewMessage] = useState("");
  const [selectedName, setSelectedName] = useState(null);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          name: "Username",
          email: "user@email.com",
          body: newMessage,
        }
      );
      const newComment = response.data;
      mutate((prev) => [...prev, newComment], false);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <Box
      sx={{
        display: open ? "block" : "none",
        backgroundColor: "white",
        width: "35vw",
        height: "60vh",
        padding: 3,
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <SearchBar />
      {!data && !error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <div>Error loading messages.</div>
        </Box>
      )}

      <div>
        <ChatItem
          sx={{
            borderBottom: "1px solid red",
          }}
        />

        {
          // Object.keys(groupedByName).map((name) => (
          //   <div key={name} onClick={() => setSelectedName(name)}>
          //     {name} ({groupedByName[name].length})
          //   </div>
          // )
          // )
        }
      </div>

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
