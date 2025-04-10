
import { useState, FC, useContext, FormEvent } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { SigninForm } from "@components/styled/login";
import { useForm } from '@tanstack/react-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: ({ value }) => store.login(value.email, value.password)
  });

  const [showPassword, setIsShowPassword] = useState(false);

  return (
    <SigninForm
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Field
        name="email"
        validators={{
          onSubmit: ({ value }) => !value && 'Email обов`язковий'
        }}
        children={(field) => (
          <FormControl fullWidth>
            <TextField
              size="small"
              id="email"
              label="Email"
              placeholder="Введіть Ваш email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors[0]}
            />
          </FormControl>
        )}
      />
      <Field
        name="password"
        validators={{
          onSubmit: ({ value }) => !value && 'Пароль обов`язковий'
        }}
        children={(field) => (
          <FormControl fullWidth>
            <InputLabel
              size="small"
              error={!!field.state.meta.errors.length}
              htmlFor="password">
              Пароль
            </InputLabel>
            <OutlinedInput
              size="small"
              id="password"
              label="password"
              autoComplete="current-passwoprd"
              placeholder="Enter your password"
              onChange={(e) => field.handleChange(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              error={!!field.state.meta.errors.length}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={() => setIsShowPassword((show) => !show)}>
                    {showPassword ? (
                      <VisibilityOff color={field.state.meta.errors.length ? 'error' : 'inherit'} />
                    ) : (
                      <Visibility color={field.state.meta.errors.length ? 'error' : 'inherit'} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={!!field.state.meta.errors.length}>{field.state.meta.errors[0]}</FormHelperText>
          </FormControl>
        )}
      />

      <Subscribe
        selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
        children={([canSubmit]) => (
          <Button
            color="primary"
            disabled={!canSubmit}
            variant="contained"
            type="submit">
            Увійти
          </Button>
        )}
      />
        
      {/* <Input
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
      <button onClick={() => store.registration(email, password)}>
        Зареєструватись
      </button>  */}
    </SigninForm>
  );
};

export default observer(LoginForm);
