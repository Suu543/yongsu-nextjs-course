## Building APIs

### Introduction

Next.js는 백엔드 에이피아이를 만드는 것을 지원하는 강력한 프레임워크입니다. 이 섹션에서는 Next.js를 사용하여 API 엔드포인트를 만드는 방법을 배우게 될 것입니다. 객체를 가져오고, 생성하고, 업데이트하고, 삭제하는 데 필요한 API를 만드는 방법을 다룰 것입니다. 또한, 검증 라이브러리인 Zod을 사용하여 요청을 유효성 검사하는 방법에 대해서도 알아볼 것입니다.

이 섹션을 통해 프론트엔드 개발자로서 백엔드와 거의 풀스택 개발을 시작하는 좋은 기회가 될 것입니다. 이 강좌를 통해 새로운 기술과 개발 영역을 탐험하고 새로운 프로젝트를 시작하는 데 도움이 될 것입니다.

### Getting a Collection of Objects

지난 시간에는 예상치 못한 오류를 처리하는 방법에 대해 알아봤습니다. 이번시간에는 에이피아이 엔드포인트를 생성하는 방법에 대해 알아보겠습니다. 넥스트제이에스에서 제공하는 에이피아이 엔드포인트는, 에이치티티피 요청을 받고, 응답을 처리할 수 있는 기능을 제공합니다. 

--- 

API 엔드포인트를 생성하는 방법을 알아보겠습니다. API 엔드포인트는 주어진 URL로 HTTP 요청을 처리하고 응답을 반환하는 함수입니다.

`app` 폴더 내에서 `API`라는 새 폴더를 만듭니다. 이것은 필수는 아니지만, API 엔드포인트를 그룹화하고 관리하기 위한 일반적인 컨벤션입니다. 예를 들어, 사용자(users), 포스트(posts) 등과 같은 다양한 엔드포인트를 가질 수 있습니다.

`API` 폴더 내에 `users` 폴더를 만듭니다. 여기서 사용자 데이터를 가져오는 API 엔드포인트를 생성할 것입니다.

`users` 폴더 내에 라우트 파일(route.tsx file)을 추가합니다. 페이지 파일(page.tsx file)과 달리 한 폴더 또는 URL 세그먼트 내에 페이지 파일(page.tsx) 또는 라우트 파일(route.tsx) 중 하나만 가질 수 있습니다. 사용자에게 무언가를 보여주려면 페이지 파일을 사용하고, HTTP 요청을 처리하려면 라우트 파일을 추가합니다.

- app/api/users/route.tsx

라우트 파일 내에서 `get` 요청을 처리하는 핸들러 함수를 만듭니다. 이 함수는 `next/request`에서 정의된 `NextRequest` 타입의 `request` 객체를 인자로 받아 HTTP 요청을 처리하고 응답을 반환합니다. 이 핸들러 함수를 `GET`이라고 이름짓습니다.

실제 애플리케이션에서는 데이터베이스에서 사용자 데이터를 검색할 것입니다. 하지만 현재는 데이터베이스에 대한 내용을 다루지 않고 임의의 데이터를 반환하겠습니다. `response` 객체를 사용하여 응답을 반환할 수 있습니다. 예를 들어, `JSON` 메서드를 호출하여 JSON 형식의 응답을 반환할 수 있습니다.

```tsx
// app/api/users/route.tsx

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json("hello");
}
```

- localhost:3000/api/users

여기서는 사용자 객체의 배열을 반환하도록 설정하고, 각 사용자 객체는 `ID`와 `name` 두 가지 속성을 가지도록 하였습니다.

```tsx
// app/api/users/route.tsx

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "a" },
    { id: 2, name: "b" },
  ]);
}
```

이제 API 엔드포인트가 생성되었습니다. `/api/users` 엔드포인트에 GET 요청을 보내면 JSON 형식의 사용자 데이터를 얻을 수 있습니다.

- localhost:3000/api/users

요청을 처리하는 함수 내에서 `request` 매개변수를 사용하지 않으면, Next.js는 응답을 캐시합니다. 응답을 캐시하지 않으려면 `request` 객체를 매개변수로 추가하면 됩니다.

이것으로 컬렉션 객체를 반환하는 API 엔드포인트를 만드는 방법을 알아보았습니다. 이를 통해 클라이언트 애플리케이션 또는 모바일 앱에서 해당 엔드포인트로 요청을 보내면 JSON 데이터를 받아 처리할 수 있습니다.

```tsx
// app/api/users/route.tsx

import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json([
    { id: 1, name: "Yongsu" },
    { id: 2, name: "Jeong" },
  ]);
}
```

응답 캐싱은 이전에 서버에서 보낸 응답을 임시로 저장해 두고, 나중에 동일한 요청이 오면 저장된 응답을 재사용하는 기술입니다. 이것은 서버 부하를 줄이고 응답 시간을 개선하는 데 도움이 됩니다. 그러나 때로는 응답이 실시간 데이터와 관련이 있어서 항상 새로운 데이터를 제공해야 하는 경우가 있습니다.

다음은 응답 캐싱을 설명하기 위한 간단한 예시입니다:

**예시: 랜덤한 숫자 제공 API**

가정해 보겠습니다. 서버에는 "랜덤한 숫자를 제공하는" API가 있다고 가정합니다. 이 API는 클라이언트가 요청하면 서버는 매번 새로운 무작위 숫자를 반환합니다.

1. 캐싱 없이 요청:

   클라이언트가 첫 번째 요청을 보내면 서버에서는 숫자 42를 반환합니다. 그러면 클라이언트는 이 숫자를 표시하고 다시 요청할 때마다 새로운 숫자를 얻기 위해 서버에 요청합니다. 이는 항상 다른 숫자를 얻을 수 있음을 의미합니다.

2. 캐싱을 사용한 요청:

   클라이언트가 첫 번째 요청을 보내면 서버에서 숫자 42를 반환하고, 클라이언트는 이 숫자를 기억합니다. 그런 다음, 두 번째 요청을 보내면 클라이언트는 서버에 요청하지 않고 이전에 얻은 42를 사용합니다. 서버는 새로운 숫자를 생성할 필요가 없으므로 응답이 빨리 도착하고 서버 부하도 줄어듭니다.

이러한 캐싱을 적용하는 방법은 서버 프레임워크나 라이브러리에 따라 다릅니다. 예시에서 언급한 Next.js와 같은 프레임워크는 요청을 처리하는 함수 내에서 `request` 매개변수를 사용하지 않으면 응답을 캐시합니다. 그러므로 `request`를 사용하지 않으면 항상 이전에 보낸 응답이 재사용됩니다.

만약 랜덤한 숫자를 항상 새로 생성해야 하는 경우, 이런 캐싱을 사용하지 않을 것입니다. 그러나 실제 애플리케이션에서는 동적 데이터와 정적 데이터를 구분하여 응답을 캐싱하는 것이 중요합니다.

### Getting a Single Object

이제 한 개의 객체를 얻기 위한 API 엔드포인트를 만드는 방법을 살펴보겠습니다. 이를 위해서는 객체의 ID를 URL에 포함시켜야 합니다. 현재 이 경로가 없으므로 오류 페이지가 표시됩니다.

- app/api/users/:id
- app/api/users/1

프로젝트로 돌아가서 `users` 폴더 내에 새 폴더를 추가하고 이 폴더 내에 ID 파라미터가 필요하므로 대괄호로 묶어야 합니다.

- app/api/users/[id]/route.ts

이 폴더 내에서 새 라우트 파일을 추가합니다. 마찬가지로 이전과 같이 `NextRequest` 타입의 `request`를 인수로 받는 `GET`라는 함수를 내보내야 합니다.

이제 라우트 파라미터에 액세스해야 합니다. 이를 상기하기 위해 사용자 상세 페이지로 이동해 보겠습니다.

- app/api/users/[id]/page.tsx

```tsx
// app/api/users/[id]/page.tsx
interface Props {
  params: { id: number };
}
```

이 페이지는 ID 파라미터를 가지고 있습니다. 이전에 `props` 인터페이스를 정의하고 여기에 ID 속성이 있다고 설명했습니다. 이를 복사하고 여기에 붙여넣고 있습니다. 이제 여기에 `props`라는 타입의 두 번째 매개변수가 있습니다. 이제 우리는 이것을 구조 분해하여(destructure) `params` 속성을 가져올 수 있습니다. 이 인터페이스를 더 이상 정의할 필요가 없으므로 `props` 인터페이스를 제거합니다.

```tsx
// app/api/users/[id]/route.tsx
import { NextRequest } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch data from a db
  // If not found, return 404 error
  // Else return data
}
```

실제 애플리케이션에서 데이터를 가져올 때 데이터베이스에서 데이터를 가져올 것입니다. 데이터를 찾을 수 없는 경우 404 오류를 반환해야 합니다. 그렇지 않으면 실제 데이터를 반환합니다. 이를 어떻게 구현할 수 있는지 살펴보겠습니다. 이 레슨에서는 ID가 10보다 큰 경우 404 오류를 반환하는 규칙을 만들 것입니다.

따라서 `id`가 10보다 큰지 확인하고, 그렇다면 404 오류를 반환합니다. 아니면 실제 데이터를 반환합니다. 오류가 없는 경우 404 오류를 반환하도록 설정한 JSON 응답을 생성합니다.

그렇다면 데이터를 찾으면 클라이언트에게 반환합니다. 이제 이것을 테스트해 봅시다. 브라우저에서 사용자 1로 이동하면 "yongsu"를 얻습니다. 그러나 사용자 11로 이동하면 "user not found"를 얻습니다.

```tsx
// app/api/users/[id]/route.tsx
import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "Yongsu" });
}
```

### Creating an Object

이제 사용자를 생성하기 위해서는 요청을 사용자 엔드포인트로 보내고 요청 데이터(Request Body)에 사용자 객체를 포함해야 합니다. 이를 실제로 실행해 보겠습니다.

프로젝트로 돌아가서 `users` 폴더 내에서 이 라우트 파일을 엽니다. 이전에는 컬렉션을 반환하기 위한 `GET` 함수를 내보냈습니다. 이 파일에서는 사용자를 생성하기 위한 `POST` 함수를 내보내야 합니다.

이 함수는 객체를 생성하는 데 사용되는 `POST` 요청을 처리합니다. `NextRequest` 타입의 `request` 매개변수를 지정합니다. 이 함수 안에서는 먼저 요청 데이터을 읽어야 합니다. 이를 위해 `request.json`을 호출하며 이는 프로미스를 반환하므로 함수를 `async`로 만들어야 합니다.

이로써 요청 데이터(request body)을 얻을 수 있게 되었습니다. 그러나 더 나아가기 전에 요청 데이터을 응답으로 반환하는 테스트를 진행해보겠습니다. 이를 위해서 `NextResponse.json`을 반환하고 여기에 본문을 포함합니다.

이를 브라우저에서 테스트할 수는 없으며, 테스트하려면 Postman이라는 도구를 사용해야 합니다. Postman을 설치하고 실행하면 유용한 도구를 사용할 수 있습니다. Postman을 사용하여 요청을 만들어 보겠습니다.

```tsx
// app/api/users/route.tsx

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body);
}
```

먼저, 요청 유형을 GET에서 POST로 변경하고 URL을 입력합니다. URL은 `localhost:3000/api/users`입니다. 그런 다음 Body 탭으로 이동하여 Raw와 JSON을 선택합니다. JSON 형식으로 사용자 객체를 입력할 수 있는 상자에 중괄호를 추가하고 여기서 사용자 객체를 입력합니다. 이 사용자 객체에는 ID 속성이 포함되어서는 안 됩니다. 왜냐하면 ID는 실제로 데이터베이스에서 생성되어야 하기 때문입니다. 여기서는 사용자의 이름만 전달하려고 합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*EXmnP9e7qvWsa3lVee2Wpg.png" />

```json
{
  "name": "yongsu"
}
```

JSON에서는 각 속성 이름을 이중 따옴표로 묶어야 하므로 `name`을 `yongsu`로 설정합니다. 이제 이를 서버로 보내면 응답으로 받게 됩니다.

다음 단계는 ID의 생성을 시뮬레이트하는 것입니다. 다시 한 번 말하지만, 실제 애플리케이션에서는 이 작업이 데이터베이스에서 이루어집니다. 하지만 이 레슨에서는 여기에 ID를 하드 코딩하려고 합니다. 그러면 이렇게 ID가 1이고 이름이 본문의 `.name` 속성과 같은 객체를 반환하겠습니다.

```tsx
// app/api/users/route.tsx

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ id: 1, name: body.name });
}
```

이제 이를 테스트합니다. 브라우저로 돌아가서 요청을 보내 보겠습니다. 요청을 서버로 보내면 응답을 확인할 수 있습니다. 상태는 성공인 200이며, 응답 본문도 여기에 표시됩니다. 서버로 보낸 것은 응답으로 받게 됩니다.

그러나 실제 애플리케이션에서는 요청 본문을 읽은 다음 유효성을 검사해야 합니다. 데이터가 잘못된 경우 "400" 오류를 반환하고, 그렇지 않으면 생성된 데이터를 반환해야 합니다. 기본 유효성 검사를 수행하고 `body.name`이 거짓 값인 경우(즉, 빈 문자열 또는 존재하지 않는 경우) "400" 오류를 반환하도록 설정합니다. 그렇지 않으면 실제로 생성된 데이터를 반환합니다. 이 경우 상태가 200이지만, 객체가 생성되었음을 나타내기 위해 일반적으로 201 상태를 사용하는 관례적인 것입니다. 따라서 여기에서 상태를 201로 설정합니다.

```tsx
// app/api/users/route.tsx

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: body.name });
}
```

### Updating an Object

사용자를 업데이트하기 위해서는 해당 개별 사용자를 나타내는 엔드포인트(예: `users/1`)로 요청을 보내고, 요청 본문에 사용자 객체를 포함해야 합니다. 이를 구현해 보겠습니다.

프로젝트로 돌아가서 user `id` 폴더 내에서 이 라우트 파일을 엽니다. 이전에는 단일 사용자를 가져오기 위한 함수를 내보냈습니다. 이제 업데이트를 처리하기 위한 함수를 생성해야합니다.

여기서는 `PUT` 또는 `PATCH` 중에 선택할 수 있습니다. 이 둘의 차이는 무엇인가요? 많은 사람들은 이들을 상호 교환 가능하게 사용하지만, 엄밀하게 말하면 객체를 대체할 때는 `PUT`를 사용하고, 하나 이상의 속성을 업데이트할 때는 `PATCH`를 사용해야 합니다. 이 경우에는 `PUT`를 사용하겠습니다. 이 함수는 `NextRequest` 타입의 `request` 매개변수를 받습니다.

또한 엔드포인트에서 라우트 매개변수에 접근해야 합니다. 따라서 `GET` 함수에 정의한 형태를 복사해오겠습니다.

```tsx
// app/api/users/[id]/route.tsx
export function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {}
```

함수를 보다 명확하게 보기 위해 코드를 재정렬합니다. 함수에는 두 개의 매개변수가 있습니다. 하나는 요청 객체이고, 다른 하나는 라우트 매개변수를 포함하는 객체입니다.

이 함수 내에서 실제 애플리케이션에서 수행해야 할 몇 가지 작업이 있습니다.

먼저, 요청 본문을 유효성 검사해야 합니다. 요청 본문이 유효하지 않은 경우 400 오류(잘못된 요청)를 반환해야 하며, 그렇지 않으면 주어진 ID의 사용자를 가져와야 합니다.

사용자가 데이터베이스에 존재하지 않는 경우, 404 오류(찾을 수 없음)를 반환해야 합니다. 그렇지 않으면 데이터베이스에서 사용자를 업데이트하고 업데이트된 사용자를 반환해야 합니다.

자, 이러한 단계를 단계별로 구현해 보겠습니다.

먼저, 요청 본문을 읽고 유효성을 검사해야 합니다. 요청 본문을 읽기 위해 `request.json`을 호출하며, 이전과 마찬가지로 프로미스를 기다려야 하므로 함수를 `async`로 만듭니다.

여기에서 본문을 얻습니다. 그런 다음 `body.name`이 거짓인지 확인하고, 거짓인 경우 `next response.json`을 반환합니다. 여기에 오류를 추가하고 "invalid request" 또는 "name is required"라고 할 수 있습니다. 더 구체적인 메시지로 설정합니다. 그런 다음 상태(400인 "잘못된 요청")를 전달합니다.

이것은 처음 두 단계였습니다. 그렇지 않으면 사용자가 유효하면 사용자를 가져와야 합니다. 사용자가 존재하지 않는 경우 404를 반환합니다. 이러한 시나리오를 시뮬레이션하기 위해 `params.id`가 10보다 큰 경우 다른 유형의 응답을 반환하도록 설정합니다.

여기서 오류를 "사용자를 찾을 수 없음"으로 설정하고 상태를 404로 설정합니다. 그렇지 않으면 데이터베이스에서 사용자를 업데이트하고 업데이트된 사용자를 반환합니다. 이를 위해 `next response.json`을 반환하고 ID를 1로 하드 코딩하고 이름을 `body.name`으로 설정합니다.

```tsx
// app/api/users/[id]/route.tsx
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 404 });
  }

  // Fetch the user with the given id
  // If doesn't exist, return 404
  if (params.id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  // Update the user
  // Return the updated user
  return NextResponse.json({ id: 1, name: body.name });
}
```

이것은 이 라우트 핸들러의 기본 구조입니다. 이제 이를 테스트합니다. Postman에서 `users/1`로 PUT 요청을 보내 보겠습니다. 요청 본문에 사용자 객체를 포함해야 합니다. 따라서 요청을 보내고 응답을 확인해 보겠습니다. 상태가 성공인 200이며 업데이트된 사용자가 여기에 표시됩니다. 좋습니다. 그러나 이름에 빈 문자열을 전달하면 상태가 400인 "잘못된 요청"과 "name is required"라는 오류 메시지를 받게 됩니다.

그런 다음 유효한 이름을 사용하되 유효하지 않은 사용자를 업데이트하려고 하는 경우 404 오류가 발생하며 "사용자를 찾을 수 없음"이라는 메시지가 표시됩니다.

### Deleting an Object

사용자를 삭제하려면 해당 개별 사용자를 나타내는 엔드포인트로 DELETE 요청을 보내야 합니다.

이제 프로젝트로 돌아가서 `id` 폴더 내에서 이 라우트 파일을 엽니다. 지금까지 사용자를 업데이트하는 핸들러와 사용자를 가져오는 핸들러 두 개를 내보내왔습니다. 이제 사용자를 삭제하는 핸들러를 내보내 보겠습니다.

이것은 DELETE 요청을 처리합니다. 이 함수에서는 "PUT" 함수에 있는 두 매개변수, 즉 요청과 라우트 매개변수를 모두 필요로 합니다. 시간을 절약하기 위해 이 두 매개변수를 복사하여 여기에 붙여넣겠습니다.

실제 애플리케이션에서는 먼저 데이터베이스에서 사용자를 가져와야 합니다. 사용자를 찾을 수 없는 경우 404 오류를 반환하고, 그렇지 않으면 데이터베이스에서 사용자를 삭제하고 200 응답을 반환합니다. 이 시나리오를 시뮬레이션하기 위해 `params.id`가 10보다 큰 경우 다른 유형의 응답을 반환하도록 설정하겠습니다. 여기서는 오류를 추가하고 "사용자를 찾을 수 없음"이라고 설정하고 상태를 404로 설정합니다. 그렇지 않으면 데이터베이스에서 사용자를 삭제하고 반환합니다. 여기서는 응답의 본문에 삭제된 사용자를 포함하거나 빈 응답을 반환할 수 있습니다. 이 부분에는 정답이나 오답이 없으며 다른 애플리케이션에서는 다른 요구 사항이 있을 수 있습니다. 여기서는 빈 객체를 반환하겠습니다.

```tsx
// app/api/users/[id]/route.tsx
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json({});
}
```

자, 이것으로 테스트해 보겠습니다. Postman에서 이 엔드포인트로 DELETE 요청을 보내보겠습니다. 이 ID로는 사용자가 없으므로 404 오류를 받아야 합니다. 그렇게 되었습니다. 그러나 ID가 1인 사용자를 삭제하려고 하면 200 응답을 받으며 응답 본문은 비어 있습니다.

- localhost:3000/api/users/100

### Validating Requests with Zod

- zod: https://zod.dev/

다시 PUT 함수로 돌아가겠습니다. 우리는 이 if 문을 사용하여 요청과 함께 전송된 사용자 객체를 검증하고 있습니다. 이제 이것은 간단한 객체에 대해서는 작동하지만, 더 복잡한 객체의 경우 너무 많은 if 문을 작성하게 됩니다.

이러한 상황에서는 검증 라이브러리를 사용하는 것이 더 좋습니다. 다양한 검증 라이브러리가 있으며 사람마다 선호하는 도구가 다릅니다. 저는 개인적으로 Zod을 선호합니다. zod.dev에서 자세한 내용을 확인할 수 있습니다.

```tsx
// app/api/users/[id]/route.tsx
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 404 });
  }

  // Fetch the user with the given id
  // If doesn't exist, return 404
  if (params.id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  // Update the user
  // Return the updated user
  return NextResponse.json({ id: 1, name: body.name });
}
```

먼저 터미널에 들어가서 Zod을 설치해보겠습니다.

```bash
npm install zod
```

이제 다시 프로젝트로 돌아가겠습니다. 여기서 "api/users" 폴더에 "schema.ts"라는 새 파일을 추가하겠습니다.

- api/users/schema.ts 
이 파일에서 먼저 Zod에서 z를 가져옵니다. 그런 다음 z.object를 호출하고 사용자 객체의 형태를 정의하는 객체를 제공합니다. 예를 들어 사용자 객체는 name 속성을 가져야 하며, name은 문자열이어야 합니다. 따라서 z.string을 호출합니다. 최소 길이를 3으로 적용할 수도 있습니다.

다른 속성이 있는 경우 여기에 추가할 수 있습니다. 예를 들어 사용자에게 이메일이 필요하다고 할 때, 이 역시 문자열 및 이메일 유형이어야 합니다. 비슷하게 h 속성을 추가하고 h는 숫자여야 한다고 지정할 수 있습니다. 이러한 구문을 사용하여 검증 규칙을 정의합니다.

Zod을 사용하면 문자열, 숫자, 날짜 및 더 복잡한 객체를 검증할 수 있습니다.

```ts
// /api/users/schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number(),
});
 
export default schema;
```

이 수업에서는 h와 이메일이 필요하지 않으므로 삭제하겠습니다.

```ts
// /api/users/schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
});

export default schema;
```

object 메서드를 호출하고 이를 스키마로 저장한 다음 이 모듈에서 기본 객체로 내보냅니다.

이제 라우트 파일로 돌아가서 맨 위에서 스키마를 가져옵니다.
다시 PUT 함수로 돌아가서 검증에 이 if 문을 사용하는 대신 Zod object에서 제공하는 schema.safeParse를 호출합니다.

parse 메서드도 있으며 그 차이점은 parse 메서드는 유효성 검사 오류가 있는 경우 예외를 throw하지만 safeParse는 그냥 유효성 검사 결과를 포함하는 객체를 반환합니다.

따라서 이 메서드를 호출하고 body 객체를 전달합니다. 그런 다음 유효성 검사 결과를 가져와 여기에 저장합니다. 다음으로 조건을 변경하여 유효성 검사가 성공하지 않으면 오류를 반환합니다.

그러나 여기서는 이 오류 메시지를 하드 코딩하려는 것이 아니라 Zod에서 감지한 오류를 반환하려고 합니다. 따라서 이 객체를 validation.error.errors로 바꿉니다.

이제 이것을 테스트해 보겠습니다.

```tsx
// app/api/users/[id]/route.tsx
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }

  if (params.id > 10) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: body.name });
}
```

포스트맨에서 "PUT" 요청을 이 엔드포인트(api/users/1)로 보내고 이름을 빈 문자열로 설정해 보겠습니다. 이제 여기서 보는 것처럼 오류 객체의 배열을 얻게 됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*RvKge3vxLQg51l9mwDUmCQ.png" />

각 오류 객체에는 code, minimum, type, inclusive, exact 등 몇 가지 속성이 있습니다.
물론 이 객체를 더 간단한 구조로 변환하여 클라이언트에 반환할 수 있습니다.

Zod을 사용하여 객체를 검증하는 방법입니다.

이제 POST 함수에서도 동일하게 적용보겠습니다.

- api/users/route.tsx

따라서 users 폴더의 이 라우트 파일로 이동하여 맨 위에서 스키마를 가져오고, post 함수 내에서 body가 있는 경우 schema.safeParse를 호출하여 유효성 검사 결과를 얻은 다음, 유효성 검사가 성공하지 않으면 validation.error.errors를 반환하도록 조건을 확인합니다.

```tsx
// app/api/users/route.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: body.name });
}
```

### Exercise- Building Products API

제품 관리를 위한 API를 구현해보십시오.

"/api/prudcts"에 액세스하면 제품 개체 배열이 반환됩니다. 각 제품은 ID, 이름 및 가격이라는 3개의 속성을 갖습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*OSUIY2spjeVj5m61crtb9g.png" />

그 api 폴더에 이동하고 "products"라는 새 폴더를 추가하고 라우트 파일을 추가합니다. 이 라우트 파일에서 먼저 get 함수를 내보냅니다. 이 함수에는 "NextRequest" 유형의 요청이 주어지며 현재는 하드코딩된 데이터를 반환합니다.

따라서 다음과 같이 코드를 작성합니다.

```javascript
// app/api/products/route.js

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Apple", price: 2.5 },
    { id: 2, name: "Bread", price: 3.5 },
  ]);
}
```

이제 테스트하기 위해 Postman으로 돌아가서 "/api/products"로 GET 요청을 보냅니다.

요청을 보내면 200 응답과 제품 목록이 반환됩니다.

이제 제품을 만들기 위해 POST 함수를 내보냅니다. 이 함수에는 요청이 주어집니다. 함수 내에서 요청 본문을 읽어야 합니다. 따라서 다음과 같이 코드를 작성합니다.

```tsx
// /app/api/products/route.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();
}
```

그리고 이에 대한 스키마도 정의합니다. "products" 폴더에 "schema.js"라는 파일을 만들고 다음과 같이 코드를 작성합니다.

```ts
// /app/api/products/schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  price: z.string().min(1).max(100),
});

export default schema;
```

이제 이러한 스키마를 사용하여 post 함수에서 본문을 유효성 검사합니다. 그리고 유효성 검사에 실패하면 오류를 반환하고, 성공하면 새로 만들어진 제품을 반환합니다.

```tsx
// /app/api/products/route.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json({
    id: 10,
    name: body.name,
    price: body.price,
  });
}
```

Postman을 사용하여 이를 테스트할 수 있습니다. 빈 객체를 전송하면 오류가 발생하며, 유효한 이름과 가격을 포함한 객체를 보내면 새 제품이 생성됩니다.

나머지 부분은 상당히 반복적인 내용이므로 더 이상 시간을 소비하지 않겠습니다. 그러나 업데이트 및 삭제 함수를 구현하도록 권장합니다.

## Summary

- API Endpoint
- HTTP Status Code
- Data Validation Libraries
- HTTP Methods
- Route Handlers
- Postman

1. API를 구축하기 위해서는 디렉토리에 라우트 파일(route.tsx)을 추가합니다. 단, 하나의 디렉토리 안에는 페이지와 라우트 파일 중 하나만 존재해야 합니다.

2. 라우트 파일에서는 하나 이상의 라우트 핸들러를 추가합니다. 라우트 핸들러는 HTTP 요청을 처리하는 함수입니다.

3. HTTP 요청은 GET(데이터 가져오기), POST(데이터 생성), PUT/PATCH(데이터 업데이트), DELETE(데이터 삭제)와 같은 메서드를 가지고 있습니다.

4. HTTP 프로토콜은 다양한 상황에 대한 표준 상태 코드를 정의합니다. 몇 가지 자주 사용되는 상태 코드에는 200(성공), 201(리소스 생성 시), 400(잘못된 요청), 404(무언가를 찾을 수 없을 때), 500(내부 서버 오류) 등이 있습니다.

5. 객체를 생성하려면 클라이언트는 POST 요청을 API 엔드포인트로 보내고 요청 본문에 객체를 포함해야 합니다.

6. 클라이언트가 보낸 객체를 항상 유효성 검사해야 합니다. 간단한 if 문을 사용하여 객체를 유효성 검사할 수 있지만 애플리케이션이 더 복잡해질수록 복잡하고 중첩된 if 문이 발생할 수 있습니다.

7. Zod와 같은 데이터 유효성 검사 라이브러리는 간단한 구문을 사용하여 객체의 구조를 정의할 수 있으며 데이터 유효성 검사에 관련된 모든 복잡성을 처리합니다.

8. 객체를 업데이트하려면 클라이언트는 PUT 또는 PATCH 요청을 API 엔드포인트로 보내고 요청 본문에 객체를 포함해야 합니다. PUT과 PATCH는 종종 상호 교환적으로 사용됩니다. 그러나 PUT은 객체를 대체하기 위한 것이고, PATCH는 하나 이상의 속성을 업데이트하기 위한 것입니다.

9. 객체를 삭제하려면 클라이언트는 빈 요청 본문을 포함하여 DELETE 요청을 API 엔드포인트로 보내야 합니다.

10. API 테스트에는 Postman을 사용할 수 있습니다. Postman을 사용하면 API 엔드포인트로 HTTP 요청을 쉽게 보내고 응답을 검사할 수 있습니다.
