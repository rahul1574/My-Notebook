import React,{useState,useEffect} from 'react'

function Diary() {
                // State to hold the items with unique identifiers
                const [items, setItems] = useState(() => {
                    // Retrieve items from local storage or initialize as empty array
                    const savedItem = localStorage.getItem('item');
                    return savedItem ? JSON.parse(savedItem) : [];
                });
            
                // State to hold the user's input value
                const [inputValue, setInputValue] = useState('');
            
                // State to hold the ticked status of each item
                // const [tickedItems, setTickedItems] = useState(() => {
                //     // Retrieve ticked status from local storage or initialize as empty object
                //     const savedTicked = localStorage.getItem('tickedItems');
                //     return savedTicked ? JSON.parse(savedTicked) : {};
                // });
            
                // Add a new item to the list and local storage
                const addItem = () => {
                    if (inputValue.trim() === '') return; // Avoid adding empty items
            
                    const newItem = {
                        id: Date.now(), // Use timestamp as a unique ID
                        value: inputValue
                    };
            
                    const updatedItem = [newItem, ...items]; 
                    setItems(updatedItem);
                    localStorage.setItem('item', JSON.stringify(updatedItem));
                    setInputValue(''); // Clear the input after adding the item
                };
            
                // Delete a specific item from the list and local storage
                const deleteItem = (id) => {
                    const updatedItem = items.filter(item => item.id !== id);
                    setItems(updatedItem);
                    localStorage.setItem('item', JSON.stringify(updatedItem));
                    
                    // Remove the ticked status if the item is deleted
                    // const newTickedItems = { ...tickedItems };
                    // delete newTickedItems[id];
                    // setTickedItems(newTickedItems);
                    // localStorage.setItem('tickedItems', JSON.stringify(newTickedItems));
                };
                const [back,setback]=useState('white')
                const color=()=>{
                    setback(back==='white'?'black':'white')
                    settext(text==='black'?'white':'black')
                }
                const [text,settext]=useState('black')
            
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
                
                const [todayDate, setTodayDate] = useState('');

                useEffect(() => {
                    // Get today's date when the component mounts
                const date = new Date();
                
                    // Options for formatting the date as "Month Day, Year"
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                
                    // Format the date according to the options
                const formattedDate = date.toLocaleDateString('en-US', options);
                
                    // Set the formatted date to the state
                    setTodayDate(formattedDate);
                  }, []); // Empty dependency array ensures this runs only on mount
                //   const [preview, setPreview] = useState(null);

                //   // Load the image from local storage when the component mounts
                //   useEffect(() => {
                //       const savedImage = localStorage.getItem('uploadedImage');
                //       if (savedImage) {
                //           setPreview(savedImage);
                //       }
                //   }, []);
              
                //   // Handle image upload
                //   const handleImageChange = (e) => {
                //       const file = e.target.files[0];
                //       if (file && !preview) {  // Only allow upload if there is no existing preview
                //           const reader = new FileReader();
                //           reader.onloadend = () => {
                //               setPreview(reader.result);
                //               localStorage.setItem('uploadedImage', reader.result); // Store the image in local storage
                //           };
                //           reader.readAsDataURL(file);
                //       }
                //   };
              
                //   // Handle image removal
                //   const handleRemoveImage = () => {
                //       localStorage.removeItem('uploadedImage'); // Remove from local storage
                //       setPreview(null); // Remove preview
                //   };

            return (
            <>
                <div style={{ background:back, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',alignItems:'center',flexWrap:'wrap',width:'340px',borderRadius:'10px',transition:' 3s ease-out'}}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'330px'}}>
                     <h2 style={{ margin: '5px',color:text,height:'80px',display:'flex',alignItems:'center',transition:' 3s ease-out'}}>MY-DIARY</h2>
                       <div>
                         <p style={{color:text,fontSize:'15px',transition:' 3s ease-out'}}>{dateTime.date}</p>
                         <p style={{color:text,fontSize:'15px',transition:' 3s ease-out'}}>{dateTime.time}</p>
                         <button onClick={color} style={{ margin:'10px',height:'30px' }}>☀︎</button>
                       </div>
                    </div>
                    {/* <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      disabled={!!preview}  // Disable the input if an image is already uploaded
                      /> */}
                    {/* Input to enter new items */}
                    <div style={{ margin: '10px', display: 'flex', flexDirection: 'row',justifyContent:'space-evenly' }}>
                        <textarea
                            type='text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="What about today...."
                            style={{ margin:'10px',height:'30px',textAlign:'center'}}
                        />
                        <button onClick={addItem} style={{ margin:'10px',height:'30px',background:'green'}}><i class="fa-solid fa-upload" style={{color:text,transition:' 3s ease-out'}}></i></button>
                    </div>
                    {/* Display items */}
                    <div style={{width:'300px'}}>
                        <div style={{display:'flex',flexDirection:'column',width:'300px',flexWrap:'wrap'}}>
                            {items.map((item) => (
                                <div key={item.id} style={{display:'flex',width:'300px',flexDirection:'column',justifyContent:'space-between',margin:'5px',overflowWrap:'anywhere',color:text,background:'#2a9d8f',borderRadius:'10px'}}>
                                    <p style={{color:text,fontSize:'15px',margin:'5px',transition:' 3s ease-out',fontFamily:""}}>{todayDate}</p>
                                    <div style={{margin:'5px',transition:' 3s ease-out',fontFamily:'cursive'}}>{item.value}</div>
                                    <div>
                                    <button onClick={() => deleteItem(item.id)} style={{height:'30px',width:'40px',margin:'5px',background:'red',borderRadius:'10px'}}>🗑️</button>
                                    {/* <button onClick={handleRemoveImage}>Remove Image</button> */}
                                    </div>
                                    {/* {preview && (
                                    <div>
                                     <img src={preview} alt="Preview" style={{ width: '300px', height: 'auto' }} />
                                     <button onClick={handleRemoveImage}>Remove Image</button>
                                   </div>
                                   )} */}
                                  </div>
                            ))}
                        </div>
                    </div>
              </div>
            </>

            );
}

export default Diary