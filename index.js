import CustomModule from './custom-module.js';
import QImageBlot from './custom-blot.js';

Quill.register(QImageBlot);
Quill.register('modules/custommodule', CustomModule);

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
      toolbar: '#toolbar',
      custommodule: {},
  }
});

const Delta = Quill.import('delta');

quill.on('text-change', () => {
      document.querySelectorAll('q-img-text').forEach((image, index) => {
        if(index != 0){
          image.setAttribute('title', index);
      }else if(index === 0 && image.title){
          image.removeAttribute('title');
      }
      });  
})

