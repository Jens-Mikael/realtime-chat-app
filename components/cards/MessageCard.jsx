const MessageCard = ({ content, time, isOwnMessage }) => {
  return (
    <div
      className={`p-2 rounded-2xl pr-16 relative max-w-2xl ${
        isOwnMessage
          ? "bg-cyan-500 rounded-tr-sm self-end"
          : "bg-white bg-opacity-20 rounded-tl-sm self-start"
      }`}
    >
      {content.text}
      <div className="absolute bottom-1 right-3 text-xs font-light">{time}</div>
    </div>
  );
};

export default MessageCard;
