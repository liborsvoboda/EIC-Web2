---
title: Creating Forms
---

After adding `gatsby-plugin-tinacms` to our site we can create forms by calling the `useForm` hook inside our `BlogPostTemplate` component. The `useForm` hook returns two values in an array, similar to `React.useState`, which we assign via destructuring:

```js
const [modifiedValues, form] = useForm(formConfig)
```

`modifiedValues` contains the values we provide to the form (inside of `formConfig`) after being modified by the end user. `form` contains the form object created by calling `useForm`, which we'll need in a moment.

## Form Configuration

For details on how to configure forms, take a look at our [form configuration docs](/docs/forms#form-configuration). For the purposes of this guide, we will use the following configuration:

```js
const formConfig = {
  id: data.markdownRemark.slug,   // a unique identifier for this instance of the form
  label: 'Blog Post',             // name of the form to appear in the sidebar
  initialValues: data,            // populate the form with starting values
  onSubmit: (values) => {         // do something with the data when the form is submitted
    alert(`Submitting ${values.frontmatter.title}`)
  }
  fields: [                    // define fields to appear in the form
    {
      name: 'frontmatter.title',  // field name maps to the corresponding key in initialValues
      label: 'Title',             // label that appears above the field
      component: 'text',          // the component used to handle UI and input to the field
    },
    {
      name: 'frontmatter.description',
      label: 'Description',
      component: 'textarea',      // `component` accepts a predefined components or a custom React component
    },
  ]
}
```

> Note that our `onSubmit` handler is just a stub. How you implement this function will depend on how your content is stored, and will be explored in later guides.

## Adding the Form to the Post Component

First, we'll need to import `useForm` and `usePlugin` from the `tinacms` package:

**src/templates/blog-post.js**

```js
import { useForm, usePlugin } from 'tinacms'
```

Now, just add the form to the `BlogPostTemplate` component with the configuration we laid out previously. To simplify setup, we'd like to instead give `modifiedValues` the variable name `post` so that our layout code can continue to work without modification:

**src/templates/blog-post.js**

```js
const BlogPostTemplate = ({ data, pageContext, location }) => {
   const formConfig = {
    id: data.markdownRemark.id,
    label: "Blog Post",
    initialValues: data.markdownRemark,
    onSubmit: values => {
      alert(`Submitting ${values.frontmatter.title}`)
    },
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
      {
        name: "frontmatter.description",
        label: "Description",
        component: "textarea",
      },
    ],
  }
  const [post, form] = useForm(formConfig)

  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    //...
  )
}
```

### Adding the Form to the Sidebar

At this point, the form is all wired up with its field configuration, and our `post` object will send updated values back through our layout rendering code. However, **if you've followed along this far, you'll see that the form does not appear in the Tina sidebar.**

In order to hook our form into the sidebar, we'll need to call `usePlugin` and pass it our form object:

```diff
  const [post, form] = useForm(formConfig)
+ usePlugin(form)
```

That's it!

> **Why do we need to call usePlugin?**
>
> There are a few different ways to use forms: in the sidebar, in the global utility menu, and [inline](/docs/inline-editing). How you plan to use the form will determine how you should set it up in the CMS.

## More Info

- [Tina Docs: Forms](/docs/forms)
