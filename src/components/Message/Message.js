import propTypes from 'prop-types';
import { MessageWraper } from './Message.styled';
export function Message({ message }) {
  return (
    <MessageWraper>
      <p>{message}</p>
    </MessageWraper>
  );
}
Message.propTypes = { message: propTypes.string };
