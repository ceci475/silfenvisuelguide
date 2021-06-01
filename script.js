"use strict";
import "./styles.scss";

//ENDPOINTS

//Landing page - Who run the world
let landingpageWRTWData;
const landingpageWRTWEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/pages/180";

//Landing page - discover
let landingpageDiscoverData = [];
const landingpageDiscoverEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/landingpage_discover";
let landingpageDiscoverTemplate = document.querySelector(".landingpage_discover_template");
let landingpageDiscoverContainer = document.querySelector("#discover");

//Lookbook
let lookbookData = [];
const lookbookEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/collection?per_page=100";
let lookbookTemplate = document.querySelector("#lookbook_template");
let lookbookContainer = document.querySelector("#lookbook .sectionwrapper");

//Community
let communityData;
let communityEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/pages/157";

//Sustainability
// let sustainabilityData = [];
// let sustainabilityEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/sustainability";
// let sustainabilityTemplate = document.querySelector("#sustainability_template");
// let sustainabilityContainer = document.querySelector("#sustainability");

//Terms and conditions
let termsAndConditionsData;
let termsAndConditionsEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/pages/49";

//Privacy policy
let privacyPolicyData;
let privacyPolicyEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/pages/51";

//Webshop - products
let productsData = [];
const productsEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/product?per_page=100";
let productsTemplate = document.querySelector("#products_template");
const container = document.querySelector("#products");
let filter = "alle";
// let filter = [39, 36, 32, 38, 34, 35, 37];

//Webshop - single view
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
//Karussel til mobil
let karussel;
let numberOfPicsInCaro;
let caroCurrentNum = 0;

// console.log("id", id);
const productSingleViewEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/product?per_page=100";
let productSingleViewData = [];
let productSingleView = document.querySelector("#singleProduct");
//Webshop single view - all pictures
let allProductImages;
let allProductImagesEndpoint = "https://cecilieslemming.nu/kea/4sem_eksamen_silfen/wordpress/wp-json/wp/v2/product/" + id;

const allColors = [
  {
    color: "black",
    hex: "#000000",
  },
  {
    color: "lightblue",
    hex: "#B9D4E5",
  },
  {
    color: "pink",
    hex: "pink",
  },
  {
    color: "silver",
    hex: "#C0C0C0",
  },
  {
    color: "yellow",
    hex: "#EEEC88",
  },
  {
    color: "green",
    hex: "#9BAE86",
  },
  {
    color: "watergreen",
    hex: "#85D198",
  },
  {
    color: "darkblue",
    hex: "#1F2E7F",
  },
  {
    color: "darkgreen",
    hex: "#184C12",
  },
  {
    color: "blueberry",
    hex: "#3F609E",
  },
  {
    color: "sand",
    hex: "#D6AB6B",
  },
  {
    color: "aurora",
    hex: "#D6AB6B",
  },
  {
    color: "zebra",
    hex: "#000000",
  },
  {
    color: "poetryflowers",
    hex: "#E19CF4",
  },
  {
    color: "limegreen",
    hex: "#73BC45",
  },
  {
    color: "lightpurple",
    hex: "#D1A1E8",
  },
  {
    color: "red",
    hex: "#CB2828",
  },
  {
    color: "tiger",
    hex: "#CB7628",
  },
];
console.log("allColors", allColors);

//The prototype for all bags
const cartItem = {
  name: "",
  color: "",
  tag: "",
  price: "",
  image: "",
  inCart: 0,
};

//The prototype for wishlist item
const wishlistItem = {
  id: "",
  name: "",
  color: "",
  tag: "",
  price: "",
  image: "",
  remove_button: "",
  inStock: "",
};

let findTheColorsArray = [];
let colorboxes = [];
let number = 0;
let itemName;

document.addEventListener("DOMContentLoaded", start);
// let body = document.querySelector("body");
// let lookbookbody = document.querySelector("#lookbookbody");
function start() {
  console.log("script start");

  displayCart();
  displayWishlist();
  updateNumbers();
  // getSustainabilityData();
  getWRTWData();
  getLPDiscoverData();
  getLookbookData();
  getCommunityData();
  getTermsAndConditionsData();
  getPrivacyData();
  getProductsData();
  getSingleProductData();

  const x = window.matchMedia("(min-width: 1200px)");

  document.querySelectorAll(".filter").forEach((elm) => {
    elm.addEventListener("click", filtrering);
  });

  const filterMenu = document.querySelectorAll(".fm_contentBx");
  console.log("filterMenu", filterMenu);
  for (let i = 0; i < filterMenu.length; i++) {
    filterMenu[i].addEventListener("click", function () {
      console.log("filtermenubutton click");
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        filterMenu.forEach((filter) => {
          filter.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  }
  const accordion = document.querySelectorAll(".contentBx");
  if (x.matches) {
    console.log("x matches");
    accordion.forEach((menulink) => {
      menulink.addEventListener("mouseover", () => {
        menulink.classList.add("active");
      });
      accordion.forEach((menulink) => {
        menulink.addEventListener("mouseout", () => {
          menulink.classList.remove("active");
        });
      });
    });
  } else {
    console.log("x doesn't match");
  }
  for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      if (this === accordion[0]) {
        console.log("remove active");
        accordion[1].classList.remove("active");
        accordion[0].classList.toggle("active");
      } else if (this === accordion[1]) {
        console.log("add active");
        accordion[0].classList.remove("active");
        accordion[1].classList.toggle("active");
      }
    });
  }

  // createWishlistObject();
}

//ASYNC FUNCTIONS

async function getWRTWData() {
  const landingpageWRTWResponse = await fetch(landingpageWRTWEndpoint);
  landingpageWRTWData = await landingpageWRTWResponse.json();
  showWRTWsection();
}

function showWRTWsection() {
  console.log("showWRTWsection");

  document.querySelector("#whoruntheworld").innerHTML = landingpageWRTWData.content.rendered;
}

async function getLPDiscoverData() {
  const lpDiscoverResponse = await fetch(landingpageDiscoverEndpoint);
  landingpageDiscoverData = await lpDiscoverResponse.json();
  showLPDiscover();
}

function showLPDiscover() {
  console.log("showLPDiscover");
  // landingpageDiscoverContainer.innerHTML = "";
  landingpageDiscoverData.forEach((sect) => {
    const clone = landingpageDiscoverTemplate.cloneNode(true).content;
    clone.querySelector(".lp_discover_header").innerHTML = sect.overskrift;
    clone.querySelector(".lp_discover_text").innerHTML = sect.tekst;
    clone.querySelector(".lp_discover_link").innerHTML = sect.link;
    clone.querySelector(".lp_discover_link").addEventListener("click", () => {
      console.log("link klik");
    });
    clone.querySelector(".lp_discover_image").src = sect.billede.guid;

    landingpageDiscoverContainer.appendChild(clone);
  });
}

//Lookbook
async function getLookbookData() {
  const lookbookResponse = await fetch(lookbookEndpoint);
  lookbookData = await lookbookResponse.json();
  showLookbook();
}

//Community data
async function getCommunityData() {
  const communityResponse = await fetch(communityEndpoint);
  communityData = await communityResponse.json();
  showCommunityPage();
}

//Sustainability data
// async function getSustainabilityData() {
//   const sustainabilityResponse = await fetch(sustainabilityEndpoint);
//   sustainabilityData = await sustainabilityResponse.json();
//   showSustainabilityPage();
// }

async function getTermsAndConditionsData() {
  const termsAndConditionsResponse = await fetch(termsAndConditionsEndpoint);
  termsAndConditionsData = await termsAndConditionsResponse.json();
  showTermsAndConditionsPage();
}

async function getPrivacyData() {
  const privacyPolicyResponse = await fetch(privacyPolicyEndpoint);
  privacyPolicyData = await privacyPolicyResponse.json();
  showPrivacyPage();
}

async function getProductsData() {
  const productsResponse = await fetch(productsEndpoint);
  productsData = await productsResponse.json();
  console.log("productsData", productsData);
  showProducts();
}

async function getSingleProductData() {
  //product single view data
  const singleProductResponse = await fetch(productSingleViewEndpoint);
  productSingleViewData = await singleProductResponse.json();
  console.log("productSingleViewData", productSingleViewData);

  //All product images
  const allProductImagesResponse = await fetch(allProductImagesEndpoint);
  allProductImages = await allProductImagesResponse.json();
  // console.log("allProductImages", allProductImages);

  showSingleProduct();
}

//LOADING DATA TO DOM

//Landing page

//Terms and conditions
function showTermsAndConditionsPage() {
  console.log("showTermsAndConditions");

  document.querySelector("#terms_and_conditions").innerHTML = termsAndConditionsData.content.rendered;
}

//Privacy Policy
function showPrivacyPage() {
  console.log("showPrivacyPage");
  document.querySelector("#privacy_policy").innerHTML = privacyPolicyData.content.rendered;
}

//Webshop - all products
function showProducts() {
  console.log("showProducts");
  container.innerHTML = "";
  productsData.forEach((product) => {
    if (filter == "alle" || filter == product.wf_product_folders) {
      const clone = productsTemplate.cloneNode(true).content;
      clone.querySelector(".product_image").src = product.product_image.guid;
      clone.querySelector(".product_name").innerHTML = product.product_name;
      clone.querySelector(".product_price").innerHTML = product.product_price + " DKK";
      clone.querySelector(".product_image_container").addEventListener("click", () => {
        location.href = "product_singelView.html?id=" + product.id;
      });
      clone.querySelector(".product_heart").addEventListener("click", function () {
        const wishlistBag = Object.create(wishlistItem);
        wishlistBag.id = product.id;
        wishlistBag.name = product.product_name;
        wishlistBag.color = product.product_color;
        wishlistBag.tag = product.product_name + "_" + wishlistBag.color;
        wishlistBag.price = product.product_price;
        wishlistBag.image = product.product_image.guid;
        wishlistBag.inStock = "In Stock";

        if (this.classList.contains("active")) {
          this.classList.remove("active");
          this.setAttribute("src", "static/ui-elements/heart.svg");
          removeFromWishlist(wishlistBag);
        } else {
          this.classList.add("active");
          this.setAttribute("src", "static/ui-elements/blackheart.svg");
          addToWishlist(wishlistBag);
        }
        updateNumbers();

        console.log("wishlistBagObject", wishlistBag);
      });

      container.appendChild(clone);
    }
  });
}

function filtrering() {
  console.log("filter", filter);
  filter = this.dataset.kategori;
  console.log("filter", filter);
  document.querySelectorAll(".filter").forEach((elm) => {
    elm.classList.remove("valgt");
  });

  this.classList.add("valgt");

  showProducts();
}
// filter = filter.find(this.dataset.kategori);
// console.log("filter", filter);

//Webshop - single view
function showSingleProduct() {
  console.log("showSingleProduct");

  let singleBagColors;
  const underscore = "_";
  let bagColor;
  let productImagesArray = allProductImages.product_images;
  console.log("productImagesArray", productImagesArray);

  //Henter data fra WP
  productSingleViewData.forEach((product) => {
    if (product.id == id) {
      console.log("if");
      productSingleView.querySelector(".product_name").innerHTML = product.product_name;
      productSingleView.querySelector(".product_price").innerHTML = product.product_price + " DKK";
      productSingleView.querySelector(".product_color").innerHTML = product.product_color;
      productSingleView.querySelector(".material_description").innerHTML = product.material_description;
      productSingleView.querySelector(".material").innerHTML = product.material;
      productSingleView.querySelector(".measurements").innerHTML = product.measurements;
      document.querySelector(".breadcrumb_current").innerHTML = product.product_name;

      productSingleView.querySelector(".product_description").innerHTML = product.product_description;

      document.querySelector(".wishlist_like").addEventListener("click", () => {
        //Creating object for wishlist
        console.log("singleview wishlist_like click");
        const wishlistBag = Object.create(wishlistItem);
        wishlistBag.id = product.id;
        wishlistBag.name = product.product_name;
        wishlistBag.color = product.product_color;
        wishlistBag.tag = product.product_name + "_" + wishlistBag.color;
        wishlistBag.price = product.product_price;
        wishlistBag.image = product.product_image.guid;
        wishlistBag.inStock = "In Stock";
        console.log("singleView WishlistBag", wishlistBag);

        if (document.querySelector(".wishlist_like").classList.contains("active")) {
          document.querySelector(".wishlist_like").classList.remove("active");
          document.querySelector(".wishlist_like").setAttribute("src", "static/ui-elements/heart.svg");
          removeFromWishlist(wishlistBag);
        } else {
          document.querySelector(".wishlist_like").classList.add("active");
          document.querySelector(".wishlist_like").setAttribute("src", "static/ui-elements/blackheart.svg");
          addToWishlist(wishlistBag);
        }
        updateNumbers();

        // console.log("wishlistBagObject", wishlistBag);
      });
      //Creating object for cart
      document.querySelector(".add_to_cart_button").addEventListener("click", () => {
        console.log("addToCartButtonClick");
        const bag = Object.create(cartItem);
        bag.name = product.product_name;
        bag.price = product.product_price;
        bag.color = document.querySelector(".product_color").innerHTML;
        bag.tag = itemName + "_" + bag.color;
        bag.inCart = 0;
        bag.image = itemName + "_" + bag.color + "_1.jpg";
        addToCart(bag);
        totalCost(bag);

        console.log("bag.image", bag.image);
      });

      //Finder hvilke farver tasken findes i
      singleBagColors = product.products_colors;
      console.log("singleBagColors", singleBagColors);
    }
  });

  //De billeder som skal vises til at starte med, har fået property default ind i wordpress. Dem viser vi når man kommer ind på single viewet.
  productImagesArray.forEach((image) => {
    const clone = document.querySelector("template").cloneNode(true).content;
    if (image.post_excerpt === "default") {
      clone.querySelector(".imgs").src = image.guid;
      document.querySelector(".all_product_images_container").appendChild(clone);
    }
  });

  //------------------------------- FINDE HVILKEN FARVE AF TASKE ALLE PRODUKTBILLEDER HAR ------------------------------- //

  //Alle billeder hedder navne med samme format: navnPåTaske_farve_nummer. Her looper vi så igennem alle billederne, og splitter navn strengen op, og finder farven. Derefter laver vi en variablen bagColor som indeholder taskens farve. Der efter tilføjer vi property'en color til hver taske og sætter bagColor variablen ind.
  for (let i = 0; i < productImagesArray.length; i++) {
    //Index of first underscore
    let indexOfFirstUnderscore = productImagesArray[i].post_title.indexOf(underscore);
    //Index of second underscore
    let indexOfLastUnderscore = productImagesArray[i].post_title.lastIndexOf(underscore);
    //Få fat i farven på tasken
    bagColor = productImagesArray[i].post_title.substring(indexOfFirstUnderscore + 1, indexOfLastUnderscore);
    console.log("bagColor", bagColor);
    //Tilføj property og ligge taskens farve på.
    productImagesArray[i].color = bagColor;

    itemName = productImagesArray[i].post_title.substring(0, indexOfFirstUnderscore);
  }

  console.log("bagColor", bagColor);
  console.log("productImagesArray", productImagesArray);
  console.log("productSingelViewData", productSingleViewData);
  console.log("itemName", itemName);

  //------------------------------- FIND ALLE DE FORSKELLIGE FARVER TASKEN FINDES I && LA COLORBOXES ------------------------------- //

  //Ind i WP backenden er der et felt hvor kunden skal skrive alle farver som tasken findes i. Her henter vi den string ind og splitter den op.

  //Splitting string up
  let bagColorArray = singleBagColors.split(",");

  //Ændrer variables to lowercase
  bagColorArray = bagColorArray.map((e) => e.toLowerCase());

  //Fjerner mellemrum
  bagColorArray = bagColorArray.map((e) => e.trim());

  console.log("bagColorArray", bagColorArray);

  //Her filtrerer vi igennem allColors array og den enkelte taskes farver, og ligger de farver der matcher ind i findColorsArray. Derefter laver vi farvebokse ud fra hvor mange farver der findes i findColorsArray og loader dem ind i DOM'en.

  allColors.forEach((color) => {
    bagColorArray.forEach((bagcolor) => {
      if (color.color === bagcolor) {
        findTheColorsArray.push(color);

        const colorbox = document.createElement("div");
        colorbox.classList.add("colorbox");
        // const currentDiv = document.getElementsByClassName("currentDiv");
        document.querySelector(".color_picker").insertBefore(colorbox, null);
        colorboxes.push(colorbox);
      }
    });
  });

  console.log("findTheColorsArray", findTheColorsArray);

  //Her giver vi farveboksene de rigtige farver, og giver dem en property med den farve som de er.
  for (let i = 0; i < colorboxes.length; i++) {
    for (let j = 0; j < findTheColorsArray.length; j++) {
      colorboxes[j].style.backgroundColor = findTheColorsArray[j].hex;
      colorboxes[j].color = findTheColorsArray[j].color;
    }
  }

  console.log("colorboxes", colorboxes);

  //Tilføjer eventlisteners til farvebokse
  //Her siger vi hvilke produktbilleder skal vises, ved klik på de forskellige farvebokse.

  colorboxes.forEach((colorbox) => {
    colorbox.addEventListener("click", () => {
      console.log("colorbox click");
      document.querySelectorAll(".imgs").forEach((img) => {
        img.classList.add("hide");
      });
      productImagesArray.forEach((image) => {
        const clone = document.querySelector("template").cloneNode(true).content;
        if (colorbox.color === image.color) {
          clone.querySelector(".imgs").src = image.guid;

          productSingleView.querySelector(".product_color").innerHTML = image.color;
          document.querySelector(".all_product_images_container").appendChild(clone);
        }
      });
    });
  });

  //Related products
  let randomProducts = [];
  for (let i = 0; i < 5; i++) {
    let randomItem = productSingleViewData[Math.floor(Math.random() * productSingleViewData.length)];
    randomProducts.push(randomItem);
  }
  console.log("randomProducts", randomProducts);
  randomProducts.forEach((product) => {
    const clone = relatedProducts_template.cloneNode(true).content;
    clone.querySelector(".product_image").src = product.product_image.guid;
    clone.querySelector(".product_name").innerHTML = product.product_name;
    clone.querySelector(".product_price").innerHTML = product.product_price + " DKK";
    clone.querySelector(".product_image_container").addEventListener("click", () => {
      location.href = "product_singelView.html?id=" + product.id;
    });
    document.querySelector(".related_products").appendChild(clone);
  });
}

function showCommunityPage() {
  console.log("showCommunityPage");

  document.querySelector("#community").innerHTML = communityData.content.rendered;
}

function showLookbook() {
  console.log("showLookBook");
  lookbookData.forEach((collection) => {
    const clone = lookbookTemplate.cloneNode(true).content;
    clone.querySelector(".collection_image").src = collection.collection_image.guid;
    clone.querySelector(".collection_abbreviation").innerHTML = collection.collection_abbreviation;
    clone.querySelector(".collection_name").innerHTML = collection.collection_navn;
    clone.querySelector("article").addEventListener("click", () => {
      location.href = "lookbook_singelView.html?id=" + collection.id;
    });

    lookbookContainer.appendChild(clone);
  });
}

//BURGER MENU

//CART

//How many items there are in the cart //RENAME: numberOfCartItems
function addToCart(bag) {
  console.log("cartNumbers");
  console.log("the product", bag);
  //RENAME: cartItemCounter;
  let productNumbers = localStorage.getItem("cartNumbers");
  //Converting from string to number
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart_link span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart_link span").textContent = 1;
  }
  setItems(bag);
}

function setItems(bag) {
  console.log("setItems");
  console.log("My product is ", bag);

  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  console.log("my products are:", cartItems);
  if (cartItems !== null) {
    if (cartItems[bag.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [bag.tag]: bag,
      };
    }
    cartItems[bag.tag].inCart += 1;
  } else {
    bag.inCart = 1;
    cartItems = {
      [bag.tag]: bag,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function removeFromCart() {
  console.log("removeFromCart");
}
//Checking if there are any products in the cart / wishlist on reload

function updateNumbers() {
  console.log("updateNumbers");

  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart_link span").textContent = productNumbers;
  }

  let wishlistItemCounter = localStorage.getItem("numberOfWishlistItems");
  if (wishlistItemCounter) {
    document.querySelector(".wishlist_icon span").textContent = wishlistItemCounter;
  }

  const wishlistItems = JSON.parse(localStorage.getItem("productsInWishlist"));
  console.log("wishlistItem in update", wishlistItems);
  let el = document.querySelectorAll(".product_article");
  el.forEach((product) => {
    product.dataset.productId = "2";
    console.log("product", product);
  });
  console.log("el", el);
  // if (wishlistItems !== null) {
  //   for (let i = 0; i < wishlistItems.length; i++) {
  //     let productArticles = document.querySelectorAll(".product_article");
  //     console.log("productArticles", productArticles);
  //     productArticles[i].dataset.productId = wishlistItems[i].id;
  //     console.log("wishlistItems[i].id", wishlistItems[i].id);
  //   }
  //   productArticles.forEach((product) => {
  //     wishlistItems.forEach((item) => {
  //       if (product.id === item.id) {
  //         console.log("match");
  //         document.querySelector(".product_heart").src = "static/ui-elements/blackheart.svg";
  //       }
  //     });
  //   });
  // }
}

function totalCost(bag) {
  // console.log("The product price is:", bag.price);
  let cartCost = localStorage.getItem("totalCost");

  // console.log("My cartCost is", cartCost);
  // console.log("product price is", bag.price);
  let price = parseInt(bag.price);

  // console.log("typeof");
  // console.log(typeof price);
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    console.log(typeof cartCost);
    localStorage.setItem("totalCost", cartCost + price);
    // document.querySelector(".ordervalue").textContent = cartCost + price;
  } else {
    localStorage.setItem("totalCost", price);
    // document.querySelector(".ordervalue").textContent = cartCost;
  }
}

function displayCart() {
  console.log("displayCart");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  console.log(cartItems);
  if (cartItems && productContainer) {
    console.log("running");
    // productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class="product">
            <div class="cart_col">
            <img class="cart_product_image" src="static/bags/${item.image}">
            </div>
            <div class="cart_col">
            <p>${item.name}</p>
            <p>Color: ${item.color}</p>
            <p>Price: ${item.price}</p>
            <div class="cart_inner_col">
            <div class="cart_add_subtract">
              <div class="cartbuttons subtract_button">-</div>
              <p>${item.inCart}</p>
              <div class="cartbuttons add_button">+</div>
            </div>
            <div class="deleteFromCart_button">
            <img src="static/ui-elements/delete.svg">
            </div>
            <p class="itemtotal">I alt:   ${item.price * item.inCart} DKK</p>
            </div>
            </div>
           </div>
           
            `;
    });
  }
  let allRemoveFromCartButtons = document.querySelectorAll(".deleteFromCart_button");
  console.log("allRemoveFromCartButtons", allRemoveFromCartButtons);
}
//Add to wishlist
function addToWishlist(wishlistBag) {
  console.log("addToWishlist");
  const wishlistItems = JSON.parse(localStorage.getItem("productsInWishlist")) ?? [];

  console.log("my products are:", wishlistItems);

  if (!wishlistItems.find((bag) => bag.id === wishlistBag.id)) {
    // Hvis der er et array
    //if (wishlistItems !== null) {
    wishlistItems.push(wishlistBag);
  }

  let wishlistItemCounter = localStorage.getItem("numberOfWishlistItems");

  //Converting from string to number
  wishlistItemCounter = parseInt(wishlistItemCounter);
  if (wishlistItemCounter) {
    localStorage.setItem("numberOfWishlistItems", wishlistItems.length);
    document.querySelector(".wishlist_icon span").textContent = wishlistItems.length;
  } else {
    localStorage.setItem("numberOfWishlistItems", 1);
    document.querySelector(".wishlist_icon span").textContent = 1;
  }

  localStorage.setItem("productsInWishlist", JSON.stringify(wishlistItems));
  console.log("wishlistItems", wishlistItems);
}

function displayWishlist(wishlistBag) {
  console.log("displayWishlist");

  let wishlistItems = localStorage.getItem("productsInWishlist");
  wishlistItems = JSON.parse(wishlistItems);
  let wishlistProductContainer = document.querySelector(".wishlist_products");
  // console.log(wishlistItems);
  if (wishlistItems && wishlistProductContainer) {
    // console.log("running");
    // wishlistProductContainer.innerHTML = "";
    Object.values(wishlistItems).map((item) => {
      wishlistProductContainer.innerHTML += `
            <div class="wishlist_product">
            <div class="wishlist_image_container">
            <div class="removeFromWishlist_button">
            <img src="static/ui-elements/delete.svg">
            </div>
            <img src="${item.image}">
            </div>
            <p>${item.name}</p>
            <p>${item.color}</p>
            <p>${item.price} DKK</p>
            <p>${item.inStock}</p>
            <button class="add_to_cart_button">Add To Cart</button>
            
           </div>

            `;
    });
  }
  let deleteFromWishlistButtons = document.querySelectorAll(".removeFromWishlist_button");
  deleteFromWishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("wishlist button click");
      console.log("gdgfdsg", wishlistItems);
      for (let i = 0; i < wishlistItems.length; i++) {
        wishlistItems[i] = button[i];
        wishlistItems.splice(i, 1);
        console.log("wishlistItems after splice", wishlistItems);
      }

      localStorage.setItem("productsInWishlist", JSON.stringify(wishlistItems));

      let wishlistItemCounter = localStorage.getItem("numberOfWishlistItems");

      //Converting from string to number
      wishlistItemCounter = parseInt(wishlistItemCounter);

      if (wishlistItemCounter) {
        console.log("if");
        localStorage.setItem("numberOfWishlistItems", wishlistItems.length);
        document.querySelector(".wishlist_icon span").textContent = wishlistItems.length;
      } else {
        console.log("else");
        localStorage.setItem("numberOfWishlistItems", 1);
        document.querySelector(".wishlist_icon span").textContent = "";
      }
      displayWishlist();
    });
  });
}

function removeFromWishlist(wishlistBag) {
  // console.log("removeWishListItems");
  let wishlistItems = JSON.parse(localStorage.getItem("productsInWishlist"));

  const index = wishlistItems.findIndex((bag) => bag.id === wishlistBag.id);

  if (index !== -1) {
    wishlistItems.splice(index, 1);
  }
  localStorage.setItem("productsInWishlist", JSON.stringify(wishlistItems));
  console.log("wishlist after", wishlistItems);

  let wishlistItemCounter = localStorage.getItem("numberOfWishlistItems");

  //Converting from string to number
  wishlistItemCounter = parseInt(wishlistItemCounter);

  if (wishlistItemCounter) {
    console.log("if");
    localStorage.setItem("numberOfWishlistItems", wishlistItems.length);
    document.querySelector(".wishlist_icon span").textContent = wishlistItems.length;
  } else {
    console.log("else");
    localStorage.setItem("numberOfWishlistItems", 1);
    document.querySelector(".wishlist_icon span").textContent = "";
  }
}
