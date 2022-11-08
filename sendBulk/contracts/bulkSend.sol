// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract bonusSendBulk {
    
    // to save the owner of the contract in construction
    address private owner;
    
    // to save the amount of ethers in the smart-contract
    uint total_value;
    
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    
    // modifier to check if the caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner
     */
    constructor() payable{
        owner = msg.sender; 
        emit OwnerSet(address(0), owner);
        
        total_value = 0; 
    }
    
 
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner; 
    }
  
    function getOwner() external view returns (address) {
        return owner;
    }
    
      
    // sum adds the different elements of the array and return its sum
    function sum(uint[] memory amounts) private returns (uint) {
        // the value of message should be exact of total amounts
        uint totalAmnt = 0;
        
        for (uint i=0; i < amounts.length; i++) {
            totalAmnt += amounts[i];
        }
        
        return totalAmnt;
    }
    
    function withdraw(address payable receiverAddr, uint receiverAmnt) private {
        receiverAddr.transfer(receiverAmnt);
    }
    
    function bulkSend(address payable[] calldata addrs, uint[] amnts, uint totalamount) payable public isOwner {
        
        
        total_value += totalamount;
        
        // the addresses and amounts should be same in length
        require(addrs.length == amnts.length, "The length of two array should be the same");
        
        // the value of the message in addition to sotred value should be more than total amounts
        uint totalAmnt = sum(amnts);
        
        require(total_value >= totalAmnt, "The value is not sufficient or exceed");
        
        
        for (uint i=0; i < addrs.length; i++) {
            // first subtract the transferring amount from the total_value
            // of the smart-contract then send it to the receiver
            total_value -= amnts[i];
            
            // send the specified amount to the recipient
            withdraw(addrs[i], amnts[i]);
        }
    }
    
}