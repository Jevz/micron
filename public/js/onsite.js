(() => {
    const baseUrl = 'http://localhost:8080';

    function getQueryParams() {
        // Find the script that loaded this file
        const scripts = document.getElementsByTagName("script");
        let scriptTag = null;

        for (let script of scripts) {
            if (script.src.includes("onsite.js")) {  // Ensure correct script
                scriptTag = script;
                break;
            }
        }

        if (!scriptTag) {
            console.error("Could not find onsite.js script tag");
            return {};
        }

        const url = new URL(scriptTag.src);
        return Object.fromEntries(url.searchParams.entries());
    }

    function loadTailwind(callback) {
        if (!document.querySelector("#tailwind-widget")) {
            const link = document.createElement("link");
            link.id = "tailwind-widget";
            link.rel = "stylesheet";

        // Check if Vite is in dev mode (localhost)
            if (window.location.hostname === "localhost") {
                link.href = "http://localhost:5173/resources/css/app.css"; // Dev mode for vite
            } else {
                link.href = "TBC"
            }

            link.onload = callback;
            document.head.appendChild(link);
        } else {
            callback();
        }
    }

    function loadWidgetHTML(callback) {
        fetch(`${baseUrl}/html/onsite.html`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement("div");
                div.innerHTML = html;
                document.body.appendChild(div);
                callback();
            })
            .catch(error => console.error("Error loading widget:", error));
    }

    function initWidget() {
        const binderEl = document.getElementById('widget-binder');
        const user = 'test-user-name';
        const amount = '5';
        const currency = 'ZAR';

        const params = getQueryParams();
        console.log(params);

        // Create Button
        const button = document.createElement('button');
        button.innerText = `Support ${user}`;
        button.className = "widget-tailwind bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition";

        binderEl.appendChild(button);

        loadWidgetHTML(() => {
            const modal = document.getElementById('payment-modal');
            document.getElementById('widget-title').textContent = `Support ${user}`;
            document.getElementById('widget-amount').textContent = `${currency} ${amount}`;

            button.onclick = () => modal.classList.remove('hidden');
            document.getElementById('close-modal').onclick = () => modal.classList.add('hidden');

            document.getElementById('pay-now').onclick = () => {
                const statusMessage = document.getElementById('payment-status');
                statusMessage.classList.remove('hidden');
                statusMessage.textContent = "Processing...";
                statusMessage.className = "widget-tailwind text-blue-500 mt-3 text-sm";

                fetch(`${baseUrl}/api/pay`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user, amount, currency })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        statusMessage.textContent = "Payment successful!";
                        statusMessage.className = "widget-tailwind text-green-500 mt-3 text-sm";
                    } else {
                        statusMessage.textContent = "Payment failed. Try again.";
                        statusMessage.className = "widget-tailwind text-red-500 mt-3 text-sm";
                    }
                })
                .catch(() => {
                    statusMessage.textContent = "Error processing payment.";
                    statusMessage.className = "widget-tailwind text-red-500 mt-3 text-sm";
                });
            };
        });
    }

    loadTailwind(initWidget);
})();
