 const createElement =(arr) =>{
  const htmlElements = arr.map((el) => `<span class= "btn"> ${el}</span>`);
  return htmlElements.join("  ");
  
 };





const url = 'https://openapi.programming-hero.com/api/levels/all';
const loadWordDetail= async (id) => {
  const url = `https://openapi.programming-hero.com/api/words/${id}`;
  const res = await fetch (url);
  const details = await res.json ();
  displayWordDetails(details.data);
  
};
const displayWordDetails = (word) => {
     const detailsBox = document.getElementById("details-container");
     detailsBox.innerHTML = `
     
     <div class="">
  <h2 class="text-2xl font-bold">
    ${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
  </h2>
</div>
<div class="">
  <h2 class="font-bold">Meaning</h2>
  <p>${word.meaning}</p>
</div>
<div class="">
  <h2 class="font-bold">Example</h2>
  <p>${word.sentence}</p>
</div>
<div class="">
  <h2 class="font-bold">Synonyms</h2>
<div> 
 ${createElement(word.synonyms)}</div>
</div>
     
     
     
     `;
   document.getElementById("word-model").showModal();
}



const loadLessons = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));   
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // clickBtn.classList.add("active");
      // console.log(clickBtn);
      clickBtn.classList.add('active'); 
      displayLevelWord(data.data);
    });
};
    
  
 
const displayLevelWord = (words) => {
    const WordContainer = document.getElementById('word-container');
    WordContainer.innerHTML = ' ' ;

    if(words.length == 0 ){
      WordContainer.innerHTML = `<div
  class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla"
>
  <p class="text-xl font-medium text-gray-400">
    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
  </p>
  <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
</div> `;
    }



    words.forEach((word) => {
        console.log(word);
        const card=document.createElement('div');
        card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
  <h2 class="font-bold text-2xl">${word.word ? word.word : "word pawa jayni"}</h2>
  <p class="font-semibold">Meaning /Pronunciation</p>
  <div>"${word.meaning ?  word.meaning : "meaning pawa jayni"} / ${word.pronunciation ? word.pronunciation : "pronunciation pawa jayni"}"</div>
  <div class="flex justify-between items-center">
  <button  onclick="loadWordDetail(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
  <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
</div>`;
        WordContainer.append(card);
    });    
}
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = ''; 

  for (let lesson of lessons) {
    const btnDiv = document.createElement('div');
     
    btnDiv.innerHTML = `
      
<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;

    levelContainer.append(btnDiv);
  }
};
 
loadLessons();
