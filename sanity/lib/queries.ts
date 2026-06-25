export const HOME_QUERY = /* groq */ `{
  "siteConfig": *[_type == "siteConfig"][0]{
    name, logo, whatsappNumber, whatsappMessage, instagram, city,
    hero, metaTitle, metaDescription, ogImage
  },
  "projects": *[_type == "project"] | order(order asc){
    _id, title, category,
    cover{..., "lqip": asset->metadata.lqip},
    "gallery": gallery[]{..., "lqip": asset->metadata.lqip},
    order
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
