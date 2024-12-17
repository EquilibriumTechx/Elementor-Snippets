(function ($) {
    $(document).ready(function () {
        if (window.elementorFrontend && window.elementorFrontend.isEditMode()) {
            // Create the toggle button
            const toggleButton = $('<button>', {
                id: 'toggle-animation-button',
                text: 'Disable Animations',
                style: 'position: fixed; top: 10px; right: 10px; z-index: 9999; background: #000; color: #fff; font-weight: 900; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; font-size: 16px;',
            });

            // Append the button to the body
            $('body').append(toggleButton);

            // State to track if animations are enabled or disabled
            let animationsEnabled = true;
            let disableAnimationsStyle = null;

            // Function to disable all animations (CSS + JS)
            const disableAnimations = () => {
                // Disable all CSS animations and transitions
                if (!disableAnimationsStyle) {
                    disableAnimationsStyle = document.createElement('style');
                    disableAnimationsStyle.id = 'disable-animations-style';
                    disableAnimationsStyle.textContent = `
                        * {
                            animation: none !important;
                            transition: none !important;
                        }
                        svg path, svg line, svg polyline, svg rect, svg circle, svg ellipse, svg polygon {
                            stroke-dasharray: none !important;
                            stroke-dashoffset: 0 !important;
                            animation: none !important;
                        }
                    `;
                    document.head.appendChild(disableAnimationsStyle);
                }

                // Disable all JavaScript-driven animations by overriding key functions
                window.requestAnimationFrame = function () {
                    return 0;
                };
                window.setTimeout = function (callback) {
                    return callback && callback();
                };
                window.setInterval = function () {
                    return 0;
                };
            };

            // Function to re-enable animations
            const enableAnimations = () => {
                // Remove the global CSS disabling animations
                if (disableAnimationsStyle) {
                    disableAnimationsStyle.remove();
                    disableAnimationsStyle = null;
                }

                // Restore original JavaScript functions
                window.requestAnimationFrame = originalRequestAnimationFrame;
                window.setTimeout = originalSetTimeout;
                window.setInterval = originalSetInterval;

                // Reload the page to ensure all animations are properly restored
                location.reload();
            };

            // Store original JavaScript functions for restoration
            const originalRequestAnimationFrame = window.requestAnimationFrame;
            const originalSetTimeout = window.setTimeout;
            const originalSetInterval = window.setInterval;

            // Button click handler to toggle animations
            toggleButton.on('click', function () {
                if (animationsEnabled) {
                    disableAnimations();
                    toggleButton.text('Enable Animations');
                } else {
                    enableAnimations();
                }
                animationsEnabled = !animationsEnabled;
            });
        }
    });
})(jQuery);
