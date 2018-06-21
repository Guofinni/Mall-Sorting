/*商城排序*/
var header = document.getElementById('header');
var shopList = document.getElementById('shopList');
var btnList = header.getElementsByTagName('a');

var date = null;
var xhr = new XMLHttpRequest;
xhr.open('get','data/product.json',false);
//json的获取是通过HTML页面的位置查找的
xhr.onreadystatechange = function () {
    if(xhr.status === 200 && xhr.readyState === 4){
        date = JSON.parse(xhr.response);
    }
};
xhr.send();

//将数据绑定到页面中
function bindHtml() {
    var str = '' ;
    date.forEach(item => {
        str += `<li>
            <img src="${item.img}" alt="">
            <p class="title">${item.title}</p>
            <p class="hot">热度：${item.hot}</p>
            <p><del>￥999</del><span>￥${item.price}</span></p>
            <p class="time">上架时间：<span>${item.time}</span></p>
        </li>`
    });
    shopList.innerHTML = str;
}
bindHtml();

for (let i = 0; i < btnList.length; i++) {
    btnList[i].flg = -1;
    btnList[i].onclick = function () {
        var value = btnList[i].getAttribute('attrName');
        this.flg *= -1;
        sortAll.call(this,value);
    }
}
function sortAll(value) {
        if(value == 'time'){
            date.sort((a,b)=>{
                return (new Date(a[value]) - new Date(b[value]))*this.flg;
            })
        }else{
            date.sort((a,b)=>{
                return (a[value] - b[value])*this.flg;
            })
        }
        bindHtml();
}





