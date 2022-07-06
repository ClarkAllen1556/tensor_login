import { FormEvent, useEffect, useRef, useState } from 'react';
import PasswordValidator from 'password-validator';

import { IUser } from '~/common/interfaces/User.interface';
import Button from '~/common/components/button/Button';

interface IProps {
  submit: (user: IUser) => void;
}

const schema = new PasswordValidator();
schema
  .is()
  .min(4, 'Password must be longer than 4 characters.')
  .has()
  .digits(1, 'Password must contain at least 1 numbers.')
  .has()
  .symbols(1, 'Password must have at least 1 special character.');

export default function SignUp({ submit }: IProps) {
  const userEmail = useRef<HTMLInputElement>(null);
  const userPasswordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [userPassword, setUserPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [validationMessages, setValidationMessages] = useState<any[]>([]);

  // update password warning styling
  useEffect(() => {
    if (userPassword && !passwordIsValid(userPassword)) {
      const message = validationMessages.reduce((p: string, c: any): string => `${p}${c.message}\n`, '');
      updateInputStylingsWarning(userPasswordInput.current, 'add', message);
    } else {
      updateInputStylingsWarning(userPasswordInput.current, 'remove');
    }
  }, [userPassword]);

  // update confirm password warning styling
  useEffect(() => {
    if (confirmPassword && confirmPassword !== userPassword) {
      const message = 'Must match password field.';
      updateInputStylingsWarning(confirmPasswordInput.current, 'add', message);
    } else {
      confirmPasswordInput.current?.classList.remove('border-sol-magenta-1');
    }
  }, [confirmPassword, userPassword]);

  function updateInputStylingsWarning(input: HTMLInputElement | null, action: 'add' | 'remove', message: string = '') {
    if (!input) return;

    switch (action) {
      case 'add':
        input.classList.add('border-sol-magenta-1');
        break;
      case 'remove':
        input.classList.remove('border-sol-magenta-1');
        break;
    }

    input.title = message;
  }

  function passwordIsValid(password?: string) {
    if (!password) return false;

    const validation = schema.validate(password, { details: true });
    if (validation instanceof Array) {
      setValidationMessages(validation);

      return !(validation.length > 0);
    }

    return schema.validate(password);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userPassword === confirmPassword && passwordIsValid(userPassword)) {
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

        <input
          id="input-user-pw"
          type="password"
          ref={userPasswordInput}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        {/* {messages} */}
        <label className="block" htmlFor="input-user-pw">
          Confirm password
        </label>

        <input
          id="input-user-pw"
          type="password"
          ref={confirmPasswordInput}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <Button variant="primary">Sign up</Button>
      </div>
    </form>
  );
}
