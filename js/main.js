// products wrap div
const productGrid = document.querySelector(".products-grid");
const shopinglist = document.querySelector(".shoping-list");
const cartItemsContainer = document.querySelector("#cartItems");

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = document.createElement("li");
  cartItem.textContent = `${product.title} - $${product.price}`;
  cartItemsContainer.appendChild(cartItem);

  // Save cart data in local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push({
    id: product.id,
    title: product.title,
    price: product.price,
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// fetch product from DummyJson
const getProducts = async () => {
  // product fetch
  await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      //   create all product html
      let content = "";

      // run loop to add html in content var
      data.products.map((product) => {
        content += `<div class="col-md-3 my-3">
        <div class="product product-${product.id} bg-white">
                <div>
                    <div class="d-flex justify-content-between">
                    <b class="btn btn-warning btn-sm rounded-pill">-${
                      product.discountPercentage
                    }%</b>
                    <button class="btn btn-warning btn-sm quick-view" data-bs-toggle="modal" data-bs-target="#quickView" onclick="showQuickView('${
                      product.id
                    }')"><i class="fa-regular fa-eye"></i></button>
                    </div>
                    <div class="position-relative p-2 my-2">
                        <img class="img-fluid" src="${
                          product.thumbnail
                        }" alt="">
                    </div>
                    <p class="category">${product.category}</p>
                    <h5 class="product-title"><a class="text-decoration-none text-black" href="#">${
                      product.title
                    }</a></h5>
                    <h6><span class="text-muted text-decoration-line-through"><small>$${(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(
                      2
                    )}</small></span> <span class="regular-price text-primary">$${
          product.price
        }</span></h6>
                </div>
                <div>
                    <button class="btn btn-primary w-100">Add to cart</button>
                </div>
                <h6 class="mt-2"><i class="fa fa-check text-primary" aria-hidden="true"></i> ${
                  product.stock
                } <span>In Stock</span></h6>
        </div>
    </div>`;
      });

      productGrid.innerHTML = content;
    })
    .catch((error) => {
      console.log(error);
    });
};
getProducts();

// quick view
const quickViewLabel = document.getElementById("quickViewLabel");
const quickViewBody = document.querySelector("#quickView .modal-body");
function showQuickView(id) {
  const product = async () => {
    await fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((product) => {
        quickViewLabel.innerText = `${product.title} Details`;
        quickViewBody.innerHTML = `<div class="row">
        <div class="col-md-12 text-center">
            <div class="product-thumbnail">
                <img class="img-fluid" src="${product.thumbnail}" alt="">
            </div>
            <div class="img-gallery d-flex flex-wrap justify-content-center">
                ${product.images
                  .map((item) => {
                    return `<img src="${item}" alt="">`;
                  })
                  .join("")}
            </div>
        </div>
        <div class="col-md-12">
            <div class="product product-1">
                <div>
                    <div class="d-flex justify-content-between">
                    <b class="btn btn-warning btn-sm rounded-pill">-${
                      product.discountPercentage
                    }%</b>
                    </div>
            
                    <p class="category">${product.category}</p>
                    <h5 class="product-title"><a class="text-decoration-none text-black" href="#">${
                      product.title
                    }</a></h5>
                    <p>${product.description}</p>
                    <h6><span class="text-muted text-decoration-line-through"><small>$${(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(
                      2
                    )}</small></span> <span class="regular-price text-primary">$${
          product.price
        }</span></h6>
                    <p class="brand"><b>Brand: </b>${product.brand}</p>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="addToCart(${
                      product.id
                    })>Add to cart</button>
                </div>
                <h6 class="mt-2"><i class="fa fa-check text-primary" aria-hidden="true"></i> ${
                  product.stock
                } <span>In Stock</span></h6>
            </div>
        </div>
    </div>`;

        window.addEventListener("load", () => {
          const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          cartItems.forEach((item) => {
            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.title} - $${item.price}`;
            cartItemsContainer.appendChild(cartItem);
          });
        });

        // change quick view gallery image
        const thumbnail = document.querySelector(".product-thumbnail img");
        const galleryImgs = document.querySelectorAll(".img-gallery img");
        for (let i = 0; i < galleryImgs.length; i++) {
          galleryImgs[i].addEventListener("click", function (e) {
            thumbnail.src = e.target.src;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  product();
}
