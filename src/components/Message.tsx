import { Avatar } from '@material-ui/core';
import { User, selectUser } from '../features/userSlice';
import React from 'react';
import './Message.css';
import { useSelector } from 'react-redux';
import { formatTimestamp } from '../util/utils';

interface MessageContent extends User {
  timestamp: any;
  message: string;
}

interface Props {
  children?: React.ReactNode;
  id: string;
  contents: MessageContent;
}

type Ref = HTMLDivElement;

const Message = React.forwardRef<Ref, Props>(
  (
    { id, contents: { displayName, photo, email, timestamp, message, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user?.email === email && 'message__sender'}`}
      >
        <Avatar src={photo} className='message__photo' />
        <p>{message}</p>
        <small>{formatTimestamp(timestamp)}</small>
      </div>
    );
  }
);

export default Message;
