import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

type Role = "admin" | "user"; 

export async function requireAuthApi(
  req: NextApiRequest,
  res: NextApiResponse,
  roles: Role[] = []
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  if (roles.length && !roles.includes(session.user.role as Role)) {
    res.status(403).json({ message: "Forbidden" });
    return null;
  }

  return session;
}

export async function requireAuthPage(ctx: any, roles: Role[] = []) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  if (roles.length && !roles.includes(session.user.role as Role)) {
    return {
      redirect: {
        destination: "/403",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
