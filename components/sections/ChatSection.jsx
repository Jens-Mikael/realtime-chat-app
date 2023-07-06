import ChatInput from "../ChatInput";
import Messages from "../Messages";
import ChatNav from "../navigations/ChatNav";

const ChatSection = () => {
  const userData = {
    img: "images/hamza.jpeg",
    name: "Hamza Ahmed",
    isOnline: true,
  };

  const messages = {};

  return (
    <div className="grow border relative gap-2 flex flex-col border-white border-opacity-20 scrollbar-none overflow-y-auto rounded-lg">
      <ChatNav userData={userData} messages={messages} />
      <Messages />
      <ChatInput />
    </div>
  );
};

export default ChatSection;