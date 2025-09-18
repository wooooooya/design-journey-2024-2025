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

// DOM 요소
const categoryButtons = document.querySelectorAll('.category-btn');
const gallery = document.querySelector('.gallery');
const uploadForm = document.getElementById('uploadForm');

let currentCategory = 'poster'; // 기본 카테고리

// 백엔드 API 기본 URL
const BASE_URL = 'http://localhost:8080/api/media';

// 카테고리 버튼 클릭
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    loadGallery(currentCategory);
  });
});

// 갤러리 로드 함수
async function loadGallery(type) {
  try {
    const res = await fetch(`${BASE_URL}/all/${type}`);
    if (!res.ok) throw new Error('이미지 로드 실패');
    const mediaList = await res.json();

    gallery.innerHTML = ''; // 초기화

    mediaList.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item', type);

      const img = document.createElement('img');
      img.src = `data:image/jpeg;base64,${item.base64}`;
      img.alt = item.name;
      img.style.width = '200px';
      img.style.margin = '5px';

      const p = document.createElement('p');
      p.textContent = item.name;

      div.appendChild(img);
      div.appendChild(p);
      gallery.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    alert('갤러리 로드 중 오류가 발생했습니다.');
  }
}

// 업로드 기능
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(uploadForm);
  const type = formData.get('type');

  try {
    const res = await fetch(`${BASE_URL}/upload/${type}`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error('업로드 실패');
    const data = await res.json();
    alert(`${data.name} 업로드 완료!`);
    loadGallery(type); // 업로드 후 갤러리 갱신
    uploadForm.reset();

  } catch (err) {
    console.error(err);
    alert('이미지 업로드 중 오류가 발생했습니다.');
  }
});

// 초기 갤러리 로드
loadGallery(currentCategory);
