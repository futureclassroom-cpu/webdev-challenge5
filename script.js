// ========================================
// HEALTH DASHBOARD ANIMATIONS
// ========================================

// Animate values on page load
window.addEventListener('load', () => {
    animateValue('heartRate', 0, 75, 2000);
    animateValue('steps', 0, 8542, 2000);
    animateValue('calories', 0, 1850, 2000);
    animateValue('sleep', 0, 7.5, 2000);
});

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = id === 'sleep' ? current.toFixed(1) : Math.floor(current).toLocaleString();
    }, 16);
}

// ========================================
// SCROLL TO DASHBOARD FUNCTION
// ========================================

function scrollToDashboard() {
    document.getElementById('dashboard').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function openUpdateModal() {
    const modal = document.getElementById('updateModal');
    
    // Set current values in form
    const currentHeartRate = document.getElementById('heartRate').textContent;
    const currentSteps = document.getElementById('steps').textContent.replace(',', '');
    const currentCalories = document.getElementById('calories').textContent.replace(',', '');
    const currentSleep = document.getElementById('sleep').textContent;
    
    document.getElementById('inputHeartRate').value = currentHeartRate;
    document.getElementById('inputSteps').value = currentSteps;
    document.getElementById('inputCalories').value = currentCalories;
    document.getElementById('inputSleep').value = currentSleep;
    
    modal.style.display = 'block';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.3s';
}

function closeUpdateModal() {
    const modal = document.getElementById('updateModal');
    modal.style.display = 'none';
}

function updateHealthData(event) {
    event.preventDefault();
    
    // Get new values from form
    const newHeartRate = parseInt(document.getElementById('inputHeartRate').value);
    const newSteps = parseInt(document.getElementById('inputSteps').value);
    const newCalories = parseInt(document.getElementById('inputCalories').value);
    const newSleep = parseFloat(document.getElementById('inputSleep').value);
    
    // Get current values
    const currentHeartRate = parseInt(document.getElementById('heartRate').textContent);
    const currentSteps = parseInt(document.getElementById('steps').textContent.replace(',', ''));
    const currentCalories = parseInt(document.getElementById('calories').textContent.replace(',', ''));
    const currentSleep = parseFloat(document.getElementById('sleep').textContent);
    
    // Animate value changes
    animateValue('heartRate', currentHeartRate, newHeartRate, 1000);
    animateValue('steps', currentSteps, newSteps, 1000);
    animateValue('calories', currentCalories, newCalories, 1000);
    animateValue('sleep', currentSleep, newSleep, 1000);
    
    // Update progress bars with animation
    setTimeout(() => {
        const heartProgress = Math.min((newHeartRate / 200) * 100, 100);
        const stepsProgress = Math.min((newSteps / 10000) * 100, 100);
        const caloriesProgress = Math.min((newCalories / 2000) * 100, 100);
        const sleepProgress = Math.min((newSleep / 8) * 100, 100);
        
        document.getElementById('heartProgress').style.width = `${heartProgress}%`;
        document.getElementById('stepsProgress').style.width = `${stepsProgress}%`;
        document.getElementById('caloriesProgress').style.width = `${caloriesProgress}%`;
        document.getElementById('sleepProgress').style.width = `${sleepProgress}%`;
    }, 500);
    
    // Close modal
    closeUpdateModal();
    
    // Show success message
    showNotification('Health data updated successfully!', 'success');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('updateModal');
    if (event.target === modal) {
        closeUpdateModal();
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4caf50, #45a049)' : 'linear-gradient(135deg, #f44336, #da190b)'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        font-size: 16px;
        font-weight: 500;
        animation: slideInRight 0.3s;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// CAROUSEL TESTIMONIALS
// ========================================

let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
    currentSlide = index;
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Auto carousel - rotate every 5 seconds
let carouselInterval = setInterval(nextSlide, 5000);

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

// ========================================
// ACCORDION FUNCTIONALITY
// ========================================

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.accordion-header').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
        content.classList.add('active');
        header.classList.add('active');
    }
}

// ========================================
// MEMORY GAME
// ========================================

const icons = [
    'fa-heartbeat', 'fa-running', 'fa-fire', 'fa-bed',
    'fa-apple-alt', 'fa-dumbbell', 'fa-water', 'fa-medkit'
];

let gameCards = [...icons, ...icons];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isProcessing = false;

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initGame() {
    gameCards = shuffleArray([...icons, ...icons]);
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    
    gameCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
    
    // Reset counters
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    isProcessing = false;
    
    // Update display
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0';
}

function flipCard() {
    if (isProcessing) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;

    // Flip the card
    this.classList.add('flipped');
    this.innerHTML = `<i class="fas ${this.dataset.icon}"></i>`;
    flippedCards.push(this);

    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
        isProcessing = true;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        setTimeout(() => {
            checkMatch();
        }, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.icon === card2.dataset.icon) {
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        
        matchedPairs++;
        document.getElementById('matches').textContent = matchedPairs;
        
        flippedCards = [];
        isProcessing = false;
        
        // Check if game is complete
        if (matchedPairs === 8) {
            setTimeout(() => {
                showGameComplete();
            }, 500);
        }
    } else {
        // No match - flip cards back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            
            flippedCards = [];
            isProcessing = false;
        }, 1000);
    }
}

function showGameComplete() {
    const message = `🎉 Congratulations! 🎉\n\nYou completed the game in ${moves} moves!\n\nWould you like to play again?`;
    
    if (confirm(message)) {
        resetGame();
    }
}

function resetGame() {
    initGame();
    showNotification('Game reset! Good luck!', 'success');
}

// Initialize game on page load
initGame();

// ========================================
// SMOOTH SCROLLING FOR ALL LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 1500;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log('%c🏥 Welcome to HealthTrack Pro! 🏥', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cYour health is our priority!', 'color: #764ba2; font-size: 16px;');
console.log('%cDeveloped with ❤️ for better health monitoring', 'color: #555; font-size: 12px;');
