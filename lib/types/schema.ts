export interface UserProfile {
  uid: string;
  email: string;
  role: 'donor' | 'ngo' | 'individual' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastActive?: Date;
  displayName?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  // Status tracking
  statusUpdatedBy?: string;
  statusUpdatedAt?: Date;
  statusReason?: string;
  // Fields specific to NGOs
  organization?: {
    name: string;
    registrationNumber: string;
    type: string; // e.g., 'Hospital', 'Clinic', 'Pharmacy', 'NGO'
    website?: string;
    verificationDocuments: string[]; // URLs to uploaded documents
    operatingAreas: string[]; // List of areas where the NGO operates
  };
  // Fields specific to Donors (Organizations)
  donorOrganization?: {
    name: string;
    type: string; // e.g., 'Pharmaceutical', 'Hospital', 'Distributor'
    license: string;
    website?: string;
    verificationDocuments: string[];
  };
  // Fields specific to Individual Donors
  individualProfile?: {
    occupation?: string;
    idProof?: string; // URL to ID proof document
    preferredDonationAreas?: string[];
  };
}

export interface Medication {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  description?: string;
  composition?: string;
  batchNumber: string;
  expiryDate: Date;
  storageTemp: number;
  status: 'available' | 'reserved' | 'delivered';
  donorId: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string
  documents?: {
    images: string[];
    prescriptions: string[];
    other: string[];
  };
}

export interface Request {
  id: string;
  requesterId: string;
  requesterType: 'ngo' | 'individual';
  medicationId: string;
  medicationName: string;
  donorId: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-transit' | 'delivered';
  quantity: number;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  requesterDetails?: {
    // Common fields
    name: string;
    location: string;
    contactEmail: string;
    phoneNumber?: string;
    // NGO specific fields
    organizationName?: string;
    registrationNumber?: string;
    // Individual specific fields
    idProof?: string;
  };
  reason?: string;
  deliveryTracking?: {
    currentLocation?: {
      lat: number;
      lng: number;
    };
    temperature?: number;
    lastUpdated: Date;
  };
  // New fields for status tracking
  statusUpdates: Array<{
    status: Request['status'];
    timestamp: Date;
    updatedBy: string;
    note?: string;
  }>;
  approvalDetails?: {
    approvedBy: string;
    approvedAt: Date;
    note?: string;
    estimatedDeliveryDate?: Date;
  };
  rejectionDetails?: {
    rejectedBy: string;
    rejectedAt: Date;
    reason: string;
  };
  trackingNumber?: string
}

export interface  MedicationWithRequests extends Omit<Medication, 'location'> {
  location?: string;
  requests: Request[];
}

// Activity Log interface for user actions
export interface ActivityLog {
  id: string;
  userId: string;
  adminId?: string;
  action: 'login' | 'logout' | 'profile_update' | 'status_update' | 'verification' | 'password_change';
  details?: {
    newStatus?: UserProfile['status'];
    reason?: string;
    changes?: Record<string, any>;
    location?: string;
    device?: string;
  };
  timestamp: Date;
  ip?: string;
} 