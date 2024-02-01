### Global Styles

이번 수업에서는 Global Styles에 대해 알아보겠습니다. 이전 수업에서 간단히 언급했듯이, Next.js에는 모든 컴포넌트에 공통으로 스타일을 적용할 수 있는 방법이 존재합니다. 이 또한 Next.js에서 규칙으로 명시한 page라는 파일명 규칙을 지키는 것 처럼, 공통 스타일에 사용할 수 있는 파일명 규칙이 존재합니다. 이 파일명은 globals.css로써, 최초 Next.js 명령어를 통해 프로젝트를 생성할 때 자동으로 생성되는 파일입니다. 이 파일에 들어가보겠습니다.

파일을 살펴보면, 파일 최상단에 Tailwind에서 기본 스타일을 가져오는 세 개의 지시문이 존재합니다. 처음 본 문법일수도 있지만, 해당 문법은 간단히 설명드리자면 최초 Next.js 명령어를 통해 프로젝트를 생성할 때 TailwindCSS 사용에 동의했기 때문에, TailwindCSS에서 제공하는 스타일 속성을 등록하는 코드입니다. 자세한 내용은 Tailwind 수업에서 다루겠습니다.

이제 코드를 내려보면 root 선택자가 나오는데, 이는 루트요소로써 사용자 지정 속성 또는 CSS 변수를 정의할 때 사용합니다. 이 사용자 지정 속성들은 전체 문서에 걸쳐 재사용될 수 있습니다.

```css
:root {
  --primary-color: "white";
}
```

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  padding: 1rem;
}
```

루트 선택자 이후에는 `prefers-color-schema`와 `@media` 속성이 나오는데 이는 다크 모드에 있는지 여부를 감지할 때 사용합니다. 그리고 body 요소를 보면 루트 선택자에 정의한 CSS 변수를 적용한 것을 확인할 수 있습니다. 그리고 body 태그에 패딩 속성을 추가하면, 바로 화면에 반영되는 것을 확인할 수 있습니다.

그리고 마지막으로 globals.css 파일에 스타일 속성을 정의할때는 모든 태그에 일반적으로 적용되는 스타일을 적용하는 것은 괜찮지만, 다음과 같이 임의로 클래스를 직접 정의하면 TailwindCSS등 현재 사용하고 있는 CSS 도구와 충돌이 발생할 수 있으므로, 이러한 속성은 globals.css가 아닌, 해당 파일 혹은 컴포넌트의 범위에만 한정될 수 있는 곳에 구현해야 합니다.

이번 시간에는 전역 스타일 다른 말로는 global css를 정의하는 방법에 대해 알아봤습니다. 다음 시간에는 CSS Module에 대해 알아보겠습니다. 감사합니다.

```css
/* 하면 안되는 것 ex) */
.user-list {
}
```

### CSS Modules

CSS Module: A CSS file that is scoped to a component/page

이번 수업에서는 CSS 모듈에 대해 알아보겠습니다. CSS 모듈은 페이지나 컴포넌트에 범위가 지정된 CSS 파일입니다. 이는 스타일이 서로 충돌하거나 덮어쓴느 것을 방지하는 목적으로 사용합니다. CSS를 다뤄본 분들은 두 개의 다른 우치에 동일한 클래스가 정의된 경우, 이러한 클래스가 서로 덮어쓰일 수 있다는 것을 알고 계실 겁니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*hi6EJTGNmUWN2E0LMj5PUg.png" />

CSS 모듈은 이러한 문제를 해결하기 위해 만들어졌습니다. 이제 어떻게 동작하는지 살펴보겠습니다.

컴포넌트 폴더에 "ProductCard"라는 컴포넌트가 있습니다. 이 컴포넌트에 스타일을 추가해보겠습니다. 그러기 위해 새 파일을 추가할 수 있으며 파일 이름은 무엇이든 상관없지만 컴포넌트와 동일한 이름으로 만드는 것을 추천드립니다. 파일의 확장자는 `.module.css`여야 합니다. 이러한 CSS 모듈 내에서는 "ProductCard" 컴포넌트에 대한 범위가 지정된 클래스를 정의할 수 있습니다. 따라서 "card"라는 클래스를 정의해보겠습니다. 물론 이러한 클래스를 다른 곳에서 정의할 수 있으며 이러한 클래스가 충돌하지 않도록 걱정할 필요가 없습니다. 아래와 같이 "card" 클래스를 정의해보겠습니다.

```css
/* app/components/ProductCard.module.css */
.card {
  padding: 1rem;
  border: 1px solid #ccc;
}
```

이제 컴포넌트로 돌아가서 이 스타일 시트를 가져올 것입니다. 스타일 시트를 가져오기 위해는 다음과 같이 코드를 작성할 수 있습니다. 이때 여기서 할당하는 이름은 중요하지 않지만, 일반적으로 "styles"라는 이름을 사용합니다. 이것은 자바스크립트 객체로 동작하기 때문에, CSS 모듈에서 정의한 클래스를 이 객체의 속성으로 나타납니다. 예를 들어, 앞서 정의한 card 클래스에 접근하고 싶은 경우, "styles.card"라고 작성해 접근할 수 있습니다. 그래서 이것은 div 요소에 적용해보겠습니다. 그리고 참고로 class 대신 className을 사용하는 이유는 React 컴포넌트는 내부적으로 JavaScript 코드로 해석되기 때문에, 기존에 존재하는 class라는 키워드가 곂치기 때문에 대안으로 className을 사용합니다. 자 이제 className을 정의하고 생성한 스타일을 적용해보겠습니다.

자 이제 다시 브라우저로 돌아가보면 성공적으로 스타일이 적용된 것을 확인할 수 있습니다. 참고로 Next.js는 postCSS 도구를 사용해, 클래스 이름을 다른 이름과 충돌하는 상황을 방지하고자, 충돌하지 않는 고유한 클래스 이름을 생성해 렌더링에 사용합니다.

```tsx
import AddToCart from "./AddToCart";
import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
```

```tsx
<div className={styles.card}>
```

이렇게 하면 해당 클래스에 정의된 스타일이 적용됩니다. 이제 브라우저에서 확인해보면 스타일이 적용된 것을 볼 수 있습니다.

참고로 이 프로젝트에서 클래스 이름이 자동으로 생성되는 도구인 "postCSS"를 사용하고 있습니다. 이는 클래스 이름을 변환하고 충돌하지 않는 고유한 클래스 이름을 생성하기 위한 도구입니다. 이것이 CSS 모듈이 동작하는 방식입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*peS3qnizyNFEJ9A6tMmRAA.png" />

마지막으로, 현재 CSS 파일과 Typescript 파일을 함께 두었는데, CSS와 TSX파일이 섞이는 것이 마음에 들지 않는다면, 폴더를 따로 만들어 그룹화 할 수 있습니다. 예를 들면 예를 들어 "ProductCard" 컴포넌트와 관련된 파일을 "ProductCard"라는 폴더 안에 넣을 수 있습니다. 이 폴더 내에 TSX 파일과 CSS 파일을 둘 수 있습니다. 이는 각자의 코드 스타일에 달려있기 때문에 편하신 것을 선택해 사용하면 될 것 같습니다. 그래서 이번 수업에서는 CSS 모듈을 활용해 로컬 스타일을 정의하는 방법에 대해 알아봤습니다. 다음 수업 시간에는 Tailwind CSS에 대해 알아보겠습니다.

### Tailwind CSS

Tailwindcss: https://tailwindcss.com/

이번 수업에서는 Tailwind CSS에 대해 알아보겠습니다. Tailwind CSS는 매우 인기 있는 CSS 프레임워크로, 유틸리티 클래스라는 개념을 사용합니다. Tailwind CSS 공식사이트를(tailwindcss.com) 살펴보면 여러 유틸리티 클래스를 확인할 수 있습니다. 예를 들어 `flex pt-4`와 같은 클래스가 있으며, 이것은 디스플레이는 플렉스를 사용하고, 패딩 위쪽은 4만큼 적용함을 의미합니다. 이처럼 작은 유틸리티 클래스를 조합하여 애플리케이션을 스타일링할 수 있습니다. Tailwind를 사용해본 적이 없다면 이번 기회에 사용해 보는 것을 권장합니다. 왜냐하면 요즘에는 많은 프로젝트가 Tailwind를 사용하고 있으며, 기술 스택을 확장하여 취업 기회를 더 넓히고자 한다면 Tailwind를 스킬셋에 추가해야 할 것입니다.

Tailwind에서는 패딩, 마진, 텍스트 스타일링, 배경 색상, 폰트 굵기 등을 조절하기 위한 다양한 클래스가 있습니다. 예를 들어 패딩을 조절할 때는 `p-0`, `p-1`, `p-2` 등과 같은 클래스를 사용할 수 있으며, 이러한 클래스는 각각 다른 크기의 패딩을 나타냅니다. 마진을 조절하는 클래스도 유사하게 작동합니다. 또한 텍스트 스타일을 조절하기 위한 다양한 클래스도 제공됩니다. 배경 색상을 지정하는 클래스는 `bg-color` 형태로 사용하며, 폰트 굵기를 조절하는 클래스도 제공됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*7x3yChENNNhSdfHXFCeJ1w.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*vDnXmKOnx803Ha5wapHtvg.png" />

Tailwind에서는 유용한 가상 클래스 선택자도 사용할 수 있습니다. `hover`와 같은 가상 클래스 선택자를 사용하여 호버 상태일 때 스타일을 변경할 수 있습니다. 이를 통해 인터랙티브한 요소를 쉽게 스타일링할 수 있습니다.

Tailwind의 장점 중 하나는 컴포넌트 파일 내에서 스타일을 바로 정의할 수 있다는 점입니다. 따라서 CSS 파일과 컴포넌트 파일 간의 이동 없이 모든 것을 한 곳에서 관리할 수 있습니다. 이로써 컴포넌트 파일 내에서 스타일을 정의하면 CSS 파일과 컴포넌트 파일을 왔다갔다 할 필요가 없습니다. Tailwind를 사용하면 CSS와 JSX(또는 TSX)를 한 파일에서 관리할 수 있으며, 이 컴포넌트 파일이 모듈로서 재사용 가능하다면 컴포넌트 내부에서 어떤 것을 정의하든 상관 없습니다.

```tsx
// app/components/ProductCard.tsx
import AddToCart from "./AddToCart";

const ProductCard = () => {
  return (
    <div className="pt-6 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">
      <AddToCart />
    </div>
  );
};

export default ProductCard;
```

일부는 관심사 분리 원칙(separation of concerns)을 위반한다고 보지만, 컴포넌트는 자체적인 모듈로, 그 안의 마크업, 자바스크립트, 스타일은 구현 세부사항일 뿐입니다. 이 컴포넌트의 외부에는 영향을 주지 않으므로, 내부 구조는 재사용성에 큰 문제가 되지 않습니다.

Tailwind를 사용하는 이유 중 하나는 애플리케이션을 빌드할 때 최종 CSS 번들에 사용한 유틸리티 클래스만 포함된다는 점입니다. 예를 들어 이 컴포넌트를 삭제하면 이 클래스들도 번들에 포함되지 않습니다. 반면 CSS 모듈을 사용하는 경우 컴포넌트를 삭제하더라도 해당 CSS 파일도 삭제해야 하는 번거로움이 존재합니다. Tailwind는 이런 번거로움을 해결해주기 때문에 큰 인기를 얻고 있습니다.

네 그래서 이번 수업시간에는 Tailwind에 대해서 알아봤습니다. 다음 수업시간에는 Daisy UI에 대해서 알아보겠습니다. 감사합니다.

### Daisy UI

daisyUI: https://daisyui.com/

이번 시간에는 Daisy UI에 대해서 알아보겠습니다. Daisy UI는 Tailwind를 기반한 인기 있는 컴포넌트 라이브러리입니다. Daisy UI 공식 웹사이트(daisyui.com)에서는 다양한 컴포넌트를 확인할 수 있으며, 아코디언, 알림, 브레드크럼, 버튼, 카드, 캐러셀, 채팅 버블 등 다양한 컴포넌트가 제공됩니다. Daisy UI는 사용하기 쉽고 테마도 쉽게 적용할 수 있습니다.

Daisy UI를 사용하려면 먼저 개발 의존성으로 Daisy를 설치해야 합니다. 그런 다음 Tailwind의 플러그인으로 Daisy를 추가해야 합니다. 여기서 말하는 플러그인의 의미는 기존의 TailwindCSS의 기본 기능이 Daisy UI를 인식할 수 있도록 코드를 설정하는 것을 의미합니다.

이제 Daisy UI 컴포넌트를 설치하고, 플러그인에 등록해보겠습니다.

```bash
npm i -D daisyui@latest
```

```bash
# tailwind.config.js
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

- button: https://daisyui.com/components/button/

Daisy UI 설치와 등록을 끝마쳤으면, 예시로 Daisy UI 버튼 컴포넌트를 사용해보겠습니다. 다음 공식문서를 보면 확인할 수 있듯이, 버튼 컴포넌트에는 `btn`, `btn-neutral`, `btn-primary`, `btn-secondary` 등과 같은 클래스가 제공됩니다. 이러한 클래스는 Tailwind를 기반으로 하므로 버튼을 만들기 위해 여러 작은 Tailwind 클래스를 수동으로 결합하는 대신 Daisy에서 제공하는 버튼을 사용할 수 있습니다. 또한 이 버튼을 사용자 정의할 수도 있습니다.

예제 컴포넌트에서 Daisy의 버튼을 사용하려면 컴포넌트 파일 내에서 `class` 속성을 설정하면 됩니다. 아무런 추가 작업이 필요하지 않습니다. 그런 다음 웹 페이지의 HTML 요소에 Daisy UI 테마를 적용하고, 테마를 선택할 수 있습니다.

```tsx
// app/components/AddToCart.tsx
"use client";

const AddToCart = () => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => console.log("Click")}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
```

Daisy UI에는 여러 테마도 제공되며, 이러한 테마 중 하나를 선택하여 애플리케이션에 적용할 수 있습니다. 이렇게 하면 애플리케이션의 전반적인 스타일이 변경됩니다. 테마를 적용하려면 Tailwind 구성 파일에서 테마를 활성화하고, HTML 요소에 해당 테마를 설정하는 두 가지 단계를 따르면 됩니다.

1. Tailwind 구성 파일에서 테마 활성화:
   Daisy UI를 사용하기 위해 tailwind.config.ts 파일을 수정합니다. 이 파일에서, 먼저 daisyui 플러그인을 추가합니다. 그런 다음, 원하는 테마 (예: 'winter')를 daisyui의 themes 옵션에 추가하여 활성화합니다.

2. HTML 요소에 테마 설정:
   애플리케이션의 레이아웃 컴포넌트나 메인 HTML 요소에서 data-theme 속성을 사용하여 원하는 테마를 설정합니다. 이 예에서는 'winter' 테마를 적용하려면, <html> 태그에 data-theme="winter"를 추가합니다.

theme: https://daisyui.com/docs/themes/

```tsx
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};
export default config;
```

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
```

"user.email" 부분에 오류가 출력되는 것을 확인할 수 있습니다. 이는 Typescript를 통해 인터페이스를 정의했기 때문입니다. 이처럼 앱을 실행하거나 배포하기 전에 문제점을 잡아주기 때문에 Typescript의 유용함을 경험할 수 있습니다. 인터페이스에 "email" 속성을 추가해보겠습니다. 이후 테이블에 스타일을 추가해보겠습니다.

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
```

Daisy UI 컴포넌트 사용은 빠르게 UI를 개발하고 스타일을 적용할 수 있게 만들어주기 때문에 많은 개발자들이 사용하고 있습니다. 이번 시간에는 Tailwind 프레임워크를 기반으로 만든 Daisy UI에 대해 알아봤습니다. 다음 시간에는 라우팅과 네비게이션에 대해서 알아보겠습니다. 감사합니다.

## Summary

- CSS Modules
- PostCSS
- Daisy UI
- Tailwind
- Global Styles

Next.js 프로젝트에서는 전역 스타일을 `/app/global.css` 파일에 정의합니다. 이 파일은 여러 페이지 및 컴포넌트에 적용해야 하는 전역 스타일에 사용합니다. 이 파일에 과도한 스타일을 추가하는 것은 피해야 합니다. 왜냐하면 이렇게 하면 코드가 급격하게 늘어나고 유지 보수가 어려워질 수 있기 때문입니다.

• 전통적인 CSS에서는 두 개의 다른 파일에서 동일한 클래스를 정의하면 이 파일들이 가져오는 순서에 따라 하나가 다른 것을 덮어쓰게 됩니다. CSS 모듈을 사용하면 이 문제를 방지할 수 있습니다. CSS 모듈은 페이지 또는 컴포넌트 범위로 제한된 CSS 파일입니다.

• 빌드 프로세스 중에 Next.js는 CSS 클래스 이름을 변환하고 고유한 클래스 이름을 생성하기 위해 PostCSS라는 도구를 사용합니다. 이를 통해 애플리케이션 전반에서 서로 다른 CSS 클래스 간의 충돌을 방지합니다.

• Tailwind는 애플리케이션 스타일링을 위한 널리 사용되는 CSS 프레임워크입니다. 이것은 다양한 작고 재사용 가능한 유틸리티 클래스 집합을 제공합니다. 이러한 클래스를 조합하여 아름다운 사용자 인터페이스를 만들 수 있습니다.

• DaisyUI는 Tailwind 위에 구축된 컴포넌트 라이브러리입니다. 아코디언, 배지, 카드 등과 같은 사전 디자인된 재사용 가능한 컴포넌트 모음을 제공합니다.

이 내용을 수업 대본으로 사용할 수 있도록 깔끔하게 수정하였습니다.
