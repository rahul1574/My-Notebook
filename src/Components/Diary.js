import React,{useState,useEffect} from 'react'

function Diary() {
   // State to hold the items with unique identifiers and associated images
   const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
});

// State to hold the user's input value
const [inputValue, setInputValue] = useState('');

// State to hold background and text color
const [back, setback] = useState('white');
const [text, settext] = useState('black');

const color = () => {
    setback(back === 'white' ? 'black' : 'white');
    settext(text === 'black' ? 'white' : 'black');
};

// Date and time state
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

    return () => clearInterval(intervalId);
}, []);

// Formatted today's date state
const [selectedDate, setSelectedDate] = useState('');

  // Load the date from local storage when the component mounts
  // useEffect(() => {
  //   const storedDate = localStorage.getItem('selectedDate');
  //   if (storedDate) {
  //     setSelectedDate(storedDate);
  //   }
  // }, []);

  // Save the date to local storage whenever it changes
  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };




// Add a new item to the list and local storage
const addItem = () => {
    if (inputValue.trim() === '') return;

    const newItem = {
        id: Date.now(),
        value: inputValue,
        date:selectedDate||dateTime.date,
        image: null // Initialize with no image
    };

    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setInputValue('');
};

// Delete a specific item from the list and local storage
const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
};

// Handle image upload for a specific item
const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageData = reader.result;

            const updatedItems = items.map(item => 
                item.id === id ? { ...item, image: imageData } : item
            );

            setItems(updatedItems);
            localStorage.setItem('items', JSON.stringify(updatedItems));
        };
        reader.readAsDataURL(file);
    }
};

// Handle image removal for a specific item
const handleImageRemove = (id) => {
    const updatedItems = items.map(item => 
        item.id === id ? { ...item, image: null } : item
    );

    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
};
const [fileInputVisibility, setFileInputVisibility] = useState({});
const toggleFileInput = (id) => {
  setFileInputVisibility(prev => ({
      ...prev,
      [id]: !prev[id]
  }));
};

return (
    <>
        <div style={{ background: back, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', width: '340px', borderRadius: '10px', transition: '3s ease-out' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '330px' }}>
                <h2 style={{ margin: '5px', color: text, height: '80px', display: 'flex', alignItems: 'center', transition: '3s ease-out' }}>MY-DIARY</h2>
                <div>
                    <p style={{ color: text, fontSize: '15px', transition: '3s ease-out' }}>{dateTime.date}</p>
                    <p style={{ color: text, fontSize: '15px', transition: '3s ease-out' }}>{dateTime.time}</p>
                    <button onClick={color} style={{ margin: '10px', height: '30px' }}>☀︎</button>
                </div>
            </div>
            <input
              type="datetime-local"
              id="dateInput"
              placeholder="Enter today's date..."
              value={selectedDate}
              onChange={handleDateChange}
            />
            <div style={{ margin: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {selectedDate?(
                  <textarea
                  type='text'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What about today...."
                  style={{ margin: '10px', height: '30px', textAlign: 'center' }}
                 />
                ):(
                  // <p style={{color:text,transition: '3s ease-out'}}>Enter today's date</p>
                  <span></span>
                )}
            </div>
            <button onClick={addItem} style={{ margin: '10px', height: '30px', background: 'green' }}>
                    <i className="fa-solid fa-upload" style={{ color: text, transition: '3s ease-out' }}></i>
                </button>
            <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '300px', flexWrap: 'wrap' }}>
                    {items.map((item) => (
                        <div key={item.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '5px', overflowWrap: 'anywhere', color: text, background: '#2a9d8f', borderRadius: '10px' }}>
                           <p style={{ color: text, fontSize: '15px', margin: '5px', transition: '3s ease-out' }}>{item.date} </p>
                            <div style={{ margin: '5px', transition: '3s ease-out', fontFamily: 'cursive' }}>{item.value}</div>
                            <div style={{ margin: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {item.image ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={item.image} alt="unable-to-upload" style={{ width: '100%', height: '100%', objectFit: 'cover', marginTop: '10px' }} />
                                        <button 
                                            onClick={() => handleImageRemove(item.id)} 
                                            style={{ marginTop: '10px', background: 'red', color: text,transition: '3s ease-out', borderRadius: '5px', padding: '5px 10px' }}>
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <hr></hr>
                                )}
                            </div>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                            {fileInputVisibility[item.id] ? (
                             <input
                            type="file"
                            onChange={(event) => handleImageUpload(event, item.id)}
                            disabled={item.image!=null}
                              />
                              ) : (
                              <button
                              onClick={() => toggleFileInput(item.id)}
                              style={{ height: '30px', width: '40px',background: 'green', color:text,transition: '3s ease-out',  borderRadius: '10px',  margin: '5px' }}>
                              <i class="fa-solid fa-file-import"></i>
                             </button>
                              )}
                              <button onClick={() => deleteItem(item.id)} style={{ height: '29px', width: '40px', margin: '5px', background: 'red', borderRadius: '10px',color:text,transition: '3s ease-out' }}><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);
}

export default Diary
