import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils";
import {
  BusinessCardData,
  IBusinessCard,
  ISocialLink,
  SocialLinkData,
} from "./types";

export const useMetacardContract = (
  setIsLoading: (bool: boolean) => void,
  setBusinessCard: (businessCard: IBusinessCard) => void,
  setSocialLinks: (socialLinks: ISocialLink[]) => void,
  account?: string
) => {
  const { ethereum } = window;

  const getEthereumContract = () => {
    const provider = new Web3Provider(ethereum);
    const signer = provider.getSigner();
    const metaCardContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return metaCardContract;
  };

  const getBusinessCard = async () => {
    try {
      if (
        window.ethereum &&
        account !== "" &&
        account !== null &&
        account !== undefined
      ) {
        const metaCardContract = getEthereumContract();
        const businessCard = await metaCardContract.getBusinessCard();
        setIsLoading(true);
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          };
          setBusinessCard(card);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createBusinessCard = async (newBusinessCard: BusinessCardData) => {
    try {
      if (window.ethereum) {
        const { fullName, title, email, phoneNumber } = newBusinessCard;
        const metaCardContract = getEthereumContract();
        const createBusinessCardTx = await metaCardContract.createBusinessCard(
          fullName,
          title,
          email,
          phoneNumber
        );
        setIsLoading(true);
        await createBusinessCardTx.wait();
        setIsLoading(false);
        const businessCard = await metaCardContract.getBusinessCard();
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          };
          setBusinessCard(card);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateBusinessCard = async (currentBusinessCard: IBusinessCard) => {
    try {
      if (window.ethereum) {
        const { fullName, title, email, phoneNumber } = currentBusinessCard;
        const metaCardContract = getEthereumContract();
        const updateBusinessCardTx = await metaCardContract.updateBusinessCard(
          fullName,
          title,
          email,
          phoneNumber
        );
        setIsLoading(true);
        await updateBusinessCardTx.wait();
        setIsLoading(false);
        const businessCard = await metaCardContract.getBusinessCard();
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          };
          setBusinessCard(card);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getSocialLinks = async () => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        setIsLoading(true);
        const socialLinks = await metaCardContract.getSocialLinks();
        if (socialLinks && socialLinks.length) {
          console.log("Social links: ", socialLinks);
          setSocialLinks(socialLinks);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addSocialLink = async (newSocialLink: SocialLinkData) => {
    try {
      if (window.ethereum) {
        const { name, link } = newSocialLink;
        const metaCardContract = getEthereumContract();
        const addSocialLinkTx = await metaCardContract.addSocialLink(
          name,
          link
        );
        setIsLoading(true);
        await addSocialLinkTx.wait();
        setIsLoading(false);
        const socialLinks = await metaCardContract.getSocialLinks();
        if (socialLinks && socialLinks.length) {
          console.log("Social links: ", socialLinks);
          setSocialLinks(socialLinks);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    getBusinessCard,
    createBusinessCard,
    updateBusinessCard,
    addSocialLink,
    getSocialLinks,
  };
};
