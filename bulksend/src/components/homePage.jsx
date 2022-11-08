import React, { useContext, useEffect, useState } from "react";
import Papa from 'papaparse';
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const HomePage = () => {
  const [file, setFile]=useState();
  const {userJSON, setUserJSON} = useContext(Context);
  let navigate = useNavigate(); 

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

    const convertToJson = (e) =>{
      if(e){
        e.preventDefault();
        Papa.parse(file, {
          header: true,
          complete: (results) => {
              console.log("yyy", { results })
              setUserJSON(results.data)
          },
      }) 
      let path = `/transferFunds`; 
      navigate(path); 
      }
        
    }
  
  useEffect(() => {
    convertToJson();
  })

  return (
    <>
    <form>
    <h1>Hello</h1>
    <input type="file" name="file" accept=".csv" onChange={handleChange}/>
    <button type="submit" onClick={(e) => convertToJson(e)}>Upload</button>   
    </form>      
    </>
  )
}
export default HomePage;