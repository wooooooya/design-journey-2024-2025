// 마우스 커서 따라다니기
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// 카테고리 필터
const buttons = document.querySelectorAll('.category-btn');
const items = document.querySelectorAll('.item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    items.forEach(item => {
      if(item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
