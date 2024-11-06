const generatePasswordBtn = document.getElementById('generate-password');
const copyPasswordBtn = document.getElementById('copy-password');
const passwordDisplay = document.getElementById('generated-password');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSpecial = document.getElementById('include-special');
const passwordLength = document.getElementById('password-length');
const strengthIndicator = document.getElementById('strength-indicator');
const strengthText = document.getElementById('strength-text');
const criteriaList = document.getElementById('criteria-list');
const passwordScore = document.getElementById('password-score');

generatePasswordBtn.addEventListener('click', () => {
    const length = parseInt(passwordLength.value);
    const hasUppercase = includeUppercase.checked;
    const hasLowercase = includeLowercase.checked;
    const hasNumbers = includeNumbers.checked;
    const hasSpecial = includeSpecial.checked;

    const password = generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSpecial);
    passwordDisplay.textContent = password;
    evaluatePasswordStrength(password);
});

copyPasswordBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordDisplay.textContent)
        .then(() => alert('Password copied to clipboard!'))
        .catch(err => alert('Failed to copy password: ', err));
});

function generatePassword(length, upper, lower, number, special) {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let passwordChars = '';
    if (upper) passwordChars += upperChars;
    if (lower) passwordChars += lowerChars;
    if (number) passwordChars += numberChars;
    if (special) passwordChars += specialChars;

    if (passwordChars === '') return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * passwordChars.length);
        password += passwordChars[randomIndex];
    }

    return password;
}

function evaluatePasswordStrength(password) {
    let strength = 0;

    criteriaList.innerHTML = `
        <li>${password.length >= 8 ? '✓' : '✕'} At least 8 characters</li>
        <li>${/\d/.test(password) ? '✓' : '✕'} Includes a number</li>
        <li>${/[A-Z]/.test(password) ? '✓' : '✕'} Includes uppercase letter</li>
        <li>${/[^a-zA-Z0-9]/.test(password) ? '✓' : '✕'} Includes special character</li>
    `;

    if (password.length >= 8) strength += 25; 
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25; 
    if (/\d/.test(password)) strength += 25; 
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

    passwordScore.textContent = `${strength}/100`;

    const strengthPercentage = (strength / 100) * 100;
    strengthIndicator.style.width = strengthPercentage + '%';

    if (strength < 50) {
        strengthIndicator.style.backgroundColor = 'red';
        strengthText.textContent = 'Weak';
    } else if (strength < 75) {
        strengthIndicator.style.backgroundColor = 'orange';
        strengthText.textContent = 'Moderate';
    } else {
        strengthIndicator.style.backgroundColor = 'green';
        strengthText.textContent = 'Strong';
    }
}
