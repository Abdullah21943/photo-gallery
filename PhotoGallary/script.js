


// Rating stars
function rate(star, value) {
  const stars = star.parentNode.querySelectorAll('span');
  stars.forEach((s, i) => {
    s.style.color = i < value ? '#FFD700' : '#ccc';
  });
}

// Favorite icon with localStorage
function toggleFav(icon) {
  var img = icon.closest('.image-card').querySelector('img');
  var src = img.src;
  var favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (icon.textContent === '♡') {
    icon.textContent = '♥';
    icon.style.color = '#e74c3c';
    if (!favs.includes(src)) {
      favs.push(src);
      localStorage.setItem('favorites', JSON.stringify(favs));
    }
  } else {
    icon.textContent = '♡';
    icon.style.color = '#e74c3c';
    favs = favs.filter(function(item) { return item !== src; });
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}

// On page load, set favorite icon state
window.addEventListener('DOMContentLoaded', function() {
  var favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  document.querySelectorAll('.image-card').forEach(function(card) {
    var img = card.querySelector('img');
    var icon = card.querySelector('.fav-icon');
    if (icon && img && favs.includes(img.src)) {
      icon.textContent = '♥';
      icon.style.color = '#e74c3c';
    } else if (icon) {
      icon.textContent = '♡';
      icon.style.color = '#e74c3c';
    }
  });

  // Hover animation and auto-scroll to next image
  document.querySelectorAll('.image-card').forEach(function(card) {
    let timer;
    card.addEventListener('mouseenter', function() {
      timer = setTimeout(function() {
        card.classList.add('hovered');
        // Scroll to next image after animation
        setTimeout(function() {
          card.classList.remove('hovered');
          var next = card.nextElementSibling;
          if (next && next.classList.contains('image-card')) {
            next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }, 3000);
      }, 0); // Start animation immediately on hover
    });
    card.addEventListener('mouseleave', function() {
      clearTimeout(timer);
      card.classList.remove('hovered');
    });
  });
});
