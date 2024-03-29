import { BusinessCardData, IBusinessCard } from '../../types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useBusinessCard } from '../../hooks';

export const useBusinessCardFormEffects = () => {
  const { isLoading, card, createBusinessCard, updateBusinessCard } =
    useBusinessCard();
  const [businessCard, setBusinessCard] = useState<IBusinessCard | undefined>();
  useEffect(() => {
    setBusinessCard(card);
  }, [card]);

  const defaultValues: BusinessCardData = {
    fullName: businessCard?.fullName || '',
    title: businessCard?.title || '',
    email: businessCard?.email || '',
    phoneNumber: businessCard?.phoneNumber || '',
  };

  let isUpdating: boolean = false;

  const validationSchema = yup
    .object({
      fullName: yup
        .string()
        .required('Full Name is required')
        .label('Full Name'),
      title: yup.string().required('Title is required').label('Title'),
      email: yup.string().email().required('Title is required').label('Title'),
      phoneNumber: yup
        .string()
        .required('Phone number is required')
        .label('Phone number'),
    })
    .required();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: BusinessCardData) => {
    if (isUpdating) {
      updateBusinessCard(data);
    } else {
      createBusinessCard(data);
    }
    reset();
  };

  useEffect(() => {
    const values = {
      fullName: businessCard?.fullName,
      title: businessCard?.title,
      email: businessCard?.email,
      phoneNumber: businessCard?.phoneNumber,
    };
    setValue('fullName', businessCard?.fullName || '');
    setValue('title', businessCard?.title || '');
    setValue('email', businessCard?.email || '');
    setValue('phoneNumber', businessCard?.phoneNumber || '');
    isUpdating = !!businessCard;
  }, [businessCard]);

  const submitFormMessage = businessCard
    ? 'Update Business Card'
    : 'Create Business Card';

  return {
    isLoading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    submitFormMessage,
  };
};
