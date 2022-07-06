import { FormEvent, useRef, useState } from 'react';
import PasswordValidator from 'password-validator';

import { IUser } from '~/common/interfaces/User.interface';
import Button from '~/common/components/button/Button';

interface IProps {
  submit: (user: IUser) => void;
}

export default function SignUp({ submit }: IProps) {
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const [validationMessages, setValidationMessages] = useState<any>([]);

  function passwordIsValid(password?: string) {
    if (!password) return false;

    const schema = new PasswordValidator();
    schema
      .is()
      .min(4, 'Password must be longer than 8 characters.')
      .has()
      .digits(1, 'Password must contain at least 2 numbers.')
      .has()
      .symbols(1, 'Password must have at least 1 special character.');

    setValidationMessages(schema.validate(password, { details: true }));

    return schema.validate(password);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // console.log('userPassword >>', userPassword.current?.value);
    // console.log('confirmPassword >> ', confirmPassword.current?.value);

    if (
      userPassword.current?.value === confirmPassword.current?.value &&
      passwordIsValid(userPassword.current?.value)
    ) {
      submit({
        email: userEmail.current?.value,
        loggedIn: true,
      });
    } else {
      submit({
        email: undefined,
        loggedIn: false,
      });
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1 className="mb-4 text-center"> Sign up </h1>

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
