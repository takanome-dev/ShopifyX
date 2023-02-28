import { useMutation } from '@apollo/client';
import {
  Settings,
  MessageSquare,
  ArrowRight,
  Heart,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CURRENT_USER_QUERY, SIGN_OUT_MUTATION } from '@/gql/user';
import useCurrentUser from '@/hooks/useCurrentUser';

const UserAvatar = () => {
  const { user } = useCurrentUser();
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  if (!user) {
    // TODO: add sign in route or modal
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: 'primary',
          className: 'font-bold shadow-md shadow-cyan-100',
        })}
      >
        Sign in <ArrowRight className="w-4 h-4 ml-2 font-bold" />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border border-primary cursor-pointer"
      >
        <Avatar>
          <AvatarImage src="/assets/avatar.png" alt="User avatar" />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuItem>
          <Link
            href={`/user/${user.username}`}
            className="flex items-center mb-2 gap-x-3"
          >
            <Avatar>
              <AvatarImage src="/assets/avatar.png" alt="User avatar" />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {user?.username}
              </p>
              <p className="text-slate-500 truncate font-normal">
                {user?.email}
              </p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/favorites"
            className="flex items-center text-base gap-3 w-full"
          >
            <Heart className="w-6 h-6 text-slate-500" />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/settings"
            className="flex text-base items-center gap-3 w-full"
          >
            <Settings className="w-6 h-6 text-slate-500" />
            Settings
          </Link>
        </DropdownMenuItem>
        {/* TODO: add isAdmin field to users */}
        <DropdownMenuItem>
          <Link
            href="/feedbacks"
            className="flex text-base items-center gap-3 w-full"
          >
            <MessageSquare className="w-6 h-6 text-slate-500" />
            Feedbacks
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            signout().catch(console.error);
          }}
        >
          <LogOut className="mr-4 h-6 w-6" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
