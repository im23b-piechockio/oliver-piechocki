import RootDocument, { buildMetadata, viewport } from "../../components/RootDocument";

export const metadata = buildMetadata("de");
export { viewport };

export default function Layout({ children }) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
