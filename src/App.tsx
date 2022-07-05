import { useState } from 'react';

import Login from '~/pages/login/Login';
import SignUp from '~/pages/sign_up/SignUp';
import { useAppDispatch, useAppSelector } from '@common/hooks/hooks';
import { setCurrentUser } from '~/features/user/user';
import { IUser } from '~/common/interfaces/User.interface';

type TForm = 'login' | 'sign_up'; // TODO remove this

function App() {
  const [form, setForm] = useState<TForm>('sign_up');
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function submit(user: IUser) {
    console.log(user);
    dispatch(setCurrentUser(user));
  }

  function showForm() {
    switch (form) {
      case 'login':
        return <Login submit={submit} />;
      case 'sign_up':
        return <SignUp submit={submit} />;
    }
  }

  return <div className="App flex justify-center">{showForm()}</div>;
}

export default App;
