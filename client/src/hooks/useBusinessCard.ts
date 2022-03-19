import { useEffect, useState } from 'react';
import { BusinessCardData, IBusinessCard } from '../types';
import { useAccount } from './useAccount';
import { useMetaCardContract } from './useMetaCardContract';

export const useBusinessCard = () => {
  const { account } = useAccount();
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [card, setCard] = useState<IBusinessCard>();

  const getBusinessCard = async () => {
    const userCard = await metaCardContract.getBusinessCard();
    setIsLoading(true);
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
    await getBusinessCard();
  };

  const updateBusinessCard = async (currentBusinessCard: BusinessCardData) => {
    const { fullName, title, email, phoneNumber } = currentBusinessCard;
    const updateBusinessCardTx = await metaCardContract.updateBusinessCard(
      fullName,
      title,
      email,
      phoneNumber
    );
    setIsLoading(true);
    await updateBusinessCardTx.wait();
    setIsLoading(false);
    await getBusinessCard();
  };

  useEffect(() => {
    getBusinessCard();
  }, [account]);

  return {
    isLoading,
    card,
    createBusinessCard,
    updateBusinessCard,
  };
};
