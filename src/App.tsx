import { useState } from 'react';

import Login from '~/pages/login/Login';
import SignUp from '~/pages/sign_up/SignUp';

type TForm = 'login' | 'sign_up'; // TODO remove this

function App() {
  const [form, setForm] = useState<TForm>('sign_up');

  function submit(stuff: any) {
    console.log('hello there', stuff);
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
