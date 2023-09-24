const ChatGroup = {
  id: 1,
  type: "group",
  unread: true,
  participants: [
    { id: 1, name: "Mary Hilda" },
    { id: 2, name: "Obaidullah Amarkhil" },
    { id: 3, name: "Gilang" },
  ],
  name: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
  chats: [
    {
      id: 1,
      value:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
      date: "22-09-2023",
      user: {
        id: 3,
        name: "Gilang",
      },
    },
    {
      id: 2,
      value:
        "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
      date: "23-09-2023 19:32",
      user: {
        id: 1,
        name: "Mary Hilda",
      },
    },
    {
      id: 3,
      value:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
      date: "23-09-2023 19:32",
      user: {
        id: 3,
        name: "Gilang",
      },
    },
    {
      id: 4,
      value: "Sure thing, Claren",
      date: "23-09-2023 19:32",
      user: {
        id: 1,
        name: "Mary Hilda",
      },
    },
    {
      id: 5,
      value: "Morning. I’ll try to do them. Thanks",
      date: "24-09-2023  19:32",
      user: {
        id: 2,
        name: "Obaidullah Amarkhil",
      },
    },
  ],
};
export default ChatGroup;
