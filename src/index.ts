interface Products {
  name: string
  price: number
  image: string
}

const getProducts = async (): Promise<Products[]> => {
  const response = await fetch(
    'https://product-7ffbf-default-rtdb.firebaseio.com/products.json'
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  const products: Products[] = Object.values(data || {})

  return products
}

const productContainer = document.querySelector('.product-container')

getProducts()
  .then(products =>
    products.forEach(product => {
      const productHTML = `
        <div class="col-lg-4 col-sm-4">
          <div class="box_main">
            <h4 class="shirt_text">${product.name}</h4>
            <p class="price_text">Price <span style="color: #262626;">VNĐ ${product.price}</span></p>
            <div class="tshirt_img"><img src="${product.image}" alt="${product.name}"></div>
            <div class="btn_main">
              <div class="buy_bt"><a href="#">Buy Now</a></div>
              <div class="seemore_bt"><a href="#">See More</a></div>
            </div>
          </div>
        </div>
      `
      if (productContainer) productContainer.innerHTML += productHTML
    })
  )
  .catch(error => console.error('Error fetching products:', error))
