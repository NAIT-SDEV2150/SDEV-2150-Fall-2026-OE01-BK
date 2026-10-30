console.log('Client script loaded');

// Simulate hydration
document.getElementById('test-btn')?.addEventListener('click', () => {
  alert('Button is now interactive (hydrated)');
});

// Enhance list items
document.querySelectorAll('#resource-list li').forEach((item) => {
  item.addEventListener('click', () => {
    alert(`You clicked: ${item.textContent}`);
  });
});
