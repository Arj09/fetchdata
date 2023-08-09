import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Home.css'




export const Home = ()=>{

    const  [user, setUser] = useState([]);
    const [userId, setUserID] = useState()
    const [allData, setAllData] = useState()
    const [Booking, setBooking] = useState({})
    const [handleform, setHandleform] = useState(true)
   
    
   
    const [show, setShow] = useState(true)


   
   

    useEffect(()=>{
        axios.get('https://api.tvmaze.com/search/shows?q=1').then((res)=>{
            setUser(res.data);
            console.log(res.data)
            
        }).catch((err)=>{
            console.log(err.response.data.message)
            
           
        })
        

    },[])

    const handleID = (id)=>{
        setUserID(id)
        setShow(false)
        setHandleform(true)
          
        
    }


    
    
    const handleBack =()=>{
        setShow(true)
    }
    const handleBooking =()=>{
        handleform ? setHandleform(false) : setHandleform(true) 
    }
    const handleData = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setBooking(Booking=>({...Booking, [name]:value}))


    }
    const handleUser = (e)=>{
        e.preventDefault()
        console.log(Booking)
        localStorage.setItem("Booking", JSON.stringify(Booking))
        alert("Ticket has booked ")
        setBooking({movie:'', name:'', phone:'', email:'', time:'', date:''})
        
        setShow(true)
       
    }
   

   

    
    return(
        <>
        {
            show ? (
                <>
                <div className='title'> Movie </div>
                <hr className='centerline'/>
                <div className='container'>
                {
                    user.map((user, index)=>{
                        return(
                            <ul className='items' key={index}>
                                <li className=' item-image ' onClick={()=>handleID(index)}><img src={user.show.image.medium} alt='loading' /></li>
                                <li className='item-name' >{user.show.name}</li>
                                
                            </ul>
                        )
                    })
                    
                    
                }
          
                </div>
                
                <hr className='centerline'/>
                </>

            ):(
                <>
               
                <div className={handleform ? 'container1': 'hidden' }>
                <div className='title'> Movie detail </div>
                <hr className='centerline'/>
                
                <div style={{width:'80%', margin:'10px auto'}}  >Summary : {user[userId].show.summary}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie name : ${user[userId].show.name}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >Movie officialSite : <a href={user[userId].show.officialSite} >{user[userId].show.officialSite}</a></div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie language : ${user[userId].show.language}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie type : ${user[userId].show.type}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie rating : ${user[userId].show.rating.average}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie status : ${user[userId].show.status}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie time : ${user[userId].show.schedule.time}`}</div>
                <div style={{width:'80%', margin:'10px auto'}}  >{`Movie day : ${user[userId].show.schedule.days}`}</div>
                <div className='action' style={{width:'80%', margin:'10px auto'}} >
                <button className='handlebtn'  onClick={handleBack}>Back</button>
                <button className='handlebtn'  onClick={handleBooking}>Book Ticket</button>
                </div>
                

                <hr className='centerline' />
                </div>


                <div className={ handleform ? 'hidden' : 'container1'}>
                <div className='title'> Ticket Booking </div>
               


                <hr className='centerline'/>
                <form  className='container12'  onSubmit={handleUser}>
                    
                    <input  placeholder="Movie name" name="name" value={user[userId].show.name}  required/>        
                    <input  placeholder="Akash" name="name" value={Booking.name} onChange={handleData} required/>
                    <input  placeholder="Akash@gamil.com" name="email" value={Booking.email} onChange={handleData} required/>
                    <input  placeholder="935642155" name="phone" value={Booking.phone} onChange={handleData} required/>
                    <input type='date' placeholder="10/01/2002" name="date" value={Booking.date} onChange={handleData} required/>
                    <input type='time' placeholder="12:00" name="time" value={Booking.time} onChange={handleData} required/>
                    <button className='handlebtn1'>Ticket Booking</button>
                    <button className='handlebtn1' onClick={handleBack}>Back</button>

                    
                    
                </form>
                <hr className='centerline'/>
                    
                </div>


               
                
               
                </>
            )
        }
        
        

        
        
       
      
        </>
    )
}