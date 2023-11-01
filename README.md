 # 2023fall_41class_team3
## Branch

브랜치는 `main`, `develop`, `feature`, `hotfix` 4개를 운영한다.

### Main branch

`main` 브랜치는 출시를 위한 브랜치이다.
이 브랜치를 이용하여 서버에 코드를 업로드한다. 업데이트가 생기면 서버에서 `git pull`해서 사용한다.
`main` 브랜치는 서버에 업로드 된 코드와 항상 같도록 유지한다. 서버의 코드는 직접 수정하지 않는다.
문제가 발견될 경우 `hotfix` 브랜치를 만들어 수정한다.

### Develop branch

개발에 사용하는 메인 브랜치이다. 기능을 개발할 때는 feature로 브랜치를 따서 개발한 뒤 develop 브랜치에 merge한다.
기능 개발 외의 수정이 이루어지는 경우(DB 스키마 변경, config 수정, README 업데이트, 구조 변경, 리팩토링 등) develop 브랜치에서 작업한다.

### Feature branch

기능을 개발하는 브랜치이다. `develop` 브랜치에서 분기하여 사용한다. 브랜치명은 `feature/~`로 한다.
개발이 완료되면 `develop` 브랜치에 병합(merge)하고, 브랜치를 삭제한다.

### Hotfix branch

출시된 코드(서버에 업로드된 코드)에 문제가 있을 경우 `hotfix` 브랜치를 만들어 수정한다.
`hotfix` 브랜치는 `main` 브랜치에서 분기하고, 수정이 끝난 뒤에는 `main` 브랜치와 `develop` 브랜치에 병합(merge)한다.

## Commit Message

### Message Structure

커밋 메시지에는 제목과 본문(body)을 작성하고, 제목에는 작업 형태(type)를 표시한다. `type` 외에는 한글로 작성한다.

```
type: Subject

body
```

`body` 작성을 위해 `git commit`을 사용한다. (`-m` 옵션 제외)

### Type

-   feat: 새로운 기능 추가
-   fix: 에러 수정
-   docs: docs 수정(README나 swagger)
-   style: 코드 변경 없이 포맷팅
-   refactor: 기능 변경 없이 리팩토링
-   test: 테스트 추가 및 수정
-   chore: production code와 관련 없는 기타 잡일

### Body

'무엇을'과 '왜'에 대해 상세히 작성한다.

# Naming

## 파일명

파일명은 소문자에 `-`를 이용하여 단어 구분
# Database

## local DB 연결

프로젝트 최상위 폴더에 `.env` 파일을 만들고 필요한 정보를 입력한다. 변수 이름은 아래와 같이 지정한다.

-   DB_HOST
-   DB_PORT
-   DB_USERNAME
-   DB_PASSWORD
-   DB_DATABASE
