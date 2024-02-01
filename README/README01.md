# What is Next.js

- NEXTJS(Framework): Libraries + tools + conventions
- REACT(Library): Building interactive UIs

자 이번 시간에는 Next.js가 무엇인지 간단하게 살펴보겠습니다. Next.js는 빠르고 검색 엔진 친화적인 애플리케이션을 구축할 때 사용할 수 있는 위한 매우 강력한 프레임워크입니다. 이 프레임워크는 React 위에 구축되어 있기때문에, React에서 사용하던 것을 모두 그대로 사용할 수 있다는 장점이 있습니다. 그러나 Next.js는 웹 개발을 한 단계 더 나아가게 하는 데, React는 사용자 인터페이스(UI)를 만들기 위한 라이브러리에 불과하지만, Next.js는 포괄적인 프레임워크입니다. 여기서 프레임워크란 개발에 필요한 라이브러리, 도구 및 코드 컨벤션 등이 최적화된 형태로 정의되어 애플리케이션 개발을 간소화해주는, 일종의 도구 종합 세트입니다. 예를 들어, Next.js에는 자체 라우팅 라이브러리가 포함되어 있어 기존의 React에서 사용하던 React Router와 같은 별도의 라이브러리를 사용할 필요가 없습니다. 또한 핵심 도구를 간단하게 살펴 보자면, 

- Compiler: Transform & Minify JS Code (코드를 변환하고, 경량화 및 압축 해주는 역할을 하고)
- CLI: Build & start apps (소프트웨어 개발 및 배포 프로세스에 사용하는 도구)
- Node.js Runtime: Execute JS Code

여기서 Node.js 런타임이 정확히 무엇인지 궁금할 수 있는데, 조금 더 알아보자면 JavaScript 코드를 실행할 수 있는 방법은 크게 두 가지가 존재하는데, 첫번째가 클라이언트에서 사용하는 웹 브라우저에 내장된 엔진이 있고, 두번째가 JavaScript 언어로 서버를 만들 때 사용하는 Node.js Runtime이 있습니다. 그럼 여기서 런타임은 JavaScript 코드를 실행할 수 있는 프로그램을 가리키는 용어이고, Next.js는 웹 브라우저의 엔진과, Node.js 런타임 둘 다 제공하기 때문에, 풀 스택 개발이 가능하고, 이는 프론트엔드 및 백엔드 코드를 동일한 Next.js 프로젝트 내에서 작성할 수 있음을 의미합니다.

<!-- 웹 브라우저 내에서 클라이언트 측 또는 서버 내에서 Node.js 런타임을 사용하여 JavaScript 코드를 실행할 수 있는 두 가지 주요 방법이 있습니다.
Node.js 런타임은 JavaScript 코드를 실행할 수 있는 프로그램을 가리키는 용어입니다. Next.js는 Node.js 런타임을 함께 제공하며, 이를 통해 멋진 기능을 활용할 수 있습니다. 먼저, 풀 스택 개발이 가능합니다. 이것은 프론트엔드 및 백엔드 코드를 동일한 Next.js 프로젝트 내에서 작성할 수 있음을 의미합니다. -->

- Web Browser: Frontend
- Node.js Runtime: Backend

그래서 프론트엔드와 관련된 동작은 Web Browser Runtime을 사용하고, 백엔드와 관련된 동작은 Node.js Runtime을 사용합니다.

렌더링은 크게 세 가지 방식으로 구성되는 데 첫번째는 프론트엔드 코드를 번들로 묶여서 클라이언트로 전송되어 웹 브라우저에서 실행되는 (CSR) 방식도 있고, 요청 시점에 서버에서 모든 것들을 완성해 한 번에 렌더링하는 방식은 (SSR)도 있고, 그리고 마지막으로, 요청이 발생되기 이전인 빌드 시점에 미리 렌더링을 해두고, 요청이 들어왔을 때 바로 보내주는 (SSG) 방식이 있습니다.

Next.js는 다음 세가지 렌더링 방식을 모두 제공하고, 기본렌더링 방식은 SSR이고, 내부적으로 판단해 빌드 시점에 사전 렌더링 하는 SSG 방식을 혼합해 사용하기 때문에, 검색 엔진 친화적이면서, 엄청나게 빠른 속도로 렌더링 할 수 있는 앱을 구축할 수 있도록 도와주는 프레임워크입니다.

반면에 React를 사용해서 애플리케이션을 빌드할 때 별도의 백엔드 프로젝트를 유지해야하고, 물론 Next.js 또한 상황에 따라 별도의 서버를 구축해야하지만 이 내용은 수업 범위 벗어나기 때문에 다루지 않겠습니다.

그래서 요약하자면 Next.js는 CSR, SSR, SSG 렌더링의 장점을 통합적으로 사용해 앱을 구현할 수 있게 해주는 프레임워크입니다.

첫번째 수업은 간단한 소개 수업이기 때문에, 각각의 상세한 렌더링 방식 특징과, 언제, 어떤 경우에 어떤 렌더링을 사용해야하지는 직접 코드를 구현하면서 알아보겠습니다. 다음 수업에서 뵙겠습니다. 감사합니다.

--

이 Node.js 런타임은 또한 컴포넌트를 서버에서 렌더링하고 그 내용을 클라이언트로 전송할 수 있게 해주는데, 이 기술을 서버 사이드 렌더링 또는 SSR이라고 하며, 이는 애플리케이션을 더 빠르고 검색 엔진 친화적으로 만들 수 있다는 장점이 있습니다.

끝으로, Next.js를 사용하면 정적 데이터가 있는 특정 페이지와 컴포넌트를 사전에 렌더링할 수 있습니다. 애플리케이션을 빌드할 때 한 번 렌더링하고 필요할 때마다 제공하는 방식으로 동작하는 데, 일반적으로 렌더링은 요청이 발생했을 때 시작되는 데, 이는 요청이 발생되기 이전 빌드 시점에 미리 렌더링을 해두고, 요청이 들어왔을 때 바로 보내주는 방식으로, 이러한 정적 사이트 생성 또는 SSG(Static Site Generate)라고 하는 데, 이는 앱을 매우 빠르게 만들 수 있습니다. 요약하면, Next.js는 빠르고 검색 엔진 친화적인 애플리케이션을 만들기 위한 프레임워크입니다.

- (A framework for building fast & search-engine friendly applications)

### Setting Up the Development Environment

본격적으로 Next.js 개발에 들어가기에 앞서 개발 환경 설정을 먼저 해보겠습니다.

- VScode: https://code.visualstudio.com/
- nodejs: https://nodejs.org/en (Next.js를 실행하기 위해서는 16.8 이상의 NEode.js 버전이 컴퓨터에 설치되어 있어야합니다.)
- nextjs: https://nextjs.org/

- Visual Studio Code

Next.js 개발에 유용하게 사용할 수 있는 확장프로그램 몇 개를 설치하겠습니다.

- ES7+ React/Redux/React-Native (단축 키워드로 빠르게 React 컴포넌트 생성에 사용)
- JavaScript and TypeScript Nightly
- Tailwind CSS IntelliSense (이전에 Tailwind를 사용해보신 적이 없어도 괜찮습니다. 뒤에서 이어서 설명드리겠습니다.)

### Creating Your First Next.js Project

첫 번째 Next.js 프로젝트를 생성해 보겠습니다. 터미널 창을 열고 다음 명령을 실행하세요.

```
npx create-next-app my-next-app
```

<img src="https://cdn-images-1.medium.com/max/1200/1*ex22446LOcywYUPYV2ZxTg.png" />

최신 버전을 사용할 수 있지만, 이 강좌에서는 버전 13.4를 사용할 것이므로 동일한 버전을 사용하는 것을 권장합니다. 이렇게 명령을 실행하면 패키지 설치 여부를 묻는 메시지가 나타날 것입니다. 버전 13.4.13을 설치하려면 진행합니다.

그 다음 여러분의 프로젝트에 관한 몇 가지 질문이 나올 것입니다. 첫 번째 질문은 프로젝트 이름입니다. "my-next-app"과 같은 이름을 사용할 수 있습니다. 다음 질문은 TypeScript를 사용할지 여부에 대한 것인데, 기본값으로 "yes"를 선택해주시면 됩니다.

다음 질문은 eslint를 사용할지 여부에 관한 것입니다. 이것은 코드 분석 도구로, 문법 오류나 포맷 등 일반적인 오류를 찾는 데 사용됩니다. 기본값으로 "yes"를 선택합니다.

다음 질문은 Tailwind CSS를 사용할지 여부입니다. 여기서도 "yes"를 선택합니다.

다음 질문은 "source" 디렉토리를 사용할지 여부입니다. 많은 Next.js 프로젝트에서는 "source" 디렉토리를 사용하지 않는데, 여기서는 "no"를 선택합니다.

다음 질문은 "new app router"를 사용할지 여부입니다. 이 강좌에서는 "new app router"를 사용할 것이므로 "yes"를 선택합니다.

마지막 질문은 "default import aliases"를 사용자 정의할지 여부입니다. 여기서는 "no"를 선택합니다.

이제 모든 의존성을 설치할 것이며, React, React DOM, Next.js, TypeScript 등이 포함됩니다. 모든 의존성이 설치되면 프로젝트 폴더로 이동하여 다음 명령을 실행하세요.

```
cd my-next-app
npm run dev
```

이렇게 하면 개발 서버가 포트 3000에서 실행됩니다. 브라우저에서 해당 링크를 열어보면 첫 번째 Next.js 프로젝트가 실행 중임을 확인할 수 있습니다.

### Project Structure

이번 강의에서는 앞서 생성한 프로젝트를 구성하는 주요 파일과 폴더에 대해 알아보겠습니다. Next.js는 React와 다르게 프레임워크이기 때문에, 폴더명, 파일명 등을 프레임워크에서 명시한 규칙에 따라 작성해야합니다.

우선 프로젝트 최상단에는 "app" 폴더가 있습니다. 이를 "app router"라고 칭합니다. 이것은 라우팅 시스템의 컨테이너 역할을 한다고 표현하는 데, 이는 Next.js에서는 라우터가 파일 시스템을 기반으로 하기때문에 React에서 React Router를 설치해서 라우터를 구성해 컴포넌트와 맵핑하는 방식 대신에, 간단히 Next.js에서 명시한 방식으로 폴더를 생성하고, 약속된 파일명을 사용하면, 해당 파일에 정의한 컴포넌트가 내부적으로 알아서 맵핑되어 라우터가 구성됩니다. 이에 대해서는 다음 수업에서 자세하게 다루겠습니다. 다만 여기서 꼭 기억해야 할 점은 Next.js는 app router 방식으로 라우터가 구성되고, app 이라는 폴더는 프로젝트의 최상된에 위치한다는 점입니다.

"app" 폴더 내에는 여러 파일이 있습니다. "favorite icon"이 있고, "globals.css" 파일, "layout.tsx" 파일이 있습니다. 간단하게 레이아웃 파일을 살펴보자면 기본적인 React 컴포넌트로서 HTML과 body 요소를 반환하는 역할을 하고, 이는 페이지의 공통 레이아웃을 나타냅니다. body 요소 내부에는 동적으로 페이지를 교체하는 "children"이 있습니다. 사용자가 애플리케이션에서 어디에 있는지에 따라 페이지가 런타임에서 동적으로 교체됩니다.

이 폴더에는 "page.tsx" 파일도 있습니다. 이 파일은 홈 페이지를 나타냅니다. 이 데모에서는 여기에 있는 모든 내용을 삭제하고 간단한 마크업으로 대체하겠습니다. main 요소를 반환하고, 그 안에 H1 요소를 추가하여 "Hello, World"라고 표시하겠습니다.

```tsx
// app/page.tsx

export default function Home() {
  return (
    <main>
      <h1>Hello, World</h1>
    </main>
  );
}
```

브라우저로 돌아가서 여기에는 "Fast Refresh"기능이 실행됩니다. TypeScript 또는 CSS 파일을 변경할 때마다 변경 사항이 즉시 반영됩니다. 여기에는 스타일링 문제가 있습니다. body 요소에 그라데이션 배경이 적용되어 이상한 스타일이 나타납니다. "globals.css" 파일로 이동하여 body 요소에 적용된 스타일을 확인합니다. 배경 속성을 제거하면 스타일 문제가 해결됩니다. 또한 내용이 화면 가장자리에 너무 가깝지 않도록 padding을 추가하겠습니다.

```css
body {
  padding: 1rem;
}
```

이제 "app" 폴더에 대한 작업이 완료되었습니다.

이 프로젝트에서 "app" 폴더 다음에는 "public" 폴더가 있습니다. 여기에는 이미지와 같은 정적 에셋을 넣을 수 있는 곳입니다. 현재는 두 개의 SVG 파일이 있습니다. 하나는 "Next"이고, 다른 하나는 "Vercel"입니다. "Vercel"은 Next.js를 만든 회사입니다.

프로젝트 루트에는 여러 구성 파일이 있습니다. eslint, next, postcss, tailwind, typescript 등의 구성 파일이 있습니다. 대부분의 경우 이러한 구성 파일을 직접 수정할 필요는 없지만 나중에 상황이 변경되면 다시 방문하여 수정할 수 있습니다.

### Routing and Navigation

1. app/users 폴더 생성
2. app/users/page.tsx 파일 생성

(라우팅과 네비게이션)

이전 수업에서 소개한대로, Next.js의 라우팅은 파일 시스템을 기반으로 합니다. 이 파일 시스템을 기반으로 하면서, Next.js에서 App Router를 사용하기 위해 지켜야 할 규칙을 제공합니다.

만약 localhost:3000/users에 해당하는 라우터를 만들고자 한다면, 먼저 users 폴더를 만들어서 라우터와 일치시켜야 합니다. 그런 다음 해당 폴더를 대표하는 컴포넌트를 생성해야 하는데, 이때 Next.js 엔진은 해당 폴더에서 "page"라는 이름의 파일을 찾고, 이 파일에서 기본으로 렌더링할 컴포넌트를 찾습니다.

그리고 localhost:3000/users에 요청을 보내면, 페이지 파일에서 default로 내보낸 컴포넌트를 읽어와 렌더링합니다. 페이지 파일의 확장자는 JS, JSX, TSX 또는 TypeScript가 될 수 있으며, 이 강의에서는 TypeScript를 사용하므로 TSX를 사용하겠습니다.

이제 이 시나리오를 직접 코드로 옮겨 구현해보겠습니다.
먼저 app router 혹은 폴더 자식요소로써, users 폴더를 생성하겠습니다. 이후 users 폴더를 대표해서 렌더링되는 page.tsx 파일을 생성하겠습니다. 이후 앞서 다운로드한 확장 프로그램에서 제공해주는 기능을 통해 rafce + tab을 누름으로써 React Arrow Function Component 뼈대를 빠르게 완성하겠습니다. 그리고 함수명은 기본적으로 파일명으로 생성해줍니다.

<!-- 이제 페이지 파일 내에서 사용자가 "/users" 위치에 있을 때 렌더링될 React 컴포넌트를 내보내야 합니다. 이전에 VS Code에서 유용한 확장 프로그램을 설치했으므로 이 확장 프로그램을 사용하여 React 컴포넌트를 생성할 수 있습니다. 다음 단축키를 사용하여 React Arrow Function Component를 내보내겠습니다. -->

```tsx
rafce;
```

```tsx
// app/users/page.tsx
const UsersPage = () => {
  return <div>UsersPage</div>;
};

export default UsersPage;
```

이렇게 생성된 컴포넌트 이름을 "UsersPage"와 같이 의미 있는 이름으로 변경하겠습니다. 중요한 건 default 키워드이지 컴포넌트 이름이 아니기 때문에, 컴포넌트 이름을 의미론적으로 와닿고 가독성이 좋은 이름으로
수정하겠습니다. 이후 기본 div 태그를 통해 리턴 html을 작성하겠습니다.

다음으로 브라우저로 돌아가 "/user"로 이동하면 UsersPage 컴포넌트가 리턴하는 HTML이 정상적으로 렌더링 되는 것을 확인할 수 있습니다.

<!-- 이 이름은 라우팅과 관련하여 중요하지 않으며 코드를 더 잘 구성하기 위한 것입니다.

다음으로 브라우저로 돌아가 "/users"로 이동하여 새로 만든 "UsersPage"를 확인할 수 있습니다. 이렇게 하면 새로운 페이지가 표시됩니다. -->

이 라우팅 시스템에 대해 알아야 할 중요한 점 중 하나는 이 폴더에 다른 파일을 추가하면 해당 파일에는 접근할 수 없다는 것입니다. 예를 들어 "test.css"와 같은 파일을 이 폴더에 추가하면 "/users/test.css"로 접근할 수 없습니다. 이것이 이전 Pages 라우터와 다른 점입니다. Pages 라우터에서는 이러한 폴더에 파일을 추가하면 해당 파일이 공개적으로 접근 가능했지만, Next.js의 새로운 라우터에서는 그렇지 않습니다.

이제 이 파일을 삭제하겠습니다.

또한 중첩된 라우트를 생성할 수도 있습니다. 예를 들어 "users" 폴더 안에 "new"라는 새 폴더를 만들고 그 안에 "page.tsx"라는 페이지 파일을 추가하면 중첩된 라우트가 만들어집니다. 이 "new" 페이지도 브라우저에서 "/users/new"로 접근할 수 있습니다.

```tsx
// app/users/new/page.tsx

const NewUserPage = () => {
  return <div>NewUserPage</div>;
};

export default NewUserPage;
```

다음으로 네비게이션에 대해 이야기하겠습니다. 이전 홈 페이지에서는 일반 앵커(a)태그를 사용하여 "/users"로 이동하는 링크를 만들었습니다. 그러나 이러한 방식으로 네비게이션을 구현하면 문제가 있습니다. 브라우저의 네트워크 탭을 열어보면 사용자가 "users"로 이동할 때 서버에 대한 여러 요청이 다시 보내지는 것을 볼 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*7ifQtGsyWrWugII1H0dAXg.png" />

```tsx
// app/page.tsx

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <a href="/users">Users</a>
    </main>
  );
}
```

이것은 최적의 네비게이션 방식이 아닙니다. 실제 애플리케이션에서는 네비게이션 바나 사이드 패널과 같은 반복적인 부분을 다시 로드하지 않고 콘텐츠 영역만 교체하는 방식으로 성능 최적화를 구현합니다. 이를 위해 Next.js에서 제공하는 "Link" 컴포넌트를 사용할 수 있습니다. Link 컴포넌트를 사용하면 클라이언트 측 네비게이션을 수행하며 페이지를 빠르게 전환할 수 있습니다. 이것이 바로 클라이언트 측 네비게이션입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*rAXhmlZQDy8LkAhzGsRo_g.png" />

```tsx
// app/page.tsx

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
    </main>
  );
}
```

더 자세한 내용은 나중에 수업에서 다룰 예정입니다. 지금은 네비게이션의 기본 개요만 제공한 것입니다.

### Client and Server Components

이번 시간에는 클라이언트 컴포넌트와 서버 컴포넌트에 대해서 학습해보겠습니다.

Next.js에는 컴포넌트를 렌더링하고 HTML 마크업을 생성할 수 있는 두 가지 환경이 존재합니다. 첫 번째 환경은 클라이언트 내 존재하는 웹 브라우저가 있고, 다른 하나는 서버 측에서 사용하는 Node.js 런타임이 있습니다. 클라이언트 혹은 웹 브라우저에서 컴포넌트를 렌더링하는 것은 React 애플리케이션의 작동 방식과 유사한데, 이 기술을 클라이언트 렌더링 또는 줄여서 CSR (Client-Side Rendering)라고 표현합니다. 그리고 Node.js 런타임과 같이 서버 측에서 렌더링하는 경우에는 서버 사이드 렌더링 또는 줄여서 SSR (Server-Side Rendering)이라고 표현합니다.

그렇다면 이제 이 두 방식에는 어떤 차이가 있는지 살펴보겠습니다.

클라이언트 사이드 렌더링은 우선적으로 모든 컴포넌트를 번들링해서 클라이언트로 전송해야합니다. 그리고 이 말은 애플리케이션의 사이즈가 커짐에 따라 번들 사이즈가 커진다는 것을 의미하는데, 번들 사이즈가 커지면 클라이언트에서는 이러한 컴포넌트를 로드하기 위해 더 많은 메모리를 사용합니다, 그래서 이 접근 방식은 리소스 집약적이다라고 표현합니다(다른 말로는 많은 컴퓨터 자원이 사용됨을 의미합니다).

또 다른 문제는 번들링된 코드가 웹 브라우저에서 실행되어야 컨텐츠가 나타나는 데, 검색 엔진 봇이 웹 사이트를 스캔하는 시점에는 어떠한 내용도 표시되지 않기 때문에, 검색 엔진 최적화가 어렵다는 문제가 존재합니다. 그리고 마지막으로 API키 같은 민감한 데이터가 클라이언트에 노출될 위험이 있습니다.

물론 단점만 존재하는 것은 아닙니다. 장점은 초기 로딩 속도가 빠르고, 사용자와 클릭 등의 상호작용이 많은 경우 매끄럽게 사용할 수 있다는 점입니다. 여기서 주의해야 할 점은, 클라이언트 사이드 렌더링이 초기 로딩 속도가 빠르다는 것이지, 렌더링이 빠르다는 것으로 이해해서는 안된다는 점입니다.

Client-Side Rendering

- Large Bundles
- Resource Intensive
- No SEO
- Less secure

반면에 서버 사이드 렌더링을 사용하는 경우에는 클라이언트 사이드 렌더링에서 발생한 문제를 대부분 해결할 수 있습니다. 첫번째는 서버에 요청을 보냈을 때, 필요한 컴포넌트만 클라이언트로 전송함으로써 작은 번들 사이즈를 유지할 수 있고, 두번째는 서버가 대부분의 렌더링을 처리하기 때문에, 클라이언트에서 필요로하는 리소스의 양을 줄일 수 있고, 세번째는 서버에서 렌더리을 처리하고 실제 컨텐츠를 클라이언트로 전송하기 때문에, 검색 엔진 최적화를 구현할 수 있고, 마지막으로, API키와 같은 민감한 데이터를 서버에 유지함으로써 보안성을 높일 수 있습니다.

Server-side Rendering

- Smaller bundles
- Resource efficient
- SEO
- More secure

물론 서버 사이드 렌더링에도 단점이 존재합니다.
서버 사이드 렌더링은 전체 렌더링을 서버에서 담당하기 때문에, 클릭, 마우스 등의 브라우저 이벤트를 추적할 수 없고, 브라우저 API에 접근할 수 없기 때문에, localStorage와 같은 임시 저장소를 사용할 수 없고, 리엑트에서 사용하던 useState 혹은 useEffect 등과 같은 기능을 사용할 수 없습니다.

Server Components cannot

- Listen to browser events
- Access browser APIs
- Maintain state
- Use effects

따라서 실제 애플리케이션에서는 클라이언트 사이드 렌더링의 장점을 살리고 동시에 서버 사이드 렌더링의 장점을 살리기 위해 두 가지를 섞어서 사용합니다.

Next.js는 두 렌더링 방식 모두 제공하지만, 기본으로 제공하는 렌더링 방식은 서버 사이드 렌더링 방식입니다. 그리고 앞서 말한 클라이언트 사이드 렌더링 방식의 장점을 활용하고 싶은 경우 필요에 따라 클라이언트 사이드 렌더링 방식으로 컴포넌트를 정의할 수 있습니다.

예를 들어, 상품 목록을 보여주는 페이지를 만드는 상황을 생각해보겠습니다. 상품 목록 페이지는 크게 네비게이션바를 뜻하는 Navbar, 측면 네비게이션 바를 뜻하는 Sidebar, 상품 목록을 뜻하는 ProductList, 페이지 전환을 담당하는 Pagination, 페이지 상세 정보를 명시하는 Footer 컴포넌트로 구성됩니다.

React 애플리케이션에서는 이 모든 컴포넌트를 번들로 패킹징하고 클라이인트로 전송하는 방식으로 동작합니다. 그러나 Next.js에서는 모든 이러한 컴포넌트를 서버에 유지함으로써 클라인트로 전달하는 번들 크기를 최소화할 수 있습니다. 다만 제품 목록을 뜻하는 ProductList 컴포넌트에 클릭한 상품을 장바구니에 추가하는 버튼이 존재하는 데, 이 버튼은 브라우저 API의 클릭 이벤트와 임시 저장소를 사용해야하기 때문에, 클라이언트 사이드 렌더링 방식으로 동작하는 컴포넌트로 전환해야합니다.

하지만 ProductCard 내부 코드를 보면, button을 제외한 모든 코드는 서버 사이드 렌더링 방식으로 렌더링되는데 전혀 문제가 없기 때문에, 카트에 제품을 담는 기능을 담당하는 버튼만 별도의 AddToCart 컴포넌트로 만들어 클라이언트 사이드 렌더링 방식으로 동작하게 구현하면됩니다. 이렇게 되면 Next.js 내부 로직에 의해서 ProductList를 제외한 모든 컴포넌트는 서버에서 유지되어 서버 사이드 렌더링 방식으로 렌더링되고, AddToCard 컴포넌트만 클라이언트 사이드 렌더링 방식으로 렌더링되게 됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*KtQkO5cvg9yA87c_ISJicw.png" />

<img src="https://cdn-images-1.medium.com/max/1200/1*NI_LbZOwuFD82i5zp82P1g.png" />

<img src="https://cdn-images-1.medium.com/max/1200/1*iqSdMPcxtYWSPfW94qOnGA.png" />

그러면 구현에 앞서 간단하게 서버 사이드 렌더링으로 구현된 컴포넌트를 살펴보겠습니다. 앞서 저희가 홈페이지 혹은 "/" url을 담당하는 page.tsx는 "Hello World", "/users" 페이지로 이동하는 사용자 링크를 리턴하는 컴포넌트가 정의되어있습니다. Next.js는 기본값으로 서버 사이드 렌더링을 사용하기 때문에, 네트워크 탭에서 결과를 확인해보면 검색 엔진 봇이 탐색할 때 보는 사이트와, 실제 렌더링된 사이트가 정확히 같음을 확인할 수 있습니다.

반면에, 클라이언트 사이드 렌더링을 사용하는 경우, 이는 일반적인 리엑트 어플리케이션이 작동하는 방식과 동일하며 검색 엔진 봇은 탐색시 빈 페이지를 보게 됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*CLfvFguYpvq1i8tOuSlb4g.png" />

그러면 이제 이어서 앞서 소개드린 ProductCart 컴포넌트와 AddToCart 컴포넌트를 생성해, 클라이언트 사이드 렌더링으로 전환하는 방법에 대해서 알아보겠습니다.

우선 "components"라는 새 폴더를 만듭니다. 이 폴더는 페이지 파일(page.tsx)이 존재하지않으며, 외부에서 해당 폴더에 접근할 수 없기 때문에 내부적으로는 프로젝트 파일과 공존할 수 있습니다. 따라서 components 폴더에 들어가서, "ProductCard.tsx"라는 새 파일을 추가해보겠습니다. 여기에 기본적인 리엑트 컴포넌트를 생성해보겠습니다. rafce

```tsx
// app/components/ProductCart.tsx
const ProductCard = () => {
  return (
    <div>
      <button onClick={() => console.log("Click")}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
```

```tsx
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
```

```tsx
"use client";
// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
```

앞서 서버 사이드 렌더링으로 렌더링 되는 컴포넌트는 상호 작용성을 가질 수 없으며, click, change 브라우저 이벤트를 처리할 수 없다고 말씀 드렸습니다. 그렇다면 이를 검증하기 위해, click 이벤트를 추가하고, 홈페이지의 page.tsx 파일에 정의된 컴포넌트에 ProductCard 컴포넌트를 추가해보겠습니다. 이제 다시 브라우저로 돌아가면 오류가 발생하는 것을 확인할 수 있습니다. 클라이언트 컴포넌트 속성인 이벤트 핸들러를 서버 컴포넌트에 전달할 수 없다는 오류가 출력됩니다.

이렇게 상호 작용 및 이벤트 처리가 필요한 경우, 서버 사이드 렌더링 방식으로 렌더링되는 컴포넌트를 클라이언트 사이드 렌더링 방식으로 렌더링 할 수 있는 방법이 필요합니다. 이를 구현하기 위해서는 하나의 지시문만 있으면 됩니다. 이 지시문은 "use client"라고 해서, 파일 최상단에 "use client" 지시문을 입력하면, 내부적으로 Next.js 컴파일러는 해당 지시문이 명시된 컴포넌트를 렌더링 시점에 JavaScript 번들에 포함해 클라이언트로 전달하는 역할을 해줍니다.

```tsx
// app/components/ProductCart.tsx
"use client";

const AddToCart = () => {
  return (
    <div>
      <button onClick={() => console.log("Click")}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
```

그리고 여기에는 앞서 소개한 것 처럼, 가능한 서버에서 컴포넌트를 렌더링하고, 정말 필요한 경우에만 클라이언트로 컴포넌트로 사용하는 게 좋다고 말씀드렸습니다. 여기에 "ProductCard" 컴포넌트에 복잡한 마크업이 들어갈 수 있기 떄문에, 모든 마크업은 서버에서 렌더링하고, 버트만 따로 빼서 클라이언트 사이드 렌더링 방식으로 렌더링되도록 코드를 리팩토링 할 수 있습니다.이를 위해 "components" 폴더에 "AddToCart.tsx"라는 파일을 생성하고, "ProductCard" 컴포넌트에서 추출한 button을 부분을 리턴하는 컴포넌트를 생성하고, 파일 최상단에 "use client" 지시문을 추가해줍니다. 이후 "ProductCard" 컴포넌트에 "AddToCard" 컴포넌트를 추가해줍니다.

이렇게 되면 서버에서 가능한 많은 컴포넌트를 렌더링하고, 딱 필요한 경우에 클라이언트 사이드 렌더링 방식으로 렌더링 함으로써, 두 장점을 모두 살린 최적화된 어플리케이션을 구현할 수 있습니다. 서버를 다시 실행하고 이제 다시 홈 페이지로 돌아가 새로고침을보면 오류가 표시되지 않는 것을 확인할 수 있습니다.

```tsx
// app/components/AddToCart.tsx
"use client";

const AddToCart = () => {
  return (
    <div>
      <button onClick={() => console.log("Click")}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
```

```tsx
// app/components/ProductCard.tsx
import AddToCart from "./AddToCart";

const ProductCard = () => {
  return (
    <div>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
```

요약하자면, 서버 사이드 렌더링의 장점인 번들링 최소화, 빠른 초기 로딩, 그리고 검색 엔진 최적화 기능을 사용하면서, 동시에 클라이언트 사이드 렌더링의 장점인 사용자와 브라우저의 상호작용 기능을 사용함으로써, 최적화된 애플리케이션을 구현할 수 있습니다.

요약하면, 서버 측 렌더링(SSR)은 검색 엔진 최적화(SEO) 및 빠른 초기 로딩을 제공하는 데 도움이 되며, 클라이언트 측 렌더링(CSR)은 클릭 에빈트 등의 인터액티브 기능을 제공하는 데 유용합니다. 실제 애플리케이션에서는 서버 컴포넌트와 클라이언트 컴포넌트를 혼합하여 사용하여 최적의 결과를 얻을 수 있습니다.

### Data Fetching

이번 수업에서는 데이터 패칭에 대해서 알아보겠습니다. 데이터 패칭은 데이터를 수집하거나 가져오는 과정을 의미합니다. 렌더링 방식이 두 가지 존재하는 것 처럼, 데이터 패칭 또한 클라이언트 사이드, 서버 사이드 두 가지 방식이 존재합니다.

클라이언트 사이드에서 데이터를 가져오기 위해서는 일반적으로 useState 등의 상태 값을 관리하는 리엑트 훅을 실행시켜 상태 변수를 선언하고, useEffect 훅을 통해 백엔드에서 데이터를 패칭해 상태 변수에 할당하는 방식으로 동작합니다. 물론 react-query 등을 사용하면 useState, useEffect를 직접 작성하지 않고 보다 더 수월하게 데이터를 패칭할 수 있지만, 어떤 방법을 사용하던 클라이언트단에서 데이터를 패칭하는 경우 문제가 발생합니다.

첫번째 문제는 클라이언트로 전송되는 번들 사이즈가 커진다는 점이고, 두번째는 번들 사이즈가 커지는 만큼 더 많은 컴퓨팅 리소스를 필요로 하게 됩니다. 또한 컨텐츠나 데이터가 검색 엔진에 표시되지 않으며, API 키 노출과 같은 보안의 측면에서 문제가 발생할 수 있습니다. 그리고 마지막으로 이 접근 방식은 데이터를 패칭할 때 백엔드로 추가적인 요청이 발생한다는 문제가 있습니다. 조금 더 자세히 말씀드리자면, React 애플리케이션이 로드되면 브라우저가 백엔드에서 HTML, CSS, 그리고 JavaScript 파일을 요청하고, 응답으로 받은 파일을 다운로드 한 다음, 코드를 실행시키면서 데이터 패칭에 해당되는 코드가 있는 경우 서버로 다시 추가적인 요청을 보냅니다. 이러한 이유 때문에 백엔드로의 추가적인 요청이 발생하는 문제점이 존재합니다 (이 경우를 보다 전문적인 용어로는 백엔드로 라운드 트립이 발생한다고 표현할 수 있습니다.)

번들이 계속 커지게 되고 클라이언트로 더 많은 컴포넌트를 보내야 하며, 리소스를 많이 소비하게 됩니다. 또한 컨텐츠나 데이터가 검색 엔진에 표시되지 않고 이 접근 방식은 보안에 취약합니다. API 키와 같은 민감한 데이터가 클라이언트에 노출될 수 있습니다. 또 하나의 문제는 이 접근 방식에서는 항상 백엔드로 추가 요청이 전송된다는 것입니다. React 애플리케이션이 로드되면 브라우저가 백엔드에서 HTML 템플릿과 CSS 및 JavaScript 파일을 다운로드한 다음 데이터를 백엔드에서 가져오기 위한 추가 요청을 보냅니다. 항상 백엔드로 추가 라운드 트립이 발생하는 것이죠.

<img src="https://cdn-images-1.medium.com/max/1200/1*3JQRSaj989KRxx5vB8G_Ow.png" />

반면에 서버 컴포넌트에서 데이터를 패칭한다면 클라이언트 단에서 데이터를 패치할 때 발생한 문제를 해결할 수 있습니다.

예제로 JSONPlaceholder API를 사용해서, 서버 컴포넌트에서 데이터 패칭을 구현하고, 어떻게 문제가 해결되는지 살펴보겠습니다. JSONplaceholder는 더미 데이터를 얻기 위한 가짜 API입니다. 해당 API는 테스트 용도로 사용할 수 있는 배포된 엔드포인트를 제공하고, 이번 수업에서는 해당 서비스에서 제공하는 엔드포인트 중 id, 이름, 주소, 이메일 등의 속성으로 구성된 객체를 반환하는 엔드포인트를 사용해 사용자 목록을 가져와보겠습니다.

이제 프로젝트로 돌아가 app 폴더로 이동하고, 해당 폴더의 자식 요소 위치한 users 폴더를 열고, page.tsx 파일로 이동해보겠습니다. users 페이지는 "use client" 등의 지시문이 없기 때문에 서버 사이드 렌더링 방식으로 렌더링되며, HTTP 요청을 보낼 때 사용하는 fetch 함수를 통해 서버로 데이터 패칭을 해보겠습니다. fetch 함수의 첫번째 인자에 URL을 전달하고, 이것은 프로미스를 리턴하기 때문에, 응답을 얻으려면 데이터가 도착할 때까지 기다려야합니다. 또한 가독성과 편의성을 높이기 위해 함수를 async, await 형태로 수정해보겠습니다.

이와 같은 접근 방식을 사용하면 useState를 사용해 별도의 상태 변수를 정의 할 필요가 없으며, useEffect 훅을 사용하지 않아도 괜찮습니다. 이는 제로 디펜더시 (zero dependencies), 다른 말로는 제로 종속성으로써, 데이터를 패칭할 때 실행되는 코드의 번들 사이즈를 획기적으로 줄일 수 있습니다.

이제 데이터를 가져올 때 fetch를 호출하고, 모든 작업이 서버에서 수행됩니다. 여기서 fetch를 호출하고 데이터를 읽어오려면 fetch 함수가 리턴하는 객체중에 json 함수를 호출해야합니다. 그리고 이 json 함수 또한 프로미스를 리턴하기 때문에 await 키워드를 함수 실행 앞에 명시하고, 데이터를 받아와 users 변수에 담겠습니다.

이후 받아온 사용자 데이터를 HTML 태그와 맵핑해보겠습니다. 우선 마크업에 대해 div 태그를 어떠한 의미는 없지만 구조적인 틀에 사용할 수 있는 Fragrment 태그로 수정하고, 여기에 사용자라고 표시된 h1 태그를 추가하고, 순서 없는 목록을 추가해 map 메소드를 사용해 사용자 데이터를 맵핑해보겠습니다.

```tsx
// app/users/page.tsx

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

이후 user 인자값에 마우스를 가져다대면 any를 제외하고는 아무것도 보이지 않는 것을 확인할 수 있습니다. 이는 컴파일러가 user 인자에 담긴 객체의 유형을 모르기 때문입니다. 이제 Typescript을 기능을 활용해 코드의 가독성과 이해도를 높혀보겠습니다. 우선 User Interface를 정의하고, 여기서 각 사용자가 숫자 형식의 id, 문자열 형식의 이름을 가지도록 인터페이스를 구성해보겠습니다. 모든 속성을 나열할 수 있지만, 이번 수업에서는 두 가지 속성만 간단하게 나열해보겠습니다. 그리고 users 변수 앞에 User 인터페이스 속성의 형태로 구성된 객체가 여러개 담긴 배열이 해당 변수에 담긴다는 의미로 인터페이스 이름인 User를 먼저 작성하고 뒤에는 배열이라는 의미로 배열을 작성하겠습니다.

이렇게 하면 users 변수에 담긴 배열을 map 메소드를 통해 순회할 때, 콜백함수의 인자값을 정의된 user 인자에 마우스를 올려보면 사용자 객체의 속성을 확인할 수 있습니다. 이것이 바로 Typescript를 사용하는 이점 중 하나입니다.
여기에서 각 사용자를 목록 항목으로 매핑합니다. 먼저 사용자 ID로 키를 지정하고, 컨텐츠에는 사용자 이름을 할당해서 사용자 페이지 구성을 마무리하겠습니다.

이제 브라우저로 돌아가 사용자 페이지로 이동해, 네트워크 탭을 열어서 서버에서 전달 받은 문서를 살펴보면, 모든 사용자가 성공적으로 렌더링 된 것을 확인할 수 있습니다. 이는 서버에서 렌더링이 수행되기 때문에, 최초에 빈 문서를 전달하는 클라이언트 컴포넌트와 달리, 완성된 데이터가 맵핑된 페이지를 확인할 수 있습니다. 결과적으로 클라이언테 측에서 서버로의 별도의 라운드트립이 발생하지 않고, 검색 엔진 최적화 또한 구현됨으로써, 앞서 클라이언트 컴포넌트를 사용했을 때 발생하는 문제를 깔끔하게 해결할 수 있습니다. Next.js를 사용할 때는 데이터 패칭과 관련된 동작은 가능한 서버 컴포넌트에서 진행하는 것이 좋습니다. 다음 수업에서는 캐싱에 대해서 알아보겠습니다. 감사합니다.

```tsx
// app/users/page.tsx

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

<img src="https://cdn-images-1.medium.com/max/1200/1*hh4JotG4suvpr27BO0CgrA.png" />

---

**Summary**

서버 컴포넌트에서는 기본적으로 fetch 함수를 사용하여 데이터를 가져올 수 있습니다. 이러한 접근 방식을 사용하면 상태 변수를 사용할 필요가 없으며 useEffect 훅을 사용할 필요가 없습니다. 제로 종속성(zero dependencies)으로 데이터를 가져올 수 있으며 번들 크기도 줄어듭니다. 모든 렌더링이 서버에서 처리되므로 리소스 사용이 적고, 컨텐츠 또는 데이터가 검색 엔진에 표시됩니다. 또한 API 키와 같은 민감한 데이터를 서버에 보관할 수 있습니다. 이러한 서버 컴포넌트에서 데이터를 가져오는 접근 방식은 클라이언트 컴포넌트에서 데이터를 가져올 때의 문제를 모두 해결할 수 있습니다.

서버 컴포넌트에서 데이터를 가져올 때, 코드가 더 간단해지고 추가적인 상태 및 효과 훅이 필요하지 않습니다. 번들 크기가 작아집니다. 모든 렌더링이 서버에서 처리되므로 컴포넌트는 클라이언트로 보내지 않고 서버에서 렌더링됩니다. 결과적으로 초기 로딩 속도가 빨라집니다. 또한 TypeScript와 함께 사용하면 코드 품질이 향상되고 오류가 빌드 시간에 캐치될 수 있습니다.

요약하면, 서버 컴포넌트에서 데이터를 가져올 때는 코드가 더 간결하고 빌드 크기가 작아지며 초기 로딩 속도가 개선됩니다. 따라서 데이터를 가져오는 경우 가능한 한 서버 컴포넌트에서 가져오는 것이 좋습니다.

### Caching

Caching: Storing data somewhere that is faster to access

Data Sources:

- Memory
- File System
- Network

이전 수업에서는 서버 컴포넌트에서 데이터 패칭을 구현하는게 어떤 이점이 있는지에대해서 살펴보았습니다.

이번에는 캐싱에 대해서 알아보겠습니다. 우선 캐싱의 의미를 먼저 짚고 넘어가겠습니다. 캐싱은, 간단하게 보자면, 찾고자 하는 데이터에 더 빠르게 접근할 수 있도록 데이터를 저장하는 행위를 의미합니다. 캐싱을 더 잘 이해하기 위해서는 데이터를 어디서 가져올 수 있는지에 대해 이해하는 것이 중요합니다. 데이터는 크게 메모리, 파일 시스템, 그리고 네트워크 이렇게 세 장소에서 데이터를 가져올 수 있습니다. 속도는 메모리, 파일 시스템, 네트워크 순으로 빠르게 데이터를 가져올 수 있습니다. 다시 말해서 메모리를 통해 데이터를 가져오는 것이 가자 빠르고, 네트워크를 통해 데이터를 가졍는 것이 가장 빠릅니다.

이러한 이유로 Next.js는 내장 데이터 캐싱를 제공합니다.즉, 데이터를 가져오기 위해 fetch 함수를 사용할 때마다 Next.js는 패치 결과를 파일 시스템 기반의 데이터 캐시에 내부로직에따라 저장합니다. 이로써 동일한 URL의 동일한 데이터를 필요로 하는 경우, Next.js는 네트워크를 거쳐 요청을 통해 데이터를 받는 대신에, 생성한 캐싱 파일을 확인하고, 만일 존재한다면, 빠르게 데이터를 가져올 수 있습니다. 물론 데이터 캐싱 동작에 대한 완전한 제어권은 개발자에게 있기때문에, 데이터가 자주 변경되는 경우에는 캐싱을 의도적으로 비활성화함으로서 최신의 데이터를 렌더링 할 수 있습니다.

그렇다면 실제로 캐싱이 어떻게 동작하는지 코드로 확인해보겠습니다. 앞서 users 라우터에 작성한 fetch 함수의 두 번 인자값에 캐싱 속성을 정의함으로써 캐싱 유무를 결정할 수 있습니다. 기본적으로 캐싱이 동작하고, 이번경우에는 캐싱을 비활성화하는 방법을 살펴보겠습니다. 캐싱을 비활성화할때는 옵션 객체를 정의하고, 해당 객체에 cache라는 키를 작성하고, 값으로는 "no-store"을 작성해줍니다. 이렇게되면 캐싱을 비활성화 할 수 있습니다. 이와 같은 속성은 데이터가 자주 변경되는 경우 유용하게 사용할 수 있습니다.

```tsx
// app/users/page.tsx

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

또 다른 옵션은 캐싱을 특정시간 만큼만 유지하고, 특정시간이 지나면 다시 요청을 보내는 방법입니다. 이 경우 앞서 작성한 "cache" 속성은 지우고, "next"라는 키 값을 작성하고, 해당 키의 값에 "revalidate: 10"을 작성하면, Next.js의 내부 로직에 의해, 실행시 백엔드에서 10초마다 최신의 데이터를 패칭합니다.

```tsx
// app/users/page.tsx

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

그래서 이번 시간에는 서버 컴포넌트에서 데이터를 캐싱하는 방법에 대해서 알아보았습니다. 그리고 마무리하기에 앞서 꼭 말씀드리고 싶은 점은 Next.js의 캐싱 동작은 fetch 함수에서만 구현된다는 점입니다. 따라서 axios 외부 라이브러리를 사용하는 경우에는 데이터 캐싱을 활용할 수 없다는 점을 명심해야합니다.

다음 시간에는 정적인 렌더링과 동적인 렌더링에 대해 알아보겠습니다. 감사합니다.

### Static and Dynamic Rendering

Static Rendering: Render at build time

Next.js는 성능 최적화를 목적으로 정적 렌더링 또는 정적 사이트 생성 기능을 제공합니다. 정적 렌더링은 정적 데이터 혹은 변하지 않는 데이터가 있는 페이지 혹은 컴포넌트를 프로덕션 빌드 시점에 한 번 렌더링하고, 이후 해당 페이지 혹은 컴포넌트가 필요한 경우 Next.js가 해당 컴포넌트를 재렌더링하는 대신 파일 시스템을 기반으로 한 캐싱을 통해 해당 페이지나 컴포넌트를 가져올 수 있는 렌더링 방식을 의미합니다. 그리고 여기서 말하는 프로덕션 빌드는 개발자가 완성한 애플리케이션을 최적화하고 성능을 향상시켜 최종 사용자에게 제공하는 단계입니다.

이와 대조적으로 동적 렌더링은 빌드 시간이 아닌, 요청 시간에 발생합니다. 이를 실제로 살펴보겠습니다.

다시 사용자 페이지로 돌아가 사용자 목록 위에 타임스탬프를 추가해보겠습니다. 여기서 타임스탬프는 특정 이벤트가 발생한 시간과 날짜를 표시하는 정보입니다. 이를 사용하기 위해 우선 p 태그를 만들고 date라는 날짜 객체 인스턴스를 생성해, "toLocalTimeString" 메소드를 호출해 해당 페이지가 렌더링되는 시간을 확인해보겠습니다.

```tsx
// app/users/page.tsx

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

이제 브라우저로 돌아가 새로고침을 누를 때마다, 타임스탬프가 변경되는 되는 것을 확인할 수 있습니다. 이는 현재 프로덕션 모드가 아닌, 개발 모드에 있기 때문에 별도의 정적 렌더링 없이, 새로운 요청을 보내는 방식인 동적 렌더링 방식으로 동작하는 것을 확인할 수 있습니다. 하지만 프로덕션 모드로 애플리케이션을 빌드하면 새로고침을 눌러도 타임스탬프가 변경되지 않음을 확인할 수 있습니다. 조금 더 자세히 말씀드리자면, Next.js는 이 페이지를 정적 페이지로 처리하고, fetch 함수를 사용할 때마다 응답으로 받은 데이터를 캐싱으로 처리하기 때문에, 이 데이터는 정적 또는 변경되지 않는 데이터로 취급되어, 정적 렌더링 방식으로 페이지를 렌더링하게 됩니다.

그러나 만약 해당 해당 페이지의 컴포넌트에서 캐싱을 비활성화하면 Next.js는 이 페이지의 데이터가 변경되는 것으로 판단하게 정적 렌더링 대신에, 동적 렌더링 방식으로 동작하게됩니다.

이제 이를 테스트하고자 프로덕션 모드로 빌드해 보겠습니다. 기존에 개발 모드로 실행했던 프로세스를 중지하고, 프로덕션 빌드를 생성 명령어인 "npm run build"를 터미널에 입력하겠습니다. 이를 실행하면 현재 생성한 애플리케이션을 프로덕션 모드로 빌드할 때 생성되는 모든 경로를 화인할 수 있습니다.

현재 캐싱을 허용하고 있기 때문에 빌드 결과를 살펴보면, 홈페이지 경로, favicon, 사용자 페이지 경로 등의 경로가 출력되고, 각 경로앞에 있는 원 모양의 기호를 볼 수 있는데, 스크롤을 내려보면, STATIC이라는 글자를 찾을 수 있습니다. 이는 정적 렌더링이 된 요소를 표시할 때 사용하는 기호이고, 이러한 기호가 붙은 페이지는 Next.js 내부 로직에 의해 자동으로 정적 렌더링 됩니다.

이제 빌드된 애플리케이션을 "npm run start" 명령어를 통해 실행시켜보겠습니다. 이후 다시 브라우저로 돌아가 새로고침을 눌러도, 타임스탬프가 변경되지 않는 것을 확인할 수 있습니다. 그 이유는 해당 페이지가 빌드 시간에 정적으로 렌더링되었기 때문입니다.

```tsx
// app/users/page.tsx

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store";
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

이제 다시 코드로 돌아와 데이터 패칭 부분에 cache를 no-store로 설정해 캐싱이 되지 않도록 수정해보겠습니다. 이후 다시 "npm run build"를 실행하면, 사용자 경로 앞에 있는 아이콘이 원 대신에 람다표시로 변경된 것을 확인할 수 있습니다. 여기서 람다는 정적 렌더링이 아닌, 서버에서 일일이 렌더링을 진행하는 동적 렌더링으로 동작하고 있음을 의미합니다. 이제 이를 테스트 해보기 위해 "npm run start" 명령어를 실행하고, 브라우저로 돌아가서 결과를 확인해보면, 새로고침을 누를 때마다 타임 스탬프가 변경되는 것을 확인할 수 있습니다.

이번 수업에서 학습한 내용을 요약하자면, next.js에서 렌더링을 클라이언트 혹은 서버에서 발생할 수 있고, 서버에서 렌더링이 발생하는 경우 빌드 시점에 렌더링하는, 정적 렌더링 방식있고, 요청 시간에 렌더링하는 동적 렌더링 방식이 있음을 학습했습니다. 해당 수업에서는 다루지 않겠지만 개인적으로 사용하고 있는 API의 데이터가 변경되었을 때 정적 렌더링 방식으로 렌더링된 컴포넌트의 데이터를 가장 최신의 데이터로 유지하는 방법에 대해 고민해보시면 좋을 것 같습니다. 이제 다음 시간에는 Next.js에서 스타일링을 하는 방법에 대해서 알아보겠습니다. 감사합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*rS5IlVBLAQ-zfaaMnj5CAw.png" />

---

JSONPlaceholder API의 데이터가 변경되었을 때 정적 렌더링된 페이지를 최신으로 유지하는 방법은 다음과 같습니다.

1. **Incremental Static Regeneration (ISR) 사용**: ISR은 Next.js에서 제공하는 기능으로, 일정 시간마다 페이지를 다시 빌드하고 캐시된 정적 페이지를 업데이트합니다. 데이터가 변경될 때 ISR을 실행하여 페이지를 갱신하도록 설정할 수 있습니다. 이렇게 하면 정적 페이지를 주기적으로 업데이트할 수 있습니다.

   ```tsx
   import { GetStaticProps } from "next";

   export const getStaticProps: GetStaticProps = async () => {
     const res = await fetch("https://jsonplaceholder.typicode.com/users");
     const users: User[] = await res.json();

     return {
       props: {
         users,
       },
       revalidate: 60, // 60초마다 페이지 업데이트
     };
   };
   ```

   위 코드에서 `revalidate`을 사용하여 페이지를 주기적으로 갱신하도록 설정했습니다.

2. **Webhooks 및 데이터 동기화**: JSONPlaceholder API의 데이터가 변경될 때마다 웹훅(Webhook)을 사용하여 애플리케이션에 알림을 보내고, 새로운 데이터를 가져와서 렌더링하도록 처리할 수 있습니다. 이를 통해 데이터 변경 시 실시간으로 반영할 수 있습니다.

```tsx
// app/users/page.tsx
"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const UsersPage = ({ initialUsers }: { initialUsers: User[] }) => {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    // 웹훅 엔드포인트 URL (백엔드에서 설정한 웹훅 URL)
    const webhookUrl = "https://your-backend-webhook-url";

    // 웹훅을 트리거하는 함수 (백엔드에서 웹훅을 트리거하는 역할)
    const triggerWebhook = async () => {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          // 필요한 인증 또는 데이터를 여기에 추가
        });

        if (response.ok) {
          // 웹훅이 성공적으로 트리거되었을 때 데이터 업데이트
          const updatedResponse = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const updatedUsers: User[] = await updatedResponse.json();
          setUsers(updatedUsers);
        } else {
          console.error("웹훅 트리거에 실패했습니다.");
        }
      } catch (error) {
        console.error("웹훅 트리거 오류:", error);
      }
    };

    // 페이지 진입 시 웹훅 트리거 함수 호출 (페이지 로딩시 최신 데이터로 업데이트)
    triggerWebhook();

    // 주기적으로 웹훅을 트리거하여 데이터 업데이트 (예: 1분마다)
    const intervalId = setInterval(triggerWebhook, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
```

3. **외부 데이터 소스의 푸시 알림 활용**: JSONPlaceholder API가 데이터가 변경되면 푸시 알림을 제공하는 경우, 이를 활용하여 데이터 변경을 감지하고 새로운 데이터를 가져와서 페이지를 업데이트할 수 있습니다.

4. **자동 빌드 및 배포 스크립트**: 데이터가 변경될 때마다 자동으로 Next.js 애플리케이션을 빌드하고 배포하는 스크립트를 구성할 수 있습니다. 이렇게 하면 데이터가 변경될 때마다 새로운 정적 페이지가 생성됩니다.

어떤 방법을 선택할지는 데이터의 변경 빈도와 응용 프로그램의 요구 사항에 따라 다를 수 있습니다. ISR은 비교적 간단하게 설정할 수 있는 방법 중 하나이며, 데이터 변경을 빠르게 반영할 수 있는 방법 중 하나입니다.

## Summary

- 클라이언트 컴포넌트(Client Components)
- 클라이언트 사이드 렌더링 (CSR)
- 다이나믹 렌더링(Dynamic Rendering)
- Node.js 런타임
- 서버 컴포넌트(Server Components)
- 서버 사이드 렌더링 (SSR)
- 정적 렌더링(Static Rendering)
- 정적 사이트 생성 (SSG)

• Next.js는 빠르고 검색 엔진 친화적인 애플리케이션을 개발하는 프레임워크입니다.
• JavaScript 코드를 변환하고 최소화하는 컴파일러, 애플리케이션을 빌드하고 시작하는 명령 줄 인터페이스 (CLI) 및 백엔드 코드를 실행하는 Node.js 런타임이 포함되어 있어 풀 스택 개발이 가능합니다.
• Next.js를 사용하면 컴포넌트를 서버에서 렌더링하고 그 내용을 클라이언트로 반환할 수 있습니다. 이 기술을 서버 사이드 렌더링 (SSR)이라고 하며 애플리케이션을 검색 엔진 친화적으로 만듭니다.
• 성능을 더 향상시키기 위해 빌드 중에 정적 데이터를 가진 페이지와 컴포넌트를 사전 렌더링하고 필요할 때 제공할 수 있습니다. 이 기술을 정적 사이트 생성 (SSG)이라고 합니다.
• Next.js 13의 새로운 앱 라우터는 라우트를 생성하는 것이 매우 쉽습니다. 디렉토리를 생성하여 라우트 세그먼트를 정의할 수 있습니다. 라우트를 공개하려면 해당 디렉토리에 페이지 파일 (page.js, page.jsx 또는 page.tsx)을 추가합니다.

• Next.js는 클라이언트 사이드 탐색을 가능하게 하는 Link 컴포넌트를 제공합니다. 이것은 사용자가 페이지 간을 이동할 때 전체 페이지를 다시로드하지 않고 새로운 콘텐츠를 빠르고 부드럽게 로드할 수 있음을 의미합니다.
• Next.js 13은 React 18에서 도입된 클라이언트 및 서버 컴포넌트를 지원합니다. 클라이언트 컴포넌트는 웹 브라우저 내에서 클라이언트에서 렌더링됩니다. 이 기술을 클라이언트 사이드 렌더링 (CSR)이라고 하며 기존의 React 앱에서 작동하는 방식입니다. 서버 컴포넌트는 Node.js 런타임 내에서 서버에서 렌더링됩니다. 이 기술을 서버 사이드 렌더링 (SSR)이라고 합니다.
• 서버 컴포넌트는 번들 크기 감소, 성능 향상, 검색 엔진 가시성 증가 및 보안 향상으로 이어집니다. 그러나 브라우저 이벤트 처리, 브라우저 API 액세스 또는 상태 또는 효과 훅 사용은 불가능합니다. 이러한 기능은 클라이언트 컴포넌트에서만 사용할 수 있으므로 필요한 경우에만 사용해야 합니다.
• /app 디렉토리의 모든 컴포넌트 및 페이지는 기본적으로 서버 컴포넌트입니다. 컴포넌트를 클라이언트 컴포넌트로 만들려면 컴포넌트 파일 상단에 'use client' 지시문을 추가합니다.
• 서버 컴포넌트는 데이터를 가져오는 데 매우 효과적입니다. 추가적인 서버 트립이 필요하지 않아 애플리케이션을 더 빠르고 검색 엔진 친화적으로 만듭니다.
• Next.js는 fetch() 함수를 자동 캐싱으로 향상시킵니다. 이로 인해 성능이 향상되고 동일한 데이터를 두 번 검색해야 할 필요가 줄어듭니다.
• Next.js에서 컴포넌트는 빌드 시간 (정적 렌더링) 또는 요청 시간 (다이나믹 렌더링)에 렌더링될 수 있습니다. 정적 데이터를 가진 페이지나 컴포넌트가 있는 경우 빌드 시간에 사전 렌더링하여 애플리케이션의 성능을 향상시킬 수 있습니다.
