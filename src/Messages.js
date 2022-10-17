import React, {useState} from "react";
import Message from "./Message";

function Messages({ isLoggedIn, currentUser, updateMessages }){
  const [messages, setMessages]=useState([])
  const [messageContent, setMessageContent]=useState("")
  const [sendNew, setSendNew]=useState(false)
  
  function getMessages(){
    if (currentUser.messages !== undefined){
      setMessages(currentUser.messages)
    }
  }

  function onChange(e){
    const content = e.target.value

    setMessageContent(content)
  }

  function handleMessageSubmit(e){

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    const newMessage = {
      sender: currentUser.username,
      hasResponse: false,
      content: messageContent,
      response: "",
      date: dateTime
    }
    e.preventDefault()
    updateMessages(newMessage)
    setMessageContent("")
    setSendNew(false)
  }
  

  const messageModules = messages.slice(0).reverse().map(message=>{
    return <li className="moduleElement noBullet" key={message.content}><Message currentUser={currentUser} info = {message} /></li>
  })

  if (!isLoggedIn) return <p>Log in to view messages</p>
  else return(
    <div className="componentFlexContainer">
      <div className="messageButtons">
        <div>
          <button className="messageButton" onClick={getMessages}>Get messages</button>
          <button className="messageButton" onClick={()=>setSendNew(true)} >New message</button>
        </div>
        <div>
          {sendNew ? 
            <form onSubmit={handleMessageSubmit}>
              <h2>New Message</h2>
              <textarea onChange={onChange} value={messageContent} ></textarea><br/>
              <input type="submit" />
            </form> : <p></p>}
        </div>
      </div>
      
      <div >
        <h2>Messages</h2>
        <ul>{messageModules}</ul>
      </div>
    </div>
  )
}

export default Messages