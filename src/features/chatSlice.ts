import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ChatState {
  chatId: string | null;
  chatName: string | null;
  filter?: string;
}

const storageKey = 'imessages-active-chat';
const storageState = JSON.parse(localStorage.getItem(storageKey) || '{}');

const initialState: ChatState = {
  chatId: storageState.chatId,
  chatName: storageState.chatName,
  filter: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatState>) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setChat, setFilter } = chatSlice.actions;

export const selectChatName = (state: RootState) => state.chat.chatName;
export const selectChatId = (state: RootState) => state.chat.chatId;
export const selectChatFilter = (state: RootState) => state.chat.filter;

export default chatSlice.reducer;
