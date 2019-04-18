import styled from 'styled-components/macro';

const TextBoxDecl = styled.input.attrs(() => ({
  type: 'text'
}))`
  /* empty */
  `;

const opacity = ({ disabled }: any) => disabled ? 0.5 : 1;
const pointerEvents = ({ disabled }: any) => disabled ? 'none' : 'inherit';
/**
 * A simple TextBox component
 */
const TextBox = styled(TextBoxDecl)`
  box-sizing: border-box;
  height: 40px;
  padding: 0 8px; /* TODO: theme.spacings.something */
  font-size: 14px; /* todo: theme */
  text-align: left;

  color: #333; /* TODO: theme.colors.text */
  border: 1px solid #bbb; /* TODO: theme.colors.secondary */
  opacity: ${opacity};
  pointer-events: ${pointerEvents};
`;

export default TextBox;