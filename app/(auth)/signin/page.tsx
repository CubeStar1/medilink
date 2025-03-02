import SignIn from '@/components/firebaseauth/signin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - MediLink',
  description: 'Sign in to your MediLink account',
};

export default function SignInPage() {
  return <SignIn />;
}