export interface CommunityDashboardModel {
  id: string;
  name: string;
  picture: string;
  description: string;
  city: string;
  state: string;
  communityDues: number;
  communityTreasury: number;
  communityOrganizer: string;
  communityMembers: {
    [key: string]: { activeMembership: boolean; communityHost: boolean };
  };
  minimumAge: number;
  maximumAge: number;
  genderRequirements: string;
  attributeRequirements: { [key: string]: number };
  photoGallery: string[];
  pendingSocialEvents: any[]; // Update with specific type if available
  pendingHostedEvents: any[]; // Update with specific type if available
  completedSocialEvents: any[]; // Update with specific type if available
  completedHostedEvents: any[]; // Update with specific type if available
  reputation: number;
  socialPoints: number;
  communityPoints: number;
  communityCreationDate: string;
  monthlyTreasuryData: {
    JANUARY: number;
    FEBRUARY: number;
    MARCH: number;
    APRIL: number;
    MAY: number;
    JUNE: number;
    JULY: number;
    AUGUST: number;
    SEPTEMBER: number;
    OCTOBER: number;
    NOVEMBER: number;
    DECEMBER: number;
  };
  monthlyReputationData: {
    JANUARY: number;
    FEBRUARY: number;
    MARCH: number;
    APRIL: number;
    MAY: number;
    JUNE: number;
    JULY: number;
    AUGUST: number;
    SEPTEMBER: number;
    OCTOBER: number;
    NOVEMBER: number;
    DECEMBER: number;
  };
  stripeAccountId: string | null;
  memberCount: number;
  pendingEvents: number;
  completedEvents: number;
  upcomingSocialEvents: {
    [key: string]: {
      eventName: string;
      eventPicture: string;
      eventLocation: string;
      eventAttribute: string;
      eventTime: string;
    };
  };
  upcomingHostedEvents: {
    [key: string]: {
      eventName: string;
      eventPicture: string;
      eventLocation: string;
      eventAttribute: string;
      eventTime: string;
    };
  };
  paidCommunity: boolean;
}
