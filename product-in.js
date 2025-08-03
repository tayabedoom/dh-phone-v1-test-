// Language translations
const translations = {
    en: {
        'home': 'Home',
        'products': 'Products',
        'contact': 'Contact',
        'add-to-cart': 'Add to Cart',
        'add-to-wishlist': 'Add to Wishlist',
        'related-products': 'Related Products'
    },
    fr: {
        'home': 'Accueil',
        'products': 'Produits',
        'contact': 'Contact',
        'add-to-cart': 'Ajouter au Panier',
        'add-to-wishlist': 'Ajouter aux Favoris',
        'related-products': 'Produits Similaires'
    },
    ar: {
        'home': 'الرئيسية',
        'products': 'المنتجات',
        'contact': 'اتصل بنا',
        'add-to-cart': 'أضف إلى السلة',
        'add-to-wishlist': 'أضف إلى المفضلة',
        'related-products': 'المنتجات ذات الصلة'
    }
};

// Initialize language
let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update language display
    document.getElementById('current-language').textContent = lang.toUpperCase();
    document.getElementById('mobile-current-language').textContent = lang.toUpperCase();
    
    // Update translations
    updateTranslations();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Dark mode functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenu.classList.contains('translate-x-full')) {
        mobileMenu.classList.remove('translate-x-full');
        mobileOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Language dropdown functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    dropdown.classList.toggle('hidden');
}

function toggleMobileLanguageDropdown() {
    const dropdown = document.getElementById('mobile-language-dropdown');
    dropdown.classList.toggle('hidden');
}

// Product image gallery
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const imageSrc = this.getAttribute('data-image');
            mainImage.src = imageSrc;
        });
    });
}

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'text-blue-600', 'dark:text-blue-400', 'border-blue-600', 'dark:border-blue-400');
                btn.classList.add('text-gray-500', 'dark:text-gray-400');
            });
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.classList.add('hidden');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'text-blue-600', 'dark:text-blue-400', 'border-blue-600', 'dark:border-blue-400');
            this.classList.remove('text-gray-500', 'dark:text-gray-400');
            
            // Show target tab pane
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
                targetPane.classList.remove('hidden');
            }
        });
    });
}

// Shopify Product Loader Class
class ShopifyProductLoader {
    constructor() {
        this.productId = this.getProductIdFromUrl();
        this.product = null;
        this.config = window.SHOPIFY_CONFIG;
        console.log('🛍️ Shopify Product Loader initialized');
        console.log('🔧 Config:', this.config);
        console.log('🆔 Product ID:', this.productId);
    }

    getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async init() {
        console.log('🚀 Starting product load...');
        
        if (!this.productId) {
            console.log('⚠️ No product ID found');
            this.showError('No product ID found in the URL.');
            return;
        }

        try {
            await this.loadProduct();
        } catch (error) {
            console.error('❌ Error loading product:', error);
            this.showError(`Failed to load product: ${error.message}`);
        }
    }

    async loadProduct() {
        this.showLoading();
        
        try {
            console.log('📡 Fetching from Shopify...');
            const product = await this.fetchProductFromShopify();
            this.product = product;
            console.log('✅ Product loaded:', product);
            this.populateProductData();
            this.hideLoading();
        } catch (error) {
            console.error('❌ Error loading product:', error);
            this.showError(`Failed to load product: ${error.message}`);
        }
    }

    async fetchProductFromShopify() {
        if (!this.config || !this.config.storeUrl || !this.config.accessToken) {
            console.error('❌ Shopify configuration is missing');
            console.log('🔧 Current config:', this.config);
            throw new Error('Shopify configuration is missing. Please check shopify-config.js');
        }

        console.log('📡 Fetching from Shopify with config:', {
            storeUrl: this.config.storeUrl,
            apiVersion: this.config.apiVersion,
            hasToken: !!this.config.accessToken
        });

        const query = `
            query getProduct($id: ID!) {
                product(id: $id) {
                    id
                    title
                    description
                    tags
                    images(first: 10) {
                        edges {
                            node {
                                id
                                url
                                altText
                            }
                        }
                    }
                    variants(first: 10) {
                        edges {
                            node {
                                id
                                title
                                price {
                                    amount
                                    currencyCode
                                }
                                availableForSale
                            }
                        }
                    }
                }
            }
        `;

        const url = `https://${this.config.storeUrl}/api/${this.config.apiVersion}/graphql.json`;
        console.log('🔗 API URL:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Shopify-Storefront-Access-Token': this.config.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    id: `gid://shopify/Product/${this.productId}`
                }
            })
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ HTTP Error:', response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('📦 Shopify Response:', data);
        
        if (data.errors) {
            console.error('❌ GraphQL Errors:', data.errors);
            throw new Error(`GraphQL error: ${data.errors[0].message}`);
        }

        if (!data.data || !data.data.product) {
            console.error('❌ Product not found in response');
            throw new Error('Product not found in Shopify store');
        }

        console.log('✅ Product found:', data.data.product);
        return this.transformStorefrontData(data.data.product);
    }

    transformStorefrontData(product) {
        return {
            id: product.id,
            title: product.title,
            body_html: product.description,
            tags: product.tags,
            images: product.images.edges.map(edge => ({
                src: edge.node.url,
                alt: edge.node.altText || product.title
            })),
            variants: product.variants.edges.map(edge => ({
                price: edge.node.price.amount,
                currency: edge.node.price.currencyCode,
                available: edge.node.availableForSale
            }))
        };
    }

    showLoading() {
        const loadingElement = document.getElementById('loading-skeleton');
        const productContent = document.getElementById('product-content');
        
        if (loadingElement) loadingElement.classList.remove('hidden');
        if (productContent) productContent.classList.add('hidden');
    }

    hideLoading() {
        const loadingElement = document.getElementById('loading-skeleton');
        const productContent = document.getElementById('product-content');
        
        if (loadingElement) loadingElement.classList.add('hidden');
        if (productContent) productContent.classList.remove('hidden');
    }

    showError(message) {
        console.error('❌ Error:', message);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.max-w-7xl');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
        }
    }

    

    populateProductData() {
        if (!this.product) {
            console.log('❌ No product data to populate');
            return;
        }

        console.log('📦 Populating product data:', this.product);

        // Update product title
        const titleElement = document.getElementById('product-title');
        if (titleElement) {
            titleElement.textContent = this.product.title;
            console.log('✅ Updated product title:', this.product.title);
        }

        // Update product name
        const nameElement = document.getElementById('product-name');
        if (nameElement) {
            nameElement.textContent = this.product.title;
            console.log('✅ Updated product name:', this.product.title);
        }

        // Update price
        if (this.product.variants && this.product.variants.length > 0) {
            const price = this.formatPrice(this.product.variants[0].price);
            const priceElement = document.getElementById('product-price');
            if (priceElement) {
                priceElement.textContent = price;
                console.log('✅ Updated product price:', price);
            }
        }

        // Update images
        this.populateThumbnailGallery();

        // Update key features
        this.populateKeyFeatures();

        // Update rating
        this.populateRating();

        // Update tab content
        this.populateTabContent();

        console.log('✅ Product data populated successfully');
    }

    populateThumbnailGallery() {
        if (!this.product.images || this.product.images.length === 0) return;

        const gallery = document.getElementById('thumbnail-gallery');
        if (!gallery) return;

        gallery.innerHTML = '';
        
        this.product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-item cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg overflow-hidden transition-all duration-200';
            thumbnail.onclick = () => this.setMainImage(image.src);
            
            thumbnail.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="w-full h-20 object-cover">
            `;
            
            gallery.appendChild(thumbnail);
        });

        // Set first image as main
        if (this.product.images.length > 0) {
            this.setMainImage(this.product.images[0].src);
        }
    }

    setMainImage(src) {
        const mainImage = document.getElementById('main-image');
        if (mainImage) {
            mainImage.src = src;
            mainImage.alt = this.product.title;
        }
    }

    populateKeyFeatures() {
        const featuresContainer = document.getElementById('key-features');
        if (!featuresContainer) return;

        const features = this.extractFeatures();
        const featuresList = features.map(feature => `
            <div class="flex items-center text-gray-600 dark:text-gray-300">
                <i class="${feature.icon} text-blue-600 dark:text-blue-400 mr-3 w-5"></i>
                <span class="text-sm">${feature.text}</span>
            </div>
        `).join('');

        featuresContainer.innerHTML = featuresList;
    }

    extractFeatures() {
        if (!this.product.tags) return this.config.defaultFeatures;

        const tags = this.product.tags.split(',').map(tag => tag.trim());
        const features = [];

        tags.forEach(tag => {
            const feature = this.mapTagToFeature(tag);
            if (feature) {
                features.push(feature);
            }
        });

        return features.length > 0 ? features : this.config.defaultFeatures;
    }

    mapTagToFeature(tag) {
        return this.config.featureMapping[tag.toLowerCase()] || null;
    }

    populateRating() {
        const ratingContainer = document.getElementById('product-rating');
        const reviewsContainer = document.getElementById('product-reviews');
        
        if (ratingContainer) {
            ratingContainer.innerHTML = `
                <div class="flex text-yellow-400">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(this.config.defaultRating))}
                </div>
            `;
        }
        
        if (reviewsContainer) {
            reviewsContainer.textContent = `(${this.config.defaultReviewCount} reviews)`;
        }
    }

    populateTabContent() {
        // Description tab
        const descriptionTab = document.getElementById('description');
        if (descriptionTab && this.product.body_html) {
            const descriptionText = this.stripHtml(this.product.body_html);
            const descriptionContent = descriptionTab.querySelector('p');
            if (descriptionContent) {
                descriptionContent.textContent = descriptionText;
            }
        }

        // Specifications tab
        this.populateSpecifications();
    }

    populateSpecifications() {
        const specsTab = document.getElementById('specifications');
        if (!specsTab) return;

        // Generate specifications based on product data
        const specs = {
            'Display': 'High-quality display with advanced technology',
            'Performance': 'Powerful processor for smooth operation',
            'Camera': 'Advanced camera system for stunning photos',
            'Battery': 'Long-lasting battery life',
            'Design': 'Premium materials and modern design',
            'Connectivity': 'Fast and reliable connectivity options'
        };

        // Update specifications content
        const specsContent = specsTab.querySelector('.grid');
        if (specsContent) {
            specsContent.innerHTML = Object.entries(specs).map(([key, value]) => `
                <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <i class="fas fa-cog mr-2 text-blue-600 dark:text-blue-400"></i>
                        ${key}
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">${value}</p>
                </div>
            `).join('');
        }
    }

    formatPrice(price) {
        const priceInDZD = parseFloat(price) * this.config.usdToDzdRate;
        return `${priceInDZD.toLocaleString('en-US')} DZD`;
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing product page...');
    
    // Prevent duplicate initialization
    if (window.productPageInitialized) {
        console.log('⚠️ Product page already initialized, skipping...');
        return;
    }
    window.productPageInitialized = true;
    
    // Initialize dark mode
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    // Initialize language
    changeLanguage(currentLanguage);
    
    // Initialize product gallery
    initProductGallery();

    // Initialize tabs
    initTabs();
    
    // Initialize Shopify product loader immediately
    console.log('🛍️ Initializing Shopify product loader...');
    const shopifyLoader = new ShopifyProductLoader();
    
    // Start loading immediately
    setTimeout(() => {
        shopifyLoader.init();
    }, 100);
    
    // Event listeners
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    document.getElementById('close-mobile-menu').addEventListener('click', toggleMobileMenu);
    document.getElementById('mobile-overlay').addEventListener('click', toggleMobileMenu);
    
    document.getElementById('language-toggle').addEventListener('click', toggleLanguageDropdown);
    document.getElementById('mobile-language-toggle').addEventListener('click', toggleMobileLanguageDropdown);
    
    // Language selection
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            toggleLanguageDropdown();
            toggleMobileLanguageDropdown();
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
        const mobileLanguageDropdown = document.getElementById('mobile-language-dropdown');
        
        if (!languageToggle.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.classList.add('hidden');
        }
        
        if (!mobileLanguageToggle.contains(event.target) && !mobileLanguageDropdown.contains(event.target)) {
            mobileLanguageDropdown.classList.add('hidden');
        }
    });
});