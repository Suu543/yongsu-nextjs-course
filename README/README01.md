# What is Next.js

- NEXTJS(Framework): Libraries + tools + conventions
- REACT(Library): Building interactive UIs

Next.js가 무엇인지 궁금하신 분도 계실 것입니다. 그래서 지금부터 Next.js가 뭔지 알아보고, 그것을 왜 알아야 할지 알려드릴게요. Next.js는 빠르고 검색 엔진에 친화적인 애플리케이션을 만들기 위한 매우 강력한 프레임워크입니다. 이 프레임워크는 React 위에 구축되어 있어서 여러분이 React에 대해 배운 모든 것이 여전히 유효합니다. 그러나 Next.js는 웹 개발을 한 단계 더 나아가게 합니다. React는 사용자 인터페이스를 만들기 위한 라이브러리에 불과하지만, Next.js는 포괄적인 프레임워크입니다. 프레임워크란 라이브러리, 도구 및 규칙의 모음으로, 애플리케이션 개발을 간소화합니다. 예를 들어, Next.js에는 자체 라우팅 라이브러리가 포함되어 있어 React Router와 같은 별도의 라이브러리를 사용할 필요가 없습니다. 또한, 컴파일러, 명령 줄 인터페이스, Node.js 런타임과 같은 도구도 함께 제공됩니다.

- Compiler: Transform & Minify JS Code
- CLI: Build & start apps
- Node.js Runtime: Execute JS Code

여기서 Node.js 런타임이 정확히 무엇인지 궁금할 수 있습니다. 웹 브라우저 내에서 클라이언트 측 또는 서버 내에서 Node.js 런타임을 사용하여 JavaScript 코드를 실행할 수 있는 두 가지 주요 방법이 있습니다.
Node.js 런타임은 JavaScript 코드를 실행할 수 있는 프로그램을 가리키는 용어입니다. Next.js는 Node.js 런타임을 함께 제공하며, 이를 통해 멋진 기능을 활용할 수 있습니다. 먼저, 풀 스택 개발이 가능합니다. 이것은 프론트엔드 및 백엔드 코드를 동일한 Next.js 프로젝트 내에서 작성할 수 있음을 의미합니다.

- Web Browser: Frontend
- Node.js Runtime: Backend

백엔드 코드는 Node.js 런타임 내에서 실행되고, 프론트엔드 코드는 번들로 묶여서 클라이언트로 전송되어 웹 브라우저에서 실행됩니다. 반면에 React로 애플리케이션을 빌드할 때는 별도의 백엔드 프로젝트를 유지하고 다른 프로그래밍 언어를 사용해야 할 수 있습니다. 이 Node.js 런타임은 또한 컴포넌트를 서버에서 렌더링하고 그 내용을 클라이언트로 전송할 수 있게 해줍니다. 이 기술을 서버 사이드 렌더링 또는 SSR이라고 하며, 애플리케이션을 더 빠르고 검색 엔진 친화적으로 만들 수 있습니다.

끝으로, Next.js를 사용하면 정적 데이터가 있는 특정 페이지와 컴포넌트를 사전 렌더링할 수 있습니다. 애플리케이션을 빌드할 때 한 번 렌더링하고 필요할 때마다 제공합니다. 이 기술을 정적 사이트 생성 또는 SSG(Static Site Generation)라고 하며, 애플리케이션을 매우 빠르게 만들 수 있습니다.

요약하면, Next.js는 빠르고 검색 엔진 친화적인 애플리케이션을 만들기 위한 프레임워크입니다.

- (A framework for building fast & search-engine friendly applications)

### Setting Up the Development Environment

- VScode: https://code.visualstudio.com/
- nodejs: https://nodejs.org/en
- nextjs: https://nextjs.org/

- Visual Studio Code
- ES7+ React/Redux/React-Native
- JavaScript and TypeScript Nightly
- Tailwind CSS IntelliSense

### Creating Your First Next.js Project

첫 번째 Next.js 프로젝트를 생성해 보겠습니다. 터미널 창을 열고 다음 명령을 실행하세요.

```
npx create-next-app my-next-app
```

<img src="https://cdn-images-1.medium.com/max/1200/1*ex22446LOcywYUPYV2ZxTg.png" />

최신 버전을 사용할 수 있지만, 이 강좌에서는 버전 13.4를 사용할 것이므로 동일한 버전을 사용하는 것을 권장합니다. 이렇게 명령을 실행하면 패키지 설치 여부를 묻는 메시지가 나타날 것입니다. 버전 13.4.13을 설치하려면 진행합니다.

그 다음 여러분의 프로젝트에 관한 몇 가지 질문이 나올 것입니다. 첫 번째 질문은 프로젝트 이름입니다. "my-next-app"과 같은 이름을 사용할 수 있습니다. 다음 질문은 TypeScript를 사용할지 여부에 대한 것인데, 기본값으로 "yes"를 선택해주시면 됩니다.

다음 질문은 eslint를 사용할지 여부에 관한 것입니다. 이것은 코드 분석 도구로, 문법 오류나 형식 관련 문제와 같은 일반적인 오류를 찾는 데 사용됩니다. 기본값으로 "yes"를 선택합니다.

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

이 프로젝트에서 주요 파일과 폴더에 대해 이야기해 봅시다. 맨 위에는 "app" 폴더가 있습니다. 이것은 "app router"라고도 불립니다. 이것은 라우팅 시스템의 컨테이너 역할을 합니다. Next.js에서는 라우터가 파일 시스템을 기반으로 하므로 React Router와 달리 라우트를 구성하고 컴포넌트와 매핑할 필요가 없습니다. 간단히 파일과 폴더를 만들어서 라우트를 표현할 수 있습니다. 이에 대해서는 다음 수업에서 자세히 다룰 것입니다.

"app" 폴더 내에는 여러 파일이 있습니다. "favorite icon"이 있고, "globals.css" 파일, "layout.tsx" 파일이 있습니다. 레이아웃 파일은 기본적인 React 컴포넌트로서 HTML과 body 요소를 반환합니다. 이는 페이지의 공통 레이아웃을 나타냅니다. body 요소 내부에는 동적으로 페이지를 교체하는 "children"이 있습니다. 사용자가 애플리케이션에서 어디에 있는지에 따라 페이지가 런타임에서 동적으로 교체됩니다.

이 폴더에는 "page.tsx" 파일도 있습니다. 이 파일은 홈 페이지를 나타냅니다. 이 데모에서는 여기에 있는 모든 내용을 삭제하고 간단한 마크업으로 대체하겠습니다. main 요소를 반환하고, 그 안에 H1 요소를 추가하여 "Hello, World"라고 표시하겠습니다.

```tsx
// app/page.tsx

import Image from "next/image";

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

이전에 언급했듯이 Next.js에서의 라우팅은 파일 시스템을 기반으로 합니다. 따라서 여기 앱 폴더에서 "users"라는 새 폴더를 만들 수 있습니다. 이것을 공개적으로 접근 가능하게 하려면 이 폴더에 페이지 파일을 추가해야 합니다. 페이지 파일의 확장자는 JS, JSX, TSX 또는 TypeScript가 될 수 있으며, 이 강의에서는 TypeScript를 사용하므로 TSX로 진행하겠습니다. 파일 이름은 "page"로 지어야 합니다. 왜냐하면 Next.js가 이러한 규칙을 찾기 때문입니다. 따라서 Next.js의 라우팅 시스템은 설정이 아닌 규칙을 기반으로 작동합니다.

이제 페이지 파일 내에서 사용자가 "/users" 위치에 있을 때 렌더링될 React 컴포넌트를 내보내야 합니다. 이전에 VS Code에서 유용한 확장 프로그램을 설치했으므로 이 확장 프로그램을 사용하여 React 컴포넌트를 생성할 수 있습니다. 다음 단축키를 사용하여 React Arrow Function Component를 내보내겠습니다.

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

이렇게 생성된 컴포넌트 이름을 "UsersPage"와 같이 의미 있는 이름으로 변경하겠습니다. 이 이름은 라우팅과 관련하여 중요하지 않으며 코드를 더 잘 구성하기 위한 것입니다.

다음으로 브라우저로 돌아가 "/users"로 이동하여 새로 만든 "UsersPage"를 확인할 수 있습니다. 이렇게 하면 새로운 페이지가 표시됩니다.

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

다음으로 네비게이션에 대해 이야기하겠습니다. 이전 홈 페이지에서는 일반 앵커를 사용하여 "/users"로 이동하는 링크를 만들었습니다. 그러나 이러한 방식으로 네비게이션을 구현하면 문제가 있습니다. 브라우저의 네트워크 탭을 열어보면 사용자가 "users"로 이동할 때 서버에 대한 여러 요청이 다시 보내지는 것을 볼 수 있습니다.

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

이것은 최적의 네비게이션 방식이 아닙니다. 실제 애플리케이션에서는 네비게이션 바나 사이드 패널과 같은 반복적인 부분을 다시 로드하지 않고 콘텐츠 영역만 교체하고 싶습니다. 이를 위해 Next.js에서 제공하는 "Link" 컴포넌트를 사용합니다. Link 컴포넌트를 사용하면 클라이언트 측 네비게이션을 수행하며 페이지를 빠르게 전환할 수 있습니다. 이것이 바로 클라이언트 측 네비게이션입니다.

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

우리는 컴포넌트를 렌더링하고 HTML 마크업을 생성할 수 있는 두 가지 환경을 가지고 있습니다. 하나는 클라이언트 내에서 웹 브라우저에서, 다른 하나는 서버 내에서 Node.js 런타임 내에서 컴포넌트를 렌더링할 수 있습니다. 클라이언트에서 컴포넌트를 렌더링하는 것은 React 애플리케이션의 작동 방식과 유사합니다. 이 기술을 클라이언트 렌더링 또는 CSR (Client-Side Rendering)라고 합니다. 반면에 서버 측 렌더링 또는 SSR (Server-Side Rendering)은 컴포넌트를 서버에서 렌더링합니다. 그렇다면 두 가지 방식의 차이는 무엇일까요?

클라이언트 측 렌더링(CSR)에서는 모든 컴포넌트를 번들링하고 클라이언트로 보내야 합니다. 이것은 애플리케이션이 성장함에 따라 번들 크기가 커진다는 것을 의미합니다. 번들이 커지면 클라이언트에서 이러한 컴포넌트를 로드하기 위해 더 많은 메모리가 필요하므로 이 접근 방식은 리소스 집약적입니다. 또 다른 문제는 검색 엔진 크롤러 봇 또는 검색 엔진 봇(Parts)이라고 불리는 웹 사이트를 둘러보고 인덱싱하는 기계가 JavaScript 코드를 실행할 수 없으므로 컨텐츠를 볼 수 없다는 것입니다. 따라서 이러한 봇들은 웹 브라우저처럼 컴포넌트를 렌더링할 수 없습니다. 마지막으로 컴포넌트나 그 종속성(예: API 키)과 같은 민감한 데이터가 클라이언트에 노출됩니다.

Client-Side Rendering

- Large Bundles
- Resource Intensive
- No SEO
- Less secure

반면에 서버 측 렌더링(SSR)에서는 이러한 문제를 모두 해결할 수 있습니다. 서버에서 필요한 컴포넌트만 클라이언트로 전송하고 번들을 불필요하게 크게 만들지 않습니다. 또한 서버가 대부분의 렌더링을 처리하기 때문에 클라이언트에서 필요한 리소스가 적습니다. 또한 서버에서 렌더링을 처리하고 실제 컨텐츠를 클라이언트로 보내므로 검색 엔진 크롤러 봇이 페이지를 볼 수 있고 색인화할 수 있습니다. 마지막으로 API 키와 같은 민감한 데이터를 서버에 유지할 수 있습니다.

Server-side Rendering

- Smaller bundles
- Resource efficient
- SEO
- More secure

그러나 서버 측 렌더링(SSR)의 단점은 인터액티브 기능을 잃게 된다는 것입니다. 서버 컴포넌트는 브라우저 이벤트(클릭, 변경, 제출 등)를 듣지 못하며 로컬 스토리지와 같은 브라우저 API에 접근할 수 없으며 상태를 유지하거나 효과를 사용할 수 없습니다. 따라서 실제 애플리케이션에서는 종종 서버 컴포넌트와 클라이언트 컴포넌트를 혼합하여 사용하며 클라이언트 컴포넌트는 절대적으로 필요할 때만 사용해야 합니다.

Server Components cannot

- Listen to browser events
- Access browser APIs
- Maintain state
- Use effects

예를 들어 상품 목록을 보여주는 페이지를 만들기 위해 여러 컴포넌트(네비게이션 바, 사이드바, 상품 목록, 상품 카드, 페이지네이션, 푸터 등)가 필요한 경우, 표준 React 애플리케이션에서는 모든 이러한 컴포넌트를 번들로 패키징하고 클라이언트로 보내야 합니다. 그러나 Next.js에서는 모든 이러한 컴포넌트를 서버에 유지하고 번들 크기를 최소화할 수 있습니다. 다만 장바구니에 상품을 추가하는 경우와 같이 클릭 이벤트를 처리해야 할 때에만 클라이언트 컴포넌트로 전환하면 됩니다. 클라이언트 컴포넌트를 사용하는 대신 이 컴포넌트를 서버에 유지하고 대부분의 렌더링을 서버에서 처리한 다음 실제 버튼만 클라이언트로 전달할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*KtQkO5cvg9yA87c_ISJicw.png" />

<img src="https://cdn-images-1.medium.com/max/1200/1*NI_LbZOwuFD82i5zp82P1g.png" />

<img src="https://cdn-images-1.medium.com/max/1200/1*iqSdMPcxtYWSPfW94qOnGA.png" />

첫 번째 요청을 확인해 보면 이것은 백엔드에서 얻은 HTML 문서입니다. 보세요, 여기에 내용이 있고 "안녕하세요, 세계!"와 사용자 링크가 있습니다. 이것은 검색 엔진 봇이 웹 사이트를 탐색할 때 보는 것과 정확히 동일합니다.

반면에, 클라이언트 측 렌더링을 사용하는 경우, 이것은 일반적인 리액트 애플리케이션의 작동 방식이며 검색 엔진 봇이 내용을 보지 못할 것입니다. 그들은 모든 구성 요소 및 내용이 클라이언트에서 렌더링되므로 빈 페이지를 보게 됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*CLfvFguYpvq1i8tOuSlb4g.png" />

프로젝트로 돌아가서 "app" 폴더 내의 모든 구성 요소는 기본적으로 서버 구성 요소입니다. 이전에 Next.js와 함께 작업한 적이 있다면 페이지 라우터가 서버 구성 요소를 지원하지 않는다는 것을 언급해야 합니다. 앞으로는 페이지 라우터를 사용하는 대신 새로운 "app" 라우터로 전환해야 합니다.

그럼 이제 "components"라는 새 폴더를 만들어 보겠습니다. 이 폴더는 페이지 파일이 있지 않으면 외부에서 접근할 수 없다고 이전에 언급한 바와 같이, 프로젝트 파일을 공존(co-locate)시킬 수 있다는 것을 의미합니다. 따라서 "components" 폴더에 들어가 "ProductCard.tsx"라는 새 파일을 추가해 보겠습니다. 여기에 기본적인 리액트 컴포넌트를 생성합니다.

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

이전에 서버 구성 요소는 상호 작용성을 가질 수 없으며 클라이언트 이벤트(Click, Change 등)를 처리할 수 없다고 말씀드렸습니다. 따라서 버튼을 추가하고 클릭 이벤트를 처리하려면 런타임 오류가 발생합니다. 이를 보여드리겠습니다. 오류 메시지를 출력하기 위해 기본적인 오류 함수를 전달하고 레이블을 "장바구니에 추가"로 설정해 보겠습니다. 이제 이 컴포넌트를 홈 페이지에 추가해 보겠습니다. 첫 번째 페이지 파일로 이동하고 새 "ProductCard" 컴포넌트를 추가합니다. 이제 다시 브라우저로 돌아가면 오류가 발생하는 것을 볼 수 있습니다. 클라이언트 컴포넌트 속성에 이벤트 핸들러를 전달할 수 없다는 오류가 나타납니다.

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

상호 작용성이 필요한 경우 전체 컴포넌트를 클라이언트 컴포넌트로 만드는 옵션이 있습니다. 이를 위해 맨 위에 "client" 지시문을 사용합니다. 큰 따옴표 안에 "use client"를 입력하면 됩니다. 이렇게하면 Next.js 컴파일러에게 이 파일 또는 컴포넌트를 JavaScript 번들에 포함하도록 지시합니다. 따라서 이 컴포넌트가 다른 컴포넌트에 의존하면 해당 컴포넌트도 자동으로 클라이언트 컴포넌트로 설정되고 JavaScript 번들에 포함됩니다.

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

그런데 여기에는 더 나은 방법이 있습니다. 가능한 한 많은 서버에서 컴포넌트를 렌더링하고 절대적으로 필요한 경우에만 클라이언트 컴포넌트를 사용하는 것이 좋습니다. 여기 "ProductCard"에 복잡한 마크업이 들어갈 수 있으므로 모든 마크업을 서버에서 렌더링하고 이 버튼만 클라이언트로 이동하려고 합니다. 이 버튼을 추출하고 별도의 컴포넌트 내부로 넣을 것입니다. 그럼 "AddToCart"라는 새 컴포넌트를 만들어 보겠습니다. "components" 폴더에 "AddToCart.tsx"라는 새 파일을 추가하겠습니다. 이전과 같이 기본 리액트 컴포넌트를 생성합니다. 맨 위에서 "client" 지시문을 사용하고 이 버튼을 새 컴포넌트로 이동시킵니다. 이제 클라이언트 컴포넌트를 사용하며 이것을 "ProductCard"에서 사용할 것입니다.

이렇게 하면 클라이언트 컴포넌트와 서버 컴포넌트를 혼합하여 사용할 수 있으며, 서버에서 렌더링할 때 클라이언트 컴포넌트가 삽입될 "홀"이나 "슬롯"이 있을 것입니다. 이 버튼을 클라이언트 컴포넌트로 사용하면 됩니다. 이제 다시 홈 페이지로 돌아가면 오류가 표시되지 않습니다. 이것이 클라이언트 및 서버 컴포넌트를 생성하고 사용하는 방법입니다.

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

요약하면, 서버 측 렌더링(SSR)은 검색 엔진 최적화(SEO) 및 빠른 초기 로딩을 제공하는 데 도움이 되며, 클라이언트 측 렌더링(CSR)은 인터액티브 기능을 제공하는 데 유용합니다. 실제 애플리케이션에서는 서버 컴포넌트와 클라이언트 컴포넌트를 혼합하여 사용하여 최적의 결과를 얻을 수 있습니다.

### Data Fetching

다음은 클라이언트와 서버에서 데이터를 가져오는 방법에 대한 설명입니다. 클라이언트에서 데이터를 가져오기 위해서는 일반적으로 상태 훅(state hook)을 사용하여 상태 변수를 선언하고, useEffect 훅을 사용하여 백엔드에서 데이터를 가져와 상태 변수에 넣습니다. 이전에 React 과정에서 react-query를 수동으로 상태 훅과 효과 훅을 사용하는 것보다 더 좋은 대안으로 언급했었는데요. 그러나 데이터를 클라이언트에서 가져오는 경우, 앞서 이야기한 모든 문제점이 존재합니다. 번들이 계속 커지게 되고 클라이언트로 더 많은 컴포넌트를 보내야 하며, 리소스를 많이 소비하게 됩니다. 또한 컨텐츠나 데이터가 검색 엔진에 표시되지 않고 이 접근 방식은 보안에 취약합니다. API 키와 같은 민감한 데이터가 클라이언트에 노출될 수 있습니다. 또 하나의 문제는 이 접근 방식에서는 항상 백엔드로 추가 요청이 전송된다는 것입니다. React 애플리케이션이 로드되면 브라우저가 백엔드에서 HTML 템플릿과 CSS 및 JavaScript 파일을 다운로드한 다음 데이터를 백엔드에서 가져오기 위한 추가 요청을 보냅니다. 항상 백엔드로 추가 라운드 트립이 발생하는 것이죠.

<img src="https://cdn-images-1.medium.com/max/1200/1*3JQRSaj989KRxx5vB8G_Ow.png" />

반면에 서버 컴포넌트에서 데이터를 가져온다면 모든 이러한 문제를 해결할 수 있습니다.

예제로 JSONPlaceholder를 사용하여 응용 프로그램에 몇 가지 더미 데이터를 가져올 것입니다. JSONPlaceholder가 익숙하지 않다면, 이것은 더미 데이터를 얻기 위한 가짜 API로, jsonplaceholder.typicode.com으로 이동하면 다양한 더미 데이터를 가져올 수 있는 여러 엔드포인트를 찾을 수 있습니다. 이번 수업에서는 응용 프로그램에 사용자 목록을 가져올 것입니다. 각 사용자 객체에는 ID, 이름, 사용자 이름 등과 같은 여러 속성이 있습니다.

이제 프로젝트로 돌아가 "app" 폴더로 이동하고 "users" 폴더를 열어서 이 페이지로 이동하겠습니다. 이것은 서버 구성 요소이며 서버 구성 요소에서는 일반적으로 알고 있을 fetch 함수를 사용할 수 있습니다. 이 함수는 브라우저에서 정의되며 HTTP 요청을 백엔드로 보낼 수 있습니다. 여기에 엔드포인트의 URL을 전달하고 이것은 프로미스(Promise)을 반환하므로 응답을 얻으려면 기다려야 합니다. 우리는 여기에서 async 함수를 사용해야 하기 때문에 async로 만들어주어야 합니다. 이러한 접근 방식을 사용하면 상태 변수를 사용할 필요가 없으며 useEffect 훅을 사용할 필요가 없습니다. 제로 종속성(zero dependencies)으로 데이터를 가져올 수 있으며 번들 크기도 줄어듭니다. 우리는 데이터를 가져 오려면 fetch를 호출하기만 하면 되며 이 모든 작업이 서버에서 수행됩니다. 우리는 응답을 받은 다음 response.json을 호출하고 이것도 리턴값으로 "Promise"를 반환하므로 데이터를 얻으려면 기다려야 합니다. 이 경우에는 사용자 목록이 됩니다. 그런 다음 이러한 사용자를 리액트 애플리케이션에서 렌더링하는 방법과 정확히 동일하게 목록 항목으로 매핑합니다. 우리의 마크업에 대해 이 div를 fragment로 바꾸어 보겠습니다. 여기에 사용자라고 표시된 H1을 추가합니다. 그런 다음 순서 없는 목록을 추가하고 여기에서 이 사용자들을 매핑합니다. 각 사용자를 가져옵니다.

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

이제 사용자를 입력하면 사용자를 마우스로 가리켜도 아무것도 보이지 않습니다. 컴파일러는 이 사용자 객체의 유형을 모르기 때문이며 이 상수 위로 마우스를 가져갈 경우이 상수의 유형은 "any"임을 나타냅니다. 이것은 무엇이든 될 수 있음을 의미합니다. 여기에서 TypeScript 마법을 사용하여 코드를 개선할 수 있습니다. 이 컴포넌트 외부에서 사용자 또는 타입을 정의하는 인터페이스 또는 유형을 정의합니다. 그리고 여기서 각 사용자가 숫자 형식인 ID 속성, 문자열 형식인 이름 등을 가진다고 말합니다. 여기에 정의된 속성을 모두 나열할 수 있지만 이번 수업에서는 그렇게 할 필요가 없습니다. 모든 것을 간단하게 유지하려고합니다. 이 인터페이스로 우리는 사용자 개체의 형태를 정의하고 있습니다. 이제 이 상수를 정의하는 위치에서 이것을 주석 처리하여 유형을 사용하고 있습니다. 이것은 사용자 배열 유형입니다.

이렇게 하면 사용자 객체의 속성을 볼 때 "user"라고 입력하면 사용자 개체의 속성을 볼 수 있습니다. 이것이 TypeScript를 사용하는 이점입니다. TypeScript를 사용하면 코딩할 때 모든 완료를 얻을 수 있으며 또한 오타와 같은 모든 유형의 오류를 실행하기 전에 빌드 시간에 캐치 할 수 있습니다. 이러한 사용자 객체에는이 사용자 객체의 모든 속성을 나열해야하는 불필요한 것은 아닙니다. 여기에서 각 사용자를 목록 항목으로 매핑합니다. 먼저 사용자 ID로 키를 지정하고 여기에서 사용자 이름을 렌더링합니다.

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

이 모든 작업을 수행해야합니다. 코드가 더 간단하고 state 및 useEffect 훅이 없습니다. 이 컴포넌트는 서버에 있으므로 번들도 더 작아질 것입니다. 이제 브라우저로 돌아가 사용자 페이지로 이동합니다. 여기가 사용자입니다. 이제 네트워크 탭을 열어 페이지를 새로 고칩니다. 백엔드에서 받은 문서를 살펴보십시오. 모든 사용자가 여기에 렌더링됩니다. 이는 렌더링이 서버에서 수행되기 때문입니다. 일반적인 리액트 응용 프로그램이나 클라이언트 측 렌더링을 사용하는 모든 곳에서 브라우저는 초기에 빈 문서를 가져온 다음 데이터를 검색하기 위해 백엔드를 호출한 다음 내용을 렌더링합니다. 항상 백엔드로 추가적인 왕복이 있으며 응용 프로그램은 검색 엔진 친화적이지 않습니다. 가능한 경우 데이터를 검색하려면 서버 구성 요소에서 검색해야합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*hh4JotG4suvpr27BO0CgrA.png" />

---

**Summary**

서버 컴포넌트에서는 기본적으로 fetch 함수를 사용하여 데이터를 가져올 수 있습니다. 이러한 접근 방식을 사용하면 상태 변수를 사용할 필요가 없으며 useEffect 훅을 사용할 필요가 없습니다. 제로 종속성(zero dependencies)으로 데이터를 가져올 수 있으며 번들 크기도 줄어듭니다. 모든 렌더링이 서버에서 처리되므로 리소스 사용이 적고, 컨텐츠 또는 데이터가 검색 엔진에 표시됩니다. 또한 API 키와 같은 민감한 데이터를 서버에 보관할 수 있습니다. 이러한 서버 컴포넌트에서 데이터를 가져오는 접근 방식은 클라이언트 컴포넌트에서 데이터를 가져올 때의 문제를 모두 해결할 수 있습니다.

서버 컴포넌트에서 데이터를 가져올 때, 코드가 더 간단해지고 추가적인 상태 및 효과 훅이 필요하지 않습니다. 번들 크기가 작아집니다. 모든 렌더링이 서버에서 처리되므로 컴포넌트는 클라이언트로 보내지 않고 서버에서 렌더링됩니다. 결과적으로 초기 로딩 속도가 빨라집니다. 또한 TypeScript와 함께 사용하면 코드 품질이 향상되고 오류가 빌드 시간에 캐치될 수 있습니다.

요약하면, 서버 컴포넌트에서 데이터를 가져올 때는 코드가 더 간결하고 빌드 크기가 작아지며 초기 로딩 속도가 개선됩니다. 따라서 데이터를 가져오는 경우 가능한 한 서버 컴포넌트에서 가져오는 것이 좋습니다.

### Caching

Caching: Storing data somewhere that is faster to access

서버 컴포넌트에서 데이터를 가져오는 것에는 추가 이점이 있으며 그 중 하나는 캐싱입니다. 그럼 캐싱이란 무엇일까요? 간단히 말하면 데이터를 더 빠르게 액세스할 수 있는 장소에 저장하는 개념입니다. 데이터를 가져올 수 있는 세 가지 장소가 있습니다. 메모리, 파일 시스템 또는 네트워크에서 데이터를 가져올 수 있습니다.

Data Sources:

- Memory
- File System
- Network

Memory ==> File System ==> Network 순서로 데이터를 가져오는 과정이 점차 느려집니다. 예를 들어 네트워크에서 데이터를 가져오는 것은 항상 파일 시스템에서 가져오는 것보다 느립니다. 이러한 이유로 Next.js는 내장 데이터 캐시를 제공합니다. 따라서 데이터를 가져오기 위해 fetch 함수를 사용할 때마다 Next.js는 결과를 파일 시스템 기반의 데이터 캐시에 자동으로 저장합니다.

이로써, 동일한 데이터를 다시 필요로 할 때, 동일한 URL을 다시 호출하는 경우 Next.js는 JSONPlaceholder를 가는 대신 데이터 캐시에서 데이터를 가져옵니다. 물론 데이터 캐싱 동작에 대한 완전한 제어권을 가지고 있으며, 데이터가 자주 변경되는 경우 캐싱을 비활성화하거나 캐시된 데이터를 일정 기간 동안 신선하게 유지할 수 있습니다.

이것은 어떻게 동작하는지 보여주겠습니다. fetch 함수를 호출할 때 두 번째 인수로 옵션 객체를 전달할 수 있습니다. 이 객체에서 cache를 no-store로 설정하여 캐싱을 비활성화할 수 있습니다. 이것은 데이터가 자주 변경되는 경우 유용하며 항상 사용자에게 신선한 데이터를 표시하려고 합니다.

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

또 다른 옵션은 데이터를 일정 기간 동안 신선하게 유지하는 것입니다. 캐시를 비활성화하는 대신 next를 객체로 설정합니다. 이 객체에서 Next.js에 특정한 구성 매개변수를 지정할 수 있습니다. 예를 들어 revalidate를 10과 같은 값으로 설정하면 Next.js는 백그라운드 작업을 실행하여 백엔드에서 매 10초마다 신선한 데이터를 가져옵니다.

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

이것이 Next.js에서 캐싱이 작동하는 방식입니다. 다만 알아두셔야 할 점은 이러한 캐싱 동작이 fetch 함수에서만 구현된다는 것입니다. 따라서 axios와 같은 서드파티 라이브러리를 사용하는 경우 데이터 캐시를 활용할 수 없다는 점입니다.

### Static and Dynamic Rendering

Static Rendering: Render at build time

Next.js에서는 또 다른 성능 최적화 기법인 정적 렌더링 또는 정적 사이트 생성이라는 개념이 있습니다. 정적 렌더링의 아이디어는 정적 데이터가 있는 페이지나 컴포넌트를 프로덕션 빌드 시 한 번 렌더링하고 다음에 해당 페이지나 컴포넌트가 필요할 때 Next.js가 다시 렌더링하는 대신 파일 시스템을 기반으로 한 캐시에서 해당 페이지나 컴포넌트의 내용을 가져올 수 있다는 것입니다. 이것이 정적 렌더링이라는 뜻이며 렌더링이 빌드 시간에 발생합니다. 이와 대비하여 동적 렌더링은 요청 시간에 발생합니다. 이를 실제로 살펴보겠습니다.

다시 사용자 페이지로 돌아가 사용자 목록 위에 타임스탬프를 추가해보겠습니다. 여기에는 P태그를 추가하고 렌더링할 내용을 설정합니다. 우선 새로운 데이터 객체를 만든 다음 `toLocaleTimeString`을 호출하여 이 페이지가 렌더링된 시간을 볼 수 있습니다.

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

이제 브라우저로 돌아가 몇 번 새로 고침해보세요. 타임스탬프가 변경되는 것을 볼 수 있습니다. 이것은 개발 모드에서만 발생하지만, 프로덕션을 위해 이 애플리케이션을 빌드하면 타임스탬프가 변경되지 않음을 알 수 있습니다. 왜냐하면 Next.js는 이 페이지를 정적 페이지로 처리하고, 여기에서 fetch 함수를 사용할 때마다 Next.js는 데이터를 캐시로 처리하기 때문입니다. 이 데이터를 정적 또는 변경되지 않는 데이터로 취급하므로 이 페이지를 빌드 시간에 정적으로 렌더링하기로 결정합니다.

그러나 캐싱을 비활성화하면 Next.js는 이 페이지의 데이터가 변경될 것으로 판단하므로 정적으로 렌더링하지 않고 요청 시간에 렌더링합니다. 이를 확인하기 위해 터미널로 돌아가 이 프로세스를 중지하고 다시 빌드해보겠습니다. 이제 이것을 프로덕션용으로 빌드하려면 npm run build를 실행합니다. 여기서 애플리케이션을 프로덕션용으로 빌드할 때 생성되는 모든 경로를 볼 수 있습니다. 이것은 루트 경로 또는 홈 페이지입니다. 파비콘에 대한 경로, 사용자 페이지에 대한 경로, 사용자/새 페이지에 대한 경로 등이 있습니다. 이제 각 경로 앞에 있는 아이콘을 살펴보십시오. 여기에서 우리는 원만 볼 수 있습니다. 여기서 원은 정적을 의미하므로 이러한 페이지는 자동으로 정적 HTML로 렌더링됩니다.

```bash
npm run build
```

이제 이 응용 프로그램을 프로덕션에서 시작하려면 npm start를 실행한 다음 브라우저로 돌아가 새로 고칩니다. 타임 스탬프가 변경되지 않습니다. 왜냐하면 이 페이지는 빌드 시간에 정적으로 렌더링되었기 때문입니다. 다시 이 페이지로 돌아가서 캐싱을 비활성화하고 이 응용 프로그램을 프로덕션용으로 다시 빌드합시다.

```bash
npm run start
```

두 번째 인수로 옵션 개체를 전달하고 여기에서 cache를 no-store로 설정합니다. 이제 터미널로 돌아가 이 프로세스를 중지하고 응용 프로그램을 다시 빌드해 보겠습니다.

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

이제 사용자 경로 앞에 있는 아이콘을 살펴보십시오. 원 대신 람다가 표시됩니다. 여기에서 람다는 서버에서 렌더링한다는 것을 의미합니다. 이제 응용 프로그램을 프로덕션에서 시작하려면 브라우저로 돌아가 새로 고칩니다. 매번 새로 고칠 때마다 타임 스탬프가 변경됩니다.

next.js에서 렌더링에 관해 배운 내용을 요약해 보겠습니다. 렌더링은 클라이언트 또는 서버에서 발생할 수 있으며, 서버에서 발생하는 경우 빌드 시간(정적 렌더링) 또는 요청 시간(동적 렌더링)에 발생할 수 있습니다.

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
