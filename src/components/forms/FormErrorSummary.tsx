import React, {FC} from 'react';
import styled, {css} from 'styled-components';

const Container = styled.div`
  ${(props) => {
    const {
      theme: {
        borderRadius,
        padding,
        border,
        defaultPadding,
        notificationStyles: {error},
      },
    } = props;

    return css`
      ${borderRadius};
      ${border};
      ${padding};
      margin-bottom: ${defaultPadding};
      ${error};

      h2 {
        margin-top: 0;
      }
    `;
  }}
`;

interface RenderProps {
  errorSummary: ErrorSummary;
  errors: FieldErrors;
}
interface Props extends RenderProps {
  renderHeader?: (props: RenderProps) => React.ReactFragment;
}
const FormErrorSummary: FC<Props> = (props) => {
  const {errors, errorSummary, renderHeader} = props;
  const {hasErrors, errorCount} = errorSummary;

  if (!hasErrors) {
    return null;
  }

  return (
    <Container>
      {renderHeader ? (
        renderHeader({errors, errorSummary})
      ) : (
        <h2>Form Errors: {errorCount}</h2>
      )}
      <ol>
        {Object.entries(errors).map(
          ([name, error]) =>
            error && (
              <li key={name}>
                <a href={`#${name}`}>{error}</a>
              </li>
            )
        )}
      </ol>
    </Container>
  );
};

export default FormErrorSummary;
