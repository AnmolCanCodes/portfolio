import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projectsData";
import { blogPosts } from "@/data/blogsData";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    ...["experience", "projects", "highlights", "anime", "contact"].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const projects: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Empty today - every blog entry links out - but a written post appears here
  // automatically rather than needing this file touched.
  const blogs: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...projects, ...blogs];
}
