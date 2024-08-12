import React from 'react'
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
    <div style={{display:'flex',justifyContent:'center'}}>
    <div style={{background:'black',height:'50px',width:'50px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',margin:'10px'}}><Link to='/home'><i class="fa-solid fa-house" style={{color:'white'}}></i></Link></div>
    </div>
    </>
  )
}

export default Home