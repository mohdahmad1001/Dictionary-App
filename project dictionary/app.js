let input = document.querySelector('#input');
let searchbutton= document.querySelector('#search');
let apikey='f75888ed-02d7-4038-b058-8aa504a1a37c';
let notFound= document.querySelector('.not__found');
let definebox= document.querySelector('.def');
let audiobox= document.querySelector('.audio');

searchbutton.addEventListener('click',function(e){
    e.preventDefault();

    //clear old data
    audiobox.innerHTML='';
    notFound.innerText='';
    definebox.innerText='';

    //get input data
    let word= input.value;

    //call API get data
    if(word===''){
        alert('Word is required');
        return;
    }

    getdata(word);


})


async function getdata(word){
    //call API
     const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
     const data= await response.json();
    

    //empty result
    if (!data.length) {
       
        notFound.innerText = ' No result found'
        return;
    }
    //if result suggestion h

    if(typeof data[0]==='string'){
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?'
        notFound.appendChild(heading);

        data.forEach(element=> {
            let suggestion=document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notFound.appendChild(suggestion);

            
        });
        return;

    }
    //result found

    let definition=data[0].shortdef[0];
    definebox.innerText =definition; 


    //sound

    const soundName=data[0].hwi.prs[0].sound.audio;

    if(soundName){
        renderSound(soundName);
    }

     console.log(data);
}


function renderSound( soundName){

    let subfolder=soundName.charAt(0);
    let soundsrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;

    let aud= document.createElement('audio');
    aud.src=soundsrc ;
    aud.controls=true;
    audiobox.appendChild(aud);
}
