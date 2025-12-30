import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata:Metadata={
  title:"Sign-in | Anas Zoom"
}

export default function SiginInPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
}
