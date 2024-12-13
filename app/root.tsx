import { Outlet } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { type Theme } from 'remix-themes';
import { Layout } from 'app/components/Layout';
import { themeSessionResolver } from "./utils/session.server";
import "./tailwind.css";

export interface LoaderData {
  theme: Theme | null;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);

  const data: LoaderData = {
    theme: getTheme(),
  }

  return json({...data})
};

export { Layout };

export default function App() {
  return <Outlet />;
}
