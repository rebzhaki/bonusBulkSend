import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Context } from "../context";

const TransferFunds = () => {

    const { userJSON, setUserJSON } = useContext(Context);
    const [data, setData] = useState(0);
    const [dataBNB, setDataBNB] = useState(0);
    const [dataUSDT, setDataUSDT] = useState(0);
    const [rate, setConversion] = useState(0)
    console.log("xy", userJSON);

    let value;
    let responseData = 0;
    let sum = 0;
    for (let i = 0; i < userJSON.length - 1; i++) {
        sum += parseInt(userJSON[i].amount);
    }

    console.log("xx", sum);


    axios.get('https://v6.exchangerate-api.com/v6/ac2fa58d233778428501ad01/pair/KES/USD')
        .then(response => {
            console.log("resssss", response.data.conversion_rate)
            setConversion(response.data.conversion_rate)
        }, err => {
            console.log(err);
        })

    // axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBETH')
    // .then(response=> {
    //     responseData = response.data;
    //     // for(let i = 0; i < responseData.length; i++){
    //     //      value = parseInt(responseData[i].price);
    //     // }

    //   console.log("uuu", responseData["price"]);
    //   setDataBNB(responseData["price"])
    // },err=>{
    //   console.log(err.message);
    // })

    axios.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USDT&api_key=07831348abf84f5007f8f9b311e421cd2337babd5f655c821ec29da2999e4cf1')
        .then(response => {
            console.log("uuu2", response.data["USDT"]);
            setDataUSDT(response.data["USDT"])
        }, err => {
            console.log(err.message);
        })

    axios.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BNB&api_key=07831348abf84f5007f8f9b311e421cd2337babd5f655c821ec29da2999e4cf1')
        .then(response => {
            console.log("uuu1", response.data["BNB"]);
            setDataBNB(response.data["BNB"])
        }, err => {
            console.log(err.message);
        })

    const convertUSDT = (e) => {

        let totalUSD = rate * sum;
        console.log("summmm", rate)

        const mySel = document.getElementById("crypto").value;
        console.log("selll", mySel);

        if (mySel == 'USDT') {
            return setData(totalUSD * dataUSDT);
        }
        else if (mySel == 'BNB') {
            return setData(totalUSD * dataBNB);
        }
    }


    useEffect(() => {
    })

    return (
        <div>
            <form>
                <input value={sum} disabled></input>
                <select name="crypto" onChange={(e) => convertUSDT(e)} id="crypto">
                    <option id="1">Select Crypto</option>
                    <option id="2">USDT</option>
                    <option id="3">BNB</option>
                </select>

                <input value={data} disabled></input>

                <button>Send</button>
            </form>

        </div>
    )
}
export default TransferFunds;