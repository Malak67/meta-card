// import { withMetamask } from "../utils";

import { useContext } from "react";
import { MetaCardContext } from "../context/MetaCardContext";
import metamaskLogo from "../../assets/metamask-logo.svg";

const Component = () => <div>I am connected to metamask</div>;
// export const Test = withMetamask(Component);

export const Home = () => {
  const { isConnectedToRightNetwork, connectWallet, account, provider } = useContext(MetaCardContext);
  console.log('isConnectedToRightNetwork: ', !isConnectedToRightNetwork);
  console.log('account: ', !account);
  console.log('provider: ', provider);
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          {/* <Test /> */}
          {(!isConnectedToRightNetwork || !account) && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-10 bg-[#2952e3] p-3 px-10 cursor-pointer hover:bg-[#2546bd]"
            >
              <img
                src={metamaskLogo}
                alt="logo"
                className="w-10 mr-4 cursor-pointer"
              />
              <p className="text-white text-base font-semibold">Use Metamask</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
