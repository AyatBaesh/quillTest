import CustomModule from './custom-module.js'
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


quill.on('text-change', (delta, oldDelta, source) => {

      document.querySelectorAll('q-img-text').forEach((image, index) => {
        if(index != 0){
          image.setAttribute('title', index);
      }else if(index === 0 && image.title){
          image.removeAttribute('title');
      }
      });

  
})
const insertImages = () => {
  const delta = new Delta();
  for (let i = 0; i < 10000; i++) {
      delta.insert({
          qImage: {
              image: 'https://picsum.photos/200/300',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          }
      });
  }
  quill.updateContents(delta);

  const images = document.querySelectorAll('q-img-text');
  images.forEach((image, index) => {
      
      if(index != 0){
          image.setAttribute('title', index);
      }else if(index === 0 && image.title){
          image.removeAttribute('title');
      }
  });
};

insertImages();
