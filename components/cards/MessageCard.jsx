import Image from "next/image";

const MessageCard = ({ content, sender, timeStamp, isGroup, currentUID }) => {
  const isOwnMessage = sender.uid === currentUID;
  const date = new Date(timeStamp);
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const dateString = `${
    hours.length <= 1 ? (!hours ? "00" : "0" + hours) : hours
  }:${minutes.length <= 1 ? (!minutes ? "00" : "0" + minutes) : minutes}`;
  return (
    <div className={`flex gap-2 ${isOwnMessage ? "self-end" : "self-start"}`}>
      {!isOwnMessage && isGroup && (
        <div>
          <img
            src={sender.photoURL}
            className="rounded-full h-9 w-9"
          />
        </div>
      )}
      <div
        className={`p-2 rounded-2xl pr-16 relative max-w-2xl ${
          isOwnMessage
            ? "bg-cyan-500 rounded-tr-sm"
            : "bg-white bg-opacity-20 rounded-tl-sm"
        }`}
      >
        {content.text}
        <div className="absolute bottom-1 right-3 text-xs font-light">
          {dateString}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
