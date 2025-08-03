// Shopify Configuration
// Update these values with your actual Shopify store information

const SHOPIFY_CONFIG = {
    // Your Shopify store URL (replace with your actual store URL)
    storeUrl: 'kwr3tv-ax.myshopify.com',
    
    // Your Shopify Storefront API access token
    // Get this from your Shopify admin: Settings > Apps and sales channels > Develop apps > Create an app > API credentials
    accessToken: 'e318cfe2b56703f779f113ed17e8459c',
    
    // API version (update as needed)
    apiVersion: '2024-01',
    
    // Currency conversion rate (USD to DZD)
    // Update this rate as needed
    usdToDzdRate: 135,
    
    // Default product image if none is available
    defaultImage: 'https://via.placeholder.com/400x400?text=No+Image',
    
    // Default rating if no reviews are available
    defaultRating: 4.5,
    defaultReviewCount: 0,
    
    // Feature mapping for product tags
    // Add more mappings as needed for your products
    featureMapping: {
        'processor': { icon: 'fas fa-microchip', text: 'High Performance' },
        'camera': { icon: 'fas fa-camera', text: 'Advanced Camera' },
        'design': { icon: 'fas fa-shield-alt', text: 'Premium Design' },
        'battery': { icon: 'fas fa-battery-full', text: 'Long Battery Life' },
        '5g': { icon: 'fas fa-wifi', text: '5G Ready' },
        'display': { icon: 'fas fa-tv', text: 'High-Quality Display' },
        'storage': { icon: 'fas fa-hdd', text: 'Large Storage' },
        'security': { icon: 'fas fa-shield-alt', text: 'Advanced Security' },
        'fast-charging': { icon: 'fas fa-bolt', text: 'Fast Charging' },
        'wireless-charging': { icon: 'fas fa-charging-station', text: 'Wireless Charging' }
    },
    
    // Default features if no tags are found
    defaultFeatures: [
        { icon: 'fas fa-microchip', text: 'High Performance' },
        { icon: 'fas fa-camera', text: 'Advanced Camera' },
        { icon: 'fas fa-shield-alt', text: 'Premium Design' },
        { icon: 'fas fa-battery-full', text: 'Long Battery Life' },
        { icon: 'fas fa-wifi', text: '5G Ready' },
        { icon: 'fas fa-tv', text: 'High-Quality Display' }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHOPIFY_CONFIG;
} else {
    window.SHOPIFY_CONFIG = SHOPIFY_CONFIG;
} 