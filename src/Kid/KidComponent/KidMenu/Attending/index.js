import React,{useEffect,useState} from "react"
import Tables from "../TableComponent/index"

export default function Attending(){
    
    const [kids, setKids] = useState([]);
    const arr =[];
    useEffect(()=>{
        fetch('http://localhost:5000/kidregister')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach((item)=>{
                    if(item.status === "attending"){arr.push(item)}
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