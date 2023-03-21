import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { ContactWrapper } from './ContactList.styled';

export function ContactList({ contacts, deleteContact }) {
  return (
    <ContactWrapper>
      <ul>
        {contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            deleteContact={() => deleteContact(contact.id)}
          />
        ))}
      </ul>
    </ContactWrapper>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
