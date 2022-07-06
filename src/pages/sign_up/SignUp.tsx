import { FormEvent, useEffect, useRef, useState } from 'react';
import PasswordValidator from 'password-validator';

import { IUser } from '~/common/interfaces/User.interface';
import Button from '~/common/components/button/Button';

interface IProps {
  submit: (user: IUser) => void;
}

interface IField {
  value: string;
  messages: any[];
  valid: boolean;
}

const schema = new PasswordValidator();
schema
  .is()
  .min(4, 'Password must be at least 4 characters long.')
  .has()
  .digits(1, 'Password must contain at least 1 numbers.')
  .has()
  .symbols(1, 'Password must have at least 1 special character.');

export default function SignUp({ submit }: IProps) {
  const userEmail = useRef<HTMLInputElement>(null);
  const userPasswordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [userPassword, setUserPassword] = useState<IField>({ value: '', messages: [], valid: false });
  const [confirmPassword, setConfirmPassword] = useState<IField>({ value: '', messages: [], valid: false });

  useEffect(() => {
    if (userPassword.value && !userPassword.valid) {
      const message = userPassword.messages.reduce((c, p) => `${c}${p}\n`, '');
      updateInputStylingsWarning(userPasswordInput.current, 'add', message);
    } else {
      updateInputStylingsWarning(userPasswordInput.current, 'remove');
    }
  }, [userPassword.messages]);

  useEffect(() => {
    if (confirmPassword.value && !confirmPassword.valid) {
      const message = confirmPassword.messages.reduce((c, p) => `${c}${p}\n`, '');
      updateInputStylingsWarning(confirmPasswordInput.current, 'add', message);
    } else {
      updateInputStylingsWarning(confirmPasswordInput.current, 'remove');
    }
  }, [confirmPassword.messages]);

  function validatePassword(password?: string) {
    if (!password) return;

    const validation = schema.validate(password, { details: true });
    if (validation instanceof Array) {
      setUserPassword({
        value: password,
        valid: !(validation.length > 0),
        messages: validation.map((m) => m.message),
      });
    }
  }

  function validateConfirm(confirmPassword?: string) {
    if (!confirmPassword) return;

    const isValid = confirmPassword === userPassword.value;
    const messages = isValid ? [] : ['Must match password.'];

    setConfirmPassword({
      value: confirmPassword,
      valid: isValid,
      messages: messages,
    });
  }

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userPassword.value === confirmPassword.value && userPassword.valid) {
      setError(null);

      submit({
        email: userEmail.current?.value,
        loggedIn: true,
      });
    } else {
      setError('Please correct the invalid fields.');

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
          onChange={(e) => validatePassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block" htmlFor="input-user-confirm">
          Confirm password
        </label>

        <input
          id="input-user-confirm"
          type="password"
          ref={confirmPasswordInput}
          onChange={(e) => validateConfirm(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col justify-center">
        <Button variant="primary">Sign up</Button>
        <strong className="mt-2 text-sol-magenta-1 italic text-center">{error && error}</strong>
      </div>
    </form>
  );
}
