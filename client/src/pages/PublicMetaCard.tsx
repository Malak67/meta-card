import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BusinessCard, Loader, MetaButton } from "../components";
import { MetaCardContext } from "../context/MetaCardContext";
import { ISocialLink } from "../context/types";
import { withMetamask } from "../utils";

const Component = () => {
  const {
    isLoading,
    getBusinessCardByAddr,
    publicBusinessCard,
    publicSocialLinks,
    getPublicSocialLinks,
  } = useContext(MetaCardContext);
  const { address } = useParams();

  useEffect(() => {
    if (address) {
      getBusinessCardByAddr(address);
      getPublicSocialLinks(address);
    }
  }, [address]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!publicBusinessCard ? (
            <div className="white-glassmorphism p-10">
              <h1 className="text-white">No business card added found</h1>
            </div>
          ) : (
            <div>
              <BusinessCard {...publicBusinessCard} />
              {publicSocialLinks?.length !== 0 && (
                <div className="white-glassmorphism p-10 mt-10">
                  <div className="mb-6">
                    {publicSocialLinks.map((socialLink: ISocialLink) => (
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
      )}
    </>
  );
};

const PublicComponent: FC = withMetamask(Component);

export const PublicMetaCard = () => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <PublicComponent />
        </div>
      </div>
    </div>
  );
};
