import React, {FC} from 'react';
import styled from 'styled-components';

const FieldError = styled.div`
  color: ${(props) => props.theme.error.color};
  font-size: 12px;
  margin-bottom: 1em;
`;

const FieldDescription = styled.div`
  font-size: 12px;
  margin-bottom: 1em;
`;

interface Props {
  error?: string;
  description?: React.ReactFragment;
  descriptionId: string;
}

const FieldFeedback: FC<Props> = ({error, description, descriptionId}) => {
  return (
    <>
      {error && <FieldError>{error}</FieldError>}
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
    </>
  );
};

export default FieldFeedback;
