import { FC } from "react";
import { Link } from "react-router-dom";
import { IBusinessCard } from "../context/types";
import { shortenAddress } from "../utils";

export const BusinessCard: FC<IBusinessCard> = ({
  owner,
  fullName,
  title,
  email,
  phoneNumber,
}: IBusinessCard) => {
  const avatarUrl = `https://avatars.dicebear.com/api/identicon/${owner}.svg`
  return (
    <div className="w-auto py-8 px-12 shadow-lg rounded-lg my-10 white-glassmorphism">
      <div className="flex justify-center -mt-16 ">
        <img
          className="bg-white w-20 h-20 object-cover rounded-md"
          src={avatarUrl}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-center text-white text-2xl font-semibold">{fullName}</h2>
        <p className="text-center mt-4 text-1xl text-white font-semibold">{title}</p>
        <p className="mt-6 text-1xl text-white text-center">Email: {email}</p>
        <p className="mt-2 text-1xl text-white text-center">Phone number: {phoneNumber}</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link to={`/public/${owner}`} className="text-2xl font-medium text-white hover:text-[#ff5b79]">
          {shortenAddress(owner)}
        </Link>
      </div>
    </div>
  );
};
