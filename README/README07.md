## Authentication with Next Auth

이 섹션에서는 Next.js 애플리케이션에서 인증을 구현하는 방법에 대해 이야기할 것입니다.

1. 먼저 강력하고 인기 있는 인증 라이브러리인 NextAuth를 설정하는 것으로 시작하겠습니다. (Setting up Next Auth)
2. 그런 다음 Google 제공업체를 구성하여 사용자가 Google 계정으로 로그인할 수 있도록 할 것입니다. (Configuring the Google Provider)
3. 다음으로 인증 세션에 대해 이야기하고 그 작동 원리를 밝히며 클라이언트 및 서버에서 어떻게 액세스할 수 있는지 알아볼 것입니다. (Authentication sessions)
4. 그런 다음 인증된 사용자만 액세스할 수 있도록 경로를 보호하는 방법에 대해 이야기하겠습니다. (Protecting routes)
5. 이어서 데이터베이스 어댑터 및 이를 사용하여 사용자 데이터를 데이터베이스에 저장하는 방법에 대해 이야기할 것입니다. (Database adapters)
6. 마지막으로 자격 증명 제공자를 구성하여 사용자가 이메일과 비밀번호로 로그인할 수 있도록 할 것입니다. (Configuring the Credentials Provider)

### Setting Up Next Auth

인증 설정을 위해 매우 인기 있는 NextAuth 라이브러리를 사용할 것입니다.

먼저 next-auth.js.org로 이동해 보겠습니다. 이 비디오를 보는 현재 시점에서 사이트 상단에 NextAuth가 auth.js로 전환되고 있다는 배너가 표시되고 있습니다. 따라서 이 강의를 보는 시점에서는 웹사이트가 authjs.dev로 변경될 수 있으며 이 섹션에서 소개되는 몇몇 패키지 이름이 미래에 변경될 수 있습니다. 따라서 작동하지 않는 경우 항상 최신 정보를 확인하려면 문서를 참고하세요.

- Auth.js: https://authjs.dev/
- NextAuth.js: https://next-auth.js.org/getting-started/example

이제 NextAuth를 설정하는 방법을 살펴보겠습니다.

"GET Started"로 이동하세요.

기존 프로젝트에 추가하려면 먼저 터미널에서 다음 명령을 사용하여 NextAuth를 설치해야 합니다.

```bash
npm install next-auth
```

인증을 처리할 API 라우트 핸들러를 추가해야 합니다. 이전 버전의 Next.js에서는 페이지 라우터를 사용하는 경우 API 라우트가 있었지만 이제 앱 라우터가 있으므로 라우트 핸들러를 사용합니다. 이 문서는 이전 버전의 Next.js를 위한 것입니다. Next.js 13.2 이상의 버전에서는 다른 가이드를 사용합니다. 여기를 클릭하세요.

- https://next-auth.js.org/configuration/initialization#route-handlers-app

앱 폴더에서 "app/auth" 폴더를 만들어야 합니다. 그런 다음 이 폴더 내에 catch all 폴더를 추가하고 이름을 [..nextauth]로 설정합니다. [..nextauth] 폴더는 /api/auth로 시작하는 모든 경로를 처리합니다. 프로젝트로 돌아가 API 폴더에 새로운 폴더 'auth'를 추가하고 다른 폴더를 추가하십시오. 대괄호로 둘러싸는데, 이는 매개변수를 정의할 것이므로 [..nextauth]로 이름을 정하고 매개변수를 next auth로 지정합니다. 이 폴더를 사용하면 /auth로 시작하는 경로를 처리합니다. 즉, /auth로 시작하는 모든 경로를 처리하게 됩니다. 그런 다음 [..nextauth] 폴더 내에 route.js라는 새 파일을 만듭니다.

- app/api/auth/[...nextauth]/route.ts

이 파일에서 먼저 next-auth에서 NextAuth를 가져와야 합니다. 다음으로 NextAuth()를 사용하여 구성 개체(configuration object)를 제공하는 핸들러 함수를 만듭니다. 두 가지 함수, GET 및 POST를 내보냅니다. GET 및 POST요청을 이 라우트에서 모두 처리할 것입니다. 이제 라우트 파일(route.ts)에서 GET, POST 등과 같은 함수를 내보내야 한다는 것을 알게 되었습니다.

여기서는 두 개의 함수를 추가하는 객체를 내보냅니다. 먼저 GET으로 핸들러를 추가하고, 그 다음에 POST로 핸들러를 추가합니다. 따라서 우리는 이 함수를 GET과 POST라는 두 가지 다른 이름으로 내보냅니다. 따라서 이 엔드포인트로 보내는 모든 GET 또는 POST 요청은 이 핸들러 함수 내에서 처리됩니다.

기본적으로 우리가 여기서 하는 것은 next-auth가 "/auth"로 시작하는 여러 엔드포인트를 노출하게 하는 것입니다. 다음으로 두 개의 환경 변수를 생성해야 합니다.

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";

const handler = NextAuth({});

export { handler as GET, handler as POST };
```

".env" 파일로 이동하겠습니다. 이 파일에서 먼저 "NEXTAUT_URL"을 추가합니다. 이것을 웹사이트 주소로 설정합니다. 예를 들어, localhost 포트 3000입니다. 그 다음으로 "NEXTAUTH_SECRET"을 추가합니다. 이것은 "next-auth"가 인증 키를 암호화하고 서명하는 데 사용할 임의의 긴 문자열이어야 합니다.

```bash
DATABASE_URL="mysql://johndoe:randompassword@localhost:5432/mydb?schema=public"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dlalald53"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=HzYhZ5nKVzYTp/U1zxT3hab3DnobWUcx9jvvwrQgbU8=
```

여기서는 이를 어떤 임의의 긴 문자열로 설정하거나 터미널에서 OpenSSL 도구를 사용하여 임의의 바이트 시퀀스를 생성할 수 있습니다. 인수로 먼저 "rand"를 전달하여 임의의 값을 의미하고, 그 다음에는 "base64"를 추가하여 이러한 임의의 바이트 시퀀스를 base64 알고리즘을 사용하여 인코딩하도록 지정합니다. 그런 다음 생성할 바이트 수를 나타내는 숫자를 추가합니다. 예를 들어 32바이트를 생성하려면 다음과 같이 입력합니다. 이제 이 32바이트는 base64 알고리즘을 사용하여 인코딩됩니다. 이것을 복사하여 .env 파일에 붙여넣을 수 있습니다.

```bash
openssl rand -base64 32
```

### Configuring Google Provider

NextAuth에서는 사용자를 로그인하기 위해 사용할 수 있는 서비스인 프로바이더(provider) 개념이 있습니다.

문서에서 왼쪽의 "프로바이더"를 확장하세요.

<img src="https://cdn-images-1.medium.com/max/1200/1*pv_S5hMI41dxZsBMSJ6tHw.png" />

여기에서 Apple과 같은 여러 서비스 또는 프로바이더(Provider)를 볼 수 있습니다. 이 프로바이더를 사용하여 사용자가 자신의 Apple 계정으로 로그인할 수 있도록 할 수 있습니다. 또한 Auth, Azure Active Directory 및 기타 다양한 서비스도 지원합니다. 이 중에서 이번 수업에서는 사용자가 Google 계정으로 로그인할 수 있도록 하는 방법을 알려드릴 것입니다.

이제 이 프로바이더(provider)를 설정하는 방법을 살펴보겠습니다.

- Google: https://next-auth.js.org/providers/google

먼저, 구글 클라우드 플랫폼(credentials page)에서 애플리케이션을 등록해야 합니다. 이 단계를 수행하려면 Google Cloud에 로그인해야 합니다. 계정이 없는 경우 계정을 만들고 로그인한 후 Google Provider 문서로 돌아가 링크를 클릭하세요.

프로젝트를 선택하거나 새 프로젝트를 만든 후 애플리케이션 이름을 지정하세요(예: "My Next App"). 그리고 동의 화면을 구성해야 합니다. 동의 화면은 Google이 사용자의 정보에 액세스하려는 앱을 사용자에게 알리는 화면입니다. 사용자 유형을 지정해야 하는데, 내부(internal) 또는 외부(external) 중 하나를 선택할 수 있습니다. 내부 앱은 내 기관에서 사용하는 경우에 선택하고, 외부 앱은 누구나 Google을 통해 로그인할 수 있는 공개 웹 사이트에 해당합니다. 외부 앱을 선택하면 테스트 모드에서 시작하고 테스트 사용자만 액세스할 수 있으며, 제품을 본격적으로 제공하기 위해 검토 및 승인 프로세스를 거쳐야 합니다.

동의 화면을 설정한 후 애플리케이션 홈페이지, 개인 정보 정책 및 서비스 약관 링크를 지정해야 합니다. 테스트 모드에서는 이러한 링크를 제공할 필요가 없으며, 제품을 운영 모드로 전환할 때 이러한 링크를 추가해야 합니다.

마지막으로 테스트 사용자를 지정해야 합니다. 테스트 사용자 목록에 추가한 이메일 주소를 입력하세요.

<img src="https://cdn-images-1.medium.com/max/1200/1*4JeU_8JRNQoSKTWC9oz5nw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*ZCr-1iIB8SFZMjfqi_RBRg.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*Eh-1klJYjP9R5CTIDCbfNw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*gXZY8Q5DhY43hn5dVfHk9w.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*k_LD4GDwmpwz2Dx9jTAKkA.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*yNBxHrKnTfNK2bCDDsiZ0g.png" />

그럼, 여기서는 사용자에 대한 어떤 정보를 액세스하려는지 지정해야 합니다.

"스코프 추가 또는 제거(Scopes)"를 클릭하면 스코프 목록이 나타납니다. 여기서 이메일을 선택하여 사용자의 이메일 주소에 액세스할 수 있도록 하고, 프로필도 선택하여 사용자가 공개한 개인 정보를 볼 수 있도록 합니다.

이제 "업데이트"를 클릭합니다. 여기에는 민감하지 않은 스코프가 선택되어 있으며, 원한다면 삭제할 수 있습니다. 다음 페이지로 이동해 봅시다. 여기서 테스트 사용자를 지정해야 합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*L4diPrlDqCmkX2y_St2ezw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*L4diPrlDqCmkX2y_St2ezw.png" />

애플리케이션이 테스트 모드인 경우 최대 100명의 사용자를 등록할 수 있으며, 테스트 사용자만 애플리케이션에 로그인할 수 있습니다. 테스트 사용자를 추가해 봅시다. 제 이메일을 추가하겠습니다. 이제 "저장 및 계속"을 클릭합니다. 거의 다 왔습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*ik5XV68K2tZT62fdC17Y8w.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*UUIv8TkLTHLZpxNcvSs0zQ.png" />

여기는 제공한 모든 정보가 표시된 확인 페이지입니다. 이제 대시보드로 돌아가 봅시다. 지금까지 한 작업입니다. 여기에 앱의 이름이 나와 있으며 언제든지 변경할 수 있습니다. 게시 상태는 현재 테스트 중이며 나중에 애플리케이션을 본격적으로 배포할 준비가 되면 여기서 게시할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*J_5KATYe3pqPdu31uukVKg.png" />

사용자 유형은 외부로 설정되어 있으며 내부로 변경할 수도 있습니다. OAuth 사용자 용량도 아래에서 볼 수 있습니다. 테스트 사용자 용량은 최대 100명의 테스트 사용자를 등록할 수 있으며 현재 1명의 사용자를 등록했습니다.

아래에서는 테스트 사용자를 볼 수 있습니다. 이제 자격 증명 페이지로 이동합니다. 맨 위에서 자격 증명 생성을 클릭하고 OAuth 클라이언트 ID를 선택합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*g--8aMIkXrEg1GeZAh-gNA.png" />

그렇다면 OAuth는 무엇일까요? OAuth는 Open Authentication의 약자로, Google, Facebook, Twitter 등의 많은 웹 사이트에서 구현하는 표준 인증 프로토콜입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*w686IL1a886l74HGUaroOw.png" />

OAuth를 사용하면 사용자들이 Google 또는 Twitter 계정으로 로그인할 수 있도록 할 수 있습니다. 누군가가 Google을 통해 웹 사이트에 로그인하려면 우리의 애플리케이션은 사용자를 Google로 리디렉션하고, 그런 다음 Google은 사용자를 식별하거나 인증한 다음 사용자를 다시 우리의 애플리케이션으로 돌려보냅니다. 이것이 OAuth 프로토콜입니다. 우리의 애플리케이션은 Google의 OAuth 프로토콜의 클라이언트가 될 것입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*fcGtMFqQ7iufvgKyQoz9vw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*LrzdVcVE-sVWc_TmE2WpTw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*j8BZSx_5XgVcWa38qosemg.png" />

이제 OAuth 클라이언트 ID를 만들어 봅시다. 먼저 애플리케이션 유형을 선택해야 합니다. 웹 애플리케이션을 선택하겠습니다. 그런 다음 애플리케이션 이름을 지정해야 합니다. "ByNextApp"이라고 지정해 보겠습니다. 그런 다음 두 개의 URL을 추가해야 합니다. 첫 번째는 "인증된 자바스크립트 원본(JavaScript Origins)"입니다. 이것을 웹사이트의 루트로 설정하려고 합니다. 즉, "localhost"의 포트 3000입니다. 제품용으로 다른 URL을 추가할 수도 있지만, 지금은 필요하지 않으므로 삭제해도 됩니다.

그리고 "인증된 리디렉션 URI(Redirect URI)"를 추가해야 합니다. 이것은 Google이 사용자를 우리의 애플리케이션으로 돌려보내는 데 사용할 URI 또는 URL입니다. 이 URL은 next-auth 문서의 공급자 페이지에서 가져올 수 있습니다. Google 공급자에서 구성 아래에 있는 "인증된 리디렉션 URL"을 확인할 수 있습니다. 제품용으로는 이와 유사한 URL을 사용해야 하지만, 개발용으로는 다음과 같은 URL을 사용할 것입니다. "/api/auth/callback/google"입니다. 이것은 우리가 이전 레슨에서 "/auth"로 시작하는 요청을 처리하는 라우트 핸들러를 등록했던 것의 예입니다. 이 URL을 복사하고 여기에 추가한 다음 "만들기"를 클릭합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*Md0VO1gTlt6S7DKPOKEvmA.png" />

이제 OAuth 클라이언트를 만들었습니다. 우리의 애플리케이션을 식별하는 클라이언트 ID와 Google과 통신할 때 사용하는 비밀 클라이언트(secret)가 있습니다. 이 값을 복사하여 .env 파일에 저장해야 합니다.

먼저 클라이언트 ID를 복사합니다. 이제 .env 파일로 돌아가서 새 키를 추가하겠습니다. "google_client_id"라는 새 키를 추가하고 이 값을 넣겠습니다. 그리고 또 다른 키 "google_client_secret"을 추가하고 이 값을 넣겠습니다. 거의 다 왔습니다.

```bash
# .env
DATABASE_URL="mysql://johndoe:randompassword@localhost:5432/mydb?schema=public"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtkksmdzx"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sdakopwdkawopdkadokaw
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

<img src="https://cdn-images-1.medium.com/max/1200/1*9BH4-e5jSodq5DwFUIHNkw.png" />

이제 문서로 돌아가서 Google 공급자를 만들어야 합니다. 이전 레슨에서 만든 라우트 파일로 이동하고 이 패키지에서 Google 공급자를 가져오고 next-auth 구성 객체의 공급자 중 하나로 설정해야 합니다.

다음 코드 라인을 복사하겠습니다. 그리고 이전에 만든 라우트 파일로 돌아가서 이 Google 공급자를 가져오겠습니다. 이 next-auth 객체를 만들 때 공급자를 설정합니다. 공급자를 설정하는 배열에서 Google 공급자를 사용하도록 합니다. 이를 호출하고 객체를 제공하겠습니다. 이 객체에서 "client_id"를 "process.env.google_client_id"로 설정합니다. "process.env"를 사용하여 환경 변수를 읽을 수 있으며, 여기서는 "google_client_id"라는 이름의 환경 변수의 값을 읽고 있습니다.

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
```

마찬가지로 "client_secret"도 "process.env.google_client_secret"으로 설정합니다. 여기서는 TypeScript 오류가 발생합니다. 이것은 이 속성의 타입이 문자열이거나 정의되지 않은(undefined) 값이 아닌 문자열이어야 하기 때문입니다. 그러나 "process.env.google_client_id"가 정의되지 않을 수도 있으므로(undefined) 이러한 값은 허용하지 않습니다. 그러나 이 경우에는 환경 변수를 올바르게 설정했음을 알고 있으므로 이 변수에 값이 있음을 TypeScript 컴파일러에게 확신시킬 수 있습니다. 이렇게 하려면 변수 끝에 느낌표를 붙여 TypeScript 컴파일러에게 이 변수에 값이 있다고 알려줍니다. 한 번 더 이렇게 해 보겠습니다.

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
```

오류가 사라졌습니다. 이제 마지막 단계입니다. 네비게이션 바에 로그인 링크를 추가해 봅시다. 네비게이션 바로 이동하겠습니다. 여기에 "api/auth/signin"으로 이동할 새 링크를 추가하겠습니다. 이것은 next-auth에 의해 노출된 다른 엔드포인트입니다.

```tsx
// app/NavBar.tsx
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link className="mr-5" href="/">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      <Link href="/api/auth/signin">Login</Link>
    </div>
  );
};

export default NavBar;
```

이제 "로그인"을 클릭해 보겠습니다. 이 페이지는 자동으로 next-auth에 의해 생성되었습니다. 더 많은 공급자를 등록하면 트위터, 깃허브 등과 같은 다른 공급자에 대한 로그인 버튼도 여기에 나타날 것입니다. 이제 Google로 로그인해 보겠습니다. 앱의 이름과 사용자 이름이 표시됩니다. 이전에 테스트 사용자로 이 사용자를 등록했으며 이 사용자로만 로그인할 수 있습니다. 이제 로그인하겠습니다. 잘되었습니다. 이제 로그인했지만 현재 사용자의 이름은 표시되지 않습니다. 이 부분은 뒷 부분에서 구현해보겠습니다.

### Understanding Authentication Sessions

중요한 개념 중 하나는 인증 세션(authentication session) 개념입니다.

사용자가 로그인하면 NextAuth는 해당 사용자를 위한 인증 세션을 생성합니다. 기본적으로 해당 세션은 JSON 웹 토큰(JSON web token)으로 표현됩니다.

DevTools를 열고 "Application" 탭으로 이동한 다음 "Cookies"를 열어 웹 사이트를 확인하세요.

<img src="https://cdn-images-1.medium.com/max/1200/1*CfNL-HBIedQ6IsGmub4kTA.png" />

여기에서 "NextAuth Session Token"이라는 이름의 쿠키를 찾을 수 있습니다. 쿠키는 클라이언트와 서버 간에 각 요청과 함께 교환되는 작은 정보 조각입니다. 애플리케이션이 서버로 요청을 보낼 때마다 이러한 쿠키 또는 정보 조각이 서버로 전송됩니다.

여기에는 "session token"이라는 이름의 쿠키가 있습니다. 이 값은 긴 무작위 문자열처럼 보이지만 실제로 JSON 웹 토큰입니다. JSON 웹 토큰은 클라이언트가 자체를 식별하는 데 사용하는 신분증 카드 또는 여권 또는 운전 면허증과 같습니다.

이 긴 문자열 뒤에는 실제로 JSON 객체가 있습니다. 그 JSON 객체는 Base64 알고리즘을 사용하여 인코딩됩니다.

그러나 서버는 NextAuth를 사용하고 NextAuth는 이러한 것을 디코딩하는 방법을 알고 있습니다. JSON 웹 토큰 뒷면으로 가서 이 JSON 웹 토큰을 확인하겠습니다.

프로젝트로 돌아가서 무언가 재미있는 작업을 해보겠습니다. 실제 프로젝트에서는 절대로 이것을 할 필요가 없으며 이것은 내부 작동 원리를 이해하는 데 도움을 주기 위한 것입니다.

auth 폴더에서 "token"이라는 새 폴더를 만들고 그 안에 라우트 파일(route.ts)을 추가합니다.

- app/api/auth/token

이 라우트 파일에서 "NextAuth auth slash JWT"에서 "getToken" 함수를 가져옵니다. 그런 다음 "NextReqest" 유형의 request를 사용하는 "GET" 함수를 내보냅니다. 이 함수에서는 "getToken"을 호출하고 request에 req를 설정합니다. 이것은 프로미스를 반환하므로 토큰을 얻기 위해 await 해야 합니다. 마지막으로 이 함수를 async 함수로 만듭니다. 마지막으로 이 토큰으로 응답(response)을 반환합니다.

```ts
// app/api/auth/token/route.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  return NextResponse.json(token);
}
```

웹 브라우저로 돌아가서 "localhost:3000/api/auth/token"으로 이동합니다.

- localhost:3000/api/auth/token

<img src="https://cdn-images-1.medium.com/max/1200/1*3g9yWTqFQizruk56P40zCw.png" />

이제 JSON 웹 토큰이 표시됩니다. 이 JSON 객체에는 이름, 이메일, 사진과 같은 몇 가지 속성이 있습니다. 이러한 정보는 Google로부터 수신한 것입니다. 사용자 ID인 "sub", "iat"은 발행 시간을 나타내며 기본적으로 토큰은 30일 동안 유효합니다.

이 JSON 객체를 JSON 웹 토큰이라고 하며 클라이언트가 각 요청과 함께 서버에 보내는 식별 카드와 같습니다. 요약하면 사용자가 로그인하면 NextAuth는 해당 사용자를 위한 인증 세션을 생성하고 기본적으로 JSON 웹 토큰으로 나타냅니다. 이제 인증 세션을 클라이언트에서 어떻게 액세스할 수 있는지 알려드리겠습니다.

### Accessing Sessions on the Client

클라이언트에서 인증 세션에 액세스하려면 앱 폴더에 있는 루트 "app/layout"로 이동하고 애플리케이션을 Session Provider 컴포넌트로 래핑해야 합니다. 이 Session Provider는 내부적으로 React 컨텍스트를 사용하여 세션을 컴포넌트 트리 아래로 전달합니다.

먼저, `next-auth/react`에서 `SessionProvider`를 가져와야 합니다.

```javascript
import { SessionProvider } from "next-auth/react";
```

그런 다음 애플리케이션을 `SessionProvider`로 래핑합니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
```

그러나 브라우저에서 이렇게 하면 "react context is unavailable in server components"라는 오류가 발생할 수 있습니다. 클라이언트 컴포넌트로 변경하는 것으로 간단하게 해결할 수 있다고 생각할 수 있지만, 이러한 변경을 시도하면 "you're attempting to export Metadata from a component marked with use client"라는 다른 오류가 발생합니다.

```tsx
"use client";
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
```

이 문제를 해결하려면 `SessionProvider`를 별도의 클라이언트 컴포넌트 내부로 래핑해야 합니다. 이렇게 하려면 다음 단계를 따르세요.

1. `auth` 폴더를 생성합니다.
1. `auth` 폴더 내에 `Provider.tsx` 파일을 만듭니다.

`provider.tsx` 파일에는 다음 내용이 포함되어야 합니다.

```tsx
// app/auth/provider.tsx
"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

이제 `AuthProvider`를 클라이언트 컴포넌트로 사용할 수 있습니다. 이제 레이아웃 파일에서 `SessionProvider` 대신에 `AuthProvider`로 앱을 래핑합니다.

```tsx
// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
```

이제 `SessionProvider`가 클라이언트 컴포넌트 내에서 사용되기 때문에 오류가 해결됩니다.

다음으로, NavBar 컴포넌트에서 세션에 접근하는 방법을살펴보겠습니다. "next-auth/react" 모듈에서 제공하는 "useSession" 훅을 통해 세션에 접근할 수 있습니다. 이를 호출하면 몇 가지 속성을 가진 객체를 가져올 수 있습니다.

이를 구조화하고 'status'와 'Data'를 가져와보겠습니다. 'data'를 가독성을 높이고자 'session'으로 이름을 수정하겠습니다. 또한 이 컴포넌트를 클라이언트 컴포넌트로 만들어야 합니다. 왜냐하면 이 훅을 사용하면 'session Provider'를 통해 전달된 컨텍스트 객체에 액세스할 수 있기 때문입니다.

이제 여기에 'status'가 있습니다. 'status'는 '인증됨(authenticated)', '로딩 중(loading)', '비인증됨(unauthenticated)' 중 하나일 수 있습니다. 따라서 여기에서는 'status'가 '로딩 중'인 경우 초기에는 아무것도 반환하지 않거나 로딩 표시기를 반환할 수 있습니다. 그렇지 않으면 이 마크업을 반환합니다. 이제 여기 아래에서는 '비인증됨'인 경우에만 로그인 링크를 렌더링하려고 합니다.

따라서 중괄호로 감싸고 여기서 'status'가 '비인증됨'인 경우에만 로그인 링크를 렌더링하도록 확인합니다. 그렇지 않으면 사용자 링크를 렌더링할 수 있습니다. 여기에서 'status'가 '인증됨'인 경우에만 'div'를 렌더링하고 그 안에 'session.user.name'을 렌더링합니다. 'user' 속성은 선택 사항이기 때문에 'status'가 '로딩 중'인 경우에는 사용자 객체가 없습니다. 그러나 이 경우에는 사용자가 확실히 있으므로 '!'를 추가하여 TypeScript 컴파일러에 사용자가 확실히 있다고 알릴 수 있습니다. 이 예제에서는 두 가지 별개의 조건이 있지만 JavaScript의 조건 연산자를 사용하여 '인증됨'인 경우 이것을 렌더링하고 그렇지 않으면 다른 것을 렌더링할 수도 있습니다. 어느 방법이든 이 컴포넌트에서는 이 훅과 React 컨텍스트를 사용하고 있으므로 이를 클라이언트 컴포넌트로 표시해야 합니다. 페이지 상단에 'use client'를 추가하겠습니다.

```tsx
"use client";
// app/NavBar.tsx
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link className="mr-5" href="/">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      {status === "authenticated" && <div>{session.user!.name}</div>}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
```

이제 다시 브라우저에서 확인해보겠습니다. 초기에는 로딩 상태 때문에 네비게이션 바를 보지 못합니다. 이것은 다소 이상한 경험입니다. 우리는 여기서 'status'를 확인하고 싶지 않습니다. 따라서 이 줄을 제거하겠습니다. 대신에 'status'가 '로딩 중'인 경우 여기에서 'status'를 확인할 수 있습니다. 'status'가 '로딩 중'인 경우 스피너 또는 스켈레톤을 렌더링하거나 '로딩 중'이라고 표시할 수 있습니다.

```tsx
// app/NavBar.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link className="mr-5" href="/">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && <div>{session.user!.name}</div>}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
```

### Accessing Session on the Server

서버에서 인증 세션에 액세스하는 방법을 알아보겠습니다.

1. 앱 폴더로 이동하고 홈 페이지를 엽니다.

- app/page.tsx

2. 이 컴포넌트에서 `next-auth`에 정의된 `getServerSession`이라는 함수를 호출합니다.

```tsx
import { getServerSession } from "next-auth/react";
```

3. `getServerSession` 함수를 호출할 때 인증 옵션을 전달해야 합니다. 이는 `next-auth`를 초기화할 때 사용한 객체입니다. 초기화한 객체를 불러옵니다.

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

4. `getServerSession` 함수에 옵션을 전달하여 세션을 가져옵니다. 이 함수는 프로미스를 반환하므로 `await` 키워드를 사용하여 세션을 얻어야 합니다. 세션이 있을 경우에만 사용자 이름을 렌더링하도록 조건을 추가합니다.

```tsx
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
```

6. 브라우저에서 애플리케이션을 테스트합니다. 사용자 이름이 표시되어야 합니다.

이것이 서버에서 세션에 액세스하는 방법입니다. 이 함수는 페이지 및 라우트 핸들러에서 모두 작동하며, API에서 현재 세션에 액세스해야 하는 경우 해당 API에서 이 함수를 호출할 수 있습니다.

### Signing Out Users

이제 사용자를 로그아웃하는 방법을 보여드리겠습니다.

우리의 네비게이션 바로 이동해 보겠습니다. 사용자가 인증되었다면, 인증된 이름 바로 뒤에 로그아웃 링크를 추가해보겠습니다. "href를 /api/auth/signout"으로 설정합니다. 이것은 NextAuth에서 처리하는 또 다른 엔드포인트입니다.

```tsx
// app/NavBar.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link className="mr-5" href="/">
        Next.js
      </Link>
      <Link href="/users">Users</Link>
      {status === "loading" && <div>Loading...</div>}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className="ml-3">
            Sign Out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
```

그럼 로그아웃해 보겠습니다. 다시 여기로 돌아왔고, 내 이름이 사라졌습니다. 그리고 쿠키 아래의 애플리케이션 탭을 보면 인증 섹션이 더 이상 없음을 확인할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*TykYyQHAdzeHyQedBV60wA.png" />

### Protecting Routes

이번에는 Protected Routes에 대해 이야기해 보겠습니다. 이를 위해 미들웨어를 사용할 것입니다. 미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다. 이를 통해 모든 요청에 대해 실행되는 미들웨어 함수를 만들 수 있습니다.

이 함수에서는 사용자 세션을 확인하고 사용자가 세션 없이 웹 사이트의 비공개 부분에 액세스하려고 시도하는 경우 로그인 페이지로 리디렉션할 수 있습니다.

이것을 어떻게 할 수 있는지 보여 드리겠습니다.

프로젝트의 루트 폴더, 즉 앱 폴더 외부에 middleware.ts라는 새 파일을 추가합니다. 이름을 올바르게 철저히 입력하십시오. 이것은 Next.js가 찾는 컨벤션 중 하나입니다.

- middleware.tsx

이 함수에서는 middleware라는 함수를 내보냅니다. 다시 한 번 철저히 입력하십시오. 이 함수는 모든 "NextRequest" 타입의 요청을 받아야 합니다.

위에서 말했듯이 이 함수는 모든 요청에서 실행됩니다. 따라서 여기에서 사용자 세션을 확인하고 로그인 페이지로 리디렉션할 수 있는 기회가 있습니다.

그러나 여기에는 해당 로직을 구현하지 않겠습니다. 왜냐하면 NextAuth에서 이미 구현되어 있기 때문입니다.

Next.js에서 미들웨어가 작동하는 방법만 보여드리려고 합니다.

이 데모를 위해 다음 응답을 반환하고 사용자를 리디렉션하겠습니다. 여기서 새 URL을 전달하면, 첫 번째 인수로 "/new-page"를 전달하고 있습니다. 물론 이것은 데모용이며 실제로는 존재하지 않습니다. 두 번째 인수로는 웹 사이트의 기본 URL을 전달하고 있으며, 이 경우 localhost입니다. 프로덕션 환경에서는 다를 것입니다. request.url에서 가져올 수 있습니다.

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/new-page", request.url));
}
```

이제 홈 페이지로 돌아가서 새로 고침하면 새 페이지로 리디렉션됩니다. 대부분의 경우 미들웨어 함수가 모든 요청에서 실행되는 것이 아니라 특정 경로에서만 실행되기를 원합니다. 따라서 여기에서는 config라는 상수를 내보내야 합니다. 다시 한 번 말하면 Next.js가 찾는 것 중 하나입니다.

이것을 객체로 설정하고 여기에서 matcher 속성을 지정된 경로를 나타내는 문자열로 설정합니다. 또는 여러 경로를 전달하려면 문자열 배열을 전달합니다. 예를 들어 여기에 슬래시 사용자를 전달하면 미들웨어 함수는 이 엔드포인트에 요청이 발생했을 때만 실행됩니다.

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/new-page", request.url));
}

export const config = {
  matcher: ["/users/:id*"],
};
```

홈 페이지로 이동하려면 홈 페이지가 표시되지만 사용자 페이지(/users)로 이동하면 "/new-page"로 리디렉션됩니다.

여기에서 매개변수를 전달할 수 있으며, 선택적으로 매개변수를 수정할 수 있습니다.

예를 들어 별표를 매개변수 뒤에 추가하면 매개변수가 0개 이상 있음을 의미하므로 미들웨어 함수는 슬래시 사용자로 이동하거나 슬래시 사용자로 이동할 때 실행됩니다. 하나 이상의 매개변수가 있음을 의미합니다.

플러스 기호를 사용하면 하나 이상의 매개변수를 의미하고, 물음표를 사용하면 0개 또는 1개를 의미합니다.

- /users
- /users/1

```ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/new-page", request.url));
}

export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  matcher: ["/users/:id*"],
};
```

NextAuth에서는 여기에서 지정한 경로 중 하나에 액세스하려고 하는 경우 사용자 세션을 확인하고 자동으로 로그인 페이지로 리디렉션합니다. 따라서 여기에서 next-auth/middleware를 가져옵니다. 여기에 미들웨어 함수가 있습니다. 이렇게 모듈에서 내보낼 수 있습니다. 이 문법을 사용하면 미들웨어 함수를 가져와서 내보내는 대신 한 번에 내보낼 수 있습니다.

```ts
export { default } from "next-auth/middleware";

export const config = {
  // *: zero o more
  // +: one or more
  matcher: ["/users/:id*"],
};
```

실제 응용 프로그램에서는 대시보드와 같은 경로가 일반적이며, 이후에 슬래시 대시보드로 시작하는 모든 경로를 보호하기 위해 0개 이상의 매개변수를 추가할 수 있습니다.

```ts
export { default } from "next-auth/middleware";

export const config = {
  // *: zero o more
  // +: one or more
  matcher: ["/dashboard/:path*"],
};
```

홈 페이지를 볼 수 있지만 대시보드로 이동하면 로그인 페이지로 리디렉션됩니다.

- /dashboard
- /dashboard/3

### Database Adapters

지금까지 우리는 Google을 통해 응용 프로그램에 로그인할 수 있습니다. 그러나 실제 응용 프로그램에서는 일반적으로 사용자를 데이터베이스에 저장해야 합니다. 이러한 사용자는 이미지, 게시물 등과 같은 관련 데이터를 가질 수 있습니다. 여기서 어댑터(Adapter)를 사용합니다. 어댑터를 사용하면 누군가 로그인할 때 NextAuth가 자동으로 그들의 데이터를 데이터베이스에 저장합니다. 보여드릴게요.

다음은 NextAuth 문서에서 어댑터에 대한 페이지입니다. 다양한 데이터베이스 엔진이나 ORM에 대한 다양한 어댑터를 제공합니다. 우리는 Prisma 어댑터를 살펴볼 것입니다.

- https://next-auth.js.org/adapters
- https://authjs.dev/reference/adapter/prisma

현재 이 강의를 제작하는 시점에는 조금 복잡한 부분이 있습니다. 왜냐하면 앞서 말한대로 NextAuth가 auth.js로 변환되고 있기 때문입니다. 이 패키지를 설치할 때 조금 변경해야 합니다. 만약 auth에서 Prisma 어댑터를 설치하면 작동하지 않으며 TypeScript 오류가 발생합니다. 따라서 이 부분을 변경하고 Prisma 어댑터를 NextAuth에서 설치해야 합니다.

또한 Prisma 클라이언트를 설치해야 하는데, 이미 설치한 상태이므로 다시 설치할 필요는 없습니다.

터미널로 돌아가서 `@next-auth/prisma-adapter`를 설치합니다.

```bash
npm install @prisma/client @auth/prisma-adapter
```

다음 단계는 NextAuth를 초기화하는 일환으로 어댑터를 지정하는 것입니다. NextAuth를 초기화하는 루트 파일로 이동해 봅시다. 먼저 Prisma 어댑터를 `@next-auth/prisma-adapter`에서 가져옵니다. 그리고 Prisma 클라이언트를 `prisma/client`에서 가져옵니다.

이제 auth 옵션에 어댑터 속성을 추가하고 Prisma 어댑터를 설정하고 여기에 Prisma 클라이언트를 전달합니다.

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

다음 단계는 Prisma 스키마에 다양한 모델을 지정하는 것입니다. 여기서 account와 session 모델이 있는데, 이 모델들은 데이터베이스에서 사용자 세션을 저장하기 위한 것입니다. 기본적으로 우리가 가진 전략은 JWT입니다. 세션은 JSON 웹 토큰으로 유지됩니다. 그러나 데이터베이스에 세션을 저장할 수도 있습니다. 이 부분은 이 비디오에서 뒤에 다시 다룰 것입니다. 또한 사용자 모델도 있지만 이 사용자 모델은 이전에 만든 모델과 약간 다릅니다. 이 사용자 모델에서 id 필드는 문자열이지만, 우리의 사용자 모델에서는 id 필드가 정수입니다. 이메일에서 사용하는 확인 토큰을 나타내는 verification token이라는 다른 모델도 있습니다.

- https://authjs.dev/reference/adapter/prisma

이제 Prisma 스키마에서 모델을 가져오기 전에 이 두 모델을 제거하려고 합니다. 때때로 모델을 변경하고 데이터베이스를 마이그레이션하면 문제가 발생할 수 있으므로 강의에서 이 복잡성을 제외하고자 합니다. 따라서 이 두 모델을 제거하겠습니다. 이제 터미널에서 `npx prisma migrate dev`를 실행하여 이 두 개의 테이블을 삭제합니다.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```bash
npx prisma migrate dev
# drop user
```

이제 데이터베이스로 돌아가서 새로 고침해 봅시다. 사용자 테이블이 사라진 것을 확인할 수 있습니다. 모든 모델을 가져와서 스키마에 추가할 수 있습니다.

모든 모델을 복사하고 Prisma 스키마에 붙여 넣은 다음 다른 마이그레이션을 실행해 봅시다. 다시 한 번 `npx prisma migrate dev`를 실행합니다.

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

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

```bash
npx prisma migrate dev
#  Add prisma model
```

이름을 `add-prisma-adapter-models`와 같이 지정하겠습니다. 데이터베이스로 돌아가서 새로 고침합니다. 여기에 계정, 세션, 사용자 및 확인 토큰이 있는 네 개의 테이블이 있습니다.

이제 한 번 더 응용 프로그램에 로그인해 보겠습니다. Google로 로그인하면 "다른 계정으로 로그인을 시도해 보세요."라는 오류가 발생합니다. 위쪽에 오류 유형이 콜백인 것을 볼 수 있습니다. 이 오류가 발생하는 이유는 기본적으로 세션 전략이 JWT 또는 JSON 웹 토큰인데, 어댑터를 사용하면 세션 전략이 데이터베이스로 변경됩니다. 이 강의를 제작하는 시점에서는 데이터베이스 세션을 소셜 로그인이나 OAuth 제공자와 함께 사용할 수 없습니다. 따라서 NextAuth를 초기화하는 루트 파일로 이동하여 세션 전략을 변경해야 합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*qWd1Je1OAUxmUitB5SJBpQ.png" />

이 auth 옵션에서 session이라는 다른 속성을 추가하고 이를 객체로 설정합니다. 여기에서 자동 완성이 없는 이유는 `NextAuthOptions` 타입을 입력하지 않았기 때문입니다. 이 상수에 `NextAuthOptions`를 지정하고 어디에서나 `Ctrl + Space`를 누르면 유효한 속성을 볼 수 있습니다. 여기서 우리는 전략을 JWT로 변경할 것입니다.

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

이제 한 번 더 로그인을 시도해 보겠습니다. 좋습니다. 로그인되었습니다. 이제 데이터베이스를 살펴보면 사용자 테이블에서 내 이름, 이메일 및 이미지를 볼 수 있습니다. 또한 계정 테이블에 레코드가 있으며 사용자는 Facebook, Google, Twitter 등과 같은 여러 계정을 가질 수 있습니다. 여기서 제공자는 Google이고 유형은 OAuth입니다. 다른 열도 몇 가지 있지만 대부분의 경우 이러한 테이블을 수정할 필요가 없습니다.

### Configuring CredentialsProvider

소셜 로그인은 좋지만 사용자가 자신의 사용자 이름과 비밀번호로 로그인할 수 있도록 허용하려면 어떻게 해야 할까요? 물론 가능합니다. 그러나 비밀번호를 암호화된 상태로 데이터베이스에 저장하고 사용자가 등록하고 비밀번호를 변경하거나 비밀번호를 재설정하는 기능을 구현하는 등 추가 작업이 필요합니다. 반면에 소셜 로그인이나 OAuth 제공자를 사용할 경우 이러한 작업을 처리할 필요가 없습니다. Google, Facebook 또는 Twitter에 사용자가 유효한 사용자인지 묻기만 하면 됩니다. 비밀번호를 저장하거나 계정을 관리하기 위한 기능을 구축할 필요가 없습니다. 그러나 이것이 실제로 응용 프로그램에서 필요한 경우에 대비하여 어떻게 설정할 수 있는지 보여드리겠습니다.

- https://next-auth.js.org/providers/credentials

다시 NextAuth 문서로 돌아가서 제공자 목록 중에 credentials라는 제공자(providers)가 있습니다. 이를 설정하려면 credentials 제공자를 가져와서 next-auth를 초기화할 때 providers 배열에 전달해야 합니다. 이름을 지정하고 credentials 속성을 객체로 설정합니다. 이 객체는 로그인 페이지에 양식을 생성하는 데 사용됩니다. 여기서 로그인 페이지에 사용자 이름과 비밀번호 두 개의 필드를 갖도록 지정합니다. 물론 필드 이름을 이메일로 바꿀 수 있습니다. 각 필드에 대한 라벨과 타입 그리고 선택적으로 placeholder를 지정해야 합니다. 또한 사용자를 인증하고 올바른 사용자 이름 및 비밀번호 조합을 제공했는지 확인하는 authorize 함수를 구현해야 합니다.

그럼 next-auth를 초기화하는 루트 파일로 돌아가서 credentials 제공자를 가져옵니다. 그리고 여기에 credentials 제공자를 전달합니다. 객체를 제공하고 여기에 먼저 name 속성을 credentials로 설정하고, credentials 속성을 두 개의 속성을 가진 객체로 설정합니다. 하나는 username 또는 email, 그리고 label을 email로 설정합니다. 이것은 양식에 표시될 라벨입니다. 그리고 type을 email로 설정하여 사용자가 유효한 이메일을 제공해야 합니다. 필요하다면 placeholder도 지정할 수 있습니다. 이와 유사한 방식으로 password 필드를 추가합니다. 라벨, 타입 및 선택적으로 placeholder를 변경합니다.

마지막으로 authorize 함수를 구현해야 합니다. 이 함수는 credentials와 request 두 가지 매개변수를 받습니다. 여기서 사용자가 유효한지 확인하고 올바른 사용자 이름과 비밀번호 조합을 제공했는지 확인합니다. 사용자가 credentials 객체에 이메일과 비밀번호를 제공했는지 확인하고, 그렇지 않다면 null을 반환합니다. 그런 다음 데이터베이스에서 이 이메일로 사용자를 조회하고 해당 사용자의 hashed password를 확인합니다. 이 비교를 위해 bcrypt 라이브러리를 사용합니다. bcrypt를 사용하면 데이터베이스에 삽입할 때 비밀번호를 암호화할 수 있습니다. 사용자 모델(User)에 "hashedPassword" 필드를 추가하고 Prisma 스키마를 업데이트해야 합니다. 이제 사용자가 유효한지 확인한 후 비밀번호가 일치하는지 확인하여 올바른 사용자 객체를 반환하거나 null을 반환합니다.

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

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

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  hashedPassword String?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

```bash
npx prisma migrate dev
# Add Password
```

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword!
          );

          return passwordMatch ? user : null;
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

로그인 페이지로 돌아가면 이제 이메일과 비밀번호로 로그인할 수 있는 양식이 나타납니다. 이 페이지를 원하는대로 사용자 정의할 수 있습니다. 지금은 무작위 이메일과 비밀번호로 로그인해 보겠습니다. 당연히 이 사용자가 없으므로 오류가 발생합니다. 다음으로 사용자가 등록할 수 있는 기능을 구현하겠습니다.

### Registering Users

"사용자 등록을 허용하려면 먼저 API 엔드포인트를 생성해야 합니다.

이 엔드포인트는 양식을 렌더링하는 클라이언트 컴포넌트에서 호출됩니다. 따라서 앱 폴더에서 'register'라는 새 폴더를 추가해보겠습니다. 그런 다음 라우트 파일을 추가합니다.

- app/register/route.ts

이 라우트 파일에서는 POST 요청을 처리하기 위한 함수를 내보냅니다. request를 "NextRequest" 타입으로 제공하고 request.json을 호출한 다음 요청의 본문을 기다립니다. 함수를 비동기 함수로 만듭시다.

이제 본문을 가지고 있으므로 본문에 유효한 이메일과 비밀번호가 있는지 확인해야 합니다. 그러려면 zot을 사용할 것입니다. 먼저 상단에서 z를 가져오겠습니다. 그런 다음 z.object를 호출하여 스키마를 만듭니다.

두 개의 속성인 'email' (문자열이어야 하며 유효한 이메일이어야 함)과 'password' (최소 5자 이상의 문자열)을 가진 객체를 전달합니다.

여기서 더 많은 규칙을 추가할 수 있습니다. 대문자가 하나 이상, 숫자가 하나 이상, 특수 문자 등을 요구하는 규칙을 추가할 수 있습니다.

이러한 방식으로 접근하면 OAuth 공급자를 사용하는 것에 비해 처리해야 할 복잡성이 훨씬 더 많이 발생합니다. 이렇게 스키마를 만든 후에는 POST 함수에서 schema.safeParse를 호출하고 본문을 전달합니다. 그런 다음 유효성 검사 객체를 얻습니다. 다음으로 유효성 검사가 성공하지 않았는지 확인하고, 실패한 경우에는 JSON 객체와 함께 next response를 반환하며 여기에는 validation.error.errors를 전달합니다. 이전과 마찬가지로 상태를 400으로 설정합니다. 변경 사항을 저장하겠습니다. 코드가 다시 형식화되었습니다.

요청이 유효한 경우에는 해당 이메일을 데이터베이스에 가진 사용자가 없도록 확인해야 합니다. 이를 위해 prisma 클라이언트를 사용해야 합니다. 여기서 prisma.user.findUnique를 호출하고 필터를 전달하고 이메일을 body.email로 설정합니다. 그런 다음 사용자 객체를 얻기 위해 호출을 기다립니다. 사용자가 존재한다면, 에러 속성이 'user already exists'로 설정된 next response를 반환합니다. 다시 한 번 상태를 400으로 설정합니다.

그렇지 않으면 이 사용자를 생성해야 합니다. 이를 위해 먼저 비밀번호를 해시해야 합니다. 상단으로 이동하여 bcrypt를 가져옵니다. 그런 다음 함수 내에서 bcrypt.hash를 호출하고 body.password를 전달합니다. 두 번째 인수로 saltOrRound 수를 전달할 수 있습니다. 숫자가 높을수록 암호화는 느리지만 더 안전합니다. 여기서는 10을 사용하고 해시된 비밀번호를 얻기 위해 호출을 기다립니다.

다음으로 prisma.user.create를 호출하여 데이터를 생성합니다. 여기에는 이메일 (body.email로 설정)과 해시된 비밀번호 (hashed password로 설정) 두 개의 속성을 추가해야 합니다. 실제 애플리케이션에서는 등록 양식에 이름, 나이 등 다른 필드가 있을 수 있습니다. 여기에서는 해당하지 않으므로 이메일과 비밀번호만 전달합니다. 다음으로 새 사용자를 얻기 위해 호출을 기다립니다. 마지막으로 클라이언트에게 기본 응답을 반환합니다. 따라서 NextResponse.json을 반환하고 여기에는 이메일 (body.email 또는 new user.email로 설정)만 추가합니다. 물론 보안상의 이유로 해시된 비밀번호를 반환하지 않아야 합니다. 현재로서는 이대로 충분합니다. 이제 이 API를 테스트해보겠습니다.

```tsx
// app/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json(
      {
        error: "User Already Exists",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
```

여기서 Postman을 사용하여 POST 요청을 "/api/register"로 보내보겠습니다. 요청의 본문에서는 JSON 형식의 객체를 포함합니다. 여기에는 두 가지 속성인 이메일과 비밀번호가 있습니다. 의도적으로 이메일을 빈 문자열로 설정하여 유효성 검사 로직이 작동하는지 확인하겠습니다. 비밀번호도 동일하게 설정합니다.

```json
{
  "email": "",
  "password": ""
}
```

404 오류가 발생했습니다. 방금 알아차린 실수인데요, 'register' 폴더를 'API' 폴더 내에 만들어야 했습니다. 따라서 이 폴더를 여기로 이동하겠습니다.

- Before: app/register/route.ts
- After: app/api/register/route.ts

이제 이 요청을 한 번 더 보내보겠습니다. 이번에는 잘 통과되었습니다. 200 응답을 받았습니다. 이제 동일한 요청을 두 번 보내면 두 번째 요청에서는 'user already exists'라는 오류가 포함된 400 오류를 받게 됩니다.

마지막 단계로 유효한 이메일과 비밀번호로 로그인하려고 합니다. hello@gmail.com 및 12345로 시도합니다. 성공적으로 로그인했지만 페이지가 존재하지 않는 페이지에 액세스하려고 하면 오류가 발생합니다. 이것이 사용자를 등록하는 방법입니다. 이 과정의 일환으로 등록 양식을 만들어야 하지만 이는 기본적인 리액트에 불과합니다. 양식을 만들고 아름답게 만들고 클라이언트 측 유효성 검사를 구현해야 합니다.

### Additional Reading

We can replace the autogenerated login and logout pages with our custom ones. Dive into the guide below to learn how.

- https://next-auth.js.org/configuration/pagesEvents

NextAuth.js provides a number of events (eg signIn, signOut, createUser, etc) that are useful for auditing or handling any other side effects: https://next-auth.js.org/configuration/eventsWe can provide handlers for these events as part of our NextAuth.js setup: https://next-auth.js.org/configuration/options#events

### Exercises

여기 몇 가지 연습과 도전 과제가 있습니다. 문제 해결과 능동적인 학습의 세계로 당신을 이끌기 위해 해결책을 표시하지 않기로 결정했습니다. 또한 해결책은 반복적이며 시간 낭비입니다.

1. 다른 OAuth 공급자를 구성하세요 (예: GitHub 또는 Twitter).
2. 사용자의 이름, 이메일 및 비밀번호를 캡처하는 사용자 정의 등록 양식을 만드세요. 이러한 값이 데이터베이스에 저장되도록 하세요.
3. 비밀번호 변경 페이지를 만드세요. 로그인한 사용자만 액세스할 수 있도록 하세요.

이러한 도전과제를 해결하는 방법에 대한 이해와 기술을 향상시키는 데 좋은 기회입니다. 각 작업을 다루는 방법에 대한 개요를 제공했으니 다음과 같이 접근할 수 있습니다:

1. **다른 OAuth 공급자 구성 (예: GitHub 또는 Twitter):**

   - 선택한 공급자 (예: GitHub, Twitter 등)의 OAuth 통합을 위한 문서를 연구합니다.
   - Next.js 애플리케이션에서 선택한 공급자를 통합하기 위해 필요한 패키지를 설치합니다 (예: `next-auth`, `passport` 또는 특정 OAuth 라이브러리).
   - 공급자의 개발자 포털에서 OAuth 애플리케이션을 생성하고 필요한 API 키와 비밀 키를 얻습니다.
   - Next.js 애플리케이션에서 OAuth 공급자를 구성하고 클라이언트 ID 및 클라이언트 비밀 키를 지정합니다.
   - 앱에서 OAuth 인증 흐름을 구현하기 위해 페이지, 경로 및 콜백 함수를 작성합니다.
   - 새로운 OAuth 공급자를 사용하여 사용자가 로그인할 수 있도록 인증을 허용하는 것을 테스트합니다.

2. **사용자 정의 등록 양식 만들기:**

   - Next.js 앱에서 사용자 등록 페이지를 만듭니다.
   - 이름, 이메일 및 비밀번호와 같은 사용자 정보를 수집하는 양식을 디자인합니다.
   - 양식 필드가 올바르게 작성되었는지 확인하기 위해 클라이언트 측 유효성 검사를 구현합니다 (예: 이메일 형식 확인, 비밀번호 복잡성 검사).
   - 사용자 등록을 처리하는 API 경로 또는 엔드포인트를 만듭니다.
   - 등록 API 경로에서 양식 데이터를 유효성 검사하고 이메일이 고유한지 확인합니다.
   - 데이터가 유효하면 비밀번호를 해시화하고 사용자 정보를 데이터베이스에 저장합니다 (예: Prisma 또는 다른 데이터베이스 라이브러리 사용).
   - 사용자에게 성공 페이지로 리디렉션하거나 성공 메시지를 표시합니다.

3. **비밀번호 변경 페이지 만들기:**
   - 사용자가 비밀번호를 변경할 수 있는 새 페이지를 만듭니다.
   - 로그인한 사용자만 액세스할 수 있도록 인증 확인을 통해 이 페이지에 접근 가능하도록합니다.
   - 사용자의 현재 비밀번호, 새 비밀번호 및 비밀번호 확인을 수집하는 양식을 디자인합니다.
   - 비밀번호 변경 양식을 위한 클라이언트 측 유효성 검사를 구현합니다.
   - 비밀번호 변경 요청을 처리하는 API 경로 또는 엔드포인트를 생성합니다.
   - API 경로에서 사용자의 현재 비밀번호를 확인하고 새 비밀번호로 업데이트합니다 (비밀번호를 해싱하여).
   - 사용자에게 성공 페이지로 리디렉션하거나 비밀번호를 성공적으로 변경한 경우 성공 메시지를 표시합니다.

이러한 작업에 대한 자세한 정보와 지침을 위해 사용 중인 라이브러리 및 서비스의 문서를 참조하세요. 이러한 도전 과제를 해결하면 인증 시스템을 구축하고 OAuth 공급자와 작업하는 데 유용한 실전 경험을 얻을 수 있습니다. 행운을 빕니다!

## Summary

- Authentication Session
- Database Adapter
- JSON WEB TOKEN(JWT)
- Middleware
- Next Auth

• NextAuth.js는 Next.js 애플리케이션을 위한 인기 있는 인증 라이브러리입니다. 이는 안전한 사용자 인증 및 권한 부여의 구현을 간단하게 합니다. 이는 다양한 인증 제공자(예: Google, Twitter, GitHub, 자격 증명 등)를 지원합니다.

• 사용자가 로그인하면 Next Auth는 해당 사용자를 위한 인증 세션을 생성합니다. 기본적으로 인증 세션은 JSON Web Tokens (JWTs)를 사용하여 나타냅니다. 그러나 세션은 데이터베이스에 저장될 수도 있습니다.

• 클라이언트에서 인증 세션에 액세스하려면 애플리케이션을 SessionProvider로 래핑해야 합니다. 이 컴포넌트는 React Context를 사용하여 인증 세션을 컴포넌트 트리 아래로 전달합니다. React Context는 클라이언트 컴포넌트에서만 사용 가능하기 때문에 SessionProvider를 클라이언트 컴포넌트로 래핑해야 합니다.

• 미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다. 이것은 사용자가 세션이 없는 상태에서 애플리케이션의 비공개 부분에 액세스하려고 할 때 사용자를 로그인 페이지로 리디렉션할 기회입니다. Next Auth는 이러한 목적을 위한 내장 미들웨어를 제공합니다.

• Next Auth는 사용자 및 세션 데이터를 저장하기 위한 다양한 데이터베이스 어댑터를 제공합니다.
