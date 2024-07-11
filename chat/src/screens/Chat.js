import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { allUsersRoute,host } from '../Utils/APIRoutes';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatCont from '../components/ChatCont';
import {io} from 'socket.io-client';
const Chat = () => {
  const socket=useRef();

  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);
  const [currentUser,setCurrentUser]=useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
         setIsLoaded(true);
      }
    };
  
    fetchData(); 
  
  }, []);
  useEffect(()=>{
    if(currentUser)
      {
        socket.current=io(host)
        socket.current.emit("add-user",currentUser._id);
      }
  },[currentUser])
  
  useEffect(() => {
    const fetchData = async () => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
          try {
            const  data  = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } catch (error) {
           
            console.error("Error fetching user data:", error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };
  
    fetchData(); 
  
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <>
    <Container>
    
     <div className="container">
      <Contacts 
      contacts={contacts} 
      currentUser={currentUser} 
      changeChat={handleChatChange}
      />
      {isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser}/>
      ) : ( 

        <ChatCont currentChat={currentChat} currentUser={currentUser} socket={socket}/>
      
      )}
     </div>
    
    </Container>
    </>
  );
}

const Container=styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;
export default Chat
