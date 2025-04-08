import { useState, FC, useContext } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import FormControl from '@mui/material/FormControl';
import { Button, Input } from "@mui/material";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  return (
    <FormControl>
      <Input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <Input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <Button onClick={() => store.login(email, password)} variant="contained">
        Увійти
      </Button>
      {/* <button onClick={() => store.registration(email, password)}>
        Зареєструватись
      </button> */}
    </FormControl>
  );
};

export default observer(LoginForm);
