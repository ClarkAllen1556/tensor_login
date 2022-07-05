import '@styles/App.css';
import { useState } from 'react';
import Login from '~/features/login/Login';
import SignUp from '~/features/signup/SignUp';

type TForm = 'login' | 'sign_up';

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

  return <div className="App">{showForm()}</div>;
}

export default App;
