import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect } from "react";
import { ISocialLink, SocialLinkData } from "../../context/types";
import { MetaCardContext } from "../../context/MetaCardContext";
import { toast } from "react-toastify";

export const useSocialLinkEffects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateLinkId, setUpdateLinkId] = useState<number | null>();
  const { socialLinks, addSocialLink, removeSocialLink, updateSocialLink } =
    useContext(MetaCardContext);
  const defaultValues = {
    name: "",
    link: "",
  };
  console.log('socialLinks: ', socialLinks);
  const validationSchema = yup
    .object({
      name: yup.string().required("Name is required").label("Name"),
      link: yup
        .string()
        .matches(
          /((https?):\/\/)?(www.)?([a-z]+).([a-z]{2,6})(.+)/,
          "Enter a correct link!"
        )
        .required("Link is required")
        .label("Link"),
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

  const closeModal = () => {
    reset();
    setIsOpen(false);
    setUpdateLinkId(null);
  };

  const onSubmit = async (data: SocialLinkData) => {
    if (updateLinkId !== null && updateLinkId !== undefined) {
      console.log("Is updating: ", data);
      const updatingSocialLink: ISocialLink = {
        id: updateLinkId,
        name: data.name,
        link: data.link,
      }
      updateSocialLink(updatingSocialLink);
    } else {
      console.log("Is creating: ", data);
      addSocialLink(data);
    }
    closeModal();
  };

  const onDelete = (id: number) => {
    const socialLink = socialLinks.find((socialLink) => socialLink.id === id);
    if (!socialLink) {
      toast.error("Social link not found in the list");
    }
    console.log("Found social link with id: ", id, socialLink);
    removeSocialLink(id);
  };

  const onUpdate = (socialLink: ISocialLink) => {
    if (!socialLink) {
      return;
    }
    openModal();
    setUpdateLinkId(socialLink.id);
    setValue("name", socialLink?.name || "");
    setValue("link", socialLink?.link || "");
  };

  let headerMessage = updateLinkId ? "Update Social Link" : "Add new Social link";

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
  };
};
