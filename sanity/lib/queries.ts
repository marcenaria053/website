export const HOME_QUERY = /* groq */ `{
  "siteConfig": *[_type == "siteConfig"][0]{
    name, logo, whatsappNumber, whatsappMessage, instagram, city,
    metaTitle, metaDescription, ogImage
  },
  "featuredProject": *[_type == "project" && featured == true]
    | order(order asc)[0]{
      _id, title, "slug": slug.current, category,
      cover{..., "lqip": asset->metadata.lqip},
      "gallery": gallery[]{..., "lqip": asset->metadata.lqip},
      description, featured, order
    },
  "projects": *[_type == "project"] | order(order asc){
    _id, title, "slug": slug.current, category,
    cover{..., "lqip": asset->metadata.lqip},
    "gallery": gallery[]{..., "lqip": asset->metadata.lqip},
    description, featured, order
  },
  "services": *[_type == "service"] | order(order asc){
    _id, name, description, icon, order
  },
  "testimonials": *[_type == "testimonial"]{
    _id, clientName, city, quote,
    avatar{..., "lqip": asset->metadata.lqip}
  },
  "about": *[_type == "about"][0]{
    photo{..., "lqip": asset->metadata.lqip},
    body, yearsOfExperience, projectsDelivered, highlights
  }
}`;
