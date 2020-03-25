const text1 = "I would love to go outside, even if it's to zzzzzzz 1234567";
const text2 = "Hello World, what's up?";

function longestWord (str){
    let text = str.split(' ');
    let longestWord = '';
    let maxLength = 0;

    // Cleaning the array
    for(let i = 0; i < text.length; i++){
        if (text[i].includes(',') || text[i].includes('.')){
            if(text[i].includes(',')) {
                text[i] = text[i].replace(',', '');
            } else {
                text[i] = text[i].replace('.', '');
            }
        }
    }   

    // Getting the longestWord
    for (let word of text){
        if (word.length > maxLength){
            longestWord = word;
            maxLength = longestWord.length;
        } else {
            if (word.length == maxLength){
                longestWord = longestWord + ' ' + word;
            }
        }
        
    }

    return longestWord;
}

console.log(longestWord(text1));
console.log(longestWord(text2));

