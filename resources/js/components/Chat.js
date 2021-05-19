
import React, { useState, createRef, useEffect, useRef } from "react";

import {Welcome, Friend, FriendList, Friends, SendMessage, Logout, Chat_panel, NameUserUWriteTo, MessagesContainer, Friends_h1, Cross ,CrossContainer, NameContainer} from './style-chat.js';
import axios from 'axios';

require('./bootstrap')



const Chat = (props) => {

  const [widthOfChatPanel, setWidthOfChatPanel] = useState(195);
  const [users, setUsers] = useState([]);
  const usersRef= useRef(null);
  usersRef.current = users;
  const chat_panel = useRef(null);

  const [room, setRoomData] = useState([]);
  const on_channel = useRef([]);
  on_channel.current = room;

  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(true);
  const messageRef= useRef(null);
  messageRef.current = message;
  const [heightOfFriendList, setheightOfFriendList] = useState(null);

  const [topOfChatPanel, setTopOfChatPanel] = useState(null);
  const topOfChatPanelRef = useRef(null);
  topOfChatPanelRef.current = topOfChatPanel;


  const foldUnfold = (index)=>{
    const panel = document.getElementsByClassName("chat_panel")[index];

    if (panel.children[1].style.display == "block" || panel.children[1].style.display == ""){
      for (let i=1;i<panel.children.length;i++){
          panel.children[i].style.display = "none"
      }
    }else{
      for (let i=1;i<panel.children.length;i++){
        panel.children[i].style.display = "block"
      }
    }
    setRoomData([...on_channel.current]);
    adjustChatPanel()
    // adjustChatPanel()



  }
  const onChange = () =>{
    setMessage(messageRef.current.value)
  }
  const removeChannel = (index) =>{
    console.log(index)
    const panel = document.getElementsByClassName("chat_panel")[index];
    const documentWidth = $(document).width()
    on_channel.current.splice(index,1);
    setRoomData([...on_channel.current]);
    setWidthOfChatPanel((documentWidth-180)/(on_channel.current.length+2)>195 ? 195:(documentWidth-180)/(on_channel.current.length+2));
    // unmountComponentAtNode(panel);


  }
  const adjustWidth = async () => {  // adjust aby sa chat panel prispôsoboval poctu kolko ich je
    console.log("width of chat panel adjusted");
    $(".chat_panel").css("width", widthOfChatPanel)



  }
  const fetchMessages = async()=>{
      Echo.channel(`channel_name`)
      .listen('.chat', (e) => {
          console.log(e.message);
      });

  }
  const adjustChatPanel = ()=>{ // adjust aby ChatContainer bol vzdy na bottom:0
    console.log("ChatContainer top adjusted")
    console.log("-------------------------------------")
    for (let index=0;index<$(".chat_panel").length;index++){
      const chatpanelHeight1 = $(".chat_panel").slice(index,index+1).css("height")

      const chatpanelHeight = chatpanelHeight1.slice(0,chatpanelHeight1.length-2)
      const heightChatContainer1 = $(".friendlist").css("height");
      const heightChatContainer = heightChatContainer1.slice(0,heightChatContainer1.length-2)
      const top = heightChatContainer - chatpanelHeight
      $(".chat_panel").slice(index,index+1).css("top", top);

    }



  };

  const sendMessageHandler= async(e,to)=> {

      console.log(to)
      if(e.charCode === 13){

        await axios.post("/api/sendMessage", {"message": message, "from":props.tsid, "to":to[0]})
        messageRef.current.value = ""



      }
  }
  // --------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    adjustWidth();
    adjustFriendList();



  },);


  useEffect(() => {
    fetchMessages();
    getUsers();


  }, [])

  const adjustFriendList = () =>{ // adjust aby bol friendlist vzdy na bottom:0
    console.log("Friendlist top adjusted")
    const heightFriendList = $(".friendlist").css("height");
    const heightUser = users.length*38 // 38-vyska jedneho frienda
    const top = parseInt(heightFriendList) - (heightUser+28) //28-výška Friend_h1
    // if (on_channel.current.length <2){
    console.log(top)
    $(".users").css("top",top+"px");
    // setheightOfFriendList(top)
    // }

  }
  const getUsers = async () => {

    const url = "/api/get_users"
    const {data} = await axios.post(url, {'current_user': props.tsid});

    setUsers(data.user);

  }

  const logOut = async () => {
    const {res} = await axios.post("/api/logout", {a:"la"})

    window.location.assign("/login")
  }
  const runChat = async(username) => {
    const documentWidth = $(document).width()
    if ((documentWidth-180)/(on_channel.current.length+2)<50){
      setRoomData([...room.slice(1,on_channel.current.length), [username]])

    }else{
      setRoomData([...room, [username]])

    }
    setWidthOfChatPanel((documentWidth-180)/(on_channel.current.length+2)>195 ? 195:(documentWidth-180)/(on_channel.current.length+2));
    adjustChatPanel()
    // adjustChatPanel()
    // adjustFriendList()



    // console.log(channel_on.current)


  }


    return (

          <div>

              <Welcome >Hi {props.tsid}</Welcome>
              <Logout><button onClick={()=>logOut()}>Log out</button></Logout>

              <FriendList  className="friendlist" ><Friends className="users"  ><Friends_h1>Friends</Friends_h1> {usersRef.current.map((data,index)=><Friend  type="none" onClick={()=>runChat(data.username)} key = {index}>{data.username}</Friend>)}</Friends>

              {on_channel.current.map((data,index)=>
                // ---------------------------------------------------------------------------------------------------------------------------------------
                <Chat_panel key ={index} className = "chat_panel">

                <NameUserUWriteTo onClick = {()=>{foldUnfold(index)}}><NameContainer>{data}</NameContainer>
                <CrossContainer onClick={()=>removeChannel(index)}><Cross ></Cross></CrossContainer>
                </NameUserUWriteTo>
                <MessagesContainer></MessagesContainer>
                <SendMessage ref={messageRef} onChange = {()=>onChange()} onKeyPress={(e)=>sendMessageHandler(e,data)}></SendMessage>

                </Chat_panel>
              )}
              </FriendList>

          </div>
      );
}
export default Chat;
