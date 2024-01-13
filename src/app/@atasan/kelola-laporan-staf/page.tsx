import _Page from "./_page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <_Page session={session} />;
}
