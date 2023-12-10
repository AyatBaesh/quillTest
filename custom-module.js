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
});

const inputButton = document.querySelector('#inputButton');
const toolbar = quill.getModule('toolbar');

toolbar.addHandler('qImage', () => {
    let imageFile = document.querySelector('#url').files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const convertedImg = e.target.result;
        quill.insertEmbed(quill.getSelection(true).index + 1, 'qImage', { image: convertedImg, text: text });
    }
    reader.readAsDataURL(imageFile)
    let text = document.querySelector('#text').value;   
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
