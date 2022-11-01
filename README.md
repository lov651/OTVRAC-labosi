# OTVRAC-labosi
Repozitorij za sve labose iz predmeta Otvoreno računarstvo na FER-u
    
    
   

## Opis podataka
Skup podataka koji je korišten u ovoj laboratorijskoj vježbi i koji će se koristiti u daljnjim labosima sadrži informacije o različitim tv serijama\.
Baza podataka Serije se sastoji od 3 tablice koje predstavljaju podatke o serijama, glumcima i vezema između njih\.
Te tablice su:
1. serija \- sadrži podatke o tv serijama
2. glumac_serija \- tablica koja pomaže u ostavernju roditelj-dijete veze između serija i glumaca koji glume u njima
3. glumac \- sadrži imena i prezimena glumaca


### Autor
Lovro Katić


### Verzija skupa podataka
1\.0


### Jezik \(podataka\)
Engleski


## Atributi
Podaci sadrže dvije skupine atributa:
1. Atributi serije \- ime, zanr, trajanje, datum izlaska, godina zavrsetka, ocjena, status, broj sezona, broj epizoda, jezik, glumci
2. Atributi glumaca \- ime, prezime


### Opis atributa
***
#### Atributi serije
- ime \- ime serije
- zanr \- polje žanrova u čiju kategoriju spada serija 
- trajane \- okvirno trajanje svake epizode \(u formatu od\-do minuta\)
- datum izlaska \- datum početka emitiranja serije u formatu YYYY\-MM\-DD
- godina zavrsetka \- godina prestanka emitiranja serije ili \- ako serija još nije gotova
- ocjena \- ocjena za seriju sa IMDB-a
- status \- stanje serije, da li još traje ili je gotova
- broj sezona \- koliko sezona ima serija
- broj epizoda \- koliko epizoda ima serija sveukupno
- jezik \- na kojem jeziku je izvorno serija
- glumci \- polje glumaca koji glume u seriji

#### Atributi glumaca
- ime \- ime glumca
- prezime \- prezime glumca

### Dodatni info
Imena atributa podataka su na hrvatskom jeziku, iako su vrijednosti podataka na engleskom. Razlog tomu je što se za opis samog repozitorija također koristi hrvatski

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
