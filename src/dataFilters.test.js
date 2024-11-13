import { test, expect } from "vitest"
import { filterFollowers } from "./dataFilters"

const dummyData = [
    {
      "following": [],
      "posts": [],
      "followers": [
        "aa4c29d1-0fe5-482b-af85-41d42936bf98"
      ],
      "bio": "",
      "lastName": "castaneda",
      "friends": [],
      "createdAt": "2024-09-27T19:50:32.921Z",
      "email": "ecast@gmail.com",
      "fullName": "eric  castaneda",
      "pfBanner": "banner img",
      "firstName": "eric ",
      "password": "$2b$10$3JtqlDDNpcltyJhDRcdHbe0PoOG4INDsk2M/L4rJA3uE.QgKPVlkq",
      "userId": "00001",
      "username": "ecast0422",
      "pfp": "pfp"
    },
    {
        "following": [],
        "posts": [],
        "followers": [
          "00001"
        ],
        "bio": "",
        "lastName": "garcia",
        "friends": [],
        "createdAt": "2024-09-27T19:50:32.921Z",
        "email": "ecast@gmail.com",
        "fullName": "nathanael garcia",
        "pfBanner": "banner img",
        "firstName": "nathanael ",
        "password": "$2b$10$3JtqlDDNpcltyJhDRcdHbe0PoOG4INDsk2M/L4rJA3uE.QgKPVlkq",
        "userId": "00002",
        "username": "ngar99",
        "pfp": "pfp"
      }
]

const data1 = [{
    "following": [],
    "posts": [],
    "followers": [
      "aa4c29d1-0fe5-482b-af85-41d42936bf98"
    ],
    "bio": "",
    "lastName": "castaneda",
    "friends": [],
    "createdAt": "2024-09-27T19:50:32.921Z",
    "email": "ecast@gmail.com",
    "fullName": "eric  castaneda",
    "pfBanner": "banner img",
    "firstName": "eric ",
    "password": "$2b$10$3JtqlDDNpcltyJhDRcdHbe0PoOG4INDsk2M/L4rJA3uE.QgKPVlkq",
    "userId": "00001",
    "username": "ecast0422",
    "pfp": "pfp"
  }];

test('follower of dummydata[1] should be data1', () =>{
    expect((filterFollowers(dummyData, dummyData[1]))).toEqual(data1);
})


