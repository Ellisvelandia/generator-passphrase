'use strict';
import wordlist from "./wordlist";

const generatePass = () => {

    function generateRandomNumber() {
        var crypto = window.crypto || window.msCrypto;
        return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    }

    function generatePassphrase() {
        var generatePassArray = [];
        
        for(var i=0; i<4; i++) {
            var index = Math.floor(generateRandomNumber() * 7776);
            generatePassArray.push(wordlist[index]);
        }

        return generatePassArray.join('-');
    }

    function capitalizeWord(passphrase) {
        var generatePassArray = passphrase.split('-');

        for(var i=0; i<generatePassArray.length; i++) {
            generatePassArray[i] = generatePassArray[i].charAt(0).toUpperCase() + generatePassArray[i].substr(1);
        }

        return generatePassArray.join('-');
    }

    function addNumber(passphrase) {
        var min = 1000;
        var max = 9999;

        var randNumber = Math.floor(min + generateRandomNumber() * (max - min + 1));

        passphrase += '-'+randNumber;

        return passphrase;
    }

    function removeNumber(passphrase) {
        var generatePassArray = passphrase.split('-');
        generatePassArray.pop();

        return generatePassArray.join('-');
    }

    var passphraseField = document.querySelector('.passgen__result');
    var capitalize = document.querySelector('#chb1');
    var add_number = document.querySelector('#chb2');
    var button_reload = document.querySelector('.passgen__reload-icon');
    var button_copy = document.querySelector('.passgen__copy-icon');

    passphraseField.textContent = generatePassphrase();

    capitalize.addEventListener('change', function() {
        if(this.checked === true) {
            passphraseField.textContent = capitalizeWord(passphraseField.textContent);
        } else {
            passphraseField.textContent = passphraseField.textContent.toLowerCase();
        }
    });
    
    add_number.addEventListener('click', function() {
        if(this.checked === true) {
            passphraseField.textContent = addNumber(passphraseField.textContent);
        } else {
            passphraseField.textContent = removeNumber(passphraseField.textContent);
        }
    });

    button_reload.addEventListener('click', function() {
        var passphrase = generatePassphrase();

        if(capitalize.checked === true) {
            passphrase = capitalizeWord(passphrase);
        }

        if(add_number.checked === true) {
            passphrase = addNumber(passphrase);
        }

        passphraseField.textContent = passphrase;
    });

    button_copy.addEventListener('click', function() {
        if(window.getSelection) {
            if(window.getSelection().empty) {
                window.getSelection().empty();
            } else if(window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        }
        
        if(document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(passphraseField);
            range.select().createTextRange();
            navigator.clipboard.writeText(passphraseField.textContent);
        } else if(window.getSelection) {
            var range = document.createRange();
            range.selectNode(passphraseField);
            window.getSelection().addRange(range);
            navigator.clipboard.writeText(passphraseField.textContent);
        }

        button_copy.classList.add('visible');
        setTimeout(function() {
            button_copy.classList.remove('visible');
            button_copy.classList.add('hidden');
        }, 2000);

        button_copy.addEventListener('animationend', ()=>{
            button_copy.classList.remove('hidden');
        });
    });
}
export default generatePass;