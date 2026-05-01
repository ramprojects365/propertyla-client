import { ITestimonialIDT } from "@/types/testimonial-d-t";
//home testimonial image
import userImg1 from "../../public/assets/img/rent/rent-user-4.png";
import userImg2 from "../../public/assets/img/rent/rent-user-4.png";
import userImg3 from "../../public/assets/img/rent/rent-user-4.png";

//home three testimonial image
import image1 from "../../public/assets/img/testimonial/home-3/testimonial-3-1.png";
import image2 from "../../public/assets/img/testimonial/home-3/testimonial-3-2.png";

export const testimonials_home: ITestimonialIDT[] = [
  {
    id: 1,
    description:
      "PropertyLa made it so easy to find my dream condo in Kuala Lumpur! I found and moved into my new place in less than two weeks!",
    image: userImg1,
    name: "Amira Dep",
    role: "Kuala Lumpur",
  },
  {
    id: 2,
    description:
      "As a first-time homebuyer, I was nervous, but PropertyLa’s detailed listings and location insights helped me make an informed choice.",
    image: userImg2,
    name: "Wang Lee",
    role: "Penang",
  },
  {
    id: 3,
    description:
      "I loved how I could compare nearby condos and check amenities like swimming pool and gym easily. The site is very user-friendly!",
    image: userImg3,
    name: "adia S",
    role: "Petaling Jaya",
  },
  {
    id: 4,
    description:
      "I listed my apartment for rent and received genuine inquiries within days. The platform’s quality leads saved me so much time.",
    image: userImg2,
    name: "Siti Nur A",
    role: "Johor Bahru",
  },
];

export const testimonial_three_data: ITestimonialIDT[] = [
  {
    id: 5,
    image: image1,
    name: "Richard Drevid",
    description: `Whether you’re looking for a single-family home high-rise apartment, or something in between we’ll help you find it.`,
  },
  {
    id: 6,
    image: image2,
    name: "Liza Olivares",
    description: `Whether you’re looking for a single-family home high-rise apartment, or something in between we’ll help you find it.`,
  },
  {
    id: 7,
    image: image1,
    name: "Richard Drevid",
    description: `Whether you’re looking for a single-family home high-rise apartment, or something in between we’ll help you find it.`,
  },
  {
    id: 8,
    image: image2,
    name: "Liza Olivares",
    description: `Whether you’re looking for a single-family home high-rise apartment, or something in between we’ll help you find it.`,
  },
];

export const testimonial_data = [
  ...testimonials_home,
  ...testimonial_three_data,
];
