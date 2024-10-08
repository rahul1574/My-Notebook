import React from 'react'
import { Link } from 'react-router-dom';
function Options() {
  return (
    <>
    <div>
        <Link to='/todolist' className='option'style={{textDecoration:'none',color:'white'}}><div style={{height:'100px',width:'300px',textAlign:"center",display:'flex',justifyContent:'center',flexDirection:'column',background:'linear-gradient(to bottom,#9b2226,#2a9d8f)',borderRadius:'10px',margin:'5px'}}>TO-DO-LIST</div></Link>
        <Link to='/diary' className='option'style={{textDecoration:'none',color:'white'}}><div style={{height:'100px',width:'300px',textAlign:"center",display:'flex',justifyContent:'center',flexDirection:'column',background:'linear-gradient(to bottom,#414833,#023047)',borderRadius:'10px',margin:'5px'}}>MY-DIARY</div></Link>
        <Link to='/textedit' className='option'style={{textDecoration:'none',color:'white'}}><div style={{height:'100px',width:'300px',textAlign:"center",display:'flex',justifyContent:'center',flexDirection:'column',background:'linear-gradient(to bottom,#ff5400,#4a5759)',borderRadius:'10px',margin:'5px'}}>TEXT-COMFORT</div></Link>
    </div>
    </>
  )
}

export default Options