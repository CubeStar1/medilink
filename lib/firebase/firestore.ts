import { db } from './config';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { UserProfile } from '@/lib/types/schema';

export async function createUserProfile(
  uid: string,
  data: {
    email: string;
    role: UserProfile['role'];
    displayName?: string;
    phoneNumber?: string;
    address?: UserProfile['address'];
    organization?: Omit<NonNullable<UserProfile['organization']>, 'verificationDocuments'>;
    donorOrganization?: Omit<NonNullable<UserProfile['donorOrganization']>, 'verificationDocuments'>;
    individualProfile?: UserProfile['individualProfile'];
  }
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    
    // Create base user data
    const userData = {
      uid,
      email: data.email,
      role: data.role,
      isVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add optional fields if they exist
    if (data.displayName) {
      Object.assign(userData, { displayName: data.displayName });
    }
    if (data.phoneNumber) {
      Object.assign(userData, { phoneNumber: data.phoneNumber });
    }
    if (data.address) {
      Object.assign(userData, { address: data.address });
    }

    // Add role-specific data
    if (data.role === 'ngo' && data.organization) {
      Object.assign(userData, {
        organization: {
          ...data.organization,
          verificationDocuments: [], // Initialize empty array for documents
        },
      });
    } else if (data.role === 'donor' && data.donorOrganization) {
      Object.assign(userData, {
        donorOrganization: {
          ...data.donorOrganization,
          verificationDocuments: [], // Initialize empty array for documents
        },
      });
    } else if (data.role === 'individual' && data.individualProfile) {
      Object.assign(userData, { individualProfile: data.individualProfile });
    }

    await setDoc(userRef, userData);
    console.log('User profile created successfully');
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    const data = userSnap.data();
    return {
      uid: userSnap.id,
      ...data,
      // Convert Firestore Timestamps to Dates
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as UserProfile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function verifyOrganization(
  uid: string,
  verified: boolean
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      isVerified: verified,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error verifying organization:', error);
    throw error;
  }
} 