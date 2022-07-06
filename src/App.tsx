import { useAppDispatch, useAppSelector } from '~/common/hooks/hooks';
import { IUser } from '~/common/interfaces/User.interface';
import Button from '~/common/components/button/Button';
import { setCurrentUser } from '~/features/user/user';
import SignUp from '~/pages/sign_up/SignUp';

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function submit(user: IUser) {
    dispatch(setCurrentUser(user));
  }

  function logout() {
    dispatch(
      setCurrentUser({
        email: undefined,
        loggedIn: false,
      })
    );
  }

  function welcomeForm() {
    return (
      <div className="flex flex-col justify-center">
        <h1>Welcome, {user.currentUser.email}!</h1>
        <Button variant="primary" click={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="App flex justify-center">
      {user.currentUser.loggedIn ? welcomeForm() : <SignUp submit={submit} />}
    </div>
  );
}

export default App;
