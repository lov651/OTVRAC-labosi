COPY (
 SELECT array_to_json(array_agg(row_to_json(r))) FROM (
        SELECT 
            serija.ime AS Ime, 
            serija.zanr AS Zanr, 
            serija.trajanje AS Trajanje,
	 		serija.datum_izlaska AS Datum_izlaska, 
	 		serija.broj_sezona AS Broj_sezona,
	 		serija.broj_epizoda AS Broj_epizoda,
            serija.godina_zavrsetka AS Godina_zavrsetka,
	 		serija.status AS Status,
	 		serija.jezik AS Jezik,
            serija.ocjena AS Ocjena,
            json_agg(json_build_object(
                'Ime', glumac.ime, 
                'Prezime', glumac.prezime)
			) AS Glumci     		
        FROM serija JOIN glumac_serija
	 	ON serija.id_serije = glumac_serija.id_serije JOIN glumac
	  	ON glumac.id_glumca = glumac_serija.id_glumca
	 	GROUP BY serija.id_serije
	 	ORDER by serija.id_serije asc
) r )

TO 'D:\serije.json'



COPY (
SELECT 
      serija.ime AS Ime, 
      serija.zanr AS Zanr, 
      serija.trajanje AS Trajanje,
	  serija.datum_izlaska AS Datum_izlaska,
	  serija.broj_sezona AS Broj_sezona,
	  serija.broj_epizoda AS Broj_epizoda,
      serija.godina_zavrsetka AS Godina_zavrsetka,
	  serija.status AS Status,
	  serija.jezik AS Jezik,
      serija.ocjena AS Ocjena,
	  glumac.ime AS Glumac_ime,
	  glumac.prezime AS Glumac_prezime		
FROM serija JOIN glumac_serija
ON serija.id_serije = glumac_serija.id_serije JOIN glumac
ON glumac.id_glumca = glumac_serija.id_glumca
)

TO 'D:\serije.csv' with DELIMITER ',' CSV HEADER

 
 
 