import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Test,
});

function Test() {
  return (
    <h1>Hello</h1>
  )
}

// function SignIn() {
//   return (
//     <LoginPage>
//       <Logo width="200" />
//       <SignInForm />
//     </LoginPage>
//   );
// }
