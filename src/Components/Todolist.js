import React,{useState,useEffect} from 'react'

function Todolist() {
            // State to hold the items with unique identifiers
            const [items, setItems] = useState(() => {
                // Retrieve items from local storage or initialize as empty array
                const savedItems = localStorage.getItem('items');
                return savedItems ? JSON.parse(savedItems) : [];
            });
        
            // State to hold the user's input value
            const [inputValue, setInputValue] = useState('');
        
            // State to hold the ticked status of each item
            const [tickedItems, setTickedItems] = useState(() => {
                // Retrieve ticked status from local storage or initialize as empty object
                const savedTicked = localStorage.getItem('tickedItems');
                return savedTicked ? JSON.parse(savedTicked) : {};
            });
        
            // Add a new item to the list and local storage
            const addItem = () => {
                if (inputValue.trim() === '') return; // Avoid adding empty items
        
                const newItem = {
                    id: Date.now(), // Use timestamp as a unique ID
                    value: inputValue
                };
        
                const updatedItems = [...items, newItem];
                setItems(updatedItems);
                localStorage.setItem('items', JSON.stringify(updatedItems));
                setInputValue(''); // Clear the input after adding the item
            };
        
            // Delete a specific item from the list and local storage
            const deleteItem = (id) => {
                const updatedItems = items.filter(item => item.id !== id);
                setItems(updatedItems);
                localStorage.setItem('items', JSON.stringify(updatedItems));
                
                // Remove the ticked status if the item is deleted
                const newTickedItems = { ...tickedItems };
                delete newTickedItems[id];
                setTickedItems(newTickedItems);
                localStorage.setItem('tickedItems', JSON.stringify(newTickedItems));
            };
            const [back,setback]=useState('white')
            const color=()=>{
                setback(back==='white'?'black':'white')
                settext(text==='black'?'white':'black')
            }
            const [text,settext]=useState('black')
        
            // Set the tick status of an item to true permanently
            const setTick = (id) => {
                if (!tickedItems[id]) {
                    const newTickedItems = { ...tickedItems, [id]: true };
                    setTickedItems(newTickedItems);
                    localStorage.setItem('tickedItems', JSON.stringify(newTickedItems));
                }
            };
        
            const [dateTime, setDateTime] = useState({
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
              });
            
              useEffect(() => {
                const intervalId = setInterval(() => {
                  setDateTime({
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                  });
                }, 1000);
            
                // Cleanup the interval on component unmount
                return () => clearInterval(intervalId);
              }, []);
        return (
            <div style={{ background:back, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',alignItems:'center',flexWrap:'wrap',transition:' 2s ease-in',width:'340px',borderRadius:'10px'}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'330px'}}>
                 <h2 style={{ margin: '5px',color:text,height:'80px',display:'flex',alignItems:'center'}}>TO-DO-LIST</h2>
                   <div>
                     <p style={{color:text,fontSize:'15px',transition:' 2s ease-in'}}>{dateTime.date}</p>
                     <p style={{color:text,fontSize:'15px',transition:' 2s ease-in'}}>{dateTime.time}</p>
                   </div>
                </div>
                {/* Input to enter new items */}
                <div style={{ margin: '10px', display: 'flex', flexDirection: 'row',justifyContent:'space-evenly' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter your task...."
                        style={{ margin:'10px',height:'30px',textAlign:'center'}}
                    />
                    <button onClick={addItem} style={{ margin:'10px',height:'30px',background:'green'}}>➕</button>
                    <button onClick={color} style={{ margin:'10px',height:'30px' }}>☀︎</button>
                </div>
    
                {/* Display items */}
                <div style={{width:'300px'}}>
                    <div style={{display:'flex',flexDirection:'column',width:'300px',flexWrap:'wrap'}}>
                        {items.map((item) => (
                            <div key={item.id} style={{display:'flex',width:'300px',flexDirection:'row',justifyContent:'space-between',margin:'5px',overflowWrap:'anywhere',color:text,transition:' 2s ease-in'}}>
                                <div style={{margin:'5px',transition:' 3s ease-out',fontFamily:'cursive'}}>{item.value}</div>
                                <div>
                                <button onClick={() => setTick(item.id)} style={{height:'30px'}}>
                                {tickedItems[item.id] ? '✔️' : '⬜'}
                                </button>
                                <button onClick={() => deleteItem(item.id)} style={{height:'30px'}}>🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
        );
    }
export default Todolist
