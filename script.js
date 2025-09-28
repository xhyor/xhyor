// 填充年份
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("nav a");

  // 读取 localStorage 或 URL hash
  const lastPage = localStorage.getItem("currentPage") || window.location.hash.substring(1) || "about";
  showPage(lastPage);

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href").substring(1);
      showPage(target);
      localStorage.setItem("currentPage", target);
      window.location.hash = target;
    });
  });

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    const page = document.getElementById(id);
    if (page) page.classList.add("active");
  }
});

// 背景几何动画
const canvas=document.getElementById('bg'),ctx=canvas.getContext('2d');
let w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});
const points=[];
for(let i=0;i<120;i++){points.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5});}
function animate(){
  ctx.clearRect(0,0,w,h);
  for(let i=0;i<points.length;i++){
    let p=points[i];
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
    ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
    for(let j=i+1;j<points.length;j++){
      let q=points[j],dist=Math.hypot(p.x-q.x,p.y-q.y);
      if(dist<130){
        ctx.strokeStyle='rgba(255,255,255,'+(0.2-dist/600)+')';
        ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

// 设置每个 grid-item 背景
document.querySelectorAll('.grid-item').forEach(item=>{
  const bg = item.style.getPropertyValue('--bg');
  item.style.setProperty('background-image', bg);
});

// 移动端触摸缩放 + 光晕效果
document.querySelectorAll('.grid-item').forEach(item=>{
  let scaleTimeout;

  item.addEventListener('touchstart',()=>{
    item.style.transform = 'scale(1.05)';
    item.style.boxShadow = '0 0 25px rgba(0,255,255,0.8)';
  });

  item.addEventListener('touchend',()=>{
    clearTimeout(scaleTimeout);
    scaleTimeout = setTimeout(()=>{
      item.style.transform = 'scale(1)';
      item.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
    }, 150);
  });
});

// 留言板逻辑
const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

// 读取本地留言
const comments = JSON.parse(localStorage.getItem("comments") || "[]");
comments.forEach(c => addComment(c.name, c.message));

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  if (!name || !message) return;
  addComment(name, message);
  comments.push({ name, message });
  localStorage.setItem("comments", JSON.stringify(comments));
  form.reset();
});

function addComment(name, message) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `<strong>${name}</strong>: ${message}`;
  list.appendChild(div);
}
