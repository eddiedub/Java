const challenges = [
    {
        id: 0,
        title: "Java Array Filter",
        description: "Write a method to replace all odd numbers in an array with 0",
        answer: "for(int i=0; i<arr.length; i++) if(arr[i]%2!=0) arr[i]=0;",
        hint: "Use a loop and modulo operator",
        validate: (input) => {
            input = input.toLowerCase().trim();
            return input.includes("arr[i]%2!=0") && input.includes("arr[i]=0");
        }
    },
    {
        id: 1,
        title: "React State",
        description: "Write useState hook to manage a color state",
        answer: "const [color, setColor] = useState('#000000');",
        hint: "Use array destructuring with useState",
        validate: (input) => {
            input = input.toLowerCase().trim();
            return input.includes("usestate") && input.includes("color");
        }
    }
    // Add more challenges here
];

let currentChallenge = 0;

function validateQuery(input, expected) {
  // Remove extra spaces and make case insensitive
  input = input.toLowerCase().replace(/\s+/g, ' ').trim();
  expected = expected.toLowerCase().replace(/\s+/g, ' ').trim();
  
  // For exact matches
  if (input === expected) return true;
  
  // For queries that need flexible validation
  if (expected.includes('join')) {
    return input.includes('join') && 
           input.includes('on') && 
           input.includes('customer') && 
           input.includes('salesman');
  }
  
  if (expected.includes('group by')) {
    return input.includes('group by') && 
           input.includes('count');
  }
  
  return false;
}

function loadSelectedChallenge() {
  const select = document.getElementById('challenge-select');
  currentChallenge = parseInt(select.value);
  loadChallenge(currentChallenge);
}

function previousChallenge() {
  if (currentChallenge > 0) {
    currentChallenge--;
    loadChallenge(currentChallenge);
    document.getElementById('challenge-select').value = currentChallenge;
  }
}

function nextChallenge() {
  if (currentChallenge < challenges.length - 1) {
    currentChallenge++;
    loadChallenge(currentChallenge);
    document.getElementById('challenge-select').value = currentChallenge;
  }
}

function loadChallenge(index) {
  const challenge = challenges[index];
  document.getElementById('challenge-title').textContent = `Challenge ${index + 1}: ${challenge.title}`;
  document.getElementById('challenge-description').textContent = challenge.description;
  document.getElementById('sqlInput').value = '';
  document.getElementById('result').innerHTML = '';
  
  // Update navigation buttons
  document.getElementById('prev-challenge').disabled = index === 0;
  document.getElementById('next-challenge').disabled = index === challenges.length - 1;
}

function checkQuery(index) {
  const input = document.getElementById('sqlInput').value;
  const result = document.getElementById('result');
  const challenge = challenges[index];
  
  if (validateQuery(input, challenge.answer)) {
    result.className = 'result success';
    result.innerHTML = `
      <h4>✅ Correct! Well done!</h4>
      <p>A valid solution is:</p>
      <pre><code>${challenge.answer}</code></pre>`;
  } else {
    result.className = 'result error';
    result.innerHTML = `
      <h4>❌ Not quite right.</h4>
      <p>Hint: ${challenge.hint}</p>`;
  }
}

// Initialize first challenge
loadChallenge(currentChallenge);
