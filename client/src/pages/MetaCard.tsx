import { FC, useEffect, useState } from 'react';
import { BusinessCard, BusinessCardForm, Loader } from '../components';
import { withMetamask } from '../utils';
import { useBusinessCard } from '../hooks';
import { IBusinessCard } from '../types';

const Component: FC = () => {
  const { isLoading, card } = useBusinessCard();
  const [businessCard, setBusinessCard] = useState<IBusinessCard | undefined>();
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setBusinessCard(card);
  }, [card]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!businessCard ? (
        <div className='white-glassmorphism p-10'>
          <h1 className='text-white'>
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

const MetaBusinessCard: FC = withMetamask(Component);

export const MetaCard = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex w-full justify-center items-center'>
        <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 px-4'>
          <MetaBusinessCard />
        </div>
      </div>
    </div>
  );
};
