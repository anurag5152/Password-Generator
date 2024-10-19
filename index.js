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

    if (password.length >= 8) strength += 1; // Length
    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1; // Special character

    const strengthPercentage = (strength / 5) * 100;
    strengthIndicator.style.width = strengthPercentage + '%';

    if (strength < 2) {
        strengthIndicator.style.backgroundColor = 'red';
        strengthText.textContent = 'Weak';
    } else if (strength < 4) {
        strengthIndicator.style.backgroundColor = 'orange';
        strengthText.textContent = 'Moderate';
    } else {
        strengthIndicator.style.backgroundColor = 'green';
        strengthText.textContent = 'Strong';
    }
}
