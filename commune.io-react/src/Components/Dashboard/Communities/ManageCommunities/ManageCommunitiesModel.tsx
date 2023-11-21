export interface MonthlyData {
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
}

export interface Community {
  communityName: string;
  communityReputation: number;
  memberCount: number;
  premiumCommunity: boolean;
}

export interface ManagedCommunities {
  [key: string]: Community;
}

export interface ManagedCommunitiesModel {
  ongoingEvents: number;
  pendingEvents: number;
  completedEvents: number;
  communityPortalAnalytics: {
    [key: string]: MonthlyData;
  };
  managedCommunities: ManagedCommunities;
}
