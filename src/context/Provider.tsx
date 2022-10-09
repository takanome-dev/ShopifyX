import { UserContext } from './context';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ chidlren }: Props) {
  return <UserContext.Provider value={}>{chidlren}</UserContext.Provider>;
}
