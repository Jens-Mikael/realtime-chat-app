import ContactCard from "@/components/ContactCard";
import ContactNav from "@/components/navigations/ContactNav";

const ContactSection = () => {
  return (
    <div className="flex flex-col relative rounded-lg border overflow-y-auto border-white border-opacity-20 scrollbar-none">
      <ContactNav />
      {/* <div className="w-full border-t border-white border-opacity-20" /> */}
      <div className="flex flex-col gap-3 p-5 pt-0">
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick becaus tis"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
        <ContactCard
          img="images/hamza.jpeg"
          name="Hamza Ahmed"
          lastText="Bro check this out real quick"
          notify={true}
        />
      </div>
    </div>
  );
};

export default ContactSection;
