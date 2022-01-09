import { ServiceCard } from "../components";
import { AiOutlineContacts } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsShieldFillCheck } from "react-icons/bs";

export const Services = () => (
  <div className="flex w-full justify-center items-center">
    <div className="flex flex-col items-center justify-between md:p-20 py-12 px-4 gap-10 my-20">
      <div className="flex-1 flex flex-col justify-start items-center">
        <h1 className="text-white text-3xl sm:text-5xl py-2">
          Features
          <br />
          available
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The best choice for creating your digital business card without the
          need to worry about data protection or security
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center flex-0 gap-2">
        <ServiceCard
          color="bg-[#ff5b79]"
          title="Security"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed. We always maintain privacy and the quality of our products"
        />
        <ServiceCard
          color="bg-[#2bbbad]"
          title="Social Links"
          icon={<IoShareSocialOutline fontSize={21} className="text-white" />}
          subtitle="Add any number of social links for users to reach you anywhere"
        />
        <ServiceCard
          color="bg-[#8059DA]"
          title="Business Contacts"
          icon={<AiOutlineContacts fontSize={21} className="text-white" />}
          subtitle="You can save contacts by adding their public address inside your contact lists"
        />
      </div>
    </div>
  </div>
);
