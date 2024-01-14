import { getServerSession } from "next-auth";
import _Page from "./_page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Unauthorized from "../_common/Unauthorized";

export default async function AtasanPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  return <_Page nama={session.user.nama} />;
}
