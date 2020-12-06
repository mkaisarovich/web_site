AOS.init();
const MANGA_PAGES = [
 'https://gen.jut.su/uploads/manga/2_52/1.jpg', 'https://gen.jut.su/uploads/manga/2_52/3.jpg', 'https://gen.jut.su/uploads/manga/2_52/4.jpg', 
 'https://gen.jut.su/uploads/manga/2_52/5.jpg', 'https://gen.jut.su/uploads/manga/2_52/6.jpg', 'https://gen.jut.su/uploads/manga/2_52/7.jpg',
  'https://gen.jut.su/uploads/manga/2_52/8.jpg', 'https://gen.jut.su/uploads/manga/2_52/9.jpg', 
  'https://gen.jut.su/uploads/manga/2_52/10.jpg', 'https://gen.jut.su/uploads/manga/2_52/11.jpg',
   'https://gen.jut.su/uploads/manga/2_52/12.jpg', 'https://gen.jut.su/uploads/manga/2_52/13.jpg',
    'https://gen.jut.su/uploads/manga/2_52/14.jpg','https://gen.jut.su/uploads/manga/2_52/15.jpg','https://gen.jut.su/uploads/manga/2_52/16.jpg',
    'https://gen.jut.su/uploads/manga/2_52/17.jpg','https://gen.jut.su/uploads/manga/2_52/18.jpg','https://gen.jut.su/uploads/manga/2_52/19.jpg',
    'https://gen.jut.su/uploads/manga/2_52/20.jpg','https://gen.jut.su/uploads/manga/2_52/21.jpg','https://gen.jut.su/uploads/manga/2_52/22.jpg'
    ,'https://gen.jut.su/uploads/manga/2_52/23.jpg','https://gen.jut.su/uploads/manga/2_52/24.jpg','https://gen.jut.su/uploads/manga/2_52/25.jpg'
    ,'https://gen.jut.su/uploads/manga/2_52/26.jpg'
];

var initialX;
var lastX;
const barsButton = document.getElementById("barMen");
var nav_list = document.getElementById("navigation-l");
barsButton.addEventListener("click", showNav);
const mybutton = document.getElementById("topBtn");
const Xbutton = document.getElementById("x");
const ArrowRight = document.getElementById("ArrowRight");
const ArrowLeft = document.getElementById("ArrowLeft");
ArrowRight.addEventListener("click", RightClick);
ArrowLeft.addEventListener("click", LeftClick);
window.onscroll = function() {scrollFunction()};
const manga_album = document.querySelector('#manga-album');
const front_img = document.querySelector('#front-img');
front_img.addEventListener("touchmove", dragger);
front_img.addEventListener("pointerdown", startingX);
front_img.addEventListener("pointerup", endingX);
for(let i = 0; i < MANGA_PAGES.length; i++) {
 const page = MANGA_PAGES[i];
 const img = createIMG(page);
 img.addEventListener("click", Clicker);
 manga_album.appendChild(img);
}
function createIMG(source) {
 const img = document.createElement('img');
 img.src = source;
 return img;
}

function Clicker(event) {
 const img = createIMG(event.currentTarget.src);
 front_img.style.top = window.pageYOffset + 'px';
 document.body.classList.add('scroll-not');
 front_img.appendChild(ArrowLeft);
 front_img.appendChild(img);
 front_img.appendChild(ArrowRight);
 front_img.appendChild(Xbutton);
 img.addEventListener("click", doubleClicker);
 ArrowRight.classList.remove('hide');
 ArrowLeft.classList.remove('hide');
 front_img.classList.remove('hide');
 Xbutton.classList.remove('hide');
 document.addEventListener('keyup', onUpKey);
 mybutton.classList.add('hide');
}
function click(string) {
 const img = createIMG(string);
 front_img.style.top = window.pageYOffset + 'px';
 document.body.classList.add('scroll-not');
 front_img.appendChild(ArrowLeft);
 front_img.appendChild(img);
 front_img.appendChild(ArrowRight);
 front_img.appendChild(Xbutton);
 ArrowRight.classList.remove('hide');
 ArrowLeft.classList.remove('hide');
 front_img.classList.remove('hide');
 Xbutton.classList.remove('hide');
 document.addEventListener('keyup', onUpKey);
 front_img.style.transform = '';
 mybutton.classList.add('hide');
}
function doubleClicker() {
 document.body.classList.remove('scroll-not');
 ArrowRight.classList.add('hide');
 ArrowLeft.classList.add('hide');
 front_img.classList.add('hide');
 Xbutton.classList.add('hide');
 front_img.innerHTML = '';
 document.removeEventListener('keyup', onUpKey);
 front_img.style.transform = '';
 mybutton.classList.remove('hide');
}
function onUpKey(event) {
 if(event.key === "ArrowRight" || event.key === "ArrowUp") {
  toRight();
 }
 else if(event.key === "ArrowLeft" || event.key === "ArrowDown") {
  toLeft();
 }
 else if(event.key === "Escape") {
  doubleClicker();
 }
}
function toRight() {
  var index;
 for(let i = 0; i < MANGA_PAGES.length; i++) {
  if(front_img.innerHTML.includes(MANGA_PAGES[i])) {
   index = i;
   front_img.style.transform = '';
   break;
  }
 }
 doubleClicker(index);
 if(index !== MANGA_PAGES.length -1) {
   click(MANGA_PAGES[index+1]);
   index++;
  }
}
function toLeft() {
  var index;
 for(let i = 0; i < MANGA_PAGES.length; i++) {
  if(front_img.innerHTML.includes(MANGA_PAGES[i])) {
   index = i;
   front_img.style.transform = '';
   break;
  }
 }
  doubleClicker(index);
 if(index !== 0) {
    click(MANGA_PAGES[index-1]);
    index--;
  }
}
function startingX(event) {
  event.preventDefault();
  initialX = event.clientX;
}
function endingX(event) {
  event.preventDefault();
  lastX = event.clientX;
}
function dragger(event) {
  event.preventDefault();
  var value = lastX - initialX;
  if(value > 200) {
    toLeft();
    
  } 
  else if(value < -200) {
    toRight();
  }
}
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
const scrollToTop = () => {
  const c = document.body.scrollTop || document.documentElement.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 7);
  }
}

function LeftClick() {
  toLeft();
}
function RightClick() {
  toRight();
}
function showNav() {
  if(barsButton.style.display === "block") {
    nav_list.nav_list.classList.add('hide');
  }
  if(nav_list.classList.contains('hide')) {
    nav_list.classList.remove('hide');
  }
  else{
    nav_list.classList.add('hide');
  }
} 
function toTop() {
  scrollToTop();
}



function login_page(){
var btn = document.getElementById("sign").innerHTML;

if(btn == "Log In"){
  document.querySelector(".login-page").style.display = "flex"; 
  $(".login-page").animate({opacity: "1"}, "slow");
  document.body.style.overflow = "hidden"; }
  else{
    logout();
  }
} 



function close_login_page(){
  $(".login-page").animate({opacity: "0"}, "slow");
  document.querySelector(".login-page").style.display = "none"; 
  document.body.style.overflow = "scroll";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function login(name,pass1,pass2,email){
  if(pass1 != pass2){
    alert("Password does not exist,repeat your password");
  }
  else{
  document.querySelector(".user_profile").style.display = "inline";
  document.getElementById("user_name").innerHTML = name;
  document.getElementById("sign").innerHTML = "Log Out";
  close_login_page();
} }

function logout(){
  document.querySelector(".user_profile").style.display = "none";
  document.getElementById("sign").innerHTML = "Log In";
}

   


/*<div class = "container_map" style="background-color: rgba(0, 0, 0, 0.699);text-align: center;height: 600px;">
    <div class = "text_map"><h1 style="text-transform:uppercase;color:wheat;">where I am located?</h1></div>
    <div id = "map" style="height: 500px;width: 900px; position: relative;margin-left:300px;margin-top:20px;"></div>
  </div> 

<script>
        
    var map = new google.maps.Map(document.getElementById("map"), options);
  
          function initMap() {
            var options = {
              center: { lat:43.2077905496959, lng:76.66892549621356},
              zoom: 7,
            }
            var map = new google.maps.Map(document.getElementById("map"), options);

            
              var icon = {
                url: "https://cdn.discordapp.com/attachments/403572135328481281/784310663811432448/ea6887f7200e0b33420b13b13015226f.png",
                scaledSize: new google.maps.Size(20,20),
                origin:new google.maps.Point(0,0),
                anchor: new google.maps.Point(0,0)
              };
              var marker1 = new google.maps.Marker({
                position: {lat:43.207782440468264, lng:76.66898006136033},
                map:map,
                icon:icon });
                var icon1 = {
                url: "https://cdn.discordapp.com/attachments/403572135328481281/784318396393193512/home_icon-icons.com_73532.png",
                scaledSize: new google.maps.Size(20,20),
                origin:new google.maps.Point(0,0),
                anchor: new google.maps.Point(0,0)
              };
              const marker2 = new google.maps.Marker({
                position: {lat:43.27733407584172, lng:77.0089043837707},
                map:map,
                icon1:icon1 });
                var icon2 = {
                url: "https://cdn.discordapp.com/attachments/403572135328481281/784322461416030208/61-512.png",
                scaledSize: new google.maps.Size(20,20),
                origin:new google.maps.Point(0,0),
                anchor: new google.maps.Point(0,0)
              };
              const marker = new google.maps.Marker({
                position: {lat:43.27994396295398,lng:77.01009333400934},
                map:map,
                icon:icon1 });

            
const marker3 = new google.maps.Marker({
  
    map,
    position:{lat:43.233508954544625, lng:76.95690078263405},
    map:map,
                icon:icon2
  });
  map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker3.getPosition());
    }, 9000);
  });
  marker3.addListener("click", () => {
    map.setZoom("11");
    map.alert("Hey this is my work place");
  map.setCenter(marker3.getPosition());
  });
}

          
        </script> */