import { useEffect, useState } from 'react';
import { IBusinessCard } from '../types';
import { useAccount } from './useAccount';
import { useMetaCardContract } from './useMetaCardContract';

export const useBusinessCard = () => {
  const { account } = useAccount();
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [card, setCard] = useState<IBusinessCard>();

  const getBusinessCard = async () => {
    setIsLoading(true);
    const userCard = await metaCardContract.getBusinessCard();
    if (userCard && userCard.owner?.slice(0, 3) !== '0x0') {
      const businessCard: IBusinessCard = {
        owner: userCard.owner,
        fullName: userCard.fullName,
        title: userCard.title,
        email: userCard.email,
        phoneNumber: userCard.phoneNumber,
      };
      setCard(businessCard);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBusinessCard();
  }, [account]);

  return {
    isLoading,
    card,
  };
};
