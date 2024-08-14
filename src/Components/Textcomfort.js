import React,{useState} from 'react'

function Textcomfort() {
    const textupchange=()=>{
        let newtext=text.toUpperCase()
        settext(newtext)
    }
    const textlochange=()=>{
        let newtext=text.toLowerCase()
        settext(newtext)
    }
    const changetext=(event)=>{
        settext(event.target.value)
    }
    const clearall=(newtext)=>{
        newtext=" "
        settext(newtext)
    }
    const reversetext=()=>{
        const reversed=text.split("").reverse().join("");
        settext(reversed);
    }
    const copytext=async()=>{
        try{
        await navigator.clipboard.writeText(text);
            alert('text copied to clipboard');
        }
        catch(err){
            console.error('failed to copy text:',err);
        }
    };
    const [text,settext]=useState("")
    const [back, setback] = useState('white');
const [texts, settexts] = useState('black');

const color = () => {
    setback(back === 'white' ? 'black' : 'white');
    settexts(texts === 'black' ? 'white' : 'black');
};
  return (
    <div style={{background:back}}>
      <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <h2 style={{margin:'5px',color:texts}}>Put your text below</h2>
              <button onClick={color} style={{ margin: '10px', height: '30px' }}>☀︎</button>
            </div>
            <textarea placeholder="Enter text here..." value={text} onChange={changetext} style={{margin:'5px'}}></textarea>
        </div>
        <div >
        <button   style={{ background:'blue',margin:'2px',border:'none',borderRadius:'5px',height:'30px',color:'white'}}onClick={textupchange}>change to upper case</button>
        <button  style={{ background:'blue',margin:'2px',border:'none',borderRadius:'5px',height:'30px',color:'white'}} onClick={textlochange}>change to lower case</button>
        <button style={{ background:'blue',margin:'2px',border:'none',borderRadius:'5px',height:'30px',color:'white'}} onClick={clearall}>clear text</button>
        <button style={{ background:'blue',margin:'2px',border:'none',borderRadius:'5px',height:'30px',color:'white'}} onClick={reversetext}>Reverse text</button>
        <button  style={{ background:'blue',margin:'2px',border:'none',borderRadius:'5px',height:'30px',color:'white'}}onClick={copytext}>copy text</button>
        </div>
        <h2 style={{margin:'5px',color:texts}} >Your text summary</h2>
        <p style={{margin:'5px',color:texts}}>Above text consists of {text.split(" ").length} words and {text.length} characters</p>
        <p style={{margin:'5px',color:texts}}>You can read this in {0.08*text.split(" ").length} minutes</p>
        <h2 style={{margin:'5px',color:texts}}>Preview</h2>
        <p style={{margin:'5px',color:texts}}>{text}</p>
    </div>
  )
}

export default Textcomfort