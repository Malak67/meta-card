import { useEffect, useState } from 'react';
import { useAccount } from './useAccount';
import { useMetaCardContract } from './useMetaCardContract';

export const useContacts = () => {
  const { account } = useAccount();
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<string[]>([]);

  const getContacts = async () => {
    setIsLoading(true);
    const allContacts = await metaCardContract.getAllContacts();
    if (allContacts && allContacts.length) {
      setContacts(allContacts);
    }
    setIsLoading(false);
  };

  const addContact = async (address: string) => {
    const contactTx = await metaCardContract.addContact(address);
    setIsLoading(true);
    await contactTx.wait();
    setIsLoading(false);
    await getContacts();
  };

  const removeContact = async (address: string) => {
    const contactTx = await metaCardContract.removeContact(address);
    setIsLoading(true);
    await contactTx.wait();
    setIsLoading(false);
    await getContacts();
  };

  useEffect(() => {
    getContacts();
  }, [account]);

  return {
    isLoading,
    contacts,
    getContacts,
    addContact,
    removeContact,
  };
};
