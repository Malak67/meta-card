import { FC, useContext } from "react";
import { BusinessCard, BusinessCardForm } from "../components";
import { withMetamask } from "../utils";
import { MetaCardContext } from "../context/MetaCardContext";

export const Component: FC = () => {
  const { businessCard } = useContext(MetaCardContext);
  return (
    <>
      {!businessCard ? (
        <div className="white-glassmorphism p-10">
          <h1 className="text-white">
            No business card added! Please create one!
          </h1>
        </div>
      ) : (
        <div>
          <BusinessCard {...businessCard} />
          <BusinessCardForm />
        </div>
      )}
    </>
  );
};

export const MetaBusinessCard: FC = withMetamask(Component);

export const MetaCard = () => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 px-4">
          <MetaBusinessCard />
        </div>
      </div>
    </div>
  );
};
