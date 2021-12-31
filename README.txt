https://js-totoshop.herokuapp.com/api/products
chinhsach(id,poster,name,img,createdAt,updatedAt);v
thongtin(id,poster,name,img,createdAt,updatedAt);v
faq(id,poster,name,imgs,createdAt,updatedAt);v
slides(id,img,name,createdAt,updatedAt);
categories(id,name,createdAt,updatedAt);
products(id,idCategory,name,price,mainImg,imgs,sizes,quantity
,createdAt,updatedAt,isSale,newPrice,discount);
idCategory
<!-- 1-new arrivals||2-donam
        3-donu||4-dodoi
        5-aokhoac||6-phukien -->
discount: true ||false
trang sản phẩm:có 2 trường hợp:
+th1: trên thanh url có param ?isSale=true 
-có mỗi isSale=true->_page=1 thì callApi 
https://js-totoshop.herokuapp.com/api/products?isSale=true&_page=1&_limit=8
-có isSale=true và có _page . nếu page hợp lệ thì callApi ,không hợp lệ thì _page=1
https://js-totoshop.herokuapp.com/api/products?isSale=true&_page=2&_limit=8
+th2: trên thanh url không có param isSale
-không có gì cả. ->?name=new arrivals và _page=1
-?name=áo khoác?_page=2 -> nếu page không hợp lệ thì _page=1 và call, nếu page hợp lệ thì callApi
-?name=áo khoác và không có _page hoặc _page không phù hợp thì cho _page=1
b1: call api https://js-totoshop.herokuapp.com/api/categories?name=
b2: sau khi call thì lấy id trả về và call api: 
https://js-totoshop.herokuapp.com/api/categories/id/products/?_page=1&_limit=8
