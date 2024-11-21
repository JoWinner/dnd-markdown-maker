import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://mysaas-starter.com",
      lastModified: new Date(),
    }
  ];
}
