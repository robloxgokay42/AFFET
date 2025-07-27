document.addEventListener('DOMContentLoaded', () => {
    const mainPeaceButton = document.getElementById('main-peace-button');
    const noPeaceButton = document.getElementById('no-peace-button');
    const peaceMessage = document.getElementById('peace-message');
    const buttonContainer = document.querySelector('.button-container');
    const mainContent = document.getElementById('main-content');
    const confettiContainer = document.getElementById('confetti-container');

    let noPeaceButtonScale = 1;
    const SHRINK_AMOUNT = 0.15; // Her tıklamada küçülme oranı
    const MIN_SCALE = 0.1; // Butonun tamamen yok olması için minimum ölçek

    // --- Buton Olay Dinleyicileri ---
    noPeaceButton.addEventListener('click', () => {
        noPeaceButtonScale -= SHRINK_AMOUNT;
        noPeaceButton.classList.add('shrink-button'); // Geçiş animasyonu için sınıf ekle

        if (noPeaceButtonScale <= MIN_SCALE) {
            // Buton yeterince küçüldü, yok et
            noPeaceButton.style.opacity = '0';
            noPeaceButton.style.pointerEvents = 'none'; // Tıklamayı engelle
            setTimeout(() => {
                noPeaceButton.classList.add('hidden'); // DOM'dan kaldır
            }, 300); // CSS transition süresi kadar bekle
        } else {
            // Butonu küçült
            noPeaceButton.style.transform = `scale(${noPeaceButtonScale})`;
        }
    });

    mainPeaceButton.addEventListener('click', () => {
        // Tüm içeriği gizle ve başarı mesajını göster
        peaceMessage.classList.add('fade-out');
        buttonContainer.classList.add('fade-out');

        setTimeout(() => {
            peaceMessage.classList.add('hidden');
            buttonContainer.classList.add('hidden');

            const successMessage = document.createElement('h1');
            successMessage.id = 'success-message';
            successMessage.textContent = 'Seni Seviyorum Teyzeciğim! ❤️';
            mainContent.appendChild(successMessage);
            successMessage.classList.add('fade-in', 'bounce-in'); // Animasyonları ekle

            createConfettiEffect(); // Konfetileri başlat
        }, 500); // Fade-out animasyonu süresi kadar bekle
    });

    // --- Konfeti Efekti ---
    function createConfettiEffect() {
        const numConfetti = 100; // Konfeti sayısı
        for (let i = 0; i < numConfetti; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = `${Math.random() * 100}vh`;
            // Rastgele renkler (pastel ve parlak)
            const hue = Math.random() * 360;
            const saturation = 70 + Math.random() * 30; // 70-100%
            const lightness = 60 + Math.random() * 20; // 60-80%
            piece.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            // Daha dinamik düşüş ve dönüş
            piece.style.animationDelay = `${Math.random() * 0.8}s`;
            piece.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
            piece.style.transform = `rotate(${Math.random() * 360}deg)`; // Başlangıç dönüşü

            confettiContainer.appendChild(piece);

            // Animasyon bitince temizle
            piece.addEventListener('animationend', () => piece.remove());
        }
    }
});
