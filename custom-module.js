document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: '#toolbar'
        }
    });

    var Block = Quill.import('blots/block');

    class QImageBlot extends Block {
        static create(value) {
            let node = super.create();
            node.innerHTML = `<img src="${value.image}"/>\n${value.text}`;
            return node;
        }

        static value(node) {
            return {
                image: node.querySelector('img').src,
                text: node.textContent,
            };
        }
    }
    QImageBlot.blotName = 'qImage';
    QImageBlot.tagName = 'q-img-text';
    Quill.register(QImageBlot);
    const form = document.querySelector('#customForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    const inputButton = document.querySelector('#inputButton');
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('qImage', () => {
        // const imageUrl = prompt('Enter image URL');
        // const text = prompt('Enter text');
        let imageUrl = document.querySelector('#url').value;
        let text = document.querySelector('#text').value;

            if (imageUrl && text) {
                quill.insertEmbed(quill.getSelection(true).index + 1, 'qImage', { image: imageUrl, text: text });
            }
            
        
        
    });

    const button = document.createElement('button');
    button.innerHTML = 'Add Image + Text';
    button.onclick = () => {
        form.style.display = 'block';
    }
    inputButton.onclick = () => {
        toolbar.handlers.qImage()
        form.style.display = 'none';
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    };
    document.getElementById('toolbar').appendChild(button);
});
