"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile, getUserProfile } from '../firebase/firestore';
import type { UserProfile } from '@/lib/types/schema';
import Cookies from 'js-cookie';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, data: {
    role: UserProfile['role'];
    displayName?: string;
    phoneNumber?: string;
    address?: UserProfile['address'];
    organization?: Omit<NonNullable<UserProfile['organization']>, 'verificationDocuments'>;
    donorOrganization?: Omit<NonNullable<UserProfile['donorOrganization']>, 'verificationDocuments'>;
    individualProfile?: UserProfile['individualProfile'];
  }) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Get the ID token and set it in a cookie
        const token = await user.getIdToken();
        Cookies.set('__session', token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        Cookies.remove('__session');
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    Cookies.set('__session', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  };

  const signUp = async (
    email: string,
    password: string,
    data: {
      role: UserProfile['role'];
      displayName?: string;
      phoneNumber?: string;
      address?: UserProfile['address'];
      organization?: Omit<NonNullable<UserProfile['organization']>, 'verificationDocuments'>;
      donorOrganization?: Omit<NonNullable<UserProfile['donorOrganization']>, 'verificationDocuments'>;
      individualProfile?: UserProfile['individualProfile'];
    }
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    Cookies.set('__session', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    await createUserProfile(userCredential.user.uid, {
      email,
      ...data,
    });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const token = await userCredential.user.getIdToken();
    Cookies.set('__session', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    // Check if user profile exists
    const profile = await getUserProfile(userCredential.user.uid);
    if (!profile) {
      await createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email!,
        role: 'donor',
        displayName: userCredential.user.displayName || undefined,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
    Cookies.remove('__session');
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 