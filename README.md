## 각 파일의 쓰임새

### API
```
/app/api/movies/route.js : 무비앱 API 데이터
/app/api/movies/[id]/route.js : 무비앱  동적 API 데이터
/app/api/musics/route.js : 뮤직앱 API 데이터
```

### 앱
```
/app/movie/page.jsx :  무비앱 리스트 페이지
/app/movie/[id]/page.jsx : 무비앱 뷰 페이지 (동적 라우팅)

/app/movie_dummy/page.jsx : 무비앱 (더미 데이터) 리스트 페이지
/app/movie_dummy/[id]/page.jsx : 무비앱 (더미 데이터) 뷰 페이지 (동적 라우팅)

/app/music/page.jsx : 뮤직앱

/app/todolist/page.jsx : 투두 리스트앱
```

### 컴포넌트
```
/components/Header.jsx : 공통 레이아웃 요소
/components/ViewportChangeer.js : 해상도에 따른 고정 뷰포트
```

### 더미 데이터
```
/data/moviesData.js : 더미 데이터 (무비앱 용)
/data/musicsData.js : 더미 데이터 (뮤직앱 용)
/data/todosData.js : 더미 데이터 (투두 리스트앱 용)
```