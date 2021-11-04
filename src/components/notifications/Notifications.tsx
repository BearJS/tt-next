import React, {FC} from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import {useAppSelector} from '../../app/hooks/useRedux';

const Container = styled.section`
  position: fixed;
  z-index: 9;
  top: ${(props) => props.theme.defaultPadding};
  right: ${(props) => props.theme.defaultPadding};
  width: 300px;
`;

const Notifications: FC = () => {
  const notifications = useAppSelector((state) => state.notification);

  return (
    <Container>
      {notifications.map((notification) => (
        <Notification boxShadow key={notification.id} notification={notification} />
      ))}
    </Container>
  );
};

export default Notifications;
