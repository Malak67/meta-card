import { FC } from 'react';
import { ContactItem } from '../components';
import { withMetamask } from '../utils';

const Component = () => {

  return (
    <>
      <h1 className='text-white text-2xl'>Contact List</h1>
      <ContactItem />
    </>
  );
};

const Contacts: FC = withMetamask(Component);

export const ContactList = () => (
  <div className='min-h-screen'>
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
        <Contacts />
      </div>
    </div>
  </div>
);
