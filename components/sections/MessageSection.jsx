import MessageCard from "../cards/MessageCard";

const MessageSection = () => {
  return (
    <div className="flex flex-col flex-1 gap-3 w-full px-5">
      <MessageCard
        content={{ text: "Heelo buys dis my message" }}
        time="12:48"
        isOwnMessage={true}
      />
      <MessageCard
        content={{
          text: "Heelo buys dis NOT my message viuehfviuhdsiuf vytzxfc  asdgcytasda asdcgatsdc asdgcatsdc tafsdc",
        }}
        time="12:50"
        isOwnMessage={false}
      />
      <MessageCard
        content={{
          text: "Heelo buys dis NOT my message viuehfviuhdsiuf vytzxfc  asdgcytasda asdcgatsdc asdgcatsdc tafsdc",
        }}
        time="12:50"
        isOwnMessage={true}
      />
      <MessageCard
        content={{ text: "Heelo buys dis my message" }}
        time="12:57"
        isOwnMessage={true}
      />
      <MessageCard
        content={{ text: "Heelo buys dis my message" }}
        time="12:57"
        isOwnMessage={true}
      />
      <MessageCard
        content={{ text: "Heelo buys dis my message" }}
        time="12:57"
        isOwnMessage={true}
      />
      <MessageCard
        content={{ text: "Heelo buys dis my message" }}
        time="12:57"
        isOwnMessage={true}
      />
      <MessageCard
        content={{ text: "Heelo buys dis NOT my message" }}
        time="12:50"
        isOwnMessage={false}
      />
      <MessageCard
        content={{ text: "Heelo buys dis NOT my message" }}
        time="12:50"
        isOwnMessage={false}
      />
      <MessageCard
        content={{ text: "Heelo buys dis NOT my message" }}
        time="12:50"
        isOwnMessage={false}
      />
    </div>
  );
};

export default MessageSection;
