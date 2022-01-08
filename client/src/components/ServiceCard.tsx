import { FC, ReactElement } from "react";
import { IconType } from "react-icons";

export interface ServiceCardProps {
  color: string;
  title: string;
  icon: ReactElement<IconType>;
  subtitle: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({
  color,
  title,
  icon,
  subtitle,
}: ServiceCardProps) => (
  <div className="w-full flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);
