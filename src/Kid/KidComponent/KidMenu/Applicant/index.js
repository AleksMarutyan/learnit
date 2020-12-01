import React from 'react'
import Tables from '../TableComponent/index'
import { useEffect,useState } from 'react'

export default function Applicant (){

    const [kids, setKids] = useState([]);
    const arr=[];
    useEffect(()=>{
        fetch('http://localhost:5000/kidregister')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach((item)=>{
                    if(item.status === "applicant"){arr.push(item)}
                })
                setKids(arr);
            });
    },[])
   
    return(
       <div> 
         <Tables 
            kids={kids}
         />
       </div>  
    )

}        
