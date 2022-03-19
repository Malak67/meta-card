import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { ISocialLink, SocialLinkData } from '../../types';
import { toast } from 'react-toastify';
import { useSocialLinks } from '../../hooks';

export const useSocialLinkEffects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [updateLinkId, setUpdateLinkId] = useState<number | null>();
  const [deleteLinkId, setDeleteLinkId] = useState<number | null>();
  const [socialLinks, setSocialLinks] = useState<ISocialLink[] | []>([]);
  const {
    socialLinks: contractSocialLinks,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
  } = useSocialLinks();

  useEffect(() => {
    setSocialLinks(contractSocialLinks);
  }, [contractSocialLinks]);

  const defaultValues = {
    name: '',
    link: '',
  };
  const validationSchema = yup
    .object({
      name: yup.string().required('Name is required').label('Name'),
      link: yup
        .string()
        .matches(
          /((https?):\/\/)?(www.)?([a-z]+).([a-z]{2,6})(.+)/,
          'Enter a correct link!'
        )
        .required('Link is required')
        .label('Link'),
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

  const openModal = () => {
    setIsOpen(true);
  };

  const opeDeleteModal = (id: number) => {
    setIsDeleteOpen(true);
    setDeleteLinkId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const onCancelDelete = () => {
    closeDeleteModal();
    setDeleteLinkId(null);
  };

  const closeModal = () => {
    reset();
    setIsOpen(false);
    setUpdateLinkId(null);
  };

  const onSubmit = async (data: SocialLinkData) => {
    if (updateLinkId !== null && updateLinkId !== undefined) {
      const updatingSocialLink: ISocialLink = {
        id: updateLinkId,
        name: data.name,
        link: data.link,
      };
      updateSocialLink(updatingSocialLink);
    } else {
      addSocialLink(data);
    }
    closeModal();
  };

  const onDelete = () => {
    if (!deleteLinkId) {
      return;
    }
    closeDeleteModal();
    const socialLink = socialLinks.find(
      (socialLink) => socialLink.id === deleteLinkId
    );
    if (!socialLink) {
      toast.error('Social link not found in the list');
    }
    removeSocialLink(deleteLinkId);
    setDeleteLinkId(null);
  };

  const onUpdate = (socialLink: ISocialLink) => {
    if (!socialLink) {
      return;
    }
    openModal();
    setUpdateLinkId(socialLink.id);
    setValue('name', socialLink?.name || '');
    setValue('link', socialLink?.link || '');
  };

  let headerMessage = updateLinkId
    ? 'Update Social Link'
    : 'Add new Social link';

  return {
    isOpen,
    openModal,
    closeModal,
    register,
    handleSubmit,
    onSubmit,
    onDelete,
    onUpdate,
    errors,
    socialLinks,
    headerMessage,
    opeDeleteModal,
    closeDeleteModal,
    isDeleteOpen,
    onCancelDelete,
  };
};
