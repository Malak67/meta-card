import { withMetamask } from "../utils";

import { FC, useContext } from "react";
import { MetaCardContext } from "../context/MetaCardContext";
import { BusinessCard, MetaButton } from "../components";
import { Link } from "react-router-dom";
import { ISocialLink } from "../context/types";

export const Component: FC = () => {
  const { businessCard, socialLinks } = useContext(MetaCardContext);
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
        <div>
          <BusinessCard {...businessCard} />
          {socialLinks?.length !== 0 && (
            <div className="white-glassmorphism p-10 mt-10">
              <div className="mb-6">
                {socialLinks.map((socialLink: ISocialLink) => (
                  <MetaButton
                    key={socialLink.link + "-" + socialLink.name}
                    link={socialLink.link}
                    buttonText={socialLink.name}
                  />
                ))}
              </div>
            </div>
          )}
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
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <MetaBusinessCard />
        </div>
      </div>
    </div>
  );
};
