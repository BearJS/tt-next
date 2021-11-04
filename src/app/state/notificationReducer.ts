import {createSlice, ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {uniqueId} from '../../utils';

const initialState: NotificationState = [
  {type: 'error', heading: 'hello', message: 'cool', id: '1'},
  {type: 'success', heading: 'hello', message: 'cool', id: '2'},
  {type: 'warning', heading: 'hello', message: 'cool', id: '3'},
  {type: 'info', heading: 'hello', message: 'cool', id: '4'},
];

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action): void {
      state.push({...action.payload, id: uniqueId('notification')});
    },
    removeNotification(state, action: {payload: {id: string}}): NotificationState {
      const {id} = action.payload;

      const arr = [...state];
      const index = arr.findIndex((i) => id === i.id);
      arr.splice(index, 1);

      return arr;
    },
    clearNotifications(): NotificationState {
      return initialState;
    },
  },
});

export const {addNotification, removeNotification, clearNotifications} = slice.actions;

export type AddNotification = ActionCreatorWithPayload<NotificationPayload>;
export type RemoveNotification = ActionCreatorWithPayload<{id: string}>;
export type ClearNotifications = ActionCreatorWithPayload<string>;

export default slice.reducer;
