import { test, expect, describe } from "vitest"
import { filterFollowers, filterFollowing } from "./dataFilters"

const dummyData = [
    {
      "following": [],
      "posts": [],
      "followers": [],
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
        "following": [
          "00001"
        ],
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
      }, {
        "following": [
          "00001",
          "00002"
        ],
        "posts": [],
        "followers": [
          "00001",
          "00002"
        ],
        "bio": "",
        "lastName": "wigby",
        "friends": [],
        "createdAt": "2024-09-27T19:50:32.921Z",
        "email": "ecast@gmail.com",
        "fullName": "josh wigby",
        "pfBanner": "banner img",
        "firstName": "josh ",
        "password": "$2b$10$3JtqlDDNpcltyJhDRcdHbe0PoOG4INDsk2M/L4rJA3uE.QgKPVlkq",
        "userId": "00003",
        "username": "otwo",
        "pfp": "pfp"
      }
]
const dataMultiple = [
  {
    "following": [],
    "posts": [],
    "followers": [],
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
    "following": [
      "00001"
    ],
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
    "followers": [],
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



describe("filterFollowers function", () => {
  test('when 1 data found in list', () =>{
    expect((filterFollowers(dummyData, dummyData[1]))).toEqual(data1);
  })

  test('when 2 objects found in list', ()=>{
    expect((filterFollowers(dummyData, dummyData[2]))).toEqual(dataMultiple);
  })

  test("when no data found in list", () =>{
    expect(filterFollowers(dummyData, dummyData[0])).toEqual([]);
  })
  test("when target data is empty", () =>{
    expect(filterFollowers(dummyData, [])).toBeUndefined();
  })
  test("when source data is empty", () =>{
    expect(filterFollowers([], dummyData[0])).toEqual([]);
  })
})

describe("filterFollowing function", () => {
  test('when 1 data found in list', () =>{
    expect((filterFollowing(dummyData, dummyData[1]))).toEqual(data1);
  })

  test('when 2 objects found in list', ()=>{
    expect((filterFollowing(dummyData, dummyData[2]))).toEqual(dataMultiple);
  })

  test("when no data found in list", () =>{
    expect(filterFollowing(dummyData, dummyData[0])).toEqual([]);
  })
  test("when target data is empty", () =>{
    expect(filterFollowing(dummyData, [])).toBeUndefined();
  })
  test("when source data is empty", () =>{
    expect(filterFollowing([], dummyData[0])).toEqual([]);
  })
})


