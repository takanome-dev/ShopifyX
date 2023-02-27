import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from '@/gql/user';
import { UserQuery } from '@/interfaces/user';

export default function useCurrentUser() {
  const { data, error, loading } = useQuery<UserQuery>(CURRENT_USER_QUERY);

  return { user: data?.authenticatedItem, error, loading };
}
