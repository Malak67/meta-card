import { FC } from "react";
import { IBusinessCard } from "../context/types";
import { shortenAddress } from "../utils";

export const BusinessCard: FC<IBusinessCard> = ({
  owner,
  fullName,
  title,
  email,
  phoneNumber,
}: IBusinessCard) => {
  console.log("I am receiving this: ", owner);

  const avatarUrl = `https://avatars.dicebear.com/api/identicon/${owner}.svg`
  return (
    <div className="w-auto py-8 px-12 shadow-lg rounded-lg my-20 eth-card">
      <div className="flex justify-center -mt-16 ">
        <img
          className="bg-white w-20 h-20 object-cover rounded-md"
          src={avatarUrl}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-center text-gray-800 text-3xl font-semibold">{fullName}</h2>
        <p className="text-center mt-4 text-2xl text-gray-800 font-semibold">{title}</p>
        <p className="mt-6 text-2xl text-gray-800">Email: {email}</p>
        <p className="mt-2 text-2xl text-gray-800">Phone number: {phoneNumber}</p>
      </div>
      <div className="flex justify-center mt-4">
        <a href="#" className="text-xl font-medium text-indigo-500">
          {shortenAddress(owner)}
        </a>
      </div>
    </div>
  );
};
