import { BusinessCardData, IBusinessCard } from "../../context/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { MetaCardContext } from "../../context/MetaCardContext";

export const useBusinessCardFormEffects = () => {
  const { isLoading, businessCard, createBusinessCard, updateBusinessCard } =
    useContext(MetaCardContext);
  const defaultValues: BusinessCardData = {
    fullName: businessCard?.fullName || "",
    title: businessCard?.title || "",
    email: businessCard?.email || "",
    phoneNumber: businessCard?.phoneNumber || "",
  };

  let isUpdating: boolean = false;

  const validationSchema = yup
    .object({
      fullName: yup
        .string()
        .required("Full Name is required")
        .label("Full Name"),
      title: yup.string().required("Title is required").label("Title"),
      email: yup.string().email().required("Title is required").label("Title"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .label("Phone number"),
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

  const onSubmit = async (data: IBusinessCard) => {
    if (isUpdating) {
      console.log("Is updating");
      updateBusinessCard(data);
    } else {
      console.log("Is creating");
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
    setValue("fullName", businessCard?.fullName || "");
    setValue("title", businessCard?.title || "");
    setValue("email", businessCard?.email || "");
    setValue("phoneNumber", businessCard?.phoneNumber || "");
    console.log("Inside use effect: ", values);
    isUpdating = !!businessCard;
  }, [businessCard]);

  const submitFormMessage = businessCard
    ? "Update Business Card"
    : "Create Business Card";

  return {
    isLoading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    submitFormMessage,
  };
};
