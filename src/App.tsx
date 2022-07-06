import { useState } from 'react';

import Login from '~/pages/login/Login';
import SignUp from '~/pages/sign_up/SignUp';
import { useAppDispatch, useAppSelector } from '@common/hooks/hooks';
import { setCurrentUser } from '~/features/user/user';
import { IUser } from '~/common/interfaces/User.interface';
import Button from './common/components/button/Button';

type TForm = 'login' | 'sign_up'; // TODO remove this

function App() {
  const [form, setForm] = useState<TForm>('sign_up');
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function submit(user: IUser) {
    // console.log('user >>', user);
    dispatch(setCurrentUser(user));
  }

  function logout() {
    dispatch(
      setCurrentUser({
        email: undefined,
        loggedIn: false,
      })
    );
  }

  function showForm() {
    switch (form) {
      case 'login':
        return <Login submit={submit} />;
      case 'sign_up':
        return <SignUp submit={submit} />;
    }
  }

  function welcomeForm() {
    return (
      <div className="flex flex-col justify-center">
        <h1>Welcome, {user.currentUser.email}!</h1>
        <Button variant="primary" click={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="App flex justify-center">
      {user.currentUser.loggedIn ? welcomeForm() : showForm()}
    </div>
  );
}

export default App;
