import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import logo from "../../assets/logo.png";
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
  <Link to={item.link} className={`mx-4 cursor-pointer ${classprops}`}>
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
      link: "contacts",
      title: "Contacts",
    },
  ];
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <Link to="/" className="md:flex-[1] flex flex-row flex-initial items-center">
        <img src={logo} alt="logo" className="w-20 cursor-pointer" />
        <h1 className="ml-3 text-white text-2xl">Meta Card</h1>
      </Link>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {links.map((item) => (
          <NavBarItem key={item.title + "" + item.link} item={item} />
        ))}
      </ul>
    </nav>
  );
};
