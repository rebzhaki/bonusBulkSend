import React from "react";
import TransferFunds from "../components/checkBalance";
import ConnectWallet from "../components/wallet";

const CheckBalance = () => {
    return (
        <>
        <ConnectWallet />
        <TransferFunds />
        </>
    )
}
export default CheckBalance;