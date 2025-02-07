"use server";

import { client } from "@/sanity/lib/client";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function clerkGetUser() {
  const { userId } = await auth();
  const user = await currentUser();

  const userName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.externalAccounts[0].emailAddress;
  const userAvatar = user?.imageUrl;

  return { userId, userName, userEmail, userAvatar };
}

export async function sanityUserPost() {
  const user = await clerkGetUser();

  const userObject = {
    _type: "user",

    _id: `user-${user.userId}`,

    email: user.userEmail,

    name: user.userName,

    image: user.userAvatar,
    userId: user.userId,
  };

  return await client.createOrReplace(userObject);
}
