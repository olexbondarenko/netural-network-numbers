
const addBtn = document.getElementById('add-btn');
const checkBtn = document.getElementById('check-btn');
const correctBtn = document.getElementById('correct-btn');
const wrongBtn = document.getElementById('wrong-btn');
const clearBtn = document.getElementById('clear-btn');

const hasResult = document.getElementById('has-result');
const resultNumber = document.getElementById('result-number');

const trainData = [];
let result = null;


const cleanData = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resultNumber.innerText = '?';
  hasResult.classList.add('hidden');
}

const getCanvasData = () => {
  const data = [];
  const width = canvas.width;
  const height = canvas.height;
  const pixelsCount = 20;
  const pixels = width / pixelsCount;
  const xStep = width / pixels;
  const yStep = height / pixels;

  for(let x = 0; x < width; x += xStep) {
    for(let y = 0; y < height; y += yStep) {
      let imgData = ctx.getImageData(x, y, xStep, yStep).data;
      let notEmptyPixelsCount = 0;

      for(let i = 0; i < imgData.length; i += 10) {
        const isEmpty = imgData[i] === 0;

        if(!isEmpty) {
          notEmptyPixelsCount += 1;
        }
      }
      
      data.push(notEmptyPixelsCount > 1 ? 1 : 0);
    }
  }

  return data;
}

addBtn.addEventListener('click', () => {
  let number = prompt('Enter number');
  
  if(number !== null){
    let arr = JSON.stringify(getCanvasData());
    trainData.push({
      input: JSON.parse(arr), 
      output: {[number]: 1}
    });
    checkBtn.classList.remove('disabled');
    cleanData();
  }
});

checkBtn.addEventListener('click', () => {
  if(trainData.length) {
    const network = new brain.NeuralNetwork({learningRate: 0.3,});
    network.train(trainData);
    result = brain.likely(getCanvasData(), network);
    resultNumber.innerText = result;
  }

  if(result) {
    hasResult.classList.remove('hidden');
  }
});

correctBtn.addEventListener('click', ()=> {
  let arr = JSON.stringify(getCanvasData());

  trainData.push({
    input: JSON.parse(arr), 
    output: {[Number(result)]: 1}
  });

  cleanData();
})

wrongBtn.addEventListener('click', ()=> {
  let arr = JSON.stringify(getCanvasData());

  trainData.push({
    input: JSON.parse(arr),
    output: {[Number(result)]: 0}
  });

  cleanData();
})

clearBtn.addEventListener('click', ()=> {
  cleanData();
})
