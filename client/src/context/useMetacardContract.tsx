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
  setContacts: (contacts: string[]) => void,
  setPublicBusinessCard: (businessCard: IBusinessCard) => void,
  setPublicSocialLinks: (socialLinks: ISocialLink[]) => void,
  account: string | undefined
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

  const updateBusinessCard = async (currentBusinessCard: BusinessCardData) => {
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

  const mapSocialLinks = (unformatted: any[]) => {
    const formattedSocialLinks = unformatted.map((socialLink: any) => {
      const formattedLink: ISocialLink = {
        id: socialLink.id.toNumber(),
        name: socialLink.name,
        link: socialLink.link,
      };
      return formattedLink;
    });
    setSocialLinks(formattedSocialLinks);
  };

  const getSocialLinks = async () => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        setIsLoading(true);
        const socialLinks = await metaCardContract.getSocialLinks();
        if (socialLinks && socialLinks.length) {
          mapSocialLinks(socialLinks);
        }
      }
      setIsLoading(false);
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
          mapSocialLinks(socialLinks);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const removeSocialLink = async (id: number) => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        const removeSocialLinkTx = await metaCardContract.removeSocialLink(id);
        setIsLoading(true);
        await removeSocialLinkTx.wait();
        setIsLoading(false);
        const socialLinks = await metaCardContract.getSocialLinks();
        if (socialLinks && socialLinks.length) {
          mapSocialLinks(socialLinks);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateSocialLink = async (updatedSocialLink: ISocialLink) => {
    try {
      if (window.ethereum) {
        const { id, name, link } = updatedSocialLink;
        const metaCardContract = getEthereumContract();
        const updateSocialLinkTx = await metaCardContract.updateSocialLink(
          id,
          name,
          link
        );
        setIsLoading(true);
        await updateSocialLinkTx.wait();
        setIsLoading(false);
        const socialLinks = await metaCardContract.getSocialLinks();
        if (socialLinks && socialLinks.length) {
          setSocialLinks(socialLinks);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getContacts = async () => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        setIsLoading(true);
        const contacts = await metaCardContract.getAllContacts();
        if (contacts && contacts.length) {
          console.log("contacts: ", contacts);
          // mapSocialLinks(socialLinks);
          setContacts(contacts);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addContact = async (address: string) => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        const contactTx = await metaCardContract.addContact(address);
        setIsLoading(true);
        await contactTx.wait();
        setIsLoading(false);
        await getContacts();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const removeContact = async (address: string) => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        const contactTx = await metaCardContract.removeContact(address);
        setIsLoading(true);
        await contactTx.wait();
        setIsLoading(false);
        await getContacts();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getBusinessCardByAddr = async (addr: string) => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        setIsLoading(true);
        const businessCard = await metaCardContract.getBusinessCardByAddress(
          addr
        );
        if (businessCard && businessCard.owner.slice(0, 3) !== "0x0") {
          const card: IBusinessCard = {
            owner: businessCard.owner,
            fullName: businessCard.fullName,
            title: businessCard.title,
            email: businessCard.email,
            phoneNumber: businessCard.phoneNumber,
          };
          setPublicBusinessCard(card);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getPublicSocialLinks = async (addr: string) => {
    try {
      if (window.ethereum) {
        const metaCardContract = getEthereumContract();
        setIsLoading(true);
        const unformatted = await metaCardContract.getSocialLinksByAddress(addr);
        if (unformatted && unformatted.length) {
          const formattedSocialLinks = unformatted.map((socialLink: any) => {
            const formattedLink: ISocialLink = {
              id: socialLink.id.toNumber(),
              name: socialLink.name,
              link: socialLink.link,
            };
            return formattedLink;
          });
          setPublicSocialLinks(formattedSocialLinks);
        }
      }
      setIsLoading(false);
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
    removeSocialLink,
    updateSocialLink,
    getContacts,
    addContact,
    removeContact,
    getBusinessCardByAddr,
    getPublicSocialLinks,
  };
};
