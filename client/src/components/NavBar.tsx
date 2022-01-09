import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "../types/types";

export interface NavBarItemProps {
  item: NavLink;
  classprops?: DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >;
}

const NavBarItem: FC<NavBarItemProps> = ({
  item,
  classprops,
}: NavBarItemProps) => (
  <Link
    to={item.link}
    className={`mx-4 cursor-pointer hover:text-gray-300 ${classprops}`}
  >
    {item.title}
  </Link>
);

export const Navbar: FC = () => {
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
    <nav className="w-full flex md:justify-center justify-between items-center flex-col p-4">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <Link
          to="/"
          className="md:flex-[0.5] flex flex-row flex-initial justify-center items-center"
        >
          <img src={logo} alt="logo" className="w-20 cursor-pointer" />
          <h1 className="ml-3 text-white text-2xl">Meta Card</h1>
        </Link>
        <ul className="text-white flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {links.map((item) => (
            <NavBarItem key={item.title + "" + item.link} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
