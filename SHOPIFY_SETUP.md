# Shopify Integration Setup Guide

This guide will help you set up the Shopify integration for the product page.

## 🚀 Quick Setup

### 1. Configure Shopify Settings

Edit `shopify-config.js` and update the following values:

```javascript
const SHOPIFY_CONFIG = {
    // Replace with your actual Shopify store URL
    storeUrl: 'your-store.myshopify.com',
    
    // Replace with your Shopify Admin API access token
    accessToken: 'your-access-token',
    
    // Update the currency conversion rate as needed
    usdToDzdRate: 135,
    
    // ... other settings
};
```

### 2. Get Your Shopify Access Token

1. **Go to your Shopify Admin**
   - Log in to your Shopify store admin panel

2. **Navigate to Apps**
   - Go to Settings > Apps and sales channels

3. **Create a Private App**
   - Click "Develop apps" (or "Manage private apps" in older versions)
   - Click "Create an app"
   - Give your app a name (e.g., "Product API Access")

4. **Configure API Permissions**
   - Go to "API credentials"
   - Under "Admin API access scopes", select:
     - `read_products` (to read product data)
     - `read_product_listings` (if you want to read published products only)

5. **Install the App**
   - Click "Install app"
   - Copy the "Admin API access token"

6. **Update Configuration**
   - Paste the access token in `shopify-config.js`

### 3. Test the Integration

1. **Get a Product ID**
   - Go to your Shopify admin
   - Navigate to Products
   - Click on any product
   - Copy the product ID from the URL (it's the number after `/products/`)

2. **Test the Product Page**
   - Open `product-in.html?id=YOUR_PRODUCT_ID`
   - Replace `YOUR_PRODUCT_ID` with an actual product ID from your store

## 📋 Features

### ✅ What's Implemented

- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful error messages with retry options
- **Dynamic Content**: All product data loads from Shopify
- **Image Gallery**: Supports multiple product images
- **Key Features**: Extracted from product tags
- **Price Conversion**: Automatic USD to DZD conversion
- **Responsive Design**: Works on all devices
- **Dark Mode Support**: Full dark mode compatibility

### 🎯 Product Data Mapping

The system automatically maps the following Shopify data:

| Shopify Field | Display Location |
|---------------|------------------|
| `product.title` | Product name, breadcrumb |
| `product.body_html` | Description tab |
| `product.images` | Main image and thumbnails |
| `product.variants[0].price` | Product price |
| `product.tags` | Key features (mapped to icons) |

### 🔧 Customization Options

#### Feature Mapping

Add new feature mappings in `shopify-config.js`:

```javascript
featureMapping: {
    'processor': { icon: 'fas fa-microchip', text: 'High Performance' },
    'camera': { icon: 'fas fa-camera', text: 'Advanced Camera' },
    // Add your custom tags here
    'your-tag': { icon: 'fas fa-icon', text: 'Your Feature' }
}
```

#### Default Features

If no tags are found, these features will be displayed:

```javascript
defaultFeatures: [
    { icon: 'fas fa-microchip', text: 'High Performance' },
    { icon: 'fas fa-camera', text: 'Advanced Camera' },
    // ... more features
]
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Please configure your Shopify store URL"**
   - Update `storeUrl` in `shopify-config.js`

2. **"Please configure your Shopify access token"**
   - Update `accessToken` in `shopify-config.js`

3. **"Product ID not found"**
   - Make sure you're passing a product ID in the URL: `?id=123`

4. **"Failed to load product data"**
   - Check your internet connection
   - Verify the product ID exists in your store
   - Ensure your access token has the correct permissions

### Debug Mode

Add this to your browser console to see detailed logs:

```javascript
localStorage.setItem('debug', 'true');
```

## 🔒 Security Notes

- **Never commit your access token** to version control
- **Use environment variables** in production
- **Limit API permissions** to only what's needed
- **Regularly rotate** your access tokens

## 📱 URL Structure

The product page expects URLs in this format:

```
product-in.html?id=PRODUCT_ID
```

Example:
```
product-in.html?id=123456789
```

## 🎨 Customization

### Styling

All styles use Tailwind CSS classes. You can customize:

- Colors: Update the blue/gray color scheme
- Layout: Modify the grid structure
- Animations: Adjust the loading animations

### Content

- **Product descriptions**: Come from Shopify `body_html`
- **Features**: Mapped from product tags
- **Specifications**: Currently static (can be made dynamic with metafields)
- **Reviews**: Currently static (can integrate with Shopify reviews)

## 🚀 Next Steps

1. **Set up your Shopify store URL and access token**
2. **Test with a real product ID**
3. **Customize the feature mappings for your products**
4. **Add product tags in Shopify** to populate key features
5. **Consider adding metafields** for detailed specifications

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Shopify configuration
3. Test with a different product ID
4. Ensure your access token has the correct permissions

---

**Note**: This integration uses the Shopify Admin API. For production use, consider implementing the Storefront API for better performance and security. 