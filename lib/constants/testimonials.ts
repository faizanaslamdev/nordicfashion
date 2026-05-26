export interface PromoTestimonial {
  quote: string;
  author: string;
}

export const PROMO_TESTIMONIALS: PromoTestimonial[] = [
  {
    quote:
      'Finally, a tool that helps me shop smarter without the noise — real price insights, not ads. Whether it\'s everyday fashion or a splurge, I know I\'m buying at the right time.',
    author: 'Ari L.',
  },
  {
    quote:
      'I used to open ten tabs to compare prices. Now I check clea.no once and know which store is actually cheapest — it saves me time every week.',
    author: 'Sofia M.',
  },
  {
    quote:
      'The collections feature is perfect for wishlists. I get a clear view of what dropped and what\'s still full price before I buy.',
    author: 'Jonas K.',
  },
  {
    quote:
      'Clean, fast, and no clutter. It feels built for how I actually shop online — browse, compare, then decide with confidence.',
    author: 'Ella R.',
  },
];

/** Auto-advance interval for promo testimonial rotator (ms). */
export const PROMO_TESTIMONIAL_ROTATE_MS = 6500;
