import React from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Wrapper, Title, ContactTitle } from './PhoneBook.styled';

export class PhoneBook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    if (
      !this.state.contacts.find(
        ({ name }) => name.toLocaleLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  findContact = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm handleSubmit={this.addContact}></ContactForm>

        <ContactTitle>Contacts</ContactTitle>
        {this.state.contacts.length !== 0 && (
          <Filter value={this.state.filter} onChange={this.findContact} />
        )}
        {this.state.contacts.length > 0 ? (
          <ContactList
            contacts={this.filterContacts()}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p>There are no contacts yet.</p>
        )}
      </Wrapper>
    );
  }
}
