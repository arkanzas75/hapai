/**
 * Додаткові контролі для model-viewer
 * Цей файл опціональний і додає розширену функціональність
 */

document.addEventListener('DOMContentLoaded', function () {
    const modelViewer = document.querySelector('model-viewer.hapaiavto-overview-img-car');

    if (!modelViewer) {
        return; // Якщо model-viewer не знайдено, виходимо
    }

    // Подія завантаження моделі
    modelViewer.addEventListener('load', function () {
        console.log('3D модель успішно завантажена');
    });

    // Подія помилки завантаження
    modelViewer.addEventListener('error', function (event) {
        console.error('Помилка завантаження 3D моделі:', event);
    });

    // Подія початку взаємодії користувача
    modelViewer.addEventListener('camera-change', function () {
        // Можна додати логіку при зміні камери
    });

    // Зупинка автообертання при наведенні миші (опціонально)
    modelViewer.addEventListener('mouseenter', function () {
        // modelViewer.autoRotate = false;
    });

    // Відновлення автообертання при виході миші (опціонально)
    modelViewer.addEventListener('mouseleave', function () {
        // modelViewer.autoRotate = true;
    });

    if (window.innerWidth <= 768) {
        // Можна змінити параметри для мобільних
        modelViewer.setAttribute('camera-orbit', '45deg 85deg 3m');
        modelViewer.setAttribute('min-camera-orbit', 'auto 85deg auto');
        modelViewer.setAttribute('max-camera-orbit', 'auto 85deg auto');
    }

    // Обробка зміни розміру вікна
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            modelViewer.setAttribute('camera-orbit', '45deg 85deg 3m');
            modelViewer.setAttribute('min-camera-orbit', 'auto 85deg auto');
            modelViewer.setAttribute('max-camera-orbit', 'auto 85deg auto');
        } else {
            modelViewer.setAttribute('camera-orbit', '45deg 75deg 2.5m');
            modelViewer.setAttribute('min-camera-orbit', 'auto 75deg auto');
            modelViewer.setAttribute('max-camera-orbit', 'auto 75deg auto');
        }
    });

    // Додавання індикатора завантаження (опціонально)
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'model-loading-indicator';
    loadingIndicator.innerHTML = '<div class="spinner"></div><p>Завантаження 3D моделі...</p>';
    loadingIndicator.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #FF4800;
        font-size: 16px;
        z-index: 10;
    `;

    // Додаємо індикатор перед завантаженням
    const parentElement = modelViewer.parentElement;
    parentElement.style.position = 'relative';
    parentElement.appendChild(loadingIndicator);

    // Видаляємо індикатор після завантаження
    modelViewer.addEventListener('load', function () {
        loadingIndicator.style.display = 'none';
    });

    // Додавання кнопок керування (опціонально)
    const controlsHTML = `
        <div class="model-viewer-controls" style="
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 20;
        ">
            <button class="model-control-btn" id="resetCamera" style="
                background: #FF4800;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            ">
                Скинути вигляд
            </button>
            <button class="model-control-btn" id="toggleRotation" style="
                background: #FF4800;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            ">
                Зупинити обертання
            </button>
        </div>
    `;

    // Розкоментуйте, якщо потрібні кнопки керування
    // parentElement.insertAdjacentHTML('beforeend', controlsHTML);

    // Обробники для кнопок
    const resetCameraBtn = document.getElementById('resetCamera');
    const toggleRotationBtn = document.getElementById('toggleRotation');

    if (resetCameraBtn) {
        resetCameraBtn.addEventListener('click', function () {
            const phi = window.innerWidth <= 768 ? '85deg' : '75deg';
            const radius = window.innerWidth <= 768 ? '3m' : '2.5m';
            modelViewer.cameraOrbit = `45deg ${phi} ${radius}`;
        });
    }

    if (toggleRotationBtn) {
        let isRotating = true;
        toggleRotationBtn.addEventListener('click', function () {
            isRotating = !isRotating;
            modelViewer.autoRotate = isRotating;
            this.textContent = isRotating ? 'Зупинити обертання' : 'Запустити обертання';
        });
    }
});
