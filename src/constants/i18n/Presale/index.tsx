import { detailsP305, instructionsP305, passportP305 } from "./P305";
import { detailsP601, instructionsP601, passportP601 } from "./P601";
import { detailsP608, instructionsP608, passportP608 } from "./P608";
import { detailsP2203, instructionsP2203, passportP2203 } from "./P2203";
import { detailsP3061, instructionsP3061, passportP3061 } from "./P3061";
import { instructions, passport } from "./presaleMock";
import { titles } from "./titles";

export const Services = {
  passport: {
    P2203: passportP2203,
    P305: passportP305,
    P601: passportP601,
    P608: passportP608,
    P3061: passportP3061,
    titles,
  },
  instructions: {
    P2203: instructionsP2203,
    P305: instructionsP305,
    P601: instructionsP601,
    P608: instructionsP608,
    P3061: instructionsP3061,
  },
  details: {
    P2203: detailsP2203,
    P305: detailsP305,
    P601: detailsP601,
    P608: detailsP608,
    P3061: detailsP3061,
  },
  titles,
  presaleMock: {
    instructions,
    passport,
  },
};
