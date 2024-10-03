class Written extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const container = document.createElement('div');
        container.style.fontFamily = 'monospace';
        container.style.fontSize = '24px';
        container.style.whiteSpace = 'nowrap';
        container.style.overflow = 'hidden';
        container.style.borderRight = '2px solid';
        const typewriter = document.createElement('span');
        typewriter.classList.add('typewriter');
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.textContent = '|';
        container.appendChild(typewriter);
        container.appendChild(cursor);
        shadow.appendChild(container);
        const text = this.getAttribute('text') || 'Example';
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                typewriter.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 200);
            }
        };
        typeWriter();
        const style = document.createElement('style');
        style.textContent = `
            .cursor {
                display: inline-block;
                width: 1px;
                background-color: black;
                animation: blink 0.7s steps(1) infinite;
            }
            @keyframes blink {
                50% { opacity: 0; }
            }
        `;
        shadow.appendChild(style);
    }
}

customElements.define('written', Written);
