## Database Integration with Prisma

- Setting up Prisma
- Defining data models
- Creating Migrations
- Performing CRUD Operations

이 섹션에서는 인기있는 Prisma 라이브러리를 사용하여 Next.js 애플리케이션을 데이터베이스에 연결하는 방법을 배우게 됩니다. Prisma 설정, 데이터 모델 정의, 마이그레이션 생성 및 기본적인 CRUD 작업 (데이터 생성, 읽기, 업데이트 및 삭제)에 대해 배우게 될 것입니다.

시작하기 전에 이것이 단순히 시작 단계라는 점을 강조해야 합니다. 데이터베이스에 대한 더 많은 고급 주제는 이 코스의 범위를 벗어납니다.
이 섹션에서의 목표는 튼튼한 기반을 제공하여 나중에 자체적으로 더 고급 주제를 탐구할 수 있도록 하는 것입니다.

### Installing MySQL

이 섹션에서는 데이터 저장을 위해 MySQL을 사용할 것입니다.

모르는 분들을 위해, MySQL은 매우 인기 있는 데이터베이스 엔진입니다. 물론 PostgreSQL, SQL Server, MongoDB 등과 같이 다른 데이터베이스 엔진도 있습니다. 다른 데이터베이스 엔진을 선호하시면 괜찮습니다만, 이 섹션에서는 수업을 쉽게 따라갈 수 있도록 MySQL을 사용하는 것을 권장합니다.

MySQL .com으로 이동하여 다운로드 섹션으로 이동하십시오. 이 페이지 하단에는 완전히 무료인 MySQL Community 버전 링크가 있습니다. 그런 다음 MySQL Community Server로 이동하여 운영 체제에 맞는 최신 버전을 다운로드하십시오.

Mac 사용자의 경우 다른 CPU 아키텍처용으로 두 가지 다른 dmg 파일이 있다는 점을 유의하십시오. ARM 및 x86 용 두 가지가 있으므로 Mac 사용자는 Mac 유형에 따라 올바른 dmg 파일을 찾아야 합니다. 다운로드하면 설치 마법사를 제공받게 됩니다. 쉽게 설정할 수 있습니다. 다만 이 과정 중에 root 패스워드를 입력하라는 메시지가 표시될 것입니다.

root는 데이터베이스 엔진의 관리자 사용자와 같습니다. 따라서 root 사용자의 패스워드로 사용할 패스워드를 기억해 두는 것이 좋습니다. 왜냐하면 다음 수업에서 이에 다시 참조해야 할 것이기 때문입니다.

이것은 데이터베이스 서버 또는 데이터베이스 엔진일 뿐입니다. 데이터베이스를 볼 수 있는 도구도 필요합니다. MySQL은 MySQL Workbench라는 도구를 제공하지만 레이아웃이 좋지 않은 단점이 있습니다. 이 섹션에서는 JetBrains .com에서 제공하는 DataGrip이라는 도구를 사용할 것입니다.

### Setting Up Prisma

- prisma: https://www.prisma.io/

이제 Prisma를 설치해보겠습니다. Prisma는 매우 인기 있는 ORM(객체 관계 매핑) 또는 객체 관계 매퍼입니다. ORM은 데이터베이스를 다루기 위해 사용합니다. ORM은 애플리케이션과 데이터베이스 사이에 위치하는 도구로, 데이터베이스로 쿼리를 보내고 데이터를 가져오거나 생성, 업데이트, 삭제하는 데 사용합니다. 이것은 매우 간단합니다.

이 강의에서는 Prisma의 기초만 다룰 것이며, Prisma에는 이 강의 범위를 벗어나는 많은 기능이 있습니다. 왜냐하면 이 섹션의 초점은 Next.js이며 Prisma는 아니기 때문입니다. Prisma에 대해서는 별도의 강의를 수강하거나 공식 문서를 읽어보는 것을 권장합니다. 그러나 이 섹션에서는 기초를 가르쳐 드리고, 여러분 스스로 더 고급 주제를 학습할 수 있는 기반을 제공하려고 합니다.

이제 VS Code로 돌아가서 먼저 Prisma와 함께 사용할 확장 프로그램을 설치해보겠습니다. Prisma를 검색하고, 여기에 공식 Prisma .io에서 제공하는 확장 프로그램입니다. 이것을 설치해봅시다.

이제 이 확장 프로그램은 자동 완성, 구문 강조 표시, 서식 지정 등을 제공합니다. 매우 유용합니다.

- primsa

다음으로 터미널로 이동하여 Prisma를 설치해봅시다. 이렇게 설치하면 Prisma 명령 줄 도구가 함께 설치됩니다.

```bash
npm install prisma
```

그런 다음 npx를 사용하여 Prisma 명령 줄 도구를 실행할 수 있습니다. npx prisma라고 입력하면 사용 가능한 명령 목록이 표시됩니다. 여기에서 사용 가능한 모든 명령을 볼 수 있습니다. init로 Prisma를 설정하는 것부터 시작해보겠습니다.

```bash
npx prisma
npx prisma init
```

이 명령을 실행하면 프로젝트 내에 Prisma 폴더가 생성되고 이 폴더에 스키마 파일이 포함됩니다.

- prisma/schema.prisma

그리고 환경 변수를 저장하는 환경 파일도 생성됩니다. 기본적으로 Prisma는 PostgreSQL을 사용하지만 이 강의에서는 MySQL을 사용합니다. MySQL과 같은 다른 데이터베이스 엔진도 사용할 수 있으므로 이 연결 URL 또는 연결 문자열을 MySQL과 호환되도록 변경해야 합니다.

구글에서 "Prisma 연결 문자열"을 검색하면 연결 URL의 예제를 볼 수 있는 페이지를 찾을 수 있습니다. MySQL 부분을 살펴보면 스키마 파일에서 provider를 MySQL로 변경해야 한다는 것을 알 수 있습니다.

그런 다음 연결 URL을 이렇게 변경해야 합니다. connector는 MySQL이어야 합니다. 그런 다음 사용자를 추가하고 콜론(:)과 비밀번호를 입력해야 합니다. MySQL의 경우 기본 사용자는 root이므로 root를 입력하고 콜론(:) 다음에 root 사용자의 비밀번호를 입력합니다. 비밀번호는 각자 설정한 것을 사용하면 됩니다. 그런 다음 at 기호(@)와 localhost 및 포트를 추가합니다. PostgreSQL의 경우 기본 포트는 5432이지만 MySQL의 경우 3306으로 변경해야 합니다. 슬래시(/) 다음에 데이터베이스 이름을 추가해주어야 합니다. 데이터베이스 이름은 next app 또는 원하는 이름으로 변경할 수 있습니다. MySQL의 경우 이 쿼리 문자열 매개변수를 제거해야 합니다.

- https://www.prisma.io/docs/reference/database-reference/connection-urls

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```env
DATABASE_URL="mysql://johndoe:비밀번호@localhost:5432/nextapp"
```

이로써 환경 파일에 데이터베이스 URL 또는 다른 보안 정보를 저장하게 되었습니다. 이 환경 파일을 소스 제어에 포함시키지 않아야 합니다. 그렇지 않으면 코드 리포지토리에 액세스 권한이 있는 누구에게나 노출됩니다. 그러므로 gitignore 파일에 .env를 추가해야 합니다. 이제 스키마 파일로 이동해 데이터 모델을 정의하겠습니다.

```bash
# .gitignore
.env
```

### Defining Models

이제 데이터 또는 애플리케이션 모델을 정의해 보겠습니다. 이러한 모델은 애플리케이션 도메인의 엔터티입니다. 예를 들어 전자 상거래 애플리케이션에서는 제품, 고객, 쇼핑 카트, 주문 등과 같은 엔터티 또는 모델이 있습니다. 이제 Prisma 스키마 파일로 이동하여 하나 이상의 모델을 정의해 보겠습니다.

먼저 모델 블록을 추가하고 모델의 이름을 지정합니다. 예를 들어 사용자 모델의 이름을 "user"로 지정해 보겠습니다. 이러한 모델의 이름을 지정할 때는 파스칼 케이스를 사용합니다. 즉, 각 단어의 첫 글자를 대문자로 쓰는 것입니다.

이제 모델에는 속성 또는 필드가 있을 수 있습니다. 예를 들어 사용자는 id 필드를 가질 수 있습니다. 이 필드의 유형은 "Int"이며, 여기에서 자동 완성은 방금 설치한 확장 프로그램에서 제공됩니다. 여기에서 "Int"를 추가하면 모든 필드가 기본적으로 필수 사항임을 의미합니다. 필드 또는 속성을 선택 사항으로 만들려면 물음표(?)를 추가하면 됩니다. 이제 목록으로 변환하려면 대괄호를 추가할 수도 있습니다. 또한 더 큰 숫자를 저장하는 데 사용할 수 있는 "Int"도 있습니다. 여기서는 "Int"를 사용하겠습니다.

필드에 하나 이상의 속성을 적용할 수도 있습니다. 예를 들어 여기에서는 id라는 속성에 id라는 속성을 적용하여 이 필드가 각 사용자를 고유하게 식별하는 id 필드임을 나타냅니다. 각 모델은 하나의 id 필드만 가질 수 있습니다. 또한 필드에 기본값을 지정할 수도 있습니다. default 속성을 사용하여 기본값을 설정하며, 이 속성을 함수처럼 호출하여 기본값을 제공합니다. 값은 1234와 같은 스칼라 값일 수도 있으며, 여기에서는 데이터베이스가 새로운 id를 생성하도록 자동으로 설정하는 "autoIncrement()" 함수를 사용할 수 있습니다. 그런 다음 email과 같은 다른 필드를 추가할 수 있습니다. 여기에서는 문자열(string) 타입을 설정하고 중복된 이메일을 데이터베이스에 저장하지 않도록 하기 위해 unique라는 속성을 적용했습니다. 몇 개 더 필드를 추가해보겠습니다. 이름(name), followers(팔로워 수), is_active(활성 상태) 등을 추가하겠습니다.

그런 다음 Prisma CLI에 이 코드를 다시 포맷하고 가독성 있게 만들어달라고 요청할 수 있습니다. 터미널에서 다음 명령을 실행해봅시다.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  name      String
  followers Int     @default(0)
  isActive  Boolean @default(true)
}
```

```bash
npx prisma format
```

코드가 아름답게 포맷되었습니다. 이것이 Prisma에서 모델을 만드는 방법입니다.

이 예에서는 int, string 및 boolean과 같은 기본 또는 스칼라 타입을 사용하고 있습니다. 그러나 Prisma에서는 더 복잡한 모델을 만들기 위해 지원하는 더 많은 유형이 있습니다. Prisma 모델을 구축하기 위한 더 복잡한 유형에 대해 알아보려면 Prisma 모델을 구글에서 검색하면 이 페이지를 찾을 수 있습니다.

- Prisma Model: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model

이 페이지에서는 다양한 예제를 볼 수 있습니다. 사용자 모델과 같은 이 모델에서 다른 모델 유형인 필드가 있습니다. 예를 들어 이 모델에는 post라는 포스트 모델의 배열이 있는데, 이 포스트 모델은 아래에 정의되어 있습니다. 또한 프로필이라는 프로필 모델의 인스턴스가 있으며 물음표(?)로 인해 선택 사항입니다. 따라서 사용자 모델은 역할, 포스트 및 프로필과 같은 다른 모델과 관계를 가지고 있습니다.

```prisma
model User {
    // ...
    profile Profile?
}
```

이 강의에서는 관계에 대해서 다루지 않을 것이므로 관계에 관한 복잡한 내용은 다루지 않을 것입니다. 복잡성에 빠지지 않고 기초를 배우도록 하겠으며, 기본 개념부터 이해한 후 스스로 관계에 대해 공부하거나 미래에 관계에 관한 강의를 만들 수도 있습니다. 그러니 빅 픽처부터 이해하고 나서 관계에 대한 공부를 진행하는 것을 추천해드립니다.

### Creating Migrations

이제 모델을 정의하거나 변경할 때마다 마이그레이션을 생성해야 합니다. 이러한 마이그레이션은 데이터베이스 스키마를 Prisma 스키마와 동기화하는 데 사용됩니다. 이러한 마이그레이션을 실행하는 방법을 알아봅시다.

터미널에서 `npx prisma migrate dev` 명령을 실행합니다. 이 명령은 관계형 데이터베이스(예: MySQL 또는 Postgres)를 사용하는 경우에 사용됩니다. MongoDB와 같은 NoSQL 데이터베이스를 사용하는 경우 `npx prisma db push` 명령을 사용합니다.

```bash
npx prisma migrate dev
```

이 명령은 마이그레이션을 생성합니다. 이때 마이그레이션에 이름을 제공해야 합니다. 예를 들어 "initial migration"이라고 이름을 지정할 수 있습니다.

이 명령을 실행하면 마이그레이션 폴더가 생성됩니다. 이 폴더 안에는 초기 마이그레이션인 "initial"이라는 다른 폴더가 있습니다. 이전에는 날짜 타임 스냅이 있습니다. 이렇게 하면 모든 마이그레이션을 순서대로 볼 수 있습니다.

데이터베이스와 관련된 코드와 마이그레이션을 만들 때, Prisma CLI는 마이그레이션을 생성하고 데이터베이스에 적용합니다. 이제 데이터베이스로 이동하면 "user"라는 테이블이 있는 것을 볼 수 있습니다.

마이그레이션에 대한 자세한 내용은 기본적으로 SQL 문을 사용하여 데이터베이스 테이블을 만드는 것을 의미합니다. SQL에 익숙하지 않더라도 걱정하지 마세요. SQL에 대한 상세한 강의가 있으니 원한다면 학습할 수 있습니다. 기본적으로 이 파일에는 데이터베이스 테이블의 이름 및 열을 만드는 지시사항이 포함되어 있습니다.

예를 들어, "id" 필드는 정수로, "email"은 191 길이의 문자열(VARCHAR)로 정의됩니다. 여기서 "VARCHAR"는 "Variable Character"의 약자로 MySQL에서 문자열을 나타내는 유형입니다. 열의 유형은 사용하는 제공자에 따라 다를 수 있습니다. 예를 들어 Postgres 데이터베이스를 사용하는 경우, 열의 유형이 다르게 나타날 것입니다.

---

이 부분 다시

Prisma migrate dev를 실행하면 Prisma CLI가 마이그레이션을 생성하고 데이터베이스에 적용합니다. 데이터베이스로 돌아가면 "user" 테이블이 나타날 것입니다. 이렇게 마이그레이션을 통해 데이터베이스 스키마를 업데이트하고 모델 변경 사항을 반영할 수 있습니다.

데이터베이스에 연결하려면 DataGrip 또는 MySQL Workbench와 같은 도구를 사용할 수 있습니다. DataGrip에서 데이터베이스에 연결하려면 데이터 소스를 추가하고 사용자 이름, 비밀번호, 데이터베이스 이름 등을 설정하면 됩니다.

---

마지막으로, 모델을 변경할 때마다 의미 있는 이름을 지정하여 마이그레이션을 생성하는 것이 좋습니다. 이를 통해 어떤 변경 사항이 각 마이그레이션에 포함되어 있는지 파악할 수 있습니다.

`registeredAt` 필드를 추가하고 마이그레이션을 생성해보겠습니다.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String
  followers    Int      @default(0)
  isActive     Boolean  @default(true)
  registeredAt DateTime @default(now())
}
```

```bash
npx prisma format
npx prisma migrate dev
```

### Creating a Prisma Client

Next.js 앱이 데이터베이스와 작업하기 위해서는 먼저 Prisma Client를 생성해야 합니다. Prisma Client는 데이터베이스와 상호 작용하기 위한 도구입니다.

먼저 Prisma 폴더 안에 `client.ts`라는 새 파일을 만듭니다. 그런 다음 해당 파일에서 다음 단계를 따릅니다.

1. `@prisma/client`에서 `PrismaClient`를 가져옵니다.
2. `PrismaClient`의 새 인스턴스를 생성합니다. 이 인스턴스를 `Prisma`라고 이름짓고 `new PrismaClient()`로 설정합니다.
3. 이 객체를 내보내기 위해 모듈에서 `export default`를 사용합니다.

이렇게 생성된 Prisma Client를 사용하면 스키마에서 정의한 모델에 액세스할 수 있으며 해당 모델을 사용하여 사용자를 만들고, 읽고, 업데이트하고, 삭제할 수 있습니다. 예를 들어 `Prisma.user.findMany` 메서드를 사용하여 사용자를 찾거나 `Prisma.user.create`를 사용하여 사용자를 만들 수 있습니다.

```tsx
// prisma/client.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

그러나 Prisma Client를 어디에서든 생성할 수 있지만 한 가지 중요한 사항은 어플리케이션 내에서 하나의 Prisma Client 인스턴스만 실행되도록 하는 것입니다. 그 이유는 Prisma Client가 어플리케이션에서 중복으로 생성되지 않도록 해야 하기 때문입니다.

Next.js에서는 Fast Refresh를 사용하므로 소스 코드를 변경할 때 모듈 중 일부가 다시 로드됩니다. 따라서 개발 환경에서는 동일한 모듈이 여러 번 재로드되어 여러 개의 Prisma Client 인스턴스가 만들어질 수 있습니다. 이로 인해 "too many Prisma Clients"와 같은 오류가 발생할 수 있습니다.

이 문제를 해결하기 위해 Prisma 공식 문서에서 제공하는 코드를 사용합니다. Prisma Next.js와 Prisma Client를 초기화하는 최적의 방법을 설명한 문서를 찾아서 해당 코드를 복사하고 붙여넣습니다. 이 코드를 사용하면 전역 네임스페이스를 활용하여 하나의 Prisma Client 인스턴스만을 사용하도록 보장할 수 있습니다.

이렇게 설정한 후에는 더 이상 신경 쓸 필요가 없으며 코드를 한 번만 작성하면 됩니다. 이제 이 코드를 복사하여 `client.ts` 파일에 붙여넣으면 됩니다.

- https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

```tsx
// prisma/client.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Getting Data

이제 모든 부분이 준비되었으니 데이터베이스에서 데이터를 가져오는 방법을 살펴보겠습니다.

api 폴더로 이동하고, users 폴더를 열고 이 route.tsx 파일로 이동하겠습니다. 이제 이 get 함수를 수정하여 하드 코딩된 데이터를 반환하는 대신 데이터베이스에서 데이터를 반환하겠습니다.

우선 상단에 있는 prisma를 가져오겠습니다. prisma/client에서 가져오며, 이것은 방금 생성한 클라이언트 파일입니다. 이 파일을 보겠습니다. 이 파일에서 prisma라는 이름의 상수를 내보냈습니다. 중괄호로 묶어 prisma를 가져옵니다. 그리고 이 함수에서 데이터베이스에서 모든 사용자를 가져 오려면 prisma.user.findMany를 호출하면 됩니다.

이제 선택적으로 객체를 제공하고 사용자를 필터링할 수 있습니다. 예를 들어 여기에서 where를 객체로 설정할 수 있으며, 이 객체에서 이메일이나 기타 속성을 일부 값으로 설정하여 사용자를 필터링할 수 있습니다. 이제 여러 필터를 제공하고 논리 AND 또는 논리 OR을 사용하여 필터를 결합할 수도 있지만, 그러면 복잡해집니다. 이에 대한 자세한 내용은 문서를 참조하십시오.

그래서 모든 사용자를 가져오겠습니다. 이것은 프로미스를 반환하므로 await하여 사용자를 가져옵니다. 그런 다음 이 함수를 async로 만들고 마지막으로 응답에서 모든 이 사용자를 반환합니다.

```tsx
// app/api/users/route.tsx
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: body.name });
}
```

이제 브라우저로 돌아가서 api/users로 이동하겠습니다. 여기에 무엇이 있는지 확인할 수 있습니다. 아름답습니다. 이제 단일 사용자를 가져 오는 방법을 살펴보겠습니다. 그러려면 다른 루트 파일로 이동해야 합니다. id 폴더에 있는 파일이고, 여기에 다른 GET 함수가 있습니다. 다시 말하지만 상단에 prisma를 가져옵니다. 그런 다음이 함수에서 먼저 prisma.user.findUnique를 호출합니다.

이 호출할 때 객체를 제공하며 이 객체에서 조건을 설정합니다. 여기에서 where를 객체로 설정하고 여기에 id를 params.id로 설정합니다. 이것이 여기에 전달한 매개 변수입니다. 그렇습니다. 앞서 params를 추가하고 구조 분해를 사용했습니다. 구문은 약간 혼란 스러울 수 있지만 믿으십시오. 시간이 지남에 따라 이해가되면 자연스럽게 사용할 수 있습니다.

findUnique를 호출합니다. 다시 프로미스를 반환하므로 사용자 객체를 얻으려면 기다려야합니다. 이 함수를 async로 만들고 사용자가 발견되지 않은 경우 null을 얻습니다. 따라서이 조건을 변경하고 사용자가 거짓 인 경우 이 오류를 반환하고 그렇지 않으면 사용자 객체와 응답을 반환합니다.

```tsx
// app/api/users/[id]/route.tsx
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

이제 브라우저로 돌아가서 사용자/one으로 이동하겠습니다. 기술적으로 이렇게 말하면 안됩니다. 무슨 실수를 했는지 모르겠습니다. 변경 사항을 저장하고 새로 고침하겠습니다. 기존에는 어플리케이션이 작동하지 않았습니다. 터미널을 확인하면 "argument id, invalid value provided. Expected int, provided string."라는 오류가 표시됩니다. 무슨 일이 일어나고 있는지 확인해 보겠습니다. 이제 코드로 돌아가서 "GET" 함수를 확인하겠습니다. 여기에서 id 속성 위로 마우스를 가져가면 유형이 숫자로 표시됩니다. 이것은 사용자 모델을 기반으로 합니다. 그러나 제공한 것은 params.id, 즉 문자열입니다. URL에있는 값이 문자열로 처리되기 때문입니다. 앞서 params.id의 유형을 숫자로 설정했으나 실제로 실행 시에 받는 값은 문자열이어야합니다. 여기에서 문자열을 숫자로 변환해야합니다.

```tsx
// app/api/users/[id]/route.tsx
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // querystring이기 때문에
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

이제 이 엔드 포인트를 한 번 더 클릭해 보겠습니다. 여기에 첫 번째 사용자가 나타납니다. 아름답습니다. "/api/users/2" 이동하면 사용자를 찾을 수 없습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*vBz_5OSmW-KHQGAkNBO9fw.png" />

### Creating Data

이제 데이터베이스에 데이터를 생성하는 방법을 살펴 보겠습니다.

먼저 users 폴더로 이동하여 이 route.tsx 파일을 엽니다. 여기서 POST 함수에서 요청 데이터를 유효성 검사하고 유효하지 않으면 오류를 반환하고 그렇지 않으면 사용자 객체를 만들어 데이터베이스에 저장합니다.

이렇게 하려면 prisma.user.create를 호출하고 이 객체를 제공해야 합니다. 이 객체에 데이터를 저장하려면 data를 data로 설정합니다. 여기에서 이 값을 body로 설정할 수 있지만 이것은 안전하지 않은 방법입니다. 악의적인 사용자는 요청 본문에 추가 속성을 제공할 수 있습니다. 우리는 아무것도 막연하게 가져 오고 데이터베이스에 넣고 싶지 않습니다.

특히 Mongo와 같은 NoSQL 데이터베이스를 사용할 때는 더 좋은 방법이 있습니다. 여기에 명시적으로 속성을 설정해야합니다. 따라서 이름을 body.name으로 설정해야하며 이메일을 body.email로 설정해야합니다. 다른 속성은 기본값을 지정했으므로 필요하지 않습니다. 따라서 스키마 파일로 이동하겠습니다. schema.prisma를 확인합니다. 각 사용자에는 데이터베이스에서 생성 된 ID가 있습니다. 또한 이메일 및 이름이 있습니다. 그러나 팔로워, 활성 및 등록된 사용자와 같은 다른 필드에는 기본값이 있습니다. 따라서 우리는 제공할 필요가 없습니다. 이 경우 요청 본문에서 이 두 속성만 읽고 이 메서드를 호출하고 데이터베이스에 삽입된 사용자 개체를 기다릴 것입니다. 이 사용자 개체에는 클라이언트에 반환할 수 있는 ID 속성이 있습니다. 따라서 하드 코딩 된 개체 대신 생성 된 사용자를 반환 할 것입니다.

```tsx
// app/api/users/route.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }

  const user = prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user);
}
```

여기서 약간의 문제가 있습니다. 앞서 요청 본문을 유효성 검사하기 위해 존 스키마를 정의했으며 현재로서는 이름 속성만 확인하고 있지만 이메일도 예상해야합니다. 따라서 Z.string.email을 Z.string.email로 설정해야합니다. 그러면 유효한 이메일이됩니다.

```ts
// app/api/users/schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export default schema;
```

이를 테스트 해보겠습니다. Postman으로 이동하여 사용자 엔드 포인트에 POST 요청을 보내봅시다. 여기에 두 개의 속성이있는 객체를 전달합니다. 이름은 John으로 설정하고 이메일은 John@Smith.com으로 설정합니다. 이것을 보내 봅시다. 좋습니다. 이것이 만들어졌습니다.

동일한 이메일로 다른 사용자를 만들면 오류가 발생해야합니다. 이제 500 또는 내부 서버 오류가 발생합니다. 이는 사용자 모델에 설정한 고유 제약 때문입니다. 이것을 올바르게 처리하려면 먼저 이 이메일로 사용자가 있는지 확인하고, 확인이 된 시점에서 prisma.user.findUnique를 호출합니다. 여기에 where를 객체로 설정하고 여기에서 이메일을 body.email로 설정합니다. 이런 식으로 이 사용자를 찾습니다. 이제 두 개의 사용자 개체가 있으므로 new user로 이름을 바꾸고 여기에서 반환합니다. 이제이 사용자를 읽고이 사용자가 있으면 오류를 반환합니다. 다음과 같이 응답에 JSON을 추가할 수 있으며 오류를 추가하여 "이미 사용자가 존재합니다."라고 말하고 상태를 400으로 사용해야합니다.

```tsx
// app/api/users/route.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser);
}
```

이를 테스트 해보겠습니다. 다시 Postman으로 돌아가보겠습니다. 이제 400 응답을 받았으며 오류 메시지가 "이미 사용자가 존재합니다"라고 표시됩니다. 이메일을 변경하고 John1을 추가하면 새로운 사용자가 생성됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*hoAhUw5vNL4BeKt9cM-vBQ.png" />

### Updating Data

이제 사용자를 업데이트하는 방법을 살펴 보겠습니다. users/[id] 폴더로 이동하여 route.tsx 파일로 이동하고 이 PUT 함수에서 먼저 요청을 유효성 검사합니다. 유효하지 않으면 오류를 반환하고 그렇지 않으면이 사용자가 데이터베이스에 있는지 확인해야합니다.

따라서 여기에서 prisma.user.findUnique를 호출합니다. 이전 수업에서 한 것과 정확히 같습니다. 우리는 where를 객체로 설정하고 여기에서 id를 params.id로 설정합니다.

이제 마찬가지로 params.id의 유형을 숫자로 구문 분석 할 수 있도록 문자열로 변경해야합니다. parseInt를 사용하여 변경합니다. 사용자 개체를 얻으려면 호출을 기다려야합니다.

사용자 개체가 존재하지 않으면 오류를 반환하고 그렇지 않으면 데이터베이스에서 업데이트합니다. 이를 수행하려면 prisma.user.update를 호출하고 두 가지 속성이 있는 객체를 제공해야합니다.

첫 번째 속성은 업데이트하려는 사용자를 지정합니다. 따라서 where를 객체로 설정하고 여기에서 id를 user.id로 설정합니다.

두 번째 속성은 데이터이며 업데이트하려는 데이터입니다. 이 경우 이름과 이메일 두 속성 만 업데이트하려고합니다. 따라서 이름을 body.name으로 설정하고 이메일을 body.email로 설정합니다.

그래서 사용자를 업데이트하고 호출을 기다렸습니다. 이것은 업데이트 된 사용자를 반환하며 이를 updatedUser 변수에 저장한 다음 응답으로 반환합니다.

```tsx
// app/api/users/[id]/route.tsx
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser);
}
```

그래서 빠르게 테스트 해 보겠습니다. Postman으로 돌아가보겠습니다. 사용자 슬래시 하나에 put 요청을 보내고 여기에서 본문에 이름을 "jeong"로 설정하고 이메일을 jjj@google.com으로 설정합니다.

- PUT: localhost:3000/api/users

### Deleting Data

사용자를 삭제하려면 먼저 사용자가 존재하는지 여부를 확인해야합니다.

우리는 이전에 이 작업을 수행했습니다. prisma.user.findUnique를 호출하고 기준을 제공합니다. 여기서 where를 객체로 설정하고 id를 params.id의 parseInt로 설정합니다.

여기서 유형을 문자열로 변경해야합니다. 다음으로 이 함수를 비동기 함수로 만들고 조건을 변경하여 사용자가 존재하지 않는 경우 오류를 반환하고 그렇지 않으면 prisma.user.delete를 호출합니다. 여러 레코드를 삭제하는 데 사용되는 delete many도 있습니다. 여기서 우리는 조건을 제공합니다. 따라서 여기에서 where를 객체로 설정하고 id를 user.id로 설정합니다.

```tsx
// app/api/users/[id]/route.tsx
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({});
}
```

물론 호출을 기다려야하며 그런 다음 빈 응답을 반환해야합니다. Postman으로 이동하여 사용자 슬래시 2로 삭제 요청을 보냅니다.

- DELETE: localhost:3000/api/users/2

### Exercise - Storing Products in DB

이전에 상품을 관리하는 API를 만들었습니다. 이제 연습으로 이 섹션에서 배운 내용을 사용하여 이러한 제품을 데이터베이스에 저장하려고 합니다.

먼저 새 모델을 정의하기 위해 Prisma 스키마로 이동해야합니다. 여기에 id, name 및 price 세 속성이 있는 product라는 새 모델을 추가합니다. Id는 정수이며 자동 증가 기본값을 가지는 id 필드입니다. 그런 다음 문자열 유형인 name 및 소수점을 포함하는 가격이라는 유형을 가진 price를 추가합니다. float를 사용하여 소수점이 있는 숫자를 저장할 수 있습니다.

```prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Float
}
```

이제 우리의 제품 모델입니다. 이제 터미널에서 npx prisma format을 실행하여 코드를 아름답게 포맷합니다.

```bash
npx prisma format
```

그러면 다음으로 데이터베이스를 최신 상태로 업데이트하기 위한 마이그레이션을 만듭니다. 따라서 npx prisma migrate dev를 실행하고 create product와 같은 이름을 새 마이그레이션에 지정합니다. 이제 데이터베이스를 확인하면 제품을 저장하는 새 테이블이 있어야합니다.

```bash
npx prisma migrate dev
```

그런 다음 API로 돌아가서 맨 위에서 먼저 prisma를 가져옵니다. 그런 다음 get 함수에서 prisma.product.findMany를 호출하여 제품을 가져옵니다. 우리의 제품을 얻으려면 호출을 기다립니다. 그런 다음 결과와 응답을 반환합니다.

이제 이것을 비동기로 만들어 봅시다. 마찬가지로 post 함수에 대해서도 유사하게 작업하려면 먼저 요청을 유효성 검사합니다. 유효성 검사 오류가있는 경우 해당 오류를 반환하고 그렇지 않으면 prisma.product.create를 호출합니다. 여기서 데이터를 body.name 및 body.price로 설정합니다. 그런 다음 create를 호출하고 새 제품을 얻기 위해 호출을 기다리고 마지막으로 클라이언트에게 반환합니다.

```tsx
// app/api/products/route.tsx
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
```

이제 이것을 실제로 테스트 해 보겠습니다. 따라서 Postman으로 돌아가서 api.product로 POST 요청을 보냅니다. 여기서 본문에 이름을 우유로 설정하고 가격을 2.5 달러로 설정할 수 있습니다. 이를 보냅니다. 내부 서버 오류가 발생했으므로 어딘가에서 실수를 저질렀을 것입니다. 터미널로 돌아가서 오류를 확인해 보겠습니다. 오류 메시지를 읽을 수 없다는 오류가 표시됩니다. 읽을 수 없음, create를 읽는 중입니다. 여기서 무엇이 잘못되었는지 모르겠습니다. 따라서 개발 서버를 다시 시작하고이 api를 한 번 더 호출해 보겠습니다. 캐시에 문제가있는 일시적인 문제였습니다.

```json
{
  "name": "Milk",
  "price": 1.25
}
```

## Summary

- Databases
- Database Engine
- Migrations
- Models
- Object-relational Mapper(ORM)
- Prisma

1. 데이터를 영구적으로 저장하기 위해서는 데이터베이스를 사용합니다. MySQL, PostgreSQL, MongoDB 등과 같은 다양한 데이터베이스 엔진이 있습니다.

2. 애플리케이션과 데이터베이스를 연결하기 위해 우리는 종종 ORM(Object-relational Mapper)을 사용합니다. ORM은 데이터베이스와 애플리케이션 간에 위치하는 도구로, 데이터베이스 레코드를 애플리케이션 내의 객체로 매핑하는 역할을 합니다. Prisma는 Next.js(또는 Node.js) 애플리케이션에서 가장 널리 사용되는 ORM 중 하나입니다.

3. Prisma를 사용하기 위해서는 먼저 데이터 모델을 정의해야 합니다. 이 모델들은 User, Order, Customer 등과 같이 애플리케이션 도메인을 나타내는 엔터티입니다. 각 모델은 하나 이상의 필드(또는 속성)을 가지고 있습니다.

4. 모델을 생성한 후, Prisma CLI를 사용하여 마이그레이션 파일을 생성합니다. 마이그레이션 파일에는 데이터베이스 테이블을 생성하거나 모델과 일치하도록 업데이트하는 명령이 포함됩니다. 이러한 명령은 데이터베이스 엔진이 이해하는 SQL 언어로 작성됩니다.

5. 데이터베이스와 연결하기 위해 PrismaClient의 인스턴스를 생성합니다. 이 클라이언트 객체는 새로운 마이그레이션을 생성할 때 자동으로 생성되며, 모델을 나타내는 속성(예: user)을 노출합니다.

이러한 단계를 따르면 데이터를 영구적으로 저장하고 검색하는 애플리케이션을 개발하는 데 도움이 됩니다.

```bash
# Key Commands
# Setting up Prisma
npx prisma init

# Formatting Prisma Schema File
npx prisma format

# Creating and running a migration
npx prisma migrate dev
```

```bash
# Working with Prisma Client
await prisma.user.findMany();
await prisma.user.findUnique({ where: { email: "a" }});
await prisma.user.create({ data: { name: "a", email: "a" }});
await prisma.user.update({ where: { email: "a" }, data: { email: "b" }});
```
