import { withMetamask } from "../utils";

import { FC, useContext } from "react";
import { MetaCardContext } from "../context/MetaCardContext";
import { BusinessCard } from "../components";
import { Link } from "react-router-dom";

export const Component: FC = () => {
  const { businessCard } = useContext(MetaCardContext);
  console.log("Business card: ", businessCard);
  return (
    <>
      {!businessCard ? (
        <div className="white-glassmorphism p-10">
          <h1 className="text-white">
            No business card added! Please create one{" "}
            <Link
              to="/meta-card"
              className="cursor-pointer hover:text-gray-300"
            >
              here
            </Link>
          </h1>
        </div>
      ) : (
        <BusinessCard {...businessCard} />
      )}
    </>
  );
};

export const MetaBusinessCard: FC = withMetamask(Component);

export const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <MetaBusinessCard />
        </div>
      </div>
    </div>
  );
};
