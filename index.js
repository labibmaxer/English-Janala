 
const url = 'https://openapi.programming-hero.com/api/levels/all';

const loadLessons = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));   
};
const loadLevelWord = (id) => {
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
   console.log(url);
   fetch(url)
   .then (res => res.json())
    .then ((data) => displayLevelWord (data.data) );
}
const displayLevelWord = (words) => {
    const WordContainer = document.getElementById('word-container');
    WordContainer.innerHTML = ' ' ;
    words.forEach((word) => {
        console.log(word);
        const card=document.createElement('div');
        card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
  <h2 class="font-bold text-2xl">${word.word}</h2>
  <p class="font-semibold">Meaning /Pronunciation</p>
  <div>"${word.meaning} / ${word.pronunciation}"</div>
  <div class="flex justify-between items-center">
  <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
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
      <button onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;

    levelContainer.append(btnDiv);
  }
};
 
loadLessons();
