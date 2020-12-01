import React,{useState,useEffect} from 'react'
import Tables from '../TableComponent/index'

export default function Registered(){
    
    const [kids, setKids] = useState([]);
    const arr = [];
    
    useEffect(()=>{
        fetch('http://localhost:5000/kidregister')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach((item)=>{
                    if(item.status === "registered"){arr.push(item)}
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