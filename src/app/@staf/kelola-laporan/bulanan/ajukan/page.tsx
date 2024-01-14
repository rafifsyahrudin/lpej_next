import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import _Page from "./_page";
import Unauthorized from "@/app/_common/Unauthorized";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  return <_Page session={session} />;
}
