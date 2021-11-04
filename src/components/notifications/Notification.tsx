import React, {FC} from 'react';
import {removeNotification} from '../../app/providers/redux/notificationReducer';
import {H4, NotificationMessage} from '../wrappers';
import FaTimes from '../Icons/FaTimes';
import {uniqueId} from '../../utils';
import {useAppDispatch} from '../../app/hooks/useRedux';

interface Props {
  notification: NotificationMessage;
  boxShadow?: boolean;
}

const Notification: FC<Props> = (props) => {
  const {
    boxShadow,
    notification: {id, heading, message, type},
  } = props;
  const dispatch = useAppDispatch();

  const remove = (): void => {
    dispatch(removeNotification({id}));
  };

  return (
    <NotificationMessage type={type} boxShadow={boxShadow}>
      {heading && <H4>{heading}</H4>}
      {Array.isArray(message) ? (
        message.map((msg, index) => <p key={uniqueId('msg_id_')}>{msg}</p>)
      ) : (
        <p>{message}</p>
      )}{' '}
      <button
        onClick={remove}
        type="button"
        title="remove notification"
        aria-label="remove notification"
      >
        <FaTimes aria-hidden="true" />
      </button>
    </NotificationMessage>
  );
};

export default Notification;
