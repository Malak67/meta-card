import { useEffect, useState } from 'react';
import { IBusinessCard, ISocialLink } from '../types';
import { formatSocialLinks } from '../utils';
import { useAccount } from './useAccount';
import { useMetaCardContract } from './useMetaCardContract';

export const usePublicInfo = () => {
  const { account } = useAccount();
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [publicCard, setPublicCard] = useState<IBusinessCard>();
  const [publicSocialLinks, setPublicSocialLinks] = useState<ISocialLink[]>([]);
  const [address, setAddress] = useState<string>();

  const getBusinessCardByAddr = async (addr: string) => {
    setAddress(addr);
    setIsLoading(true);
    const userCard = await metaCardContract.getBusinessCardByAddress(addr);
    if (userCard && userCard.owner?.slice(0, 3) !== '0x0') {
      const businessCard: IBusinessCard = {
        owner: userCard.owner,
        fullName: userCard.fullName,
        title: userCard.title,
        email: userCard.email,
        phoneNumber: userCard.phoneNumber,
      };
      setPublicCard(businessCard);
    }
    setIsLoading(false);
  };

  const getPublicSocialLinks = async (addr: string) => {
    setIsLoading(true);
    const useLinks = await metaCardContract.getSocialLinksByAddress(addr);
    if (useLinks && useLinks.length) {
      setPublicSocialLinks(formatSocialLinks(useLinks));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (address) {
      getBusinessCardByAddr(address);
      getPublicSocialLinks(address);
    }
  }, [account, address]);

  return {
    isLoading,
    publicCard,
    publicSocialLinks,
    getBusinessCardByAddr,
    getPublicSocialLinks,
  };
};
