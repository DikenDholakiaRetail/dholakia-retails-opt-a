import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Dholakia Retail")
    .items([
      S.listItem()
        .title("Newsroom")
        .child(
          S.list()
            .title("Newsroom")
            .items([
              S.documentTypeListItem("post").title("News Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Blogs")
        .child(
          S.list()
            .title("Blogs")
            .items([
              S.documentTypeListItem("blogPost").title("Blog Posts"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Careers")
        .child(
          S.list()
            .title("Careers")
            .items([
              S.documentTypeListItem("career").title("Open Roles"),
              S.documentTypeListItem("jobApplication").title("Job Applications"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("contactSubmission").title("Contact Submissions"),
      S.divider(),
      S.documentTypeListItem("newsletterSubscriber").title("Newsletter Subscribers"),
    ]);
