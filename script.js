// Load talents from localStorage when page loads
let talents = JSON.parse(localStorage.getItem('talents')) || [];

// Display talents on page load
document.addEventListener('DOMContentLoaded', () => {
  displayTalents();
});

// Add a new talent
function addUser() {
  const nameInput = document.getElementById('name');
  const skillInput = document.getElementById('skill');
  
  const name = nameInput.value.trim();
  const skill = skillInput.value.trim();
  
  // Validation
  if (!name || !skill) {
    alert('Please fill in both fields');
    return;
  }
  
  // Create talent object
  const talent = {
    id: Date.now(),
    name: name,
    skill: skill,
    timestamp: new Date().toLocaleString()
  };
  
  // Add to array
  talents.unshift(talent);
  
  // Save to localStorage
  saveTalents();
  
  // Clear inputs
  nameInput.value = '';
  skillInput.value = '';
  nameInput.focus();
  
  // Update display
  displayTalents();
}

// Display all talents
function displayTalents() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  
  if (talents.length === 0) {
    list.innerHTML = '<li class="empty-message">No talents posted yet. Be the first! 🚀</li>';
    return;
  }
  
  talents.forEach(talent => {
    const li = document.createElement('li');
    li.className = 'talent-item';
    li.innerHTML = `
      <div class="talent-content">
        <div class="talent-header">
          <strong>${escapeHtml(talent.name)}</strong>
          <span class="talent-skill">💡 ${escapeHtml(talent.skill)}</span>
        </div>
        <div class="talent-timestamp">${talent.timestamp}</div>
      </div>
      <div class="talent-actions">
        <button class="delete-btn" onclick="deleteTalent(${talent.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Delete a talent
function deleteTalent(id) {
  if (confirm('Are you sure you want to delete this talent?')) {
    talents = talents.filter(talent => talent.id !== id);
    saveTalents();
    displayTalents();
  }
}

// Save talents to localStorage
function saveTalents() {
  localStorage.setItem('talents', JSON.stringify(talents));
}

// Prevent XSS attacks by escaping HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('skill').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addUser();
    }
  });
});
