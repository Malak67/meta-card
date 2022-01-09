import { FC } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "../types/types";
export interface FooterLinkProps {
  item: NavLink;
}

const FooterLink: FC<FooterLinkProps> = ({ item }: FooterLinkProps) => (
  <Link
    to={item.link}
    className="text-white text-base text-center mx-2 cursor-pointer hover:text-gray-300"
  >
    {item.title}
  </Link>
);

export const Footer: FC = () => {
  const links: NavLink[] = [
    {
      link: "meta-card",
      title: "My Card",
    },
    {
      link: "social-links",
      title: "Social Links",
    },
    {
      link: "contacts",
      title: "Contacts",
    },
  ];
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <Link to="/" className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-24" />
        </Link>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {links.map((item) => (
            <FooterLink key={item.title + "" + item.link} item={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">
          Check us out
          <a
            className="text-white text-sm text-center font-medium mt-2 ml-2 hover:text-gray-300"
            href="https://www.sprintowl.com"
            target="_blank"
          >
            Sprint Owl
          </a>
        </p>
        <p className="text-white text-sm text-center font-medium mt-2">
          office@sprintowl.com
        </p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">
          © {new Date().getFullYear()}, SPRINT OWL SRL.
        </p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};
