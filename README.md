# Apollo Space Camp Demo Code

**Installation:**

```sh
npm i && npm run server
```


```
query{
  astronauts {
    name,
    missions {
      designation
    }
  }
}
```

```
query{
  missions {
    designation,
    crew {
      name
    }
  }
}
```