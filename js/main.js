let productList = [];

 function getData(){
      var promise =  axios({
            url : "https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product",
            method : "GET" ,
        });
    promise
    .then(function(respone){
        // backend trả dữ liệu về 
        console.log(respone.data)
        productList= mapData(respone.data)
        console.log(productList);   
        phoneList();
       
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
                oldProduct.type =type ,
            )
            result.push(newProduct);
        }
        return result;
    ;}

function render(data){
    var tableHTML = "";
 for (var i = 0 ; i < data.length ; i++){
    var currentMobile = data[i];
tableHTML+=
`<div class="row py-3">
    <div class="content__left d-flex col-9">
      <div class="image">
        <img src='${currentMobile.img}' alt="" />
      </div>
      <div class="title">
        <h3>${currentMobile.name}</h3>
        <p>Screen:  ${currentMobile.screen}</p>
        <p>Back Camera:  ${currentMobile.backCamera}</p>
        <p>Front Camera: ${currentMobile.frontCamera}</p>
        <p>
        ${currentMobile.desc}
        </p>
        <p>${currentMobile.type}</p>
      </div>
    </div>
    <div class="content__right px-5 col-3">
      <div class="content__price">${currentMobile.price}</span></div>
      <div class="content__button">
        <button onclick="addCart('${currentMobile.name}')">Add to cart</button>
      </div>
    </div>
  </div>`;

 }
 document.getElementById("product-nav").innerHTML = tableHTML;
}




function phoneList(){
    var choice = document.getElementById("choice").value;
    var mobileList = [] ;
    var isSame = false;

    for ( var i = 0 ; i <productList.length ; i++ ){
        if(productList[i].type === choice );
        mobileList.push(productList[i])
        console.log(choice);
        isSame = true ; 
    }
}

cartList = [];

function addCart(data){
    let Product = getProductByName(data) ; 
    let totalQuantity = 0 ;
    let price = 0 ;
    let total =  0 ;

    let itemProduct = cartList.find((item) => item.Product.name === data)

if (itemProduct) {
    itemProduct.quantity +=1 ; 
} else {
cartList.push({Product , quantity : 1});
}

for (item of cartList){
    totalQuantity += item.quantity;
    total += price * item.quantity;
    console.log(total)
}
document.getElementById("")
document.getElementById()
document.getElementById()
}

