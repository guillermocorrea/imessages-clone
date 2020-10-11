import React from 'react';
import './ChatHeader.css';

type Props = {
  chatName: string;
};

const ChatHeader: React.FC<Props> = ({ chatName }) => {
  return (
    <div className='chat__header'>
      <h4>
        To: <span className='chat__name'>{chatName}</span>
      </h4>
      <strong>Details</strong>
    </div>
  );
};

export default ChatHeader;
