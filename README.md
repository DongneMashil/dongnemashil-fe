# 🏃🏻‍♀️ 동네마실 🏃🏻‍♀️ 

## 😀 3조 FE 멤버들 😀

<a href="https://github.com/makepin2r">
<img src="https://github.com/makepin2r.png" width="100" height="100"/>
</a>
<a href="https://github.com/taehyunkim3">
<img src="https://github.com/taehyunkim3.png" width="100" height="100"/>
</a>
<a href="https://github.com/soolovepat">
<img src="https://github.com/soolovepat.png" width="100" height="100"/>
</a>
<a href="https://github.com/Kang-Gyeongwon">
<img src="https://github.com/Kang-Gyeongwon.png" width="100" height="100"/>
</a>

<br>

## PR 규칙

- PR 작성시 팀원들을 리뷰어로 등록한다.
- PR 메시지에 아래의 내용을 구체적으로 기술한다.
  1. 변경된 기능
  2. 추가/삭제/변경된 파일 및 변경 사항 상세
- 매일 PM 8:00 코드 리뷰 진행한다.
  - 작성자가 코드 간략히 브리핑
  - 단, 긴급히 진행해야 하는 머지의 경우 작성자의 요청에 따라 팀원들과 바로 리뷰 진행.

<br>

## 브랜치 규칙

main ← dev ← feat/#이슈번호

<br>

## PR 규칙

- PR 작성시 팀원들을 리뷰어로 등록한다.
- PR 메시지에 아래의 내용을 구체적으로 기술한다.
  1. 변경된 기능
  2. 추가/삭제/변경된 파일 및 변경 사항 상세

<br>

## 커밋컨벤션

| 타입     | 설명                                              |
| -------- | ------------------------------------------------- |
| create   | 폴더, 파일 생성                                   |
| update   | 기능 수정 (JSX, 기능 모두)                        |
| delete   | 파일 삭제                                         |
| done     | 기능개발 완료                                     |
| feat     | 새로운 기능 추가 (new!)                           |
| fix      | 버그 수정                                         |
| docs     | 문서 수정                                         |
| style    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
| refactor | 코드 리팩토링                                     |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가            |
| chore    | 자질구레한 일들                                   |
| merge    | pull 받은 후 바로 푸시를 해야될 경우              |
| design   | css 관련 내용                                     |
| build    | 빌드 관련 내용                                    |

- 커밋 메시지 예시
  - merge할때 예시 merge : develop → feat/#7 (기본 커밋메세지 사용 안함)
  - docs 예시 docs : [readme.md](http://readme.md) 상세 설명 수정
  - feat 예시 feat : 토큰 인증 관련 api 추가

<br>

## 코드컨벤션

| 항목                     | 규칙                                                                                                                                                                                                                                                                             | 예시                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 변수명                   | Camel Case로 작성                                                                                                                                                                                                                                                                | myVariableName                              |
| 파일명                   | Pascal Case로 작성                                                                                                                                                                                                                                                               | MainPage.jsx                                |
| Commit                   | Project Issue 별로 작성 (하기 설명)                                                                                                                                                                                                                                              | Create : CRUD 스켈레톤 생성                 |
| 변수명/함수명 길이       | 4단어 이하 (부득이하게 늘어날 경우 상의)                                                                                                                                                                                                                                         | getUserData                                 |
| Tap Size (Prettier)      | 2칸                                                                                                                                                                                                                                                                              | -                                           |
| 약칭 사용                | 사용하지 않음                                                                                                                                                                                                                                                                    | count (NOT cnt)                             |
| Async, Await             | Async, Await만 사용 (불가피한 경우 상의)                                                                                                                                                                                                                                         | -                                           |
| 주석                     | 필요한 경우만 사용                                                                                                                                                                                                                                                               | -                                           |
| 커밋 이름                | 커밋타입 : 한글로 설명                                                                                                                                                                                                                                                           | ‘create : 회원가입페이지 생성’              |
| 인라인 스타일            | 사용 금지, 스타일 컴포넌트로 분리                                                                                                                                                                                                                                                | -                                           |
| 프롭스 타입 인터페이스명 | Pascal Case로 작성, [요소명칭]+Props                                                                                                                                                                                                                                             | ButtonProps                                 |
| 스타일 컴포넌트          | Pascal Case로 작성, St+[요소명칭]<br>통으로 적용 x, 너무 자잘하게 적용 x → 적절히 묶을 것(1~2deps까지만)                                                                                                                                                                         | StButton                                    |
| 스타일드 컴포넌트 변수명 | - 한 스타일드 컴포넌트에서 className을 남발하지 않는다. (가독성을 위해)<br>- 스타일드 컴포넌트 내에서 사용하는 props는 $변수명 형태로 작성한다.                                                                                                                                  |                                             |
| 같은 기능 묶음           | 큰 묶음 [요소명칭]+Container / 작은 묶음 [요소명칭]+Box<br>1. [요소명칭]+Container : 페이지 당 1개까지만 가능. 모든 요소를 감싸는 엘리먼트<br>2. [요소명칭]+Wrapper : UI에서 사진 등록/텍스트 입력창 등 기능별로 묶이는 영역이 존재할 때만<br>3. [요소명칭]+Box : 작은 단위의 UI | ButtonContainer / ButtonWrapper / ButtonBox |

<br>

## 코드 포맷팅 관련

- ESLint, Prettier: 기본 세팅을 따름

<br>

## 폴더 구조

- src

  - pages
    - [페이지명]Page : PascalCase
      - ❓ contexts : 해당 컨텍스트를 사용하는 최상위 컴포넌트 경로에
        - user.ts : 데이터 성격에 따른 이름 설정
      - [페이지명]Page.tsx
      - [페이지명]Page.styles.ts
    - index.ts
  - components : 공통 컴포넌트
    - homePage : camelCase
      - 컴포넌트1
        - 컴포넌트1.tsx
      - 컴포넌트2
    - common : 공통 컴포넌트
      - [Component]
        - component명.tsx : 실제 컴포넌트 로직 + export
        - [Component명].styles.ts
      - index.ts : 모든 컴포넌트들을 모아서 export
    - layout : 공통 레이아웃
      - NavBar
        - component명.jsx : 실제 컴포넌트 로직 + export
        - [Component명].styles.ts
        - component명.jsx : 실제 컴포넌트 로직 + export
        - [Component명].styles.ts
      - index.ts : 모든 컴포넌트들을 모아서 export
  - assets : 정적 리소스 파일들
    - images : 이미지 리소스
      - img-[이미지명]. png : 확장자는 달라질 수 있음
    - icons : 아이콘 리소스
      - ico-[이미지명].svg : 확장자는 달라질 수 있음
  - style : 전역 스타일링

    - GlobalStyle.ts : GlobalStyle
    - theme.ts : 공통 컬러셋, mixin, 반응형 기준 등의 string값, theme(모드) 등을 정의

  - recoil : recoil 관련 파일
    - [데이터 이름]폴더
      - atom.ts : atom 정의
      - selector.ts : selector 정의
      - index.ts : 모든 atom, selector를 모아서 export
  - routes : 라우터 관련 파일
    - Router.tsx
    - ProtectedRoutes.ts
  - queries : 리액트 쿼리 관련

    - queryClient.ts : queryClient 정의
      <aside>
      💡 query, mutation 함수는 1차로 각각의 컴포넌트에 작성해 사용하고 → 이후 시간이 남으면 custom hook으로 리팩토링 진행.

      </aside>

  - modules : cookie, portal 등 기타 모듈
  - hooks : 커스텀 훅
    - [hook명].tsx
  - api : 서버 통신에 관한 axios 메서드들
    - api.ts : axios 인스턴스 정의
    - userApi.ts : 로그인, 회원가입 등 유저 정보에 관한 api
    - articleApi.ts : 게시글 CRUD
    - searchApi.ts : 검색
    - mypageApi.ts : 좋아요한 글, 내가 쓴 댓글, 내가 쓴 글
  - App.tsx
