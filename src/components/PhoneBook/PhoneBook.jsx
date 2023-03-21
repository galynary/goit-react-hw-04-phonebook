import React, { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Wrapper, Title, ContactTitle } from './PhoneBook.styled';

export const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      !contacts.find(
        ({ name }) => name.toLocaleLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts(prevContacts => [...prevContacts, contact]);
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const findContact = ({ currentTarget: { value } }) => {
    setFilter(value);
  };
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm handleSubmit={addContact}></ContactForm>
      <ContactTitle>Contacts</ContactTitle>
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={findContact} />
      )}
      {contacts.length > 0 ? (
        <ContactList
          contacts={filterContacts()}
          deleteContact={deleteContact}
        />
      ) : (
        <p>There are no contacts yet.</p>
      )}
    </Wrapper>
  );
};
