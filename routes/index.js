const express = require("express");
const db = require("../db");
const router = new express.Router();

router.get("/", async (req, res) => {
  const [series, actors, connect] = await Promise.all([
    db.query("SELECT * FROM serija"),
    db.query("SELECT * FROM glumac"),
    db.query("SELECT * FROM glumac_serija"),
  ]);

  for (s of series.rows) {
    var dateData = s.datum_izlaska.toString().split(" ");
    s.datum_izlaska = dateData[1] + " " + dateData[2] + " " + dateData[3];
    s.glumci = [];
    for (c of connect.rows) {
      if (s.id_serije === c.id_serije) {
        for (a of actors.rows) {
          if (c.id_glumca === a.id_glumca) {
            s.glumci.push(a.ime + " " + a.prezime);
          }
        }
      }
    }
  }
  res.render("index", {
    series: series.rows,
  });
});

router.get("/serije", async (req, res) => {
  const [series, actors, connect] = await Promise.all([
    db.query("SELECT * FROM serija"),
    db.query("SELECT * FROM glumac"),
    db.query("SELECT * FROM glumac_serija"),
  ]);

  for (s of series.rows) {
    var dateData = s.datum_izlaska.toString().split(" ");
    s.datum_izlaska = dateData[1] + " " + dateData[2] + " " + dateData[3];
    s.glumci = [];
    for (c of connect.rows) {
      if (s.id_serije === c.id_serije) {
        for (a of actors.rows) {
          if (c.id_glumca === a.id_glumca) {
            s.glumci.push(a.ime + " " + a.prezime);
          }
        }
      }
    }
  }
  res.render("datatable", {
    series: series.rows,
  });
});

router.post("/serije", async (req, res) => {
  const [series, actors, connect] = await Promise.all([
    db.query("SELECT * FROM serija"),
    db.query("SELECT * FROM glumac"),
    db.query("SELECT * FROM glumac_serija"),
  ]);

  for (s of series.rows) {
    var dateData = s.datum_izlaska.toString().split(" ");
    s.datum_izlaska = dateData[1] + " " + dateData[2] + " " + dateData[3];
    s.glumci = [];
    for (c of connect.rows) {
      if (s.id_serije === c.id_serije) {
        for (a of actors.rows) {
          if (c.id_glumca === a.id_glumca) {
            s.glumci.push(a.ime + " " + a.prezime);
          }
        }
      }
    }
  }

  var vracam = series.rows;
  const search = req.body.search.toLowerCase();
  const attribute = req.body.column;

  if (search !== "" && search.match(/^[a-z0-9]+$/i)) {
    if (attribute === "all") {
      vracam = vracam.filter((row) => {
        const stringRow = JSON.stringify(row).toLocaleLowerCase();
        return stringRow.includes(search);
      });
    } else if (attribute === "zanr") {
      vracam = vracam.filter((row) => {
        const zanrovi = JSON.stringify(row.zanr).toLocaleLowerCase();
        return zanrovi.includes(search);
      });
    } else if (attribute === "glumci") {
      vracam = vracam.filter((row) => {
        const glumciPolje = JSON.stringify(row.glumci).toLocaleLowerCase();
        return glumciPolje.includes(search);
      });
    } else {
      vracam = vracam.filter((row) => {
        const provjera = row[attribute].toString().toLocaleLowerCase();
        return provjera.includes(search);
      });
    }
  }

  res.render("datatable", {
    series: vracam,
  });
});

module.exports = router;
