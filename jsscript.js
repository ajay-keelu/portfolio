let header = document.querySelector('#header')
let navbarBtn = document.querySelector('.navbar-btn')
let navbar = document.querySelector('#navbar');
navbarBtn.addEventListener('click',()=>{
    if(navbar.style.display === 'block'){
        navbar.style.display = 'none';
        header.style.height = '100px';
    }else{
        navbar.style.display = 'block';
        header.style.height = '200px'
    }
})
// setInterval(()=>{
//     window.location.reload()
// },1000)
