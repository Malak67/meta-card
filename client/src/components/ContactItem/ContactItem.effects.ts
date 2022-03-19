import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContacts } from '../../hooks';

export const useContactItemEffects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [contacts, setContacts] = useState<string[] | []>([]);
  const {
    contacts: cotractContacts,
    addContact,
    removeContact,
  } = useContacts();
  const [deleteAddress, setDeleteAddress] = useState<string | null>();

  useEffect(() => {
    setContacts(cotractContacts);
  }, [cotractContacts]);

  const validationSchema = yup
    .object({
      address: yup
        .string()
        .min(42)
        .max(42)
        .notOneOf(['0x0'])
        .required('Address is required')
        .label('Address'),
    })
    .required();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const opeDeleteModal = (addr: string) => {
    setIsDeleteOpen(true);
    setDeleteAddress(addr);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const onCancelDelete = () => {
    closeDeleteModal();
    setDeleteAddress(null);
  };

  const closeModal = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = async (data: { address: string }) => {
    addContact(data.address);
    closeModal();
  };

  const onDelete = () => {
    if (!deleteAddress) {
      return;
    }
    closeDeleteModal();
    removeContact(deleteAddress);
    setDeleteAddress(null);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    register,
    handleSubmit,
    onSubmit,
    contacts,
    errors,
    opeDeleteModal,
    closeDeleteModal,
    isDeleteOpen,
    onCancelDelete,
    onDelete,
  };
};
