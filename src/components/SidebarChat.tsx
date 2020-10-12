import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatId, setChat } from '../features/chatSlice';
import { db } from '../firebase';
import './SidebarChat.css';
import { formatTimestamp } from '../util/utils';

interface SidebarChatProps {
  id: string;
  chatName: string;
}

const SidebarChat: React.FC<SidebarChatProps> = ({ id, chatName }) => {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([] as any[]);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName,
          })
        );
      }}
      className={`sidebarChat ${chatId === id && 'active'}`}
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className='sidebarChat__info'>
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>{formatTimestamp(chatInfo[0]?.timestamp)}</small>
      </div>
    </div>
  );
};

export default SidebarChat;
