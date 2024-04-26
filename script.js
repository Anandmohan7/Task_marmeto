document.addEventListener("DOMContentLoaded", function(){
    var tabs = document.querySelectorAll('.input');
    var tabContent = document.getElementById('tab-content');

    tabs.forEach(function(tab){
        tab.addEventListener('change', function(){
            tabContent.innerHTML = ''; // Clear previous content

            var apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

            fetch(apiUrl)
                 .then(response => response.json())
                 .then(data => {
                    data.categories.forEach(category => {
                        console.log(category)
                        if(category.category_name.toLowerCase() === this.nextElementSibling.textContent.toLowerCase()){
                            category.category_products.forEach(product => {
                                var productCard = document.createElement('div');
                                productCard.classList.add('product-card');
                                
                                var imgContainer = document.createElement('div');
                                imgContainer.classList.add('img-container');
                                var badge = document.createElement('span');
                                badge.classList.add('badge');
                                badge.textContent = product.badge_text;
                                if(product.badge_text){
                                    imgContainer.appendChild(badge);
                                }
                                productCard.appendChild(imgContainer)
                                var img = document.createElement('img');
                                img.src = product.image;
                                img.alt = product.title + ' Image';
                                productCard.appendChild(img);

                                var titleContainer = document.createElement('div');
                                titleContainer.classList.add('title-container');
                                productCard.appendChild(titleContainer);
                                var title = document.createElement('h3');
                                title.classList.add('product-title');
                                title.textContent = product.title;
                                titleContainer.appendChild(title);
                                var vendor = document.createElement('p');
                                vendor.classList.add('product-vendor');
                                vendor.textContent = product.vendor;
                                titleContainer.appendChild(vendor);


                                var priceContainer = document.createElement('div');
                                priceContainer.classList.add('price-container');
                                productCard.appendChild(priceContainer);

                                var price = document.createElement('h3');
                                price.classList.add('product-price');
                                price.textContent = 'Rs.' + product.price +'.00';
                                priceContainer.appendChild(price);

                                var comparePrice = document.createElement('h3');
                                comparePrice.classList.add('product-comparePrice');
                                comparePrice.textContent = product.compare_at_price +'.00';
                                comparePrice.style.textDecoration = 'line-through'; 
                                priceContainer.appendChild(comparePrice);

                                var discount = Math.floor(100 * (product.compare_at_price - product.price) / product.compare_at_price);
                                var priceDiscount = document.createElement('h3');
                                priceDiscount.classList.add('product-discount');
                                priceDiscount.textContent = discount + '%' + ' Off';
                                priceContainer.appendChild(priceDiscount);

                                var cart = document.createElement('button');
                                cart.classList.add('cart');
                                cart.textContent = 'Add to Cart'
                                productCard.appendChild(cart);

                                tabContent.appendChild(productCard);
                            });
                        }
                    });
                 })
                 .catch(error => console.error('Error fetching data:', error));
        });
    });
});