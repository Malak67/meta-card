import { ISocialLink } from '../types';

export const formatSocialLinks = (unformatted: any[]) => {
  if (!unformatted?.length) {
    return [];
  }
  return unformatted.map((socialLink: any) => {
    const formattedLink: ISocialLink = {
      id: socialLink.id.toNumber(),
      name: socialLink.name,
      link: socialLink.link,
    };
    return formattedLink;
  });
};
