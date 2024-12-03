---
title: Next Steps
---

At this point, we've bootstrapped Tina into the Gatsby blog starter. We were able to do so by making a few small modifications:

1. Added [gatsby-plugin-tinacms](/guides/gatsby/adding-tina/project-setup) to our blog starter.
2. [Created a form](http://localhost:3000/guides/gatsby/adding-tina/creating-forms) to edit some values in the `Post` template.

This guide is intended as a jumping off point to get you started with Tina, but to make a fully-functional CMS there is a little more work to do.

## Add More Fields

Our simplified example only exposes the title and post body to the Tina form. Take a look at our [fields](/docs/fields) documentation and try adding fields for the rest of the post data in the blog demo.

## Inline Editing

Consider creating an **inline editing** experience for your blog, where content is edited directly where it appears on the site instead of in the sidebar. Take a look at our [inline editing docs](/docs/inline-editing) for more information, and expect a guide on this in the near future!

## Saving Content

Editing content isn't much use if you can't save it! Our `onSubmit` handler doesn't really do anything right now. You can look at using the [`gatsby-tinacms-git`](/docs/gatsby/markdown) to edit content Markdown and JSON sourced from your repository.
