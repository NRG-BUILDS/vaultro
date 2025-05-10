export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  dob: string | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  isEmailVerified: boolean;
  creatorType: string;
  niche: string;
  contentType: string;
  country: string | null;
  dob: string;
  gender: string;
  referral_code: string;
  monthlyUsage: {
    date: string;
    count: number;
  };
  emailNotifications: boolean;
  pushNotifications: boolean;
  socialNotifications: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  subscriptions: any[]; // You might want to define a more specific type here
  referrals: {
    page: number;
    itemsCount: number;
    totalPages: number;
    itemsPerPage: number;
    items: {
      createdAt: string;
      email: string;
      name: string;
      status: "Pending" | "Completed";
    }[];
  };
}
