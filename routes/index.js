const express = require("express");
const db = require("../db");
const fs = require("fs");

const router = new express.Router();
const { requiresAuth } = require("express-openid-connect");

// AUTENTIFIKACIJA

// KRAJ AUTENTIFIKACIJA

// Tu imam nešto
// Počinje ovdje
// =========================

var bodyParser = require("body-parser");
var cors = require("cors");
router.use(cors());

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

router
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(bodyParser.json());

router.get("/api/v1/openapi", async function (req, res, next) {
  res.sendFile("D:/a_OTVORENO_RACUNARSTVO/OTVRAC-labosi/openapi.json");
});

router.get("/api/v1/collection", async function (req, res, next) {
  const query =
    "SELECT serija.ime AS Ime, serija.zanr AS Zanr, serija.trajanje AS Trajanje, serija.datum_izlaska AS Datum_izlaska, serija.broj_sezona AS Broj_sezona, serija.broj_epizoda AS Broj_epizoda, serija.godina_zavrsetka AS Godina_zavrsetka, serija.status AS Status, serija.jezik AS Jezik, serija.ocjena AS Ocjena, json_agg(json_build_object('Ime', glumac.ime, 'Prezime', glumac.prezime)) AS Glumci FROM serija JOIN glumac_serija ON serija.id_serije = glumac_serija.id_serije JOIN glumac ON glumac.id_glumca = glumac_serija.id_glumca GROUP BY serija.id_serije ORDER by serija.id_serije asc";
  try {
    var collection = (await db.query(query, [])).rows;
    if (collection.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "No collection",
        response: null,
      });
    } else {
      console.log("Kolekcija dohvacena");
      res.status(200).json({
        status: "OK",
        message: "Fetched collection",
        response: {
          collection,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/api/v1/collection2", async function (req, res, next) {
  const query =
    "SELECT * FROM serija JOIN glumac_serija ON serija.id_serije = glumac_serija.id_serije JOIN glumac ON glumac.id_glumca = glumac_serija.id_glumca";
  try {
    var collection = (await db.query(query, [])).rows;
    if (collection.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "No collection",
        response: null,
      });
    } else {
      console.log("Kolekcija dohvacena");
      res.status(200).json({
        status: "OK",
        message: "Fetched collection",
        response: {
          collection,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get samo za serije
router.get("/api/v1/series", async function (req, res, next) {
  const query = "SELECT * FROM serija";
  try {
    var seriesList = (await db.query(query, [])).rows;
    if (seriesList.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "No series found",
        response: null,
      });
    } else {
      console.log("Serije dohvacene");
      res.status(200).json({
        status: "OK",
        message: "Fetched series",
        response: {
          seriesList,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get samo za glumce
router.get("/api/v1/actors", async function (req, res, next) {
  const query = "SELECT * FROM glumac";
  try {
    var actorList = (await db.query(query, [])).rows;
    if (actorList.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "No actors found",
        response: null,
      });
    } else {
      console.log("Glumci dohvaceni");
      res.status(200).json({
        status: "OK",
        message: "Fetched actors",
        response: {
          actorList,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get za seriju sa id
router.get("/api/v1/series/:id", async function (req, res, next) {
  const query = "SELECT * FROM serija WHERE id_serije=" + req.params.id;
  try {
    var series = (await db.query(query, [])).rows;
    if (series.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "Series with the provided ID doesn't exist",
        response: null,
      });
    } else {
      console.log("Serija sa id " + req.params.id + " dohvacena");
      res.status(200).json({
        status: "OK",
        message: "Fetched series with id " + req.params.id,
        response: {
          series,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get za seriju sa statusom
router.get("/api/v1/status/:type", async function (req, res, next) {
  var clean = req.params.type.toLowerCase();
  const query =
    "SELECT * FROM serija WHERE status='" +
    clean.charAt(0).toUpperCase() +
    clean.slice(1) +
    "' ";
  try {
    var series = (await db.query(query, [])).rows;
    if (series.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "Series with the provided status not found",
        response: null,
      });
    } else {
      console.log("Serije sa statusom " + req.params.type + " dohvacena");
      res.status(200).json({
        status: "OK",
        message: "Fetched series with status " + req.params.type,
        response: {
          series,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/api/v1/language/:language", async function (req, res, next) {
  var clean = req.params.language.toLowerCase();
  const query =
    "SELECT * FROM serija WHERE jezik='" +
    clean.charAt(0).toUpperCase() +
    clean.slice(1) +
    "' ";
  try {
    var series = (await db.query(query, [])).rows;
    if (series.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "Series with the provided language not found",
        response: null,
      });
    } else {
      console.log("Serije sa jezikom " + req.params.language + " dohvacene");
      res.status(200).json({
        status: "OK",
        message: "Fetched series with language " + req.params.language,
        response: {
          series,
        },
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post(
  "/api/v1/actor",
  bodyParser.json(),
  async function (req, res, next) {
    console.log(req.body.ime);
    console.log(req.body.prezime);
    var valid = true;
    if (
      !req.body.ime ||
      !req.body.prezime ||
      req.body.ime === "" ||
      req.body.prezime === ""
    ) {
      valid = false;
    }
    const query =
      "INSERT INTO glumac(id_glumca, ime, prezime) VALUES ((SELECT MAX(id_glumca) + 1 FROM glumac glu), '" +
      req.body.ime +
      "', '" +
      req.body.prezime +
      "') ";
    req.body.ime + "','" + req.body.prezime + "') ";
    console.log(query);
    try {
      if (!valid) {
        console.log("USAO");
        res.status(404).json({
          status: "Bad request",
          message: "Values are missing or are empty",
          response: null,
        });
      } else {
        var actor = (await db.query(query, [])).rows;
        console.log(actor);
        console.log("Glumac dodan");
        res.status(200).json({
          status: "OK",
          message: "Added actor",
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

router.put(
  "/api/v1/actor/:id",
  bodyParser.json(),
  async function (req, res, next) {
    console.log(req.body.ime);
    console.log(req.body.prezime);
    var valid = true;
    if (
      !req.body.ime ||
      !req.body.prezime ||
      req.body.ime === "" ||
      req.body.prezime === ""
    ) {
      valid = false;
    }
    const query =
      "UPDATE glumac SET ime='" +
      req.body.ime +
      "', prezime='" +
      req.body.prezime +
      "' WHERE id_glumca=" +
      req.params.id;
    req.body.ime + "','" + req.body.prezime + "') ";
    console.log(query);
    const pomQuery = "SELECT * FROM glumac WHERE id_glumca=" + req.params.id;
    try {
      if (!valid) {
        console.log("USAO");
        res.status(404).json({
          status: "Bad request",
          message: "Values are missing or are empty",
          response: null,
        });
      } else {
        var check = (await db.query(pomQuery, [])).rows;
        if (check.length === 0) {
          console.log("USAO");
          res.status(404).json({
            status: "Not Found",
            message: "There is no actor with that ID",
            response: null,
          });
        } else {
          var actor = (await db.query(query, [])).rows;
          console.log(actor);
          console.log("Glumac dodan");
          res.status(200).json({
            status: "OK",
            message: "Updated actor",
          });
        }
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

router.delete("/api/v1/actor/:id", async function (req, res, next) {
  const query = "DELETE FROM glumac WHERE id_glumca=" + req.params.id;
  const pomQuery = "SELECT * FROM glumac WHERE id_glumca=" + req.params.id;
  try {
    var check = (await db.query(pomQuery, [])).rows;
    if (check.length === 0) {
      console.log("USAO");
      res.status(404).json({
        status: "Not Found",
        message: "There is no actor with that ID",
        response: null,
      });
    } else {
      var actor = (await db.query(query, [])).rows;
      console.log(actor);
      res.status(200).json({
        status: "OK",
        message: "Actor deleted",
      });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

// ==================
// ==================
// OVDJE IDE DALJNJE PROŠLO

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
    isLoggedIn: req.oidc.isAuthenticated() ? true : false,
  });
});

router.get("/osvjezi", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    console.log("MOGU");
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
              s.glumci.push({ Ime: a.ime, Prezime: a.prezime });
            }
          }
        }
      }
    }

    const data = JSON.parse(JSON.stringify(series.rows));
    const insert = JSON.stringify(data);

    fs.unlinkSync(__dirname.slice(0, -7) + "\\serije.json");
    fs.writeFileSync(__dirname.slice(0, -7) + "\\serije.json", insert);
    const file_content = fs
      .readFileSync(__dirname.slice(0, -7) + "\\serije.json")
      .toString();

    let csvContent =
      "Title,Genre,Release date,No. of seasons,No. of episodes,Status,Last aired,Duration,Original language,Rating,Actor\n" +
      data
        .map(function (e) {
          var returnCSV = "";
          var csvPart =
            e.ime +
            ",{" +
            e.zanr.join(" ") +
            "}," +
            e.datum_izlaska +
            "," +
            e.broj_sezona +
            "," +
            e.broj_epizoda +
            "," +
            e.status +
            "," +
            e.godina_zavrsetka +
            "," +
            e.trajanje +
            "," +
            e.jezik +
            "," +
            e.ocjena +
            ",";
          for (g of e.glumci) {
            returnCSV += csvPart + g.Ime + "," + g.Prezime + "\n";
          }
          return returnCSV;
        })
        .join("");

    fs.unlinkSync(__dirname.slice(0, -7) + "\\serije.csv");
    fs.writeFileSync(__dirname.slice(0, -7) + "\\serije.csv", csvContent);
    const file_content2 = fs
      .readFileSync(__dirname.slice(0, -7) + "\\serije.csv")
      .toString();

    res.render("index", {
      series: series.rows,
      isLoggedIn: req.oidc.isAuthenticated() ? true : false,
    });
  } else {
    res.redirect("/error");
  }
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

router.get("*", async function (req, res, next) {
  res.status(404).json({
    status: "Not Found",
    message: "This resource does not exist",
    response: null,
  });
});

router.use((req, response, next) => {
  response.status(501).json({
    status: "Not Implemented",
    message: "Method not implemented for requested resource",
    response: null,
  });
});

module.exports = router;
