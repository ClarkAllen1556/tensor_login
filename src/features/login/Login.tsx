import { FormEvent, useRef, useState } from 'react';

import Button from '@components/button/Button';

interface IUserCredentials {
  email?: string | null;
  password?: string | null;
}

interface IProps {
  submit: Function;
}

export default function Login({ submit }: IProps) {
  const [credentials, setCredentials] = useState<IUserCredentials>({
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

    submit({
      email: userEmail.current?.value,
      password: userPassword.current?.value,
    });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1 className="mb-4 text-center">Login</h1>

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

        <input id="input-user-pw" type="password" ref={userPassword} required />
      </div>

      <div>
        <Button variant="primary">Login</Button>
      </div>
    </form>
  );
}
