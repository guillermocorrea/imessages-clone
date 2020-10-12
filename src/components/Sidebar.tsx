import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { RateReviewOutlined } from '@material-ui/icons';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { selectChatFilter, setFilter } from '../features/chatSlice';

interface Chat {
  id: string;
  data: { chatName: string };
}

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([] as Chat[]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector(selectChatFilter);

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as any,
      }));

      setChats(docs);
    });
    return () => unsubscribe();
  }, []);

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');
    if (chatName) {
      db.collection('chats').add({
        chatName: chatName,
      });
    }
  };

  const handleSearch = (e: any) => {
    setInput(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  const filteredChats = filter
    ? chats.filter((chat) =>
        chat.data.chatName.toLowerCase().includes(filter.toLowerCase())
      )
    : chats;

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar
          onClick={() => auth.signOut()}
          src={user!.photo}
          className='sidebar__avatar'
        />
        <div className='sidebar__input'>
          <SearchIcon />
          <input
            value={input}
            onChange={handleSearch}
            type='search'
            placeholder='Search...'
          />
        </div>

        <IconButton onClick={addChat} className='sidebar__inputButton'>
          <RateReviewOutlined />
        </IconButton>
      </div>
      <div className='sidebar__chats'>
        {filteredChats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
