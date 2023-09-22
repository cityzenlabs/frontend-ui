export interface SideBarProps {
  sideBarSelection: string;
  sideBarVisibility: boolean;
  viewProfile: boolean;
  setSideBarSelection: (label: string) => void;
  setSideBarVisibility: (visible: boolean) => void;
  setViewProfile: (visible: boolean) => void;
}
