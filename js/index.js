var productList = {};



 function getData(){
      var promise =  axios({
            url : "https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product",
            method : "GET" ,
        });
    promise
    .then(function(respone){
        // backend trả dữ liệu về 
        // console.log(respone.data);
     productList=mapData(respone.data )
        console.log(productList);
        typeItem();
        // productList= mapData(respone.data)
        // console.log(productList);   
        // phoneList();
       
    })
    .catch(function(err){
        console.log(err);
    });
     
}
    

window.onload =  function(){
  getData();
}

function mapData(getDataJSON){
  const result = [];
  for ( var i = 0 ; i < getDataJSON.length ; i++){
      const oldProduct = getDataJSON[i];
      const newProduct = new Product (
          oldProduct.name,
          oldProduct.price,
          oldProduct.screen,
          oldProduct.backCamera,
          oldProduct.frontCamera,
          oldProduct.img,
          oldProduct.desc,
          oldProduct.type,
      )
      result.push(newProduct);
  }
  return result;
}

function renderTable(data){
  if (!data)data = productList;
  var tableHTML = "";
for(var i=0 ; i < data.length ; i++ ) {
  var currentItem = data[i];

  tableHTML += `

  
  <div class="product-items ">
          <img style="width:100%;" src="${currentItem.img}" alt="">
          <div class="product-item-text">
            <h2 style="font-weight: bold; font-size: 25px;">${currentItem.name}</h2>
            <p><span>${currentItem.price}</span></p>
            <p>Screen:  ${currentItem.screen}</p>
        <p>Back Camera:  ${currentItem.backCamera}</p>
        <p>Front Camera: ${currentItem.frontCamera}</p>
        <p>
        ${currentItem.desc}
        </p>
        <p>${currentItem.type}</p>
        </div>
       
          <button onclick="addCart('${currentItem.name}')" class="btn">Thêm vào giỏ hàng</button>
        </div>
   
    
  

  `
}

console.log(tableHTML)


  document.getElementById("renderhtml").innerHTML=tableHTML;
}

function typeItem(){
  var choice = document.getElementById("choice").value;
  var typeList = [];
if(choice){
 typeList= productList;
}else {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].type === choice  ) {
      typeList.push(productList[i]);
    }
  }
  console.log(typeList)
}

renderTable(typeList);
}

  var cartList = []; //chứa cáo object cartItem 
  
  function addCart(data){
    const Product = getProductByName(data);
    const totalQuantity = 0 ;
    const itemPrice = 0 ; 
    const totalPrice = 0 ;

let itemProduct = cartList.find((item) => item.Product.name === data  ) ;  
 if(itemProduct){
  itemProduct.quantity +=1
 }else {
  cartList.push({Product ,quantity:1});
 }
for ( item of cartList){
  totalQuantity += item.quantity;
  totalPrice += itemPrice * item.quantity ;
  console.log(totalPrice);
}

}

function getProductByName(data){
  for(var i = 0 ; i < productList.length ; i++){
    if (productList[i].name === data){
      return productList[i]
    }
  }

document.getElementById("numberitem").innerHTML = sumArray(cart);
document.getElementById("coutMoney").innerHTML = billItems(cart);
renderCart();
document.getElementById("modalrender").style.display = "none";
saveProductList();
};



    
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeBtn = document.getElementById("close-btn");
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("show");
});


function renderCartList(){
  let tableHTML = "";
  for(let i = 0 ; i < cartList.length ; i++){
    let currentCartList = cartList[i];
    tableHTML += `
    <div class="product">
    <div class="details">
      <img src="${currentCartList.Product.img}" alt="iphone 13" class="product-img" />
      <div class="product-info">
        <p class="product-name">${currentCartList.Product.name}</p>
        <p class="product-price">${currentCartList.Product.price}</p>
      </div>
    </div>
    <div class="controls">
      <div class="quantity">
        <button onclick="changeQuantity('${currentCartList.Product.name}',-1,'Quantity-${currentCartList.Product.name}')" id="quantity-minus" class="decrement-btn">
          <i class="fa-solid fa-minus fa-sm"></i>
        </button>
        <p id="Quantity-${currentCartList.Product.name}" class="quantity-num">${currentCartList.quantity}</p>
        <button onclick="changeQuantity('${currentCartList.Product.name}',1,'Quantity-${currentCartList.Product.name}')" id="quantity-plus" class="increment-btn">
          <i class="fa-solid fa-plus fa-sm""></i>
        </button>
      </div>
      <button onclick="removeQuantity('${currentCartList.Product.name}')" class="trash-btn">
        <i class="fa-solid fa-trash-can fa-lg"></i>
      </button>
    </div>
  </div>`;
    
  }
  document.getElementById("cart-products").innerHTML = tableHTML;
}



function saveProductList() {
    // chuyen tu object sang chuoi json
    let productJSON = JSON.stringify(cart);
    // luu vao localStorage
    localStorage.setItem("SL", productJSON);
  }

// // lấy ds sản phẩm từ localStorage

// cart = JSON.parse(localStorage.getItem("SL"));