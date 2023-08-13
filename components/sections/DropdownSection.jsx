import DropdownCard from "../cards/DropdownCard";
import DropdownNav from "../navigations/DropdownNav";

const DropdownSection = ({ isDropdownOpen, requestsData }) => {
  return (
    <div
      className={`transition-all sticky top-0 z-20  flex flex-col ${
        isDropdownOpen ? "h-[500px]" : "h-0"
      }`}
    >
      <div className="relative min-h-full overflow-y-scroll transition-all scrollbar-none">
        <DropdownNav isDropdownOpen={isDropdownOpen} />

        <div className="flex flex-col gap-3 pb-5 px-5 flex-1">
          {requestsData.map((i, index) => {
            const isGroup = i.requestType === "group";
            return <DropdownCard data={i} isGroup={isGroup} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;
