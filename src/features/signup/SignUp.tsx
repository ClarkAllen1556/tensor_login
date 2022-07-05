import { FormEvent, useRef } from 'react';
import PasswordValidator from 'password-validator';

import Button from '~/common/components/button/Button';

interface IProps {
  submit: Function;
}

function passwordIsValid(password?: string) {
  if (!password) return false;

  const schema = new PasswordValidator();
  schema
    .is()
    .min(8, 'Password must be longer than 8 characters.')
    .has()
    .digits(2, 'Password must contain at least 2 numbers.')
    .has()
    .symbols(1, 'Password must have at least 1 special character.');

  return schema.validate(password, { details: true });
}

export default function SignUp({ submit }: IProps) {
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userPassword.current?.value === confirmPassword.current?.value) {
      submit({
        forward: passwordIsValid(userPassword.current?.value),
      });
    } else {
      submit({
        forward: false,
      });
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1 className="mb-4"> Sign up </h1>

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

      <div className="mb-2">
        <label className="block" htmlFor="input-user-pw">
          Confirm password
        </label>

        <input
          id="input-user-pw"
          type="password"
          ref={confirmPassword}
          required
        />
      </div>

      <div>
        <Button variant="primary">Sign up</Button>
      </div>
    </form>
  );
}
