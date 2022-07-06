import { useAppDispatch, useAppSelector } from '~/common/hooks/hooks';
import { setCurrentUser } from '~/features/user/user';
import Button from '~/common/components/button/Button';

export default function Welcome() {
  const currentUser = useAppSelector((state) => state.user).currentUser;
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(
      setCurrentUser({
        email: undefined,
        loggedIn: false,
      })
    );
  }
  return (
    <div className="flex flex-col justify-center">
      <h1>Welcome, {currentUser.email}!</h1>
      <Button variant="primary" click={logout}>
        Logout
      </Button>
    </div>
  );
}
