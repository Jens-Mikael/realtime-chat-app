import { useSelector } from "react-redux";

const MessageCard = ({ content, sender, timeStamp, currentUID }) => {
  const isOwnMessage = sender.uid === currentUID;
  const isGroup = useSelector((state) => state.currentChat.value.isGroup);
  const date = new Date(timeStamp);
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const dateString = `${
    hours.length <= 1 ? (!hours ? "00" : "0" + hours) : hours
  }:${minutes.length <= 1 ? (!minutes ? "00" : "0" + minutes) : minutes}`;
  return (
    <div
      className={`p-2 rounded-2xl pr-16 relative max-w-2xl ${
        isOwnMessage
          ? "bg-cyan-500 rounded-tr-sm self-end"
          : "bg-white bg-opacity-20 rounded-tl-sm self-start"
      }`}
    >
      {content.text}
      <div className="absolute bottom-1 right-3 text-xs font-light">
        {dateString}
      </div>
    </div>
  );
};

export default MessageCard;
