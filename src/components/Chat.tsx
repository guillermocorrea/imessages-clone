import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../features/chatSlice';
import { db } from '../firebase';
import './Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import firebase from 'firebase';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';

type Message = {
  id: string;
  data: any;
};

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([] as Message[]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();

    db.collection('chats')
      .doc(chatId!)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        ...user,
      });

    setInput('');
  };
  return (
    <div className='chat'>
      <ChatHeader chatName={chatName!} />

      <div className='chat__messages'>
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} id={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      {chatId && (
        <div className='chat__input'>
          <form onSubmit={sendMessage}>
            <input
              placeholder='iMessage'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button>Send Message</button>
          </form>

          <IconButton>
            <MicNoneIcon className='chat__mic' />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Chat;
