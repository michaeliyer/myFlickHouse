const movies = [
  {
    title: "Truman Show",
    year: 1998,
    genre: "Black Comedy",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ztw6zzhogmq6gy016p5io/TRUMAN_SHOW.mp4?rlkey=dx3u8z5qt0cqhlkqtfahfcup1&st=7bi3npdm&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ztw6zzhogmq6gy016p5io/TRUMAN_SHOW.mp4?rlkey=dx3u8z5qt0cqhlkqtfahfcup1&st=7bi3npdm&dl=0",
  },
  {
    title: "Vampires Kiss",
    year: 1998,
    genre: "Black Comedy",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/28l3gaqxocs0q3xsmphif/VAMPIRES_KISS.mp4?rlkey=4i6io5d8pwv8ylud49k1lnqfr&st=z0lcvli5&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/28l3gaqxocs0q3xsmphif/VAMPIRES_KISS.mp4?rlkey=4i6io5d8pwv8ylud49k1lnqfr&st=z0lcvli5&dl=1",
  },
  {
    title: "The Wild Bunch",
    year: 1969,
    genre: "Black Comedy",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/6xgvy6us99y7g6hgbyza6/WILD_BUNCH.mp4?rlkey=joyr0ihi47u08v2r5hui6b24p&st=8g0pdn5b&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/6xgvy6us99y7g6hgbyza6/WILD_BUNCH.mp4?rlkey=joyr0ihi47u08v2r5hui6b24p&st=8g0pdn5b&dl=1",
  },
  {
    title: "Trilogy of Terror",
    year: 1975,
    genre: "Horror",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/t0dwl3qeytr9l7wqyey1u/TRILOGY-OF-TERROR.mp4?rlkey=8bknvjraa73aqmzvu53lajw19&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/t0dwl3qeytr9l7wqyey1u/TRILOGY-OF-TERROR.mp4?rlkey=8bknvjraa73aqmzvu53lajw19&dl=1",
  },
  {
    title: "Wolf",
    year: 1994,
    genre: "Horror",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/tcfsbfgiu4v11kao90a5v/WOLF.mp4?rlkey=2sihnc1889o0ozzs6msnrezc9&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/tcfsbfgiu4v11kao90a5v/WOLF.mp4?rlkey=2sihnc1889o0ozzs6msnrezc9&dl=1",
  },
  {
    title: "Wolf Creek",
    year: 2005,
    genre: "Horror",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/294jh4k8ah2nh7ocqtfub/WOLF_CREEK.mp4?rlkey=q7vyxnplqf2olnp826w7kerax&dl=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/294jh4k8ah2nh7ocqtfub/WOLF_CREEK.mp4?rlkey=q7vyxnplqf2olnp826w7kerax&dl=1",
  },
  {
    title: "Hannibal",
    year: 2001,
    genre: "Thriller",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/miwa8c3fs23n2sx82wkwn/HANNIBAL.mp4?rlkey=zb01csx4obxokgqx939zvj61p&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/miwa8c3fs23n2sx82wkwn/HANNIBAL.mp4?rlkey=zb01csx4obxokgqx939zvj61p&dl=1",
  },
  {
    title: "Silence of the Lambs",
    year: 1991,
    genre: "Thriller",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/edt59kc36iutja6tc8vu3/SILENCE_OF_THE_LAMBS.mp4?rlkey=9nqfd2872w0szils2jb77rxii&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/edt59kc36iutja6tc8vu3/SILENCE_OF_THE_LAMBS.mp4?rlkey=9nqfd2872w0szils2jb77rxii&dl=1",
  },
  {
    title: "The Passenger",
    year: 1975,
    genre: "Thriller",
    dropboxUrl:
      "https://www.dropbox.com/scl/fi/ggin0m23id6mng61keol2/PASSENGER.mp4?rlkey=x0zi698wy1f3lqnkrn7u481lq&raw=1",
    downloadUrl:
      "https://www.dropbox.com/scl/fi/ggin0m23id6mng61keol2/PASSENGER.mp4?rlkey=x0zi698wy1f3lqnkrn7u481lq&dl=1",
  },
  // {
  //   title: "OneA",
  //   year: 5000,
  //   genre: "Sports",
  //   dropboxUrl:
  //     "https://www.dropbox.com/scl/fi/jwsl0dnysr3jiytyig6a6/The-Ultima.mp4?rlkey=buur8igi9ce7i3rq8nnfs8ffo&raw=1",
  //   downloadUrl: "",
  // },

  // {
  //   title: "OneB",
  //   year: 5000,
  //   genre: "Sports",
  //   dropboxUrl:
  //     "https://www.dropbox.com/scl/fi/5tm9mdjep1c35q9wg4954/The-Missing.mp4?rlkey=g5rrspdix5oj5x1u0ek8wnqs1&sraw=1",
  //   downloadUrl: "",
  // },

  // {
  //   title: "OneC",
  //   year: 5000,
  //   genre: "Sports",
  //   dropboxUrl:
  //     "https://www.dropbox.com/scl/fi/ll60mngw3mu65uoi0q7rk/The-Glambo.mp4?rlkey=logyy6ck7koyzv54zm0p52uez&s&raw=1",
  //   downloadUrl: "",
  // },

  // {
  //   title: "OneD",
  //   year: 5000,
  //   genre: "Sports",
  //   dropboxUrl:
  //     "https://www.dropbox.com/scl/fi/87pmdq1eizc05wp7o1a5h/The-Espana.mp4?rlkey=t9xt4hm52evxz0jfkw6wluqb3&raw=1",
  //   downloadUrl: "",
  // },

  // {
  //   title: "OneE",
  //   year: 5000,
  //   genre: "Sports",
  //   dropboxUrl:
  //     "https://www.dropbox.com/scl/fi/k44u0qidw0wuk8tp0usp8/The-Altima.mp4?rlkey=xpekte3jag8jdelbzpdg4j5pd&raw=1",
  //   downloadUrl: "",
  // },
];
//                   https://www.dropbox.com/scl/fi/tcfsbfgiu4v11kao90a5v/WOLF.mp4?rlkey=2sihnc1889o0ozzs6msnrezc9&st=fz4odu5e&dl=0
//   https://www.dropbox.com/scl/fi/m0hnbokidhr7y31nko51e/BOYS_FROM_BRAZIL.mp4?rlkey=j3gsgmjt8qm1zvazepap6885p&st=xk8d7m7a&dl=0
