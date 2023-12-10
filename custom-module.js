//Quill functionality
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
const imageInput = document.querySelector('#url') 
const inputButton = document.querySelector('#inputButton');
const toolbar = quill.getModule('toolbar');
const button = document.createElement('button');
const editor = document.querySelector('#editor');

editor.addEventListener('dragover', (e) => {e.preventDefault()});
editor.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader =  new FileReader();
    reader.onload = () => {
        // const convertedImg = e.target.result;
        document.querySelector('#url').files = e.dataTransfer.files;
        form.style.display = 'block';
    }
    reader.readAsDataURL(file);
    

})

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

button.innerHTML = 'Add Image&Text';
button.onclick = () => {
    form.style.display = 'block';
}

toolbar.addHandler('qImage', (imageFile = '', text = '') => {
    let reader = new FileReader();
    reader.onload = (e) => {
        const convertedImg = e.target.result;
        quill.insertEmbed(quill.getSelection(true).index + 1, 'qImage', { image: convertedImg, text: text });
    }
    reader.readAsDataURL(imageFile);

  
});
inputButton.onclick = () => {
    if(document.querySelector('#url').files[0] && document.querySelector('#text').value){
        toolbar.handlers.qImage(document.querySelector('#url').files[0], text = document.querySelector('#text').value)
        form.style.display = 'none';
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
}
};
document.getElementById('toolbar').appendChild(button);
