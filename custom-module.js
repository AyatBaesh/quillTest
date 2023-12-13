
class CustomModule {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.form = this.createForm();
        this.initToolbarButton();
        this.initDragAndDrop();
    }

    initToolbarButton() {
        const button = document.querySelector('.qImage');
        button.addEventListener('click',() => {
            this.form.style.display = 'block';
        })
    }

    initDragAndDrop() {
        const editor = this.quill.container;
        editor.addEventListener('dragover', (e) => {e.preventDefault()});
        editor.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            this._convertToBase64(file, (convertedImage) => {
                let text = prompt('Enter image text'); 
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
    
    insertQimageText(imageSrc, imageText) {
        let range = this.quill.getSelection(true);
        this.quill.insertEmbed(range.index, 'qImage', {image: imageSrc, text: imageText}
        );
        this.quill.setSelection(range.index + 1);
        this.updateTitles();
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

        const addButton = document.createElement('button');
        addButton.id = 'inputButton';
        addButton.textContent = 'Add';

        formDiv.appendChild(textInput);
        formDiv.appendChild(fileInput);
        formDiv.appendChild(urlInput);
        formDiv.appendChild(addButton);
        document.body.appendChild(formDiv);



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
        
        urlInput.addEventListener('input', handleInputChange);
        fileInput.addEventListener('input', handleInputChange);
        addButton.addEventListener('click', () => {
            let image = '';
            let text = textInput.value;
            if(urlInput.disabled){
                image = this._convertToBase64(fileInput.files[0], (convertedImage) => {
                    this.insertQimageText(convertedImage, text);
                });
            }else if(fileInput.disabled){
                image = urlInput.value;
                this.insertQimageText(image, text);
            }
            this.form.querySelectorAll('input').forEach(inp => {inp.value = ''; inp.disabled = false});
            this.form.style.display = 'none';
        });

        return formDiv;

    }

    

    
    updateTitles() {
        const images = this.quill.container.querySelectorAll('q-img-text');
        images.forEach((image, index) => {
            if(index != 0){
                image.setAttribute('title', index);
            }
        })
    }

} 


export default CustomModule;


