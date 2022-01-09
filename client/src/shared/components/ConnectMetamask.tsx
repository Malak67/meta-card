import { useContext } from "react";
import { MetaCardContext } from "../../context/MetaCardContext";
import metamaskLogo from "../../assets/metamask-logo.svg";

export const ConnectMetamask = () => {
  const { connectWallet, isConnectedToRightNetwork } =
    useContext(MetaCardContext);

  const handleInstall = () => {
    window.location.replace("https://metamask.io/");
  };

  const noMetamaskInstalled = !(
    (window as any).web3 || (window as any).ethereum
  );
  const clickHandler = noMetamaskInstalled ? handleInstall : connectWallet;
  const buttonText = noMetamaskInstalled
    ? "Install Metamask"
    : "Connect Metamask";

  return (
    <div className="p-10 white-glassmorphism w-96 rounded-md text-center">
      <button
        onClick={clickHandler}
        className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff5b79] via-[#ff5478] to-[#8059DA] group-hover:from-[#8059DA] group-hover:via-[#ff5478] group-hover:to-[#ff5b79] absolute"></span>
        <span className="relative px-6 py-3 flex flex-row justify-center items-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
          <img
            src={metamaskLogo}
            alt="logo"
            className="w-10 mr-4 cursor-pointer"
          />
          <span className="relative text-white">{buttonText}</span>
        </span>
      </button>
      {!isConnectedToRightNetwork && (
        <h2 className="text-white mt-6">
          You are not connected to the Ropsten network!
        </h2>
      )}
    </div>
  );
};
