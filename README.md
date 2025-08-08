## 각 파일의 쓰임새

```
/app/api/movies/route.js : API 데이터 (무비리스트 용)
/app/api/movies/[id]/route.js : 동적 API 데이터 (무비리스트 용)
```

```
/app/movie/page.jsx : 무비 리스트 페이지
/app/movie/[id]/page.jsx : 무비 뷰 페이지 (동적 라우팅)
```

```
/app/movie_api/page.jsx :  무비 리스트 페이지 (API 데이터 이용)
/app/movie_api/[id]/page.jsx : 무비 뷰 페이지 (동적 라우팅, API 데이터 이용)
```

```
/app/music/page.jsx : 뮤직 앱
```

```
/app/todolist/page.jsx : 투두 리스트
```

```
/components/Header.jsx : 공통 레이아웃 요소
/components/ViewportChangeer.js : 해상도에 따른 고정 뷰포트
```

```
/data/moviesData.js : 더미 데이터 (무비리스트 용)
```