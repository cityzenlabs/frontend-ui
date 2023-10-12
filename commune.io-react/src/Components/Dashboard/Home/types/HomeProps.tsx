export interface HomeProps {
  viewProfile: boolean;
  setViewProfile: (visible: boolean) => void;
  setSideBarSelection: (selection: string) => void;
  user: any;
}
