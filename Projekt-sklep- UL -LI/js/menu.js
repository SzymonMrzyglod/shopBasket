const bars = document.querySelector('.menu-li-bars');
const menuUlMobile = document.querySelector('.menu-ul');
const products = document.querySelector('.products');

let flag = 0;
bars.addEventListener('click', () => {
    if (flag === 0) {
        menuUlMobile.style.left = "0";
        products.style.margin = "300px auto"
        flag = 1;
    } else {
        menuUlMobile.style.left = "-300vw";
        products.style.margin = "60px auto"
        flag = 0;
    }
})