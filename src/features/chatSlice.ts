import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ChatState {
  chatId: string | null;
  chatName: string | null;
}

const initialState: ChatState = {
  chatId: null,
  chatName: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatState>) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
    },
  },
});

export const { setChat } = chatSlice.actions;

export const selectChatName = (state: RootState) => state.chat.chatName;
export const selectChatId = (state: RootState) => state.chat.chatId;

export default chatSlice.reducer;
