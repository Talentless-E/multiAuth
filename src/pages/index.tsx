import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Image from "next/image";

export default function Home() {
   const { data: session } = useSession();
   return (
      <>
         <h1 className="text-gray-500 text-4xl bg-white">
            {session?.user?.name}
         </h1>
         {session ? (
            <Image
               src={String(session?.user?.image)}
               width={128}
               height={128}
               alt=""
               className="rounded-full"
            />
         ) : (
            <></>
         )}

         {session ? (
            <button onClick={() => signOut()} className="bg-blue-400 p-1">
               Sign out
            </button>
         ) : (
            <button onClick={() => signIn()} className="bg-blue-400 p-1">
               Sign in
            </button>
         )}
      </>
   );
}

export async function getServerSideProps(ctx: NextPageContext) {
   const session = await getSession(ctx);
   console.log(session);
   return {
      props: {
         session,
      },
   };
}
