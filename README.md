# Welcome to the OCCTIVE project!
This repository hosts the source code and site content for the OCCTIVE (Online Computing-Concepts Toolkit of Interdisciplinary Videos for Education) platform. OCCTIVE is a curated video library designed to help non-computing faculty teach fundamental computer science concepts in their courses. This project builds upon and extends the structure of the [ComputingPaths](http://computingpaths.ucsd.edu/) platform.

OCCTIVE is part of an NSF-funded initiative to empower students across disciplines with foundational computing knowledge and support faculty who may not have formal training in computer science. The first version of the OCCTIVE website can be found [here](https://occtive.github.io/www/index.html).

Please keep in mind that this project is on-going and subject to change.

## Project Goals

- **Support non-CS faculty**: Provide ready-to-use videos and materials to help integrate computing into non-computing courses.
- **Expand student access**: Help students in all majors gain exposure to core computing concepts relevant to their fields.
- **Facilitate peer tutoring and self-study**: Serve as a learning resource for both students and peer tutors.
- **Measure impact**: Collect data to assess how the video library influences learning outcomes and instructional practices.


## Development Process

This project reuses the React + TypeScript-based infrastructure of ComputingPaths.

ComputingPaths uses Netlify for live site and staging previews, but this has not been implemented for OCCTIVE yet.

## Editing Content

To contribute or edit the OCCTIVE site content:

- Refer to the ComputingPaths [Content and Development Guide](https://docs.google.com/document/d/1oJeoiLy2kp-hF9ntmxVzWUoYXXmplfEFkj459G5BRE0/edit). The OCCTIVE content guide will be created and shared once development is complete.
- Most changes will occur in the `/components`, `/content`, and `/pages` directories


## Style and Conventions

Please make your branch names follow the format `yourname/whatyourworkingon`. For example, if I'm going to be updating the stories page, I'd make my branch called `melvyn/add-video-library-page`.

We require you to use **functional** components, and to define required props using an **interface**. [This guide](https://www.pluralsight.com/guides/use-interface-props-in-functional-components-using-typescript-with-react) can provide some more context.

### Fixing Bugs
If you're working on a PR and notice a related bug, feel free to fix that bug within the same current PR if it's too much of a hassle to separate it into a separate PR. We'd rather you fix a bug + complete a feature than only complete a feature + never fix the bug.

### CSS Class Names
Prefix all classnames with the component you're in. For example, if you are adding css classes for elements inside the Stories page, prefix all class names with `story-page`.

**Example**
```tsx
const StoryCard: React.FC<StoryCardProps> = ({photoURL, authorName, headingText}) => (
	<div className="story-card">
		<img className="story-card-photo left" src={photoURL} alt={`${authorName || 'Story Card'}`} />}
		<div>
			{<p className="story-card-heading">{headingText}</p>}
		</div>
)
```

You can then take advantage of Sass language features to make your `.scss` file look like this:

```scss
.story-card {
  display: flex;
  margin: 4rem 0;

  &-photo {
    flex-shrink: 0;
    height: 15.0625rem;
    width: 17.75rem;

    &.left {
      margin-right: 3rem;
    }

    &.right {
      margin-left: 3rem;
    }
  }

  &-heading {
    @include font-heading-3;
  }
}
```

## License and Funding
OCCTIVE is supported by the NSF IUSE: EDU Program and aligns with its mission to improve the effectiveness of STEM education for all students.