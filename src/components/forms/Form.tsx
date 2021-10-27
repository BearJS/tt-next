import React, {FC} from 'react';
import styled from 'styled-components';
import {FormRequiredFields} from './wrappers';
import {NotificationMessage, NotificationFixedContainer} from '../notifications/wrappers';

const StyledForm = styled.form`
  border: 2px solid #ddd;
  margin: 1em;
  padding: 1.5em;
  ${(props) => props.theme.borderRadius}
`;

interface Props {
  hasRequiredFields?: boolean;
  formState: FormState;
  submittingView?: React.ReactFragment;
}

const Form: FC<Props> = (props) => {
  const {
    children,
    hasRequiredFields,
    formState: {isSubmitting, error, success, warning},
    submittingView,
  } = props;

  if (!isSubmitting) {
    if (!success) {
      // Form View
      return (
        <StyledForm>
          <NotificationFixedContainer>
            {warning && (
              <NotificationMessage type="warning">{warning}</NotificationMessage>
            )}{' '}
            {error && <NotificationMessage type="error">{error}</NotificationMessage>}
          </NotificationFixedContainer>
          {hasRequiredFields && <FormRequiredFields />}
          {children}
        </StyledForm>
      );
    }
    // Success View
    return <StyledForm>{success}</StyledForm>;
  }

  // Submitting View
  return <StyledForm>{submittingView || 'Submitting Form'}</StyledForm>;
};

export default Form;
