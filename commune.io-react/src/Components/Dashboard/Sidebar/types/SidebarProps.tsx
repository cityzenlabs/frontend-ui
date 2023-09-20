export interface SideBarProps {
  selectedItem: string;
  sideBarVisibility: boolean;
  viewProfile: boolean;
  setSelectedItem: (label: string) => void;
  setSideBarVisibility: (visible: boolean) => void;
  setViewProfile: (visible: boolean) => void;
}
