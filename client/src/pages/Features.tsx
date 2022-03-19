import { MetaButton } from "../components";
import { SocialLinkData } from "../types";

export const Features = () => {
  const socialLinks: SocialLinkData[] = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/",
    },
    {
      name: "GitHub",
      link: "https://github.com/",
    },
  ];

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex lg:flex-row flex-col items-center justify-evenly md:p-20 py-12 px-4 gap-20">
        <div className="flex-0 max-w-600 w-auto py-8 px-12 shadow-lg rounded-lg my-10 white-glassmorphism">
          {socialLinks.map((socialLink: SocialLinkData) => (
            <div
              key={socialLink.link + "-" + socialLink.name}
              className="w-full relative inline-flex items-center justify-center"
            >
              <MetaButton link={socialLink.link} buttonText={socialLink.name} />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-start items-center">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Meta
            <br /> Social links
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Add your social links on your meta page
          </p>
        </div>
      </div>
    </div>
  );
};
