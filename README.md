# Chulalongkorn University Utils

Collections of essentials functions for developers in Chulalongkorn University

Faculty IDs and Major codes can be browsed from : https://cas.reg.chula.ac.th/cu/general/PersonalInformation/Faculty/IndexDisplayFaculty.html

## Installation

`npm install chula-util` or `yarn add chula-util`

## Usage

```ts
import { getFaculty } from "chula-util";

const eng = getFaculty("21");
/* {
      code: "21",
      name_th: "คณะวิศวกรรมศาสตร์",
      name_en: "Faculty of Engineering",
    }
*/
const faculties = getFacultyList(); /* list of all faculties */
```

## Contributions

To be added...

## TODO

- [ ] Student ID Parser
- [x] Faculty ID/ Name List (EN)
- [x] Faculty ID/ Name List (TH)
- [x] Faculty ID/ Name Lookup
- [ ] Subject name Parser
