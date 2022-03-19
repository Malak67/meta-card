import MetaCard from '../utils/blockchain/MetaCard.json';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { contractAddress } from '../utils';
import { useAccount } from './useAccount';
import { useEffect, useState } from 'react';

const { ethereum } = window;

export const useMetaCardContract = () => {
  const { account } = useAccount();
  const provider2 = new Web3Provider(ethereum);
  const signer = provider2.getSigner();
  const { abi } = MetaCard;
  const metaCardInterface = new utils.Interface(abi);
  const [contract, setContract] = useState(
    new Contract(contractAddress, metaCardInterface, signer)
  );

  useEffect(() => {
    setContract(new Contract(contractAddress, metaCardInterface, signer));
  }, [account]);

  return contract;
};
