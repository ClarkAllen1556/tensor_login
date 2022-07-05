import { FormEvent, useRef, useState } from 'react';

import '@styles/App.css';

import Button from '@components/button/Button';
import Input from '@components/input/Input';

interface UserCredentials {
  email?: string | null;
  password?: string | null;
}

function App() {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: null,
    password: null,
  });

  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setCredentials({
      email: userEmail.current?.value,
      password: userPassword.current?.value,
    });
  }

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <label className="block" htmlFor="input-user-email">
            Email address
          </label>

          <input id="input-user-email" type="email" ref={userEmail} required />
        </div>

        <div className="mb-2">
          <label className="block" htmlFor="input-user-pw">
            Password
          </label>

          <input
            id="input-user-pw"
            type="password"
            ref={userPassword}
            required
          />
        </div>

        <div>
          <Button
            variant="primary"
            click={() => console.log('hello', credentials)}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
