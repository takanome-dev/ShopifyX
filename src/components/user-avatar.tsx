import Link from 'next/link';
import React from 'react';
import { BsArrowRight, BsGear } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCurrentUser from '@/hooks/useCurrentUser';

// import type { UserSchema } from '@/schemas/user';

const UserAvatar = () => {
  const { user } = useCurrentUser();

  if (!user) {
    // TODO: add sign in route or modal
    return (
      <Link
        href="/login"
        className={buttonVariants({
          className:
            'h-full bg-slate-600 py-2 font-semibold hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900',
        })}
      >
        Sign in <BsArrowRight className="ml-2" />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border border-cyan2-300">
          <AvatarImage src="/assets/avatar.png" alt="User avatar" />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem>
          <div className="flex items-center px-6 py-4 mb-2 gap-x-3">
            <div>
              <AvatarImage src="/assets/avatar.png" alt="User avatar" />
              <AvatarFallback>N/A</AvatarFallback>
            </div>
            {/* <div className="flex-col shrink-0 grow-0 w-14 h-14 overflow-hidden rounded-full border-cyan2-300 border">
                <Image
                  src="/assets/avatar.png"
                  alt="User avatar"
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
              </div> */}

            <div className="flex-col shrink w-52">
              <p className="text-gray-700 text-2xl font-semibold">
                {user?.username}
              </p>

              <p className="text-gray-500 truncate text-xl font-normal">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BsGear size={20} className="text-slate-600 dark:text-slate-100" />
          <Link
            href="/settings"
            className="ml-2 font-medium text-slate-800 dark:text-slate-100"
          >
            Settings
          </Link>
        </DropdownMenuItem>
        {/* TODO: add isAdmin field to users */}
        {/* {user?.isAdmin && (
          <DropdownMenuItem>
            <FaRegComment
              size={16}
              className="text-slate-600 dark:text-slate-100"
            />
            <Link
              href="/feedbacks"
              className="ml-2 font-medium text-slate-800 dark:text-slate-100"
            >
              Feedbacks
            </Link>
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;

// {
//   user && (
//     <Menu as="div" className="avatar-container flex relative">
//       <Menu.Button>
//         <div className="pl-4 border-l border-cyan2-300">
//           <div className="w-14 h-14 rounded-full overflow-hidden border border-cyan2-300">
//             <Image
//               src="/assets/avatar.png"
//               alt="User avatar"
//               width="100%"
//               height="100%"
//               layout="responsive"
//             />
//           </div>
//         </div>
//       </Menu.Button>
//       <Transition
//         enter="transition duration-100 ease-out"
//         enterFrom="transform scale-95 opacity-0"
//         enterTo="transform scale-100 opacity-100"
//         leave="transition duration-75 ease-out"
//         leaveFrom="transform scale-100 opacity-100"
//         leaveTo="transform scale-95 opacity-0"
//       >
//         <Menu.Items className="z-40 absolute right-0 top-20 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <Menu.Item>
//             <div className="flex items-center px-6 py-4 mb-2 gap-x-3">
//               <div className="flex-col shrink-0 grow-0 w-14 h-14 overflow-hidden rounded-full border-cyan2-300 border">
//                 <Image
//                   src="/assets/avatar.png"
//                   alt="User avatar"
//                   width="100%"
//                   height="100%"
//                   layout="responsive"
//                 />
//               </div>

//               <div className="flex-col shrink w-52">
//                 <p className="text-gray-700 text-2xl font-semibold">
//                   {user?.username}
//                 </p>

//                 <p className="text-gray-500 truncate text-xl font-normal">
//                   {user?.email}
//                 </p>
//               </div>
//             </div>
//           </Menu.Item>
//           <Menu.Item>
//             {({ active }) => (
//               <Link
//                 path="/account"
//                 title="Profile"
//                 Icon={AiOutlineUser}
//                 iconPosition="start"
//                 className={`${
//                   active ? 'bg-gray-100' : 'bg-white'
//                 } flex text-2xl w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
//               />
//             )}
//           </Menu.Item>
//           <Menu.Item>
//             {({ active }) => (
//               <Link
//                 path="/favorites"
//                 title="Favorites"
//                 Icon={AiOutlineHeart}
//                 iconPosition="start"
//                 className={`${
//                   active ? 'bg-gray-100' : 'bg-white'
//                 } flex w-full text-2xl items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
//               />
//             )}
//           </Menu.Item>
//           <Menu.Item>
//             {({ active }) => (
//               <Button
//                 title="Logout"
//                 className={`${
//                   active ? 'bg-gray-100' : 'bg-white'
//                 } w-full rounded-md px-6 pl-8 py-4 font-normal text-gray-700 hover:bg-gray-100`}
//                 onClick={() => {
//                   signout().catch(console.error);
//                   router.replace('/login').catch(console.error);
//                 }}
//                 size="xs"
//                 Icon={VscSignOut}
//                 iconPosition="start"
//                 iconClasses="text-red-500"
//               />
//             )}
//           </Menu.Item>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
