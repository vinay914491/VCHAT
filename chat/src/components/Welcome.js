import React from 'react'
import styled from 'styled-components';
import robot from '../imgs/robot.gif';
const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src={robot} alt="robot"/>
        <h1>
            Welcome, <span></span>
        </h1>
        <h3>Please select a chat to start Messaging</h3>
    </Container>
  ) 
}
const Container=styled.div`
    display:flex;
    display-content:center;
    align-items:center;
    flex-direction:column;
    color:white;
    padding-top:50px;
    img{
        height:20rem;
        
    }
    span{
        color:#4e00ff;
    }
`;
export default Welcome;