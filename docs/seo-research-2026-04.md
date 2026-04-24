# SEO Research & Action Plan -- Aidxn Design (aidxn.com)
**Date:** 25 April 2026
**Author:** Aiden Wood + Claude research

---

## 1. Competitor Analysis: Gold Coast Web Design

### Top 5 Competitors (by search visibility for "web design gold coast")

| Agency | URL | Est. | Key Differentiator | Blog? |
|---|---|---|---|---|
| **Five by Five** | fivebyfive.com.au | ~2007 | 3,000+ projects, wrote a book ("Love At First Site"), SEO-focused service pages for dentists/Sydney/etc. | Yes -- practical guides (homepage tips, design briefs, integrated marketing) |
| **Thrive Digital** | thriveweb.com.au | ~2004 | 20+ years, WooCommerce Platinum cert, hand-coded sites | Yes -- WooCommerce, content marketing, branding |
| **White Peak Digital** | whitepeakdigital.com | 2015 | Award-winning, heavy WordPress content | Yes -- massive blog (WordPress guides, pSEO, blog writing for SEO, CMS comparisons) |
| **Creative Ground** | creativeground.com.au | 2007 | Enterprise/govt clients, WordPress | Light |
| **Jimmyweb** | jimmyweb.net | 2003 | 20+ years, custom builds | Light |

### What Competitors Are Doing That You're Not

1. **White Peak Digital** is the content king. They publish high-volume SEO-optimized guides: "WordPress Pricing Plans 2026", "Top 10 WordPress Alternatives", "How to Write a Blog Post for SEO", "What is Programmatic SEO". These are classic top-of-funnel blog posts that capture informational intent and funnel readers to services. Aidxn has 3 blog posts.

2. **Five by Five** creates niche service pages: "SEO for Dentists", "SEO Sydney", industry-specific landing pages. Each one is a rankable asset. Aidxn has suburb-level pages implicitly (ranking for Helensvale, Paradise Point etc.) but no dedicated suburb or industry landing pages.

3. **Every major competitor** uses WordPress. This is actually an advantage for Aidxn -- Astro's performance is measurably superior (60% of Astro sites score "Good" on Core Web Vitals vs 38% for WordPress). This is a talking point that should be front and center in content.

---

## 2. The blog.aidxn.com Problem (Critical -- Fix First)

### The Numbers
- `blog.aidxn.com/posts/conversion-focused-design/` -- **1,503 impressions, 0 clicks**
- `blog.aidxn.com/posts/velocity-performance-benchmarks/` -- **147 impressions, 0 clicks**
- Multiple other blog.aidxn.com posts getting impressions with 0 clicks

### Why This Is Happening
1. **Subdomain dilution.** Google treats blog.aidxn.com as a separate site. All that authority is NOT flowing to aidxn.com.
2. **Title/meta tags are weak.** The conversion-focused-design post title in search results is generic ("Conversion-focused web design for your industry and niche") with no location, no hook, no differentiation.
3. **No schema markup, no dates, no author.** Search results show bare-bones entries that don't invite clicks.

### What To Do

**Step 1: Migrate content from blog.aidxn.com to aidxn.com/blog/** (already started -- you have 3 posts there)

Posts to migrate and rewrite:
- `conversion-focused-design/` --> `/blog/conversion-focused-web-design` (rewrite with 2026 data, case studies, actual metrics)
- `velocity-performance-benchmarks/` --> `/blog/velocity-performance-benchmarks` (update benchmarks to Velocity 9)
- `ecommerce-design-tricks/` --> `/blog/ecommerce-web-design-gold-coast`
- `viral-marketing-strategies/` --> `/blog/50k-sales-zero-ad-spend-case-study` (this is gold -- case study format)
- `how-web-design-went-from-table-based-hell...` --> `/blog/evolution-of-web-design`
- `improve-website-speed-with-velocity/` --> `/blog/website-speed-conversion-rate`
- `10-reasons-to-leave-web2...` --> `/blog/why-website-speed-matters`

**Step 2: Set up 301 redirects from blog.aidxn.com to aidxn.com/blog/**

Every old URL needs a permanent redirect. This preserves whatever link equity exists and tells Google the content moved.

**Step 3: Rewrite titles and meta descriptions for CTR**

Bad: "Conversion-focused web design for your industry and niche"
Good: "Conversion-Focused Web Design: 7 Principles That Actually Drive Sales (2026)"

Bad: "Velocity performance benchmarks"
Good: "Velocity vs WordPress: Real Performance Benchmarks (60% Faster Load Times)"

---

## 3. The "Conversion Focused Web Design" Keyword Cluster (Biggest Opportunity)

### Current State
- "conversion focused web design" -- 704 impressions, position 53
- "conversion-focused web design" -- 482 impressions, position 55
- "conversion-focused website design" -- 131 impressions, position 62
- **Combined: ~1,300+ impressions/month at position 50-62 with 0 clicks**

### Why You're Not Ranking
1. The content sitting at position 53 is on `blog.aidxn.com` (subdomain, weak authority)
2. The existing blog post is thin -- generic advice with no original data, no case studies, no benchmarks
3. Competitors ranking top 10 include Leadpages, Shopify, WebFX, VWO -- these are massive domains with deep, data-rich content
4. Your `aidxn.com/blog/conversion-focused-design-for-your-niche` is essentially the same content but on the main domain

### The Play: Create a Pillar Page

Build a definitive guide at `aidxn.com/blog/conversion-focused-web-design` (or `aidxn.com/web-design/conversion-focused`) that is genuinely the best resource on the internet for this topic. This is your highest-ROI content investment.

**What the pillar page needs:**
1. **Original data.** Pull real metrics from client sites -- bounce rate changes, conversion rate improvements, load time comparisons. "We rebuilt Site X and conversions went from 1.2% to 4.8%."
2. **Velocity as proof.** Show Core Web Vitals scores. Show Lighthouse screenshots. "Our Astro-based framework scores 100/100 on Lighthouse SEO while the average WordPress site scores 72."
3. **Visual examples.** Before/after screenshots. Heatmap comparisons. Funnel diagrams.
4. **Structured for AI Overviews.** Use bolded key definitions at the top. Use FAQ schema. Google's AI Overviews pull from well-structured content.
5. **Internal links** to your sub-service pages: `/web-design/conversion-optimisation`, `/web-design/pageload-optimisation`, `/web-design/ux-design`
6. **2,500-4,000 words.** The pages ranking top 10 for this term are all comprehensive guides.
7. **FAQ section** with schema markup targeting long-tail queries: "What is conversion focused web design?", "How much does conversion focused web design cost?", "Does website speed affect conversion rate?"

### Supporting Content Cluster
Write 5-7 blog posts that link back to the pillar:
- "Conversion Rate vs Traffic: Why 1,000 Visitors Can Beat 10,000"
- "Website Speed and Conversion Rate: The Data (2026)"
- "Why Your Gold Coast Business Needs a Conversion-Focused Website"
- "Astro vs WordPress: Performance Benchmarks for Australian Business Websites"
- "How We Increased [Client]'s Leads by 300% With Design Changes"
- "Landing Page Design Mistakes That Kill Your Conversion Rate"

---

## 4. Local SEO: Suburb Rankings (Quick Wins)

### Current State
You're ranking position 1-3 for several suburbs but getting 0 clicks:
- "web design paradise point" -- pos 1, 44 impressions, 0 clicks
- "web design helensvale" -- pos 1, 37 impressions, 0 clicks
- "web design upper coomera" -- pos 1, 32 impressions, 0 clicks
- "web design oxenford" -- pos 3.23, 111 impressions, 0 clicks

### Why 0 Clicks at Position 1
1. **Low search volume.** These are very long-tail -- 30-110 impressions/month means maybe 1-4 searches/day. At position 1, you'd expect a 30-40% CTR, but with such low volume, you can easily get 0 in a given month.
2. **No dedicated landing pages.** When someone searches "web design helensvale", they're probably landing on your homepage or a generic service page. There's no page that says "Web Design in Helensvale" in the title tag. Creating suburb pages will dramatically improve CTR.
3. **Google Business Profile may be weak.** Local pack results (the map) dominate these searches. If your GBP isn't optimized with reviews, photos, and posts, the organic ranking doesn't matter.

### Action Plan

**Create 8-10 suburb landing pages** at `/web-design/[suburb]`:
- `/web-design/helensvale`
- `/web-design/paradise-point`
- `/web-design/upper-coomera`
- `/web-design/oxenford`
- `/web-design/coombabah`
- `/web-design/robina`
- `/web-design/burleigh-heads`
- `/web-design/surfers-paradise`
- `/web-design/broadbeach`
- `/web-design/southport`

Each page should:
- Have a unique H1: "Web Design in Helensvale | Custom Websites by Aidxn Design"
- Include 300-500 words of unique content mentioning the suburb and surrounding areas
- Reference local businesses or industries common in that area
- Link to case studies / portfolio work
- Include a CTA to book a discovery call
- Include LocalBusiness schema markup with your address

**Important:** These pages should NOT be thin doorway pages. Each needs genuine unique content. Talk about the local business landscape, the types of businesses you serve in that area, include a testimonial from a nearby client if possible.

**Also optimize Google Business Profile:**
- Add 5+ recent photos monthly
- Post Google Business updates weekly
- Actively request reviews from past clients
- Make sure NAP (Name, Address, Phone) is consistent everywhere

---

## 5. Blog Content Strategy: The Fireship Model

### What Fireship Does Right
Jeff Delaney's Fireship (4M+ subscribers) succeeds because:
1. **Opinionated and fast.** No fluff. Strong takes. Sub-5-minute videos.
2. **"100 Seconds of Code"** format -- impossibly compressed explanations that hook people.
3. **"Code Report"** -- tech news with personality and humor.
4. **Makes complex things feel accessible** without dumbing them down.

### How to Apply This to Aidxn's Blog
You don't need to be Fireship. But you can steal the energy.

**Format: "The Build Report"** -- a recurring blog series (bi-weekly or monthly)
- Short (600-1,000 words)
- Opinionated takes on web/design/AI news
- What it means for Gold Coast businesses
- Always links back to a service page

**Example titles:**
- "Google's New AI Search Just Made Your WordPress Site Invisible"
- "Why 90% of Gold Coast Business Websites Are Too Slow in 2026"
- "I Rebuilt a Client's Site in Astro and Load Time Went From 4.2s to 0.8s"
- "The $50k Question: Does Your Website Actually Generate Leads?"
- "AI Website Builders vs Custom Development: An Honest Comparison"

The key insight from Fireship: **be the person with opinions, not the person with information.** Information is free. Perspective is valuable. Every Gold Coast agency blog reads like it was written by a committee. Yours should read like it was written by a developer who actually builds things.

---

## 6. New Blog Posts: Priority Content Calendar

### Tier 1: Publish Within 30 Days (Highest Impact)

| Post | Target Keyword | Type | Words |
|---|---|---|---|
| Conversion-Focused Web Design: The Complete Guide (2026) | conversion focused web design | Pillar | 3,000-4,000 |
| Astro vs WordPress: Performance Benchmarks for Australian Businesses | astro vs wordpress, wordpress alternatives | Comparison | 2,000-2,500 |
| $50k in Sales With $0 Ad Spend: How We Did It | viral marketing, organic marketing case study | Case Study | 1,500-2,000 |

### Tier 2: Publish Within 60 Days

| Post | Target Keyword | Type | Words |
|---|---|---|---|
| Website Speed and Conversion Rate: The Data (2026) | website speed conversion rate | Data-driven | 1,500-2,000 |
| Why Gold Coast Businesses Are Switching From WordPress to Astro | web design gold coast, wordpress alternative | Local + Comparison | 1,500 |
| How AI Is Changing Web Design in 2026 (And What It Can't Do) | AI web design 2026 | Thought leadership | 1,500 |
| What Does a Custom Website Cost on the Gold Coast in 2026? | web design cost gold coast, website cost australia | Commercial intent | 2,000 |

### Tier 3: Ongoing (Monthly)

| Post | Target Keyword | Type | Words |
|---|---|---|---|
| The Build Report (recurring series) | various long-tail | News/Opinion | 600-1,000 |
| E-Commerce Design Mistakes Killing Your Sales | ecommerce web design | How-to | 1,500 |
| Local SEO for Gold Coast Businesses: The 2026 Guide | local SEO gold coast | Guide | 2,000 |
| How to Write a Website Brief That Gets Results | website design brief | Top-of-funnel | 1,500 |
| Shopify vs Custom: When to Use Each | shopify vs custom website | Comparison | 1,500 |

---

## 7. Technical SEO Fixes (Do These Now)

### Missing From the Current Site

1. **No structured data / JSON-LD.** Add the following schema types:
   - `LocalBusiness` on every page (name, address, phone, geo coords, opening hours)
   - `WebSite` with SearchAction on homepage
   - `Article` / `BlogPosting` on all blog posts (author, datePublished, dateModified)
   - `FAQPage` on service pages and relevant blog posts
   - `BreadcrumbList` on all inner pages

2. **No Open Graph title/description overrides.** The layout has `og:image` but no `og:title`, `og:description`, or `og:type`. Add them.

3. **Title tag optimization.** Current titles are too short and miss keywords:
   - Current: "Web Design . Aidxn" --> Better: "Web Design Gold Coast | Custom Conversion-Focused Websites | Aidxn Design"
   - Current: "Aidxn Design | Full-Stack Web Design & Development | Gold Coast" --> Good, but should lead with the primary keyword: "Gold Coast Web Design & Development | Aidxn Design"

4. **Meta descriptions need work.** The homepage description is solid. The web-design page says "Web Design for Velocity, Shopify and Wordpress..." -- nobody is searching for "web design for velocity." Lead with benefit + location: "Custom web design on the Gold Coast built for speed and conversions. Astro-powered sites that load in under 1 second. 120+ projects delivered."

5. **Add `hreflang` tags** if you want to rank in AU specifically (you're getting US/UK impressions but not converting them). At minimum: `<link rel="alternate" hreflang="en-AU" href="..." />` and `<link rel="alternate" hreflang="x-default" href="..." />`

6. **Blog post dates.** Your blog posts have no visible publication date and no `datePublished` in metadata. Google rewards fresh content. Add dates.

7. **Internal linking.** Your blog posts don't link to service pages enough. Every blog post about conversion design should link to `/web-design/conversion-optimisation`. Every post about speed should link to `/web-design/pageload-optimisation`.

---

## 8. Quick Win: Improve CTR With Better SERP Appearance

Even without changing rankings, you can increase clicks by improving how your pages appear in search results.

1. **Add FAQ schema to service pages.** This creates expandable FAQ dropdowns in search results, taking up more visual space.

2. **Add review/rating schema** if you have Google reviews. This adds stars to your search listing.

3. **Write compelling meta descriptions** with a call to action. End with "Book a free discovery call" or "See our portfolio."

4. **Add dates to blog posts.** Posts with dates get higher CTR because they signal freshness.

5. **Use numbers and brackets in titles.** "[2026 Guide]", "7 Principles", "$50k Case Study" -- these patterns consistently improve CTR by 15-30%.

---

## 9. International Traffic: What To Do With US/UK/Canada

### Current State
- US: 1,482 impressions, 0 clicks
- Canada: 211 impressions, 0 clicks
- UK: 186 impressions, 0 clicks
- Australia: 629 impressions, 5 clicks

### Decision Point
The international impressions are almost entirely from the "conversion focused web design" keyword cluster via blog.aidxn.com. You have two options:

**Option A: Ignore international, focus on AU.** Use `hreflang` to signal AU targeting. The international traffic is unlikely to convert to paying clients since you're a Gold Coast agency. Focus energy on local keywords.

**Option B: Capture international leads for productized services.** If you ever want to sell Velocity templates, Astro development services, or digital products remotely, write content that targets these international queries without the "Gold Coast" qualifier. The conversion-focused-design pillar page could serve both audiences.

**Recommendation: Option A now, keep Option B in mind.** Your immediate revenue comes from Gold Coast clients. Don't dilute local signals chasing international rankings. But when you write the conversion-focused pillar page, make it genuinely excellent -- if it ranks well internationally, that's brand awareness for free.

---

## 10. Summary: Top 10 Actions in Priority Order

1. **Migrate blog.aidxn.com content to aidxn.com/blog/** with 301 redirects. The conversion-focused post alone has 1,500 impressions going to waste.

2. **Rewrite the conversion-focused blog post** as a comprehensive 3,000+ word pillar page with original data, Velocity benchmarks, case studies, and FAQ schema.

3. **Add JSON-LD structured data** (LocalBusiness, Article, FAQ, Breadcrumb) to all pages. This is table-stakes SEO that every competitor has and you don't.

4. **Rewrite title tags and meta descriptions** for all service pages. Lead with keywords and location. End meta descriptions with CTAs.

5. **Create 5-8 suburb landing pages** for Gold Coast suburbs you're already ranking for (Helensvale, Paradise Point, Upper Coomera, Oxenford) plus high-value suburbs (Robina, Surfers Paradise, Broadbeach).

6. **Publish the "Astro vs WordPress" comparison post.** This differentiates you from every WordPress-based competitor on the Gold Coast and targets a keyword cluster with commercial intent.

7. **Add OG tags, dates, and author info** to all blog posts.

8. **Publish the "$50k with $0 ad spend" case study.** Case studies convert. This is sitting on the old blog doing nothing.

9. **Start "The Build Report"** monthly blog series -- opinionated, Fireship-energy takes on web/design/AI news. Builds authority over time.

10. **Optimize Google Business Profile** with fresh photos, weekly posts, and actively solicit client reviews.

---

## Appendix: Keyword Targets

### High Priority (Track These)
| Keyword | Monthly Volume (est.) | Current Position | Target Position |
|---|---|---|---|
| conversion focused web design | ~400-600 | 53 | Top 10 |
| conversion-focused web design | ~300-500 | 55 | Top 10 |
| web design gold coast | ~1,000+ | Not ranking | Top 20 |
| website development gold coast | ~200-400 | 48 | Top 20 |
| web design oxenford | ~30-50 | 3 | 1 |
| custom web design | ~100-200 | 1 | 1 (maintain) |
| astro vs wordpress | ~500+ | Not ranking | Top 20 |
| website cost gold coast | ~100-200 | Not ranking | Top 10 |

### Long-Tail Targets (Blog Content)
- conversion focused website design
- website speed and conversion rate
- how much does a website cost in australia 2026
- best website framework for SEO
- web design for small business gold coast
- ecommerce web design gold coast
- local SEO gold coast
- AI web design 2026
- wordpress alternatives for business websites

### Local Suburb Targets
- web design helensvale (maintain pos 1)
- web design paradise point (maintain pos 1)
- web design upper coomera (maintain pos 1)
- web design coombabah (improve from 18 to top 5)
- web design robina (new target)
- web design surfers paradise (new target)
- web design broadbeach (new target)
- web design southport (new target)
