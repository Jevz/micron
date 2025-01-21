(() => {
    function initWidget() {
        function createButton() {
            fetch(`${appUrl}/onsite/button?user=${user}`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement("div");
                div.innerHTML = html;
                binderEl.appendChild(div);
            })
            .catch(error => console.error("Error loading widget:", error)); 
        }
    
        function loadModal(callback) {
            fetch(`${appUrl}/onsite/modal`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement("div");
                div.innerHTML = html;
                document.body.appendChild(div);
                callback();
            })
            .catch(error => console.error("Error loading widget:", error)); 
        }

        function toTitleCase(str) {
            return str.replace(
              /\w\S*/g,
              text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
            );
          }
          
    
        const binderEl = document.getElementById('widget-binder');
        const user = params.user || 'Unknown';
        const amount = params.amount || 10;
        const title = toTitleCase(params.title || `Support ${user}`);
        const content = params.content || `You are about to donate ${amount} tokens valued at R${(amount/100).toFixed(2)}.`;
    
        createButton();
    
        loadModal(() => {
            const modal = document.getElementById('payment-modal');
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-content').textContent = content;
        });
    
        // ✅ Use event delegation to handle dynamically loaded elements
        document.addEventListener('click', (event) => {
            if (event.target.matches('#onsite-button')) {
                document.getElementById('payment-modal').classList.remove('hidden');
            }
            if (event.target.matches('#close-modal')) {
                document.getElementById('payment-modal').classList.add('hidden');
            }
            if (event.target.matches('#pay-now')) {
                const statusMessage = document.getElementById('payment-status');
                statusMessage.classList.remove('hidden');
                statusMessage.textContent = "Processing...";
                statusMessage.className = "widget-tailwind text-blue-500 mt-3 text-sm";

                fetch(`${appUrl}/api/pay`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',        
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ user, amount })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        statusMessage.textContent = "Payment successful!";
                        statusMessage.className = "widget-tailwind text-green-500 mt-3 text-sm";

                        setTimeout(() => {
                            document.getElementById('payment-modal').classList.add('hidden');
                            statusMessage.textContent = "";
                            statusMessage.className = "";
                        }, 1500)
                    } else {
                        statusMessage.textContent = "Payment failed. Try again.";
                        statusMessage.className = "widget-tailwind text-red-500 mt-3 text-sm";
                    }
                })
                .catch(() => {
                    statusMessage.textContent = "Error processing payment.";
                    statusMessage.className = "widget-tailwind text-red-500 mt-3 text-sm";
                });
            }
        });
    }
    
    const appUrl = 'http://localhost:8080';
    const assetUrl = 'http://localhost:5173/resources';

    const scriptTag = document.currentScript;
    const url = new URL(scriptTag.src);
    const params = Object.fromEntries(url.searchParams.entries());

    initWidget();
})();
