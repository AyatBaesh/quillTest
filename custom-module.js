//Quill functionality
var Block = Quill.import('blots/block');

class QImageBlot extends Block {
    static create(value) {
        let node = super.create();
        node.innerHTML = `<img src="${value.image}"/>${value.text}`;
        // node.innerHTML = `<figure>
        //                     <img src=${value.image} />
        //                     <figcaption>${value.text}</figcaption>
        //                  </figure>`
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

class CustomBar {

    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.initToolbarButton();
        this.form = this.createForm();
        this.initDragAndDrop();
    }

    insertContent() {
        const urlInput = document.querySelector('#url');
        const imageInput = document.querySelector('#imageFile');
        const textInput = document.querySelector('#textInput')
        const inputButton = document.querySelector('#inputButton');
        let image = '';
        let text = '';
        inputButton.addEventListener('click',() => {
            text = textInput.value;
            if(urlInput.disabled){
                image = this._convertToBase64(imageInput.files[0], (convertedImage) => {
                    this.insertQimageText(convertedImage, text);
                });
            }else if(imageInput.disabled){
                image = urlInput.value;
                this.insertQimageText(image, text);
            }
        document.querySelectorAll('input').forEach(inp => {inp.value = ''});
        this.form.style.display = 'none';
        
        })
    }

    initToolbarButton() {
        const button = document.querySelector('#qImage');
        button.addEventListener('click',() => {
            console.log('has worked')
            this.form.style.display = 'block';
            this.insertContent();
        })
    }

    insertQimageText(imageSrc, imageText) {
        this.quill.insertEmbed(
            this.quill.getSelection('true').index, 
            'qImage',
            {image: imageSrc, text: imageText}
        );
    }

    createForm() {
        const formDiv = document.createElement('div');
        formDiv.id = 'customForm';
        formDiv.style.display = 'none';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.id = 'textInput';
        textInput.placeholder = 'Enter Image Text';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'imageFile';
        fileInput.accept = 'image/*';
        
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.id = 'url';
        urlInput.placeholder = 'Enter Image URL';

        urlInput.addEventListener('input', handleInputChange);
        fileInput.addEventListener('input', handleInputChange);

        function handleInputChange() {
        if (urlInput.value) {
            fileInput.disabled = true;
        } else if (fileInput.value) {
            urlInput.disabled = true;
        } else {
            urlInput.disabled = false;
            fileInput.disabled = false;
        }
        }

        const addButton = document.createElement('button');
        addButton.id = 'inputButton';
        addButton.textContent = 'Add';

        formDiv.appendChild(textInput);
        formDiv.appendChild(fileInput);
        formDiv.appendChild(urlInput);
        formDiv.appendChild(addButton);
        document.body.appendChild(formDiv);
        return formDiv;

    }

    initDragAndDrop() {
        const editor = this.quill.container;
        editor.addEventListener('dragover', (e) => {e.preventDefault()});
        editor.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            this._convertToBase64(file, (convertedImage) => {
                let text = prompt('Enter image text'); //FIXME Add text input and read value;
                const image = convertedImage;
                this.insertQimageText(image, text);
            }); 
        })
    }

    _convertToBase64(file, callback) {
        if(file){
            const reader = new FileReader();
            reader.onload = () => callback(reader.result);
            reader.readAsDataURL(file);
        }else{
            console.error('No file');
        }
    }

} 

Quill.register('modules/custombar', CustomBar);

var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar',
        custombar: {},
    }

});


const Delta = Quill.import('delta');
quill.updateContents(new Delta().retain(10).insert({
  qImage: {
    image: 'https://picsum.photos/200/300',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
}));


function convertDeltaToJSON() {
    const delta = quill.getContents();
    const deltaJSON = delta.ops;
    return JSON.stringify(deltaJSON, null, 2);
}


const deltaRepresentationJSON = convertDeltaToJSON();
console.log(deltaRepresentationJSON);
