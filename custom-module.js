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
const imageFile = document.querySelector('#imageFile');
const imageURL = document.querySelector('#url');
const inputText = document.querySelector('#text'); 
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
        document.querySelector('#imageFile').files = e.dataTransfer.files;
        form.style.display = 'block';
    }
    reader.readAsDataURL(file);
    

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

button.innerHTML = 'Add Image&Text';
button.onclick = () => {
    form.style.display = 'block';
}

toolbar.addHandler('qImage', (file = '', text = '', imageLink = '') => {
    if(file){
        console.log(`file is ${file}`)
        let reader = new FileReader();
        reader.onload = (e) => {
            const convertedImg = e.target.result;
            quill.insertEmbed(quill.getSelection(true).index + 1, 'qImage', { image: convertedImg, text: text });
        }
        reader.readAsDataURL(file);
    }else if(imageLink){
        quill.insertEmbed(quill.getSelection(true).index + 1, 'qImage', { image: imageLink, text: text });
    }

  
});
inputButton.onclick = () => {
    if(imageFile.files[0] && inputText.value){
        imageURL.value = '';
        toolbar.handlers.qImage(file = imageFile.files[0], text = inputText.value, imageLink = '');
        form.style.display = 'none';
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }else if(imageURL && inputText.value){
        imageFile.value = '';
        toolbar.handlers.qImage(file = '', text = inputText.value, imageLink = imageURL.value);
        form.style.display = 'none';
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }
};
document.getElementById('toolbar').appendChild(button);


// var delta = [{
//     "insert": {
//         "qImage": {
//             "image": "https://picsum.photos/200/300",
//             "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//         }
//     }
// }];
// editor.updateContents(delta)
