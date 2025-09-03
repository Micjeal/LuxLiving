import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin, urlparse
import time

def scrape_footsteps_furniture():
    """Scrape the Footsteps Furniture website to analyze features and content"""
    
    url = "https://www.footstepsfurniture.com/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        analysis = {
            'site_title': soup.find('title').text if soup.find('title') else 'No title found',
            'navigation_menu': [],
            'hero_section': {},
            'product_categories': [],
            'features': [],
            'contact_info': {},
            'social_media': [],
            'special_offers': [],
            'services': [],
            'footer_links': [],
            'meta_description': '',
            'key_sections': []
        }
        
        # Extract meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            analysis['meta_description'] = meta_desc.get('content', '')
        
        # Extract navigation menu
        nav_elements = soup.find_all(['nav', 'ul', 'div'], class_=lambda x: x and any(nav_term in x.lower() for nav_term in ['nav', 'menu', 'header']))
        for nav in nav_elements:
            links = nav.find_all('a')
            for link in links:
                if link.text.strip():
                    analysis['navigation_menu'].append({
                        'text': link.text.strip(),
                        'href': link.get('href', '')
                    })
        
        # Extract hero section content
        hero_candidates = soup.find_all(['div', 'section'], class_=lambda x: x and any(hero_term in x.lower() for hero_term in ['hero', 'banner', 'jumbotron', 'main']))
        if hero_candidates:
            hero = hero_candidates[0]
            hero_text = hero.get_text(strip=True)
            if len(hero_text) > 50:  # Only consider substantial content
                analysis['hero_section'] = {
                    'text': hero_text[:500] + '...' if len(hero_text) > 500 else hero_text,
                    'has_cta': bool(hero.find_all(['button', 'a'], class_=lambda x: x and 'btn' in x.lower()))
                }
        
        # Extract headings to understand site structure
        headings = soup.find_all(['h1', 'h2', 'h3'])
        for heading in headings:
            text = heading.text.strip()
            if text and len(text) < 100:
                analysis['key_sections'].append({
                    'level': heading.name,
                    'text': text
                })
        
        # Look for product categories
        category_keywords = ['furniture', 'chair', 'table', 'sofa', 'bed', 'cabinet', 'desk', 'dining', 'living', 'bedroom', 'office']
        all_text = soup.get_text().lower()
        for keyword in category_keywords:
            if keyword in all_text:
                analysis['product_categories'].append(keyword)
        
        # Extract contact information
        contact_patterns = ['phone', 'email', 'address', 'contact']
        for element in soup.find_all(text=True):
            text = element.strip().lower()
            if any(pattern in text for pattern in contact_patterns):
                parent = element.parent
                if parent:
                    contact_text = parent.get_text(strip=True)
                    if len(contact_text) < 200:
                        analysis['contact_info'][text[:20]] = contact_text
        
        # Extract social media links
        social_platforms = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'pinterest']
        for link in soup.find_all('a', href=True):
            href = link['href'].lower()
            for platform in social_platforms:
                if platform in href:
                    analysis['social_media'].append({
                        'platform': platform,
                        'url': link['href']
                    })
        
        # Look for special offers or promotions
        offer_keywords = ['sale', 'discount', 'offer', 'deal', 'promotion', 'free shipping', '%', 'off']
        for element in soup.find_all(['div', 'span', 'p'], class_=lambda x: x and any(offer_term in x.lower() for offer_term in ['offer', 'sale', 'promo', 'deal'])):
            text = element.get_text(strip=True)
            if any(keyword in text.lower() for keyword in offer_keywords):
                analysis['special_offers'].append(text[:200])
        
        # Extract services mentioned
        service_keywords = ['delivery', 'installation', 'warranty', 'financing', 'assembly', 'return', 'support']
        for keyword in service_keywords:
            if keyword in all_text:
                analysis['services'].append(keyword)
        
        # Extract footer links
        footer = soup.find('footer') or soup.find('div', class_=lambda x: x and 'footer' in x.lower())
        if footer:
            footer_links = footer.find_all('a')
            for link in footer_links:
                if link.text.strip():
                    analysis['footer_links'].append({
                        'text': link.text.strip(),
                        'href': link.get('href', '')
                    })
        
        return analysis
        
    except requests.RequestException as e:
        return {'error': f'Failed to scrape website: {str(e)}'}
    except Exception as e:
        return {'error': f'Error parsing website: {str(e)}'}

def analyze_missing_features(scraped_data, current_site_features):
    """Compare scraped data with current site to identify missing features"""
    
    missing_features = []
    recommendations = []
    
    # Current site analysis based on the HTML provided
    current_features = {
        'has_3d_viewer': True,
        'has_financing_options': True,
        'has_customer_reviews': True,
        'has_newsletter': True,
        'has_social_media': True,
        'has_warranty_info': True,
        'has_free_shipping': True,
        'has_24_7_support': True,
        'product_categories': ['living room', 'bedroom', 'dining', 'office'],
        'navigation_pages': ['home', 'products', 'about', 'contact']
    }
    
    if 'error' not in scraped_data:
        # Compare navigation
        their_nav = [item['text'].lower() for item in scraped_data.get('navigation_menu', [])]
        our_nav = current_features['navigation_pages']
        
        missing_nav = [nav for nav in their_nav if nav not in our_nav and nav not in ['', 'home']]
        if missing_nav:
            recommendations.append(f"Consider adding navigation items: {', '.join(missing_nav)}")
        
        # Compare services
        their_services = scraped_data.get('services', [])
        our_services = ['warranty', 'financing', 'free shipping', 'support']
        
        missing_services = [service for service in their_services if service not in [s.replace(' ', '').replace('_', '') for s in our_services]]
        if missing_services:
            recommendations.append(f"Consider adding services: {', '.join(missing_services)}")
        
        # Check for special offers
        if scraped_data.get('special_offers'):
            recommendations.append("They have special offers/promotions - consider adding seasonal sales or promotional banners")
        
        # Check product categories
        their_categories = scraped_data.get('product_categories', [])
        our_categories = current_features['product_categories']
        
        missing_categories = [cat for cat in their_categories if cat not in [c.replace(' ', '') for c in our_categories]]
        if missing_categories:
            recommendations.append(f"Consider expanding product categories: {', '.join(missing_categories)}")
    
    return {
        'scraped_data': scraped_data,
        'current_features': current_features,
        'recommendations': recommendations
    }

if __name__ == "__main__":
    print("Scraping Footsteps Furniture website...")
    scraped_data = scrape_footsteps_furniture()
    
    print("Analyzing missing features...")
    analysis = analyze_missing_features(scraped_data, {})
    
    # Save results to JSON file
    with open('website_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)
    
    print("Analysis complete! Results saved to website_analysis.json")
    
    # Print summary
    if 'error' not in scraped_data:
        print(f"\n=== FOOTSTEPS FURNITURE ANALYSIS ===")
        print(f"Site Title: {scraped_data.get('site_title', 'N/A')}")
        print(f"Navigation Items: {len(scraped_data.get('navigation_menu', []))}")
        print(f"Key Sections: {len(scraped_data.get('key_sections', []))}")
        print(f"Product Categories Found: {', '.join(scraped_data.get('product_categories', []))}")
        print(f"Services Mentioned: {', '.join(scraped_data.get('services', []))}")
        print(f"Social Media Links: {len(scraped_data.get('social_media', []))}")
        
        print(f"\n=== RECOMMENDATIONS FOR YOUR SITE ===")
        for rec in analysis['recommendations']:
            print(f"• {rec}")
    else:
        print(f"Error: {scraped_data['error']}")