import { useState } from 'react';
import { BusinessCardData, IBusinessCard } from '../types';
import { useMetaCardContract } from './useMetaCardContract';

export const useCreateBusinessCard = () => {
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userCard, setUserCard] = useState<IBusinessCard>();

  const createBusinessCard = async (newBusinessCard: BusinessCardData) => {
    const { fullName, title, email, phoneNumber } = newBusinessCard;
    const createBusinessCardTx = await metaCardContract.createBusinessCard(
      fullName,
      title,
      email,
      phoneNumber
    );
    setIsLoading(true);
    await createBusinessCardTx.wait();
    setIsLoading(false);
    const businessCard = await metaCardContract.getBusinessCard();
    if (businessCard && businessCard.owner.slice(0, 3) !== '0x0') {
      const card: IBusinessCard = {
        owner: businessCard.owner,
        fullName: businessCard.fullName,
        title: businessCard.title,
        email: businessCard.email,
        phoneNumber: businessCard.phoneNumber,
      };
      setUserCard(card);
    }
  };

  return {
    isLoading,
    userCard,
    createBusinessCard,
  };
};
