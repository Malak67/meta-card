import { FC } from "react";

export interface ButtonProps {
  buttonText: string;
  clickHandler?: () => void;
  type?: "button" | "submit";
  link?: string;
}

const BtnText: FC<{ buttonText: string }> = ({ buttonText }) => (
  <>
    <span className="w-full h-full bg-gradient-to-br from-[#ff5b79] via-[#ff5478] to-[#8059DA] group-hover:from-[#8059DA] group-hover:via-[#ff5478] group-hover:to-[#ff5b79] absolute py-20"></span>
    <span className="w-full relative px-6 py-3 flex flex-row justify-center items-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      <span className="relative text-white">{buttonText}</span>
    </span>
  </>
);

export const MetaButton: FC<ButtonProps> = ({
  buttonText,
  clickHandler,
  type = "button",
  link,
}: ButtonProps) => {
  return (
    <div className="w-full flex justify-center">
      {link ? (
        <a
          href={link}
          target="_blank"
          className="w-60 md:w-9/12 mt-6 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <BtnText buttonText={buttonText} />
        </a>
      ) : (
        <button
          className="w-60 md:w-9/12 mt-6 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
          type={type}
          onClick={clickHandler}
        >
          <BtnText buttonText={buttonText} />
        </button>
      )}
    </div>
  );
};
