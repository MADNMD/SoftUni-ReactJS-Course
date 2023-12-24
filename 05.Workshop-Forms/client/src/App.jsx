import { useEffect, useState } from 'react';

import * as userService from './services/userService'

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';

import './App.css';
import { UserList } from './components/UserList';

function App() {

  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({ //създаваме сетейта на формата и го подаваме към по ниския компонент;
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    imageUrl: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
  });
  const [formErrors, setFormErrrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    imageUrl: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
  });

  useEffect(() => {
    userService.getAll()
      .then(users => {
        setUsers(users);
      })
      .catch(err => {
        console.log('Error' + err);
      })
  }, []);

  const onUserCreateSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // const data = Object.fromEntries(formData);

    const createdUser = await userService.createOne(formValues);

    setUsers(users => [...users, createdUser]); // тук съзадаваме нова референция и добавяме нови потребител;
  }

  const onUserEditSubmit = async (event, userId) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const editUser = await userService.editOne(userId, data);

    setUsers(users => users.map(user => user._id === userId ? editUser : user));
  }

  const onUserDelete = async (userId) => {
    await userService.deleteUser(userId);

    setUsers(users => users.filter(user => user._id !== userId));
  }

  const formChangeHandler = (event) => {
    setFormValues(state => ({ ...state, [event.target.name]: event.target.value }))
  }

  const formValidate = (event) => {
    const value = event.target.value;
    const errors = {};

    if (event.target.name === 'firstName' && value.length < 3) {
      errors.firstName = 'First name should be at least 3 characters long!'
    }

    if (event.target.name === 'lastName' && value.length < 3) {
      errors.lastName = 'Last name should be at least 3 characters long!'
    }

    if (event.target.name === 'email') {
      const emailRegex = /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
      if (!emailRegex.test(value)) {
        errors.email = 'Email is not valid!';
      }
    }

    if (event.target.name === 'phoneNumber') {
      const phoneRegex = /^0[1-9]{1}[0-9]{8}$/;
      if (!phoneRegex.test(value)) {
        errors.phoneNumber = 'Phone number is not valid!';
      }
    }

    if (event.target.name === 'imageUrl') {
      const imgaeUrlRegex = /^https?:\/\/.+/;
      if (!imgaeUrlRegex.test(value)) {
        errors.imageUrl = 'ImageUrl is not valid!';
      }
    }

    if (event.target.name === 'country' && value.length < 2) {
      errors.country = 'Country should be at least 2 characters long!';
    }

    if (event.target.name === 'city' && value.length < 3) {
      errors.city = 'City should be at least 3 characters long!';
    }

    if (event.target.name === 'street' && value.length < 3) {
      errors.street = 'Street should be at least 3 characters long!';
    }

    if (event.target.name === 'streetNumber' && Number(value) <= 0) {
      errors.streetNumber = 'Street number should be a positive number!';
    }

    setFormErrrors(errors);
  }

  return (
    <>

      <Header />

      <main className='main'>
        <section className="card users-container">

          <Search />

          <UserList
            users={users}
            onUserCreateSubmit={onUserCreateSubmit}
            onUserEditSubmit={onUserEditSubmit}
            onUserDelete={onUserDelete}
            formValues={formValues}
            setFormValues={setFormValues}
            formChangeHandler={formChangeHandler}
            formErrors={formErrors}
            formValidate={formValidate}
          />

        </section>

      </main>

      <Footer />

    </>
  )
}

export default App
