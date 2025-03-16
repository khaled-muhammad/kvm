 // Filter functionality: Show cards based on filter button clicked.
 const filterButtons = document.querySelectorAll('.filter');
 const cards = document.querySelectorAll('.card');

 filterButtons.forEach(button => {
   button.addEventListener('click', () => {
     // Remove active class from all buttons
     filterButtons.forEach(btn => btn.classList.remove('active'));
     // Add active class to clicked button
     button.classList.add('active');
     
     const filter = button.getAttribute('data-filter');
     cards.forEach(card => {
       // Show card if filter is "all" or matches the card's category
       if (filter === 'all' || card.getAttribute('data-category') === filter) {
         card.style.display = 'block';
       } else {
         card.style.display = 'none';
       }
     });
   });
 });

 // Dummy Infinite Scroll: Log message when user scrolls to bottom.
 window.addEventListener('scroll', () => {
   if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2) {
     console.log('Reached bottom. Load more cards...');
     // In a real implementation, here you would fetch more content.
   }
 });