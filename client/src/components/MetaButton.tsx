import { FC } from "react";

export interface ButtonProps {
  buttonText: string;
  clickHandler?: () => void;
  type?: "button" | "submit";
  link?: string;
}

export const MetaButton: FC<ButtonProps> = ({
  buttonText,
  clickHandler,
  type = "button",
  link,
}: ButtonProps) => {
  return (
    <div className="w-full flex justify-center">
      <button
        className="min-w-300 mt-6 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        type={type}
        onClick={clickHandler}
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="w-full relative px-6 py-3 flex flex-row justify-center items-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
          {link ? (
            <a href={link} target="_blank">
              <span className="relative text-white">{buttonText}</span>
            </a>
          ) : (
            <span className="relative text-white">{buttonText}</span>
          )}
        </span>
      </button>
    </div>
  );
};
