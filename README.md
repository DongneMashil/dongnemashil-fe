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
| chore    | 빌드 업무 수정, 패키지 매니저 수정                |
| merge    | pull 받은 후 바로 푸시를 해야될 경우              |
| design   | css 관련 내용                                     |

- 커밋 메시지 예시
  - merge할때 예시 merge : develop → feat/#7 (기본 커밋메세지 사용 안함)
  - docs 예시 docs : [readme.md](http://readme.md) 상세 설명 수정
  - feat 예시 feat : 토큰 인증 관련 api 추가

<br>

## 코드컨벤션

| 항목                | 규칙                                     | 예시                           |
| ------------------- | ---------------------------------------- | ------------------------------ |
| 변수명              | Camel Case로 작성                        | myVariableName                 |
| 파일명              | Pascal Case로 작성                       | MainPage.jsx                   |
| Commit              | Project Issue 별로 작성 (하기 설명)      | Create : CRUD 스켈레톤 생성    |
| 변수명/함수명 길이  | 4단어 이하 (부득이하게 늘어날 경우 상의) | getUserData                    |
| Tap Size (Prettier) | 2칸                                      | -                              |
| 약칭 사용           | 사용하지 않음                            | count (NOT cnt)                |
| Async, Await        | Async, Await만 사용 (불가피한 경우 상의) | -                              |
| 주석                | 필요한 경우만 사용                       | -                              |
| 커밋 이름           | 커밋타입 : 한글로 설명                   | ‘create : 회원가입페이지 생성’ |
| 인라인 스타일       | 사용 금지, 스타일 컴포넌트로 분리        | -                              |
| 인라인 함수         | 사용금지 ( 0n…Handler 이름으로 분리)     | onClick={onClickHandler}       |

<br>

## 코드 포맷팅 관련

- ESLint, Prettier: 기본 세팅을 따름

<br>

## 폴더 구조

Atomic 디자인 패턴을 따름

- 예시: atom(button) → molecule(form) → organism(회원가입) → template(layout) → page(최종)
