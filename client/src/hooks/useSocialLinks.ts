import { useEffect, useState } from 'react';
import { ISocialLink, SocialLinkData } from '../types';
import { formatSocialLinks } from '../utils';
import { useAccount } from './useAccount';
import { useMetaCardContract } from './useMetaCardContract';

export const useSocialLinks = () => {
  const { account } = useAccount();
  const metaCardContract = useMetaCardContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);

  const getSocialLinks = async () => {
    setIsLoading(true);
    const useLinks = await metaCardContract.getSocialLinks();
    if (useLinks && useLinks.length) {
      setSocialLinks(formatSocialLinks(useLinks));
    }
    setIsLoading(false);
  };

  const addSocialLink = async (newSocialLink: SocialLinkData) => {
    const { name, link } = newSocialLink;
    const addSocialLinkTx = await metaCardContract.addSocialLink(name, link);
    setIsLoading(true);
    await addSocialLinkTx.wait();
    setIsLoading(false);
    getSocialLinks();
  };

  const removeSocialLink = async (id: number) => {
    const removeSocialLinkTx = await metaCardContract.removeSocialLink(id);
    setIsLoading(true);
    await removeSocialLinkTx.wait();
    setIsLoading(false);
    getSocialLinks();
  };

  const updateSocialLink = async (updatedSocialLink: ISocialLink) => {
    const { id, name, link } = updatedSocialLink;
    const updateSocialLinkTx = await metaCardContract.updateSocialLink(
      id,
      name,
      link
    );
    setIsLoading(true);
    await updateSocialLinkTx.wait();
    setIsLoading(false);
    getSocialLinks();
  };

  useEffect(() => {
    getSocialLinks();
  }, [account]);

  return {
    isLoading,
    socialLinks,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
  };
};
