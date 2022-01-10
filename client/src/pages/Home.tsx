import { withMetamask } from "../utils";

import { FC, useContext } from "react";
import { MetaCardContext } from "../context/MetaCardContext";
import { BusinessCard } from "../components";
import { Services } from "../containers";
import { Features } from "./Features";
import { Link } from "react-router-dom";

export const Component: FC = () => {
  const { businessCard } = useContext(MetaCardContext);
  return (
    <>
      {!businessCard ? (
        <div className="white-glassmorphism p-10">
          <h1 className="text-white">
            No business card added! Please create one <Link className="hover:text-[#ff5b79]" to="/meta-card">Here</Link>!
          </h1>
        </div>
      ) : (
        <div>
          <BusinessCard {...businessCard} />
        </div>
      )}
    </>
  );
};

export const MetaBusinessCard: FC = withMetamask(Component);

export const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex lg:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 gap-20">
          <div className="flex flex-1 justify-start items-center flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white py-1">
              Business Card <br /> on the Blockchain
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Create your digital business card directly on the blockchain
            </p>
          </div>
          <MetaBusinessCard />
        </div>
      </div>
      <Features />
      <Services />
    </div>
  );
};
