import '@styles/App.css';
import Login from '~/features/login/Login';

function App() {
  function submit(stuff: any) {
    console.log('hello there', stuff);
  }

  return (
    <div className="App">
      <Login submit={submit} />
    </div>
  );
}

export default App;
