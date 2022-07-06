import { useAppDispatch, useAppSelector } from '~/common/hooks/hooks';
import { IUser } from '~/common/interfaces/User.interface';
import { setCurrentUser } from '~/features/user/user';
import SignUp from '~/pages/sign_up/SignUp';
import Welcome from '~/pages/welcome/Welcome';

function App() {
  const currentUser = useAppSelector((state) => state.user).currentUser;
  const dispatch = useAppDispatch();

  function submit(user: IUser) {
    dispatch(setCurrentUser(user));
  }

  return (
    <div className="App flex justify-center">{currentUser.loggedIn ? <Welcome /> : <SignUp submit={submit} />}</div>
  );
}

export default App;
