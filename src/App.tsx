import { useState } from 'react';

import '@styles/App.css';

import Input from '@components/input/Input';
import Button from '@components/button/Button';

function App() {
  const [message, setMessage] = useState<string>('');

  function handleChange(value: string) {
    setMessage(value);
  }

  return (
    <div className="App">
      <form>
        <div>
          <label>Email address</label>
          <Input
            type="email"
            required={true}
            change={(e) => handleChange(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <Input
            type="password"
            required={true}
            change={(e) => handleChange(e.target.value)}
          />
        </div>

        <Button variant="secondary" click={() => console.log('hello')}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default App;
