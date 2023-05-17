import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts'));
  });
  const [filter, setFilter] = useState('');

  // Якщо я хочу, щоб по дефолту там був цей масив і
  // він не рендерився постійно при оновлені і реагував на зміни в локал сторейджі, як це було в класах?
  //    [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]
  //  Яку умову сюди можна додати, щоб це працювало?
  // useEffect(() => {
  //   const localData = localStorage.getItem('contacts');
  //   if (localData) {
  //     setContacts(JSON.parse(localData));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const duplicate = contacts.find(contact => contact.name === name);
    if (duplicate) {
      alert('Error!');
      return;
    }
    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    const filterId = contacts.filter(contact => contact.id !== id);
    setContacts([...filterId]);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        onClick={deleteContact}
        contacts={contacts}
        filter={filter}
      />
    </div>
  );
};