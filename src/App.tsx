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
      <Input type="text" change={(e) => handleChange(e.target.value)} />
      <Button click={() => alert(message)}>Show message!</Button>
    </div>
  );
}

export default App;
