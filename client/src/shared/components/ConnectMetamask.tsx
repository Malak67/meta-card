// import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
// import { injectedConnector } from "../../utils";
import { toast } from "react-toastify";

export const ConnectMetamask = () => {
//   const { activate } = useWeb3React();

//   const handleInstall = () => {
//     window.location.replace("https://metamask.io/");
//   };

//   const handleConnect = async () => {
//     await activate(injectedConnector, undefined, true).catch((error) => {
//       if (error instanceof UnsupportedChainIdError) {
//         toast.error(`You are connected to the unsupported network`);
//       } else {
//         toast.error(
//           `Unknown error while connecting wallet. Please reload the page`
//         );
//       }
//     });
//   };

//   const noMetamaskInstalled = !(
//     (window as any).web3 || (window as any).ethereum
//   );
//   const clickHandler = noMetamaskInstalled ? handleInstall : handleConnect;
//   const buttonText = noMetamaskInstalled
//     ? "Install Metamask"
//     : "Connect Metamask";

//   return (
//     <button
//       onClick={clickHandler}
//       className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
//     >
//       <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
//       <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
//         <span className="relative text-white">{buttonText}</span>
//       </span>
//     </button>
//   );
};
