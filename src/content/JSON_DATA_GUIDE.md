# JSON-Driven Content System Guide

## Overview
This system allows you to quickly build and manage website content using JSON data files, inspired by the immersive-lighting-v9 project pattern. It's designed to make creating small business websites faster and more maintainable.

## Core JSON Files

### 1. `products.json`
Contains all product and service data organized by category.

**Structure:**
```json
{
  "webDesign": [...],
  "digitalMarketing": [...],
  "graphicDesign": [...],
  "moonshotPlan": [...]
}
```

**Product Object Fields:**
- `id`: Unique identifier
- `name`: Product name
- `category`: Category label
- `shortDescription`: Brief description for cards
- `description`: Full description
- `price`: Numeric price
- `currency`: Currency code
- `priceNote`: Additional pricing info (e.g., "+ GST")
- `featured`: Boolean for highlighting
- `image`: Product image path
- `link`: Learn more link
- `buyLink`: Purchase link
- `highlights`: Array of key features
- `features`: Complete feature list
- `tags`: Array of tags for filtering

### 2. `pricing.json`
Defines pricing tiers and plans for all services.

**Structure:**
```json
{
  "velocityPlans": { ... },
  "wordpressPlans": { ... },
  "shopifyPlans": { ... },
  "digitalMarketingPlans": {
    "googleAds": { ... },
    "facebookAds": { ... }
  }
}
```

### 3. `page-templates.json`
Templates for dynamic page building.

**Available Templates:**
- `servicePage`: Standard service page layout
- `landingPage`: High-converting landing page
- `productShowcase`: Product grid display

## Components

### ProductSlider
Displays products in a carousel format.

**Usage:**
```astro
<ProductSlider 
  category="webDesign"     // Filter by category
  featured={true}          // Show only featured
  limit={6}                // Max items to show
  title="Our Services"     // Section title
  description="..."        // Section description
/>
```

### DynamicPricingTable
Renders pricing tables from JSON data.

**Usage:**
```astro
<DynamicPricingTable 
  planType="velocityPlans"  // Which pricing plan to show
  columns={3}               // Number of columns
/>
```

### DynamicPageBuilder
Assembles complete pages from JSON templates or custom sections.

**Usage with Template:**
```astro
<DynamicPageBuilder 
  template="servicePage"
  data={{
    service: {
      name: "Web Design",
      category: "webDesign",
      // ... other data
    }
  }}
/>
```

**Usage with Custom Sections:**
```astro
<DynamicPageBuilder 
  sections={[
    {
      type: "productSlider",
      props: {
        category: "digitalMarketing",
        featured: true
      }
    },
    {
      type: "pricing",
      props: {
        planType: "googleAds"
      }
    }
  ]}
/>
```

## Quick Start Guide

### Adding a New Product/Service

1. Open `src/content/products.json`
2. Find the appropriate category
3. Add your product object:

```json
{
  "id": "new-service",
  "name": "New Service Name",
  "category": "Web Design",
  "shortDescription": "Brief description",
  "description": "Full description...",
  "price": 1999,
  "currency": "AUD",
  "priceNote": "+ GST",
  "featured": false,
  "image": "/assets/service-image.webp",
  "link": "/services/new-service",
  "buyLink": "https://buy.stripe.com/...",
  "highlights": [
    "Key feature 1",
    "Key feature 2"
  ],
  "features": [
    "Complete feature 1",
    "Complete feature 2"
  ],
  "tags": ["tag1", "tag2"]
}
```

### Creating a New Service Page

1. Create a new `.astro` file in `src/pages/`
2. Import the components:

```astro
---
import Layout from '../layouts/Layout.astro';
import ProductSlider from '../components/products/ProductSlider.astro';
import DynamicPricingTable from '../components/dynamic/DynamicPricingTable.astro';
---

<Layout title="Service Name">
  <ProductSlider category="webDesign" featured={true} />
  <DynamicPricingTable planType="velocityPlans" />
</Layout>
```

### Updating Pricing

1. Open `src/content/pricing.json`
2. Find the relevant plan section
3. Update prices, features, or add new plans
4. Changes reflect immediately in all pricing tables

## Benefits

1. **Fast Updates**: Change content without touching code
2. **Consistency**: All data in centralized locations
3. **Reusability**: Components can be used anywhere
4. **Scalability**: Easy to add new products/services
5. **Maintainability**: Non-developers can update content

## Example Pages

- `/products-showcase`: Full demonstration of all components
- `/pricing`: Dynamic pricing tables
- `/services`: Product sliders by category

## Best Practices

1. Keep product descriptions concise for cards
2. Use consistent image sizes (recommended: 800x600px)
3. Limit highlights to 3-4 key points
4. Test Stripe buy links before publishing
5. Use meaningful IDs for products
6. Keep JSON files organized and formatted

## Extending the System

To add new component types to the page builder:

1. Create the component in `src/components/`
2. Import it in `DynamicPageBuilder.astro`
3. Add to the `componentMap` object
4. Define default props in `page-templates.json`

This system provides a flexible foundation for rapidly building and maintaining small business websites with consistent, professional results.