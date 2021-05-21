
import React, { useState, createRef, useEffect, useRef } from "react";

import {Welcome, Friend, FriendList, Friends, SendMessage, Logout, Chat_panel, NameUserUWriteTo, MessagesContainer, Friends_h1, Cross ,CrossContainer, NameContainer} from './style-chat.js';
import axios from 'axios';

require('./bootstrap')



const Chat = (props) => {
  const [allmessages, setAllMessages] = useState({})
  const allmessRef = useRef(null);
  allmessRef.current = allmessages
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

  const [heightOfFriendList, setheightOfFriendList] = useState(null);

  const [topOfChatPanel, setTopOfChatPanel] = useState([]);
  const topOfChatPanelRef = useRef(null);
  topOfChatPanelRef.current = topOfChatPanel;


//-------------------------------------------------messages controller----------------------------------------------------
  const onChange = () =>{

    setMessage(messageRef.current.value)
  }
  const sendMessageHandler= async(e,to)=> {

      if(e.charCode === 13){
        messageRef.current.value = "";
        await axios.post("/api/sendMessage", {"message": message, "from":props.tsid, "to":to[0]});


      }
  }
  const fetchMessages = async()=>{
      Echo.channel(`channel_name`)
      .listen('.chat', (e) => {
        console.log(e)
          if (e.message.from_user != props.tsid){

            const index = on_channel.current.findIndex((data)=>data == e.message.from_user);

            const messagecontainer = document.getElementsByClassName("chat_panel")[index].children[1];
            const div = document.createElement("div");
            div.innerHTML = e.message.from_user +" "+ e.message.message;
            messagecontainer.appendChild(div);
          }else{
            const index = on_channel.current.findIndex((data)=>data == e.message.to_user);

            const messagecontainer = document.getElementsByClassName("chat_panel")[index].children[1];
            const div = document.createElement("div");
            div.innerHTML = e.message.from_user +" "+ e.message.message;
            messagecontainer.appendChild(div);
          }
        }
      );

  }

  const retrieveMessages =async()=>{

    const url = "/api/retrieveMessages"
    const user = {}
    for (let i = 0;i<users.length;i++){
      user[ users[i].username ] = [];
      const {data} = await axios.post(url, {'current_user': props.tsid, "target_user": users[i]});
      user[ users[i].username ].push(data)
    }
    console.log("bb")

    setAllMessages(user);
    console.log(Object.keys(allmessRef.current).length, users.length)

  }
  const showMessages = (index)=>{
    if (room.length != 0 ) {
      console.log(room[index][0]);
      const messagecontainer = document.getElementsByClassName("chat_panel")[index].children[1];


      for (let i=0;i<allmessages[room[index][0]][0].messages.length;i++){

        const div = document.createElement("div");
        div.innerHTML = allmessages[room[index][0]][0].messages[i].from_user +" "+ allmessages[room[index][0]][0].messages[i].message;
        messagecontainer.appendChild(div);

      }
    }

  }

  //---------------------------------------------events with chat panel--------------------------------------------------------------
  const removeChannel = (index) =>{
    console.log(index)
    const panel = document.getElementsByClassName("chat_panel")[index];
    const documentWidth = $(document).width()
    on_channel.current.splice(index,1);
    setRoomData([...on_channel.current]);
    setWidthOfChatPanel((documentWidth-180)/(on_channel.current.length+2)>195 ? 195:(documentWidth-180)/(on_channel.current.length+2));
    // unmountComponentAtNode(panel);


  }
  const foldUnfold = (index)=>{
    const panel = document.getElementsByClassName("chat_panel")[index];
    console.log(777)
    if (panel.children[1].style.display == "block" || panel.children[1].style.display == ""){
      for (let i=1;i<panel.children.length;i++){
          panel.children[i].style.display = "none"
      }
    }else{
      for (let i=1;i<panel.children.length;i++){
        panel.children[i].style.display = "block"
        showMessages(index);
      }
    }
    setRoomData([...on_channel.current]);
    adjustChatPanel()
    // adjustChatPanel()

  }
  const runChat = async(username) => {          // creating chatpanel
    const documentWidth = $(document).width()
    if ((documentWidth-180)/(on_channel.current.length+2)<50){
      setRoomData([...room.slice(1,on_channel.current.length), [username]])


    }else{

      setRoomData([...room, [username]])
      console.log(on_channel.current)


    }
    setWidthOfChatPanel((documentWidth-180)/(on_channel.current.length+2)>195 ? 195:(documentWidth-180)/(on_channel.current.length+2));
    setTopOfChatPanel([...room, [username]])



    // adjustFriendList()



    // console.log(channel_on.current)


  }

  //---------------------------------------------------adjusting--------------------------------------------------------
  const adjustWidth = async () => {
    // adjust aby sa chat panel prispôsoboval poctu kolko ich je
    console.log(allmessages)
    console.log("width of chat panel adjusted");
    $(".chat_panel").css("width", widthOfChatPanel)



    // adjust width of NameContainer to CrossContainer to have sufficient place
    for (let index=0;index<room.length;index++){
      console.log(0.2 * widthOfChatPanel < 17)
      if (0.2 * widthOfChatPanel < 17){

        $(".namecontainer").slice(index,index+1).css("max-width", 31+"px");
      }else{
        $(".namecontainer").slice(index,index+1).css("max-width", 80+"%");
      }
    }
  }

  const adjustChatPanel = ()=>{ // adjust aby ChatContainer bol vzdy na bottom:0
    console.log("ChatContainer top adjusted")
    console.log("-------------------------------------")
    $(".chat_panel").css("display","block");

    for (let index=0;index<$(".chat_panel").length;index++){

      const chatpanelHeight1 = $(".chat_panel").slice(index,index+1).css("height")

      const chatpanelHeight = chatpanelHeight1.slice(0,chatpanelHeight1.length-2)
      const heightChatContainer1 = $(".friendlist").css("height");
      const heightChatContainer = heightChatContainer1.slice(0,heightChatContainer1.length-2)
      const top = heightChatContainer - chatpanelHeight
      $(".chat_panel").slice(index,index+1).css("top", top);

    }

  };
  const adjustFriendList = () =>{ // adjust aby bol friendlist vzdy na bottom:0
    console.log("Friendlist top adjusted")
    const heightFriendList = $(".friendlist").css("height");
    console.log(users)
    const heightUser = users.length*38 // 38-vyska jedneho frienda
    const top = parseInt(heightFriendList) - (heightUser+28) //28-výška Friend_h1

    console.log(top)
    $(".users").css("top",top+"px");

  }

  // -----------------------------------------------------useEffects---------------------------------------------------------------
  useEffect(() => {
    adjustWidth();
    adjustFriendList();
  },);
  useEffect(() => {
    fetchMessages();
    retrieveUsers();



  }, [])
  useEffect(() => {
    retrieveMessages();
  },[users]);
  useEffect(() => {
    adjustChatPanel();
  },[topOfChatPanel])

  useEffect(()=> {
    showMessages(room.length-1);
  },[room]);

  const retrieveUsers = async () => {
    const url = "/api/retrieve_users"
    const {data} = await axios.post(url, {'current_user': props.tsid});

    setUsers(data.user);
  }

  const logOutUser = async () => {
    const {res} = await axios.post("/api/logout", {a:"la"})

    window.location.assign("/login")
  }


    if (Object.keys(allmessRef.current).length == users.length && Object.keys(allmessRef.current).length > 1){
      return (

            <div>

                <Welcome >Hi {props.tsid}</Welcome>
                <Logout><button onClick={()=>logOutUser()}>Log out</button></Logout>

                <FriendList  className="friendlist" ><Friends className="users"  ><Friends_h1>Friends</Friends_h1> {usersRef.current.map((data,index)=><Friend  type="none" onClick={()=>runChat(data.username)} key = {index}>{data.username}</Friend>)}</Friends>

                {on_channel.current.map((data,index)=>
                  // ---------------------------------------------------------------------------------------------------------------------------------------
                  <Chat_panel key ={index} className = "chat_panel">

                    <NameUserUWriteTo >
                      <NameContainer className="namecontainer" onClick = {()=>{foldUnfold(index)}}>{data}</NameContainer>
                      <CrossContainer onClick={()=>removeChannel(index)}><Cross ></Cross></CrossContainer> </NameUserUWriteTo>

                    <MessagesContainer></MessagesContainer>
                    <SendMessage ref={messageRef} onKeyPress={(e)=>sendMessageHandler(e,data)} onChange = {()=>onChange()}></SendMessage>

                  </Chat_panel>
                )}
                </FriendList>

            </div>
        );
    }else{
      return (
        <div></div>
      )
    }
}

export default Chat;
