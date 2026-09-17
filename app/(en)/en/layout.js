import RootDocument, { buildMetadata, viewport } from "../../../components/RootDocument";

export const metadata = buildMetadata("en");
export { viewport };

export default function Layout({ children }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
