import { FC, useEffect, useState } from 'react';
import { SocialLink, Loader } from '../components';
import { useSocialLinks } from '../hooks';
import { withMetamask } from '../utils';

const Component = () => {
  const { isLoading } = useSocialLinks();
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-white text-2xl'>Social Links</h1>
          <SocialLink />
        </>
      )}
    </>
  );
};

const ManageSocialLinks: FC = withMetamask(Component);

export const SocialLinks = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex w-full justify-center items-center'>
        <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
          <ManageSocialLinks />
        </div>
      </div>
    </div>
  );
};
