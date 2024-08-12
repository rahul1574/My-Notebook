import React from 'react'
import { Link } from 'react-router-dom';
function Options() {
  return (
    <>
    <div>
        <Link to='/todolist' className='option'style={{textDecoration:'none',color:'white'}}><div style={{height:'100px',width:'300px',textAlign:"center",display:'flex',justifyContent:'center',flexDirection:'column',background:'linear-gradient(to bottom,#9b2226,#2a9d8f)',borderRadius:'10px',margin:'5px'}}>TO-DO-LIST</div></Link>
        <Link to='/diary' className='option'style={{textDecoration:'none',color:'white'}}><div style={{height:'100px',width:'300px',textAlign:"center",display:'flex',justifyContent:'center',flexDirection:'column',background:'linear-gradient(to bottom,#219ebc,#023047)',borderRadius:'10px',margin:'5px'}}>MY-DIARY</div></Link>
    </div>
    </>
  )
}

export default Options