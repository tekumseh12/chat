import styled, {css}  from 'styled-components'

export const Friend = styled.li`
  padding:0px 10px 10px 10px;
  box-sizing:border-box;
  border:1px solid rgb(210,210,210);
  line-height:15px;
  color:blue;
  position:relative;
  height:38px;
  overflow:hidden;
  `;
export const Welcome = styled.h1`
  color:red;
  font-size:15px;
`
export const FriendList =styled.div `
  position:absolute;
  right:0;
  bottom:0;
  width:100%;
  box-sizing: border-box;



  `;
export const Friends = styled.div `
  background-color: rgb(250,250,250);
  color:red;
  position:relative;
  bottom:0;
  float:right;

  width:180px;

  `;
export const Logout = styled.div`
  position:fixed;
  top:0;
  right:0;
  padding:10px;
  background-color:rgb(100,100,100)

  `;
export const Chat_panel = styled.div`
  box-sizing:border-box;
  background-color: white;
  border:1px solid black;
  position:relative;
  float:right;
  width:0px;
  display:none;
  min-width:50px;



`
export const NameUserUWriteTo = styled.h1 `
  margin:0px;
  font-size:20px;
  height:29px;
  border-style:none none solid none;
  border-color:black;
  border-width:1px;


`
export const NameContainer = styled.div`
  max-width:80%;

  overflow:hidden;
  max-height:27px;
  float:left;

`
export const MessagesContainer = styled.div `
  height:234px;
  overflow:scroll;

  `

export const SendMessage = styled.input`
  margin:0px;
  box-sizing:border-box;
  width:100%;

  `;

export const Friends_h1 = styled.div`
  padding:5px;

`

export const Cross = styled.div`
  &{
    position:relative;
    top:14px;
    width:17px;
    height:1px;
    background:black;
    padding:0;
    margin:0;
    transform:rotate(45deg)
  }
  &:after {
    content:"";
    width:17px;
    position:absolute;
    height:1px;
    background:black;
    padding:0;
    margin:0;
    transform:rotate(90deg)
  }
`;
export const CrossContainer = styled.div `
  float:right;
  height:29px;
`
