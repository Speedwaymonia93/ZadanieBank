/* ZMIENNE POMOCNICZE */
var x = 4 // liczba kont
var l = []; // liczba sekund co ile odbywa sie kapitalizacja odsetek
var l2 = []; // prowizja za przelew 
var oprocentowanie = []; // w kazdym z banków
var bank_blance_minute = []; // saldo po minucie w kazdym banku
var total_bank_balance = 0; // całościowy kapitał 
var bank_balance = [15000,15000,15000,15000];// kapitał początkowy w kazdym z banków 
var arr = []; // informacja czy w danym banku oprocentowanie jest >= prowizji
var arr2 = [] // równica miedzy oprocentowaniem a prowizja
var arr3 = []; // środki ze wszystkich kont gdzie rozninca miedzy oprocentowaniem a prowizja jest dodatnia
var najwieksza_roznica = 0; // ile wynosi najwiekza roznica miedzy oprocneotwaniem a prowizja 
var ktory_bank = 0; // w jakim banku roznica meidzy oprocentowaniem a prowizja jest najwieksza
var odsetki = 0;


 
// generowanie liczb losowych
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// obliczanie największego zarobku
function calculateTheHighestEarning() {

    // generowanie danych o kadym banku
    for (let i = 0; i < x; i++) {
        l.push(randomInteger(5, 10));
        l2.push(randomInteger(1, 15));
        oprocentowanie.push(randomInteger(1,5));
        liczba_sekund.push(l[i] * 1000);
    }

    // sprawdzenie w którym banku oprocenitowanie jest wiksze niz prowizja za przelew
    for(let i = 0; i<x;i++){
        if(oprocentowanie[i] <= l2[i]){
            arr[i] = "ZOSTAW";
            arr2[i] = oprocentowanie[i] - l2[i];
        }
        else if(oprocentowanie[i]>l2[i]){
            arr[i] = "PRZELEJ"
            arr2[i] = oprocentowanie[i] - l2[i];
        }
    }

    // ile  wynosi najwieksza roznica miedzy oprocentowaniem a prowizja oraz w jakim banku
    najwieksza_roznica = Math.max(...arr2);
    ktory_bank = arr2.indexOf(Math.max(...arr2));
    
    // obliczenie salda końcowego dla kadego konta na podstawie wyników zapisanych w tablicy pomocniczej arr
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "ZOSTAW" && arr2[i] <=0){
            bank_balance[i] == bank_balance[i] +0;
            total_bank_balance = total_bank_balance + bank_balance[i];
            arr3.push(bank_balance[i]);
        } else if (arr[i] == "PRZELEJ" && arr2[i] >0){
            // tablica pomocnicza - srodki z kont gdzie sie oplaca przelewac 
            arr3.push(bank_balance[i] - (bank_balance[i] * l2[i]));
            // zsumowanie środków z banków z ktorych oplaca sie przelac pieniadze
            var total = 0;
                for (let i  = 0; i < arr3.length; i++){
                total  += arr3[i];
                }

            // oblczanie zarobku na loakcie gdzie roznica miedzy oprcentowaniem a prowizja jest najwieksza
            odsetki = total * (Math.pow((1 + (oprocentowanie[ktory_bank]/l[ktory_bank])),l[ktory_bank]));
            bank_balance[ktory_bank] = bank_balance[bank_balance] + odsetki;
            total_bank_balance = total_bank_balance + bank_balance[ktory_bank];
        }        
    }

    // zmiana oprocentowania w kazdym banku 
    oprocentowanie = [];
    for (let i = 0; i< 4; i++){
       oprocentowanie.push(randomInteger(1,5));
    }
 
}

// funkcja do pokazywania informacji o saldzie kazdym z kont po minucie
function showAccountInfo(){
    console.log("*** INFORMACJE O SALDZIE NA KAZDYM Z KONT BANKOWYCH PO MINUCIE ***");
    console.log("SALDO W BANKU 1: " + bank_balance[0]);
    console.log("SALDO W BANKU 2: " + bank_balance[1]);
    console.log("SALDO W BANKU 3: " + bank_balance[2]);
    console.log("SALDO W BANKU 4: " + bank_balance[3]);
    console.log("CALOSCIOWY KAPITAL: " + total_bank_balance);
}

// wywołanie funkcji liczącej odetki i sprawdzajacej w jakim banku zarobi sie najwiecej co 1 sekunde (dla uproszczenia)
// dla kadego z baku osobno

const interval1 = setInterval(calculateTheHighestEarning(), 1000);
const informacje_końcowe = setInterval(showAccountInfo(), 60000);

interval();
informacje_końcowe();