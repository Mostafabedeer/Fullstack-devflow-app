import { redirect } from "next/navigation";

import { auth } from "@/auth";

import ROUTES from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";
import ProfileForm from "@/components/forms/ProfileForm";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SignIn);

  const { success, data } = await getUser({ userId: session.user.id });
  if (!success) redirect(ROUTES.SignIn);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <ProfileForm user={data?.user as User} />
    </>
  );
};

export default Page;
