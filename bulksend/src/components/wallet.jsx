import React, { useState } from "react";
import { ethers } from "ethers";
import { FaCaretDown } from 'react-icons/fa';
import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWallet = () => {
   const [account, setAccount] = useState();
   const [authorised, setAuthorised] = useState(false);

   const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.error('Not found accounts');
    } else {
      setAccount(String(accounts[0]).substring(0, 5) + "..." + String(accounts[0].substring(38)));
      }
  };

const signInMetamask = async () => {
    const provider = await detectEthereumProvider();
  
    // @ts-ignore
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
  
    if (!provider) {
      console.error('Metamask not found');
      return;
    }
  
    // MetaMask events
    provider.on('accountsChanged', handleAccountsChanged);
  
    provider.on('disconnect', () => {
      console.log('disconnect');
      setAuthorised(false);
      setAccount('');
    });
  
    provider.on('chainIdChanged', chainId =>
      console.log('chainIdChanged', chainId),
    );
  
    provider
      .request({ method: 'eth_requestAccounts' })
      .then(async params => {
        handleAccountsChanged(params);       
        setAuthorised(true);
      })
      .catch(err => {
        setAuthorised(false);
  
        if (err.code === 4001) {
          console.error('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  };
   signInMetamask()
    return (
        <>
        {account ? <button className="dropdown">{account} <FaCaretDown /></button> : <button className='connect' onClick={signInMetamask}>Connect Wallet</button>}
        </>

    )
}
export default ConnectWallet;