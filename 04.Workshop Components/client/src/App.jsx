import { useEffect, useState } from 'react';

import * as userService from './services/userService'

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';

import './App.css';
import { UserList } from './components/UserList';

function App() {

  const [users, setUsers] = useState([]);

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
    const data = Object.fromEntries(formData);

    const createdUser = await userService.createOne(data);

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

  return (
    <>

      <Header />

      <main className='main'>
        <section className="card users-container">

          <Search />

          <UserList users={users} onUserCreateSubmit={onUserCreateSubmit} onUserEditSubmit={onUserEditSubmit} onUserDelete={onUserDelete} />

        </section>

      </main>

      <Footer />

    </>
  )
}

export default App
