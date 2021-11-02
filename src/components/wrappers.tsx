import styled from 'styled-components';

export const H1 = styled.h1`
  text-transform: capitalize;
  font-size: 3em;
  margin-bottom: 0.5em;
`;

export const FloatingCard = styled.div`
  background: rgba(221, 221, 221, 0.4);
  position: fixed;
  margin: ${(props) => props.theme.defaultPadding};
  padding: ${(props) => props.theme.defaultPadding};
  right: 15px;
  ${(props) => props.theme.boxShadow};
`;

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
`;
