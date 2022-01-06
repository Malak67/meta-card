import React, { FC, useContext } from "react";
import { MetaCardContext } from "../../context/MetaCardContext";
import { ConnectMetamask } from "../../shared";

export const withMetamask = (Component: FC<any>) => {
  const ComponentWithMetamask = (props: any) => {
    const { account } = useContext(MetaCardContext);
    if (!account) return <ConnectMetamask />;

    return <Component {...props} />;
  };

  return ComponentWithMetamask;
};
