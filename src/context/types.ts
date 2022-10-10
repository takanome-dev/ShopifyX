export interface InitialValues {
  user: User | null;
  login: (user: UserInfo) => void;
}

export interface User {
  username: string;
  token: string;
}

export interface UserInfo {
  username: string;
  email: string;
}
