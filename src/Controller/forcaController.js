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

let $suggestion = document.querySelector('section>.sugestao>h2>.spansuggest');
let $question = document.querySelector('section>div.perguntas>p');
let $tentativas = document.querySelector('section>div.tentativas>h2>span');
let $vida = document.querySelector('aside>div.vida>h2>span');


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
let indexSuggestSelected = selectIndexElement(sorteios)
let indexElemenSelected = selectIndexElement(sorteios[indexSuggestSelected].Element);

let elementSelected = remuveElementSelectedToArray(sorteios[indexSuggestSelected].Element, 
    indexElemenSelected)[0].split('');

$suggestion.innerHTML=sorteios[indexSuggestSelected].sugestao;
console.log(elementSelected, indexElemenSelected, sorteios[indexSuggestSelected].Element)
let Arraytraco = getTraco(elementSelected);

let teste = prompt('digite a letra');

function substValue(str, value){
    let arrAux = [];
    str.some((element, index) => {
        if(element===value){
            arrAux.push(index);
        }
    });
    return arrAux;
}

let teste1 = substValue(elementSelected, teste);

function preencheArrayTraco(arr, arrTraco, value){
    if(arr.length!==0){
        arr.forEach(element => {
        arrTraco[element]=value;
      });
    }else{
        alert('errou...')
    }
    
}

preencheArrayTraco(teste1,Arraytraco,teste);
$question.innerHTML= Arraytraco.join(' ');
