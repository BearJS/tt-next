import styled from 'styled-components';

export const FormRequiredFields = styled.div`
  &:before {
    content: '*Denotes Required Field';
  }
  margin-bottom: 1em;
`;

export const FormLabel = styled.label<{required?: boolean}>`
  display: block;
  font-size: 14px;
  margin-top: 2px;
  ${(props) => {
    const {required} = props;
    return `
      ${required && `&:after {content: '*'}`}
    `;
  }};
  & > input[type='radio'],
  & > input[type='checkbox'] {
    margin-bottom: 5px;
    margin-right: 5px;
  }
`;
