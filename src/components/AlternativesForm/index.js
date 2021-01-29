import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    &[data-selected="true"] {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textheader};
    }      
    &[data-error="true"] {
      background-color: ${({ theme }) => theme.colors.wrong};
      color: ${({ theme }) => theme.colors.contrastText};
    }
    &[data-correct="true"] {
      background-color: ${({ theme }) => theme.colors.success};
      color: ${({ theme }) => theme.colors.contrastText};
    }
    &:focus {
      opacity: 1;
    } 
  }
  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;