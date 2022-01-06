import { withMetamask } from "../utils";

import { FC, useContext } from "react";
import { MetaCardContext } from "../context/MetaCardContext";
import { BusinessCard } from "../components";

export const Component: FC = () => {
  const { businessCard } = useContext(MetaCardContext);
  console.log("Business card: ", businessCard);
  return (
    <>
      {!businessCard ? (
      <h1 className="text-white">
        No business card added! Please create one here
      </h1>
      ) :
      (<BusinessCard {...businessCard}/>)}
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
