let sorteios= [{ sugestao: 'fruta',
                Element : ['banana','ananas',
                            'manga','figo',
                            'laranja','pera',
                            'maçã','maracujã',
                            'mamau','melância',
                            'goiaba','abacate'
                        ]
            },{ sugestao: 'cantores do Morrão',
                 Element : ['Alpha O Pica','durões',
                        'bufalo','new class 00',
                        'negão','pera',
                        'dj naype','miro star boy'
                    ]
        }];
let $mainAside = document.querySelector('main>.left');
let $mainSection = document.querySelector('main>.rigth');
let $suggestion = document.querySelector('section>.sugestao>h2>.spansuggest');
let $chance = document.querySelector('section>.sugestao>h2>.chance>span');
let $question = document.querySelector('section>div.perguntas>p');
let $pontuacao = document.querySelector('section>div.tentativas>h2>span');
let $vida = document.querySelector('aside>div.vida>h2>span');
let button = document.querySelectorAll('section>aside>nav>div');
let $img = document.querySelector('main>aside>img.perdedor');
let indexImg = 6;

console.log($mainAside,'\n',$mainSection)
function selectIndexElement(arrayPosi){
    return Math.floor(Math.random()*arrayPosi.length-1)+1;
}

function getTraco(Strings){
    let array = [];
    while(array.length<Strings.length){
        array.push('_');
    }
    return array;
}

function remuveElementSelectedToArray(array, indexElement){
    return array.splice(indexElement, 1);
}

let indexSuggestSelected;
let indexElemenSelected;
let elementSelected;
let Arraytraco;
let chance;

function initializeVariables(){

    indexSuggestSelected = selectIndexElement(sorteios)
    indexElemenSelected = selectIndexElement(sorteios[indexSuggestSelected].Element);
    elementSelected = remuveElementSelectedToArray(sorteios[indexSuggestSelected].Element, 
    indexElemenSelected)[0].split('');
    Arraytraco = getTraco(elementSelected);
    chance = chances(Arraytraco);

    $suggestion.innerHTML=sorteios[indexSuggestSelected].sugestao;
    console.log(elementSelected, indexElemenSelected, sorteios[indexSuggestSelected].Element)
}

initializeVariables();

function substValue(str, value){
    let arrAux = [];
    str.some((element, index) => {
        if(element===value){
            arrAux.push(index);
        }
    });
    return arrAux;
}

function  isEquals(array1, array2){

    return array1.join('')===array2.join('');

}

function isWin(arrT, arr2){
   let aux = arrT.some(element =>{
        return element!=='_';
    });
    if(aux){

        if (isEquals(arrT,arr2)) {
            let aux = Number($pontuacao.innerHTML);
            alert('acertouuu');
            $pontuacao.innerHTML = aux+1;
            initializeVariables();
        }
    }
}

function chances(arrayToString){
    let chance;
    if(arrayToString.length <= 6){
        chance = 8;
    }else if(arrayToString.length <= 13){
        chance = 15;
    }else if(arrayToString.length <= 17){
        chance = 19;
    }

    return chance;
}

function existValue(arr, arrTraco, value){
    let aux = false;
    arr.forEach(element => {
        if(value===arrTraco[element]){
            aux = true;
        }
    });

    if(aux){
        arr = [-1];
    }

    return arr;
}

function substractcheArrayTraco(arr, arrTraco, value){
    let aux = Number($vida.innerHTML);
    arr = existValue(arr, arrTraco, value);
    if(aux!==10){
        if(arr.length!==0){
            if(arr[0]===-1){
                alert('já utilizamos está letra...\ntente uma letra diferente de ', value)
            }else{
                arr.forEach(element => {
                arrTraco[element]=value;
                });
            }
        }else{ 
            chance = chance - 1;
            $vida.innerHTML = aux-10;
            indexImg = aux%2===0 ?indexImg-=1: indexImg;
        }
    }else{
        $vida.innerHTML = '00';
        indexImg-=1;
        alert('foste inforcado...\n A palavra correta é: '+ elementSelected.join(''))
        elementSelected =[];
    }

    $img.src=`../../mult-media/img/perdendo/perdendo${indexImg}.png`;
}
function changeBackGround(vida){
    let aux = Number(vida.innerHTML);
    if(aux<50){
        $mainAside.removeAttribute('class');
        $mainSection.removeAttribute('class');
        $mainSection.setAttribute('class','rigths');
        $mainAside.setAttribute('class','lefts');
    }
}

button.forEach(btn=>{
    btn.addEventListener('click', function (){

        let indexToBeReplaced = substValue(elementSelected, this.innerHTML);
        substractcheArrayTraco(indexToBeReplaced,Arraytraco,this.innerHTML);
        $chance.innerHTML = chance;
        $question.innerHTML= Arraytraco.join(' ');
        isWin(elementSelected, Arraytraco);
        $question.innerHTML= Arraytraco.join(' ');
        changeBackGround($vida)
      });
      
});
$chance.innerHTML = chance;
$question.innerHTML= Arraytraco.join(' ');

