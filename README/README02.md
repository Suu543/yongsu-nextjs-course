### Global Styles

수업에서 이전에 앱 폴더의 Global 스타일 시트에 대해 간략히 언급했습니다. 이제 globals.css 파일을 열어보겠습니다. 이 파일의 맨 위에는 Tailwind에서 기본 스타일을 가져오는 세 개의 지시문이 있습니다. Tailwind에 대해 이후에 더 자세히 얘기하겠습니다.

그런 다음에는 root 선택자가 나옵니다. 여기서는 주로 전경 RGB와 같은 사용자 정의 속성을 정의합니다. 그런 다음 `prefers-color-scheme: dark`와 함께 `@media`를 사용하여 사용자가 다크 모드에 있는지 여부를 감지합니다. 그래서 해당 사용자 정의 속성의 값이 덮어씌워집니다.

아래에서는 이 사용자 정의 속성의 값을 body 요소의 색상으로 사용하는 것을 볼 수 있습니다. 배경 시작과 끝 RGB를 사용하지 않는 것을 볼 수 있습니다. 이것은 홈 페이지에서 그래디언트가 있을 때 사용되었습니다.

더 나아가기 전에 여기서 정리를 좀 해보겠습니다. 이 두 줄과 이 두 줄을 삭제하겠습니다. 또 터미널로 돌아가서 개발 중인 애플리케이션을 실행 중인지 확인하겠습니다. 그래서 이곳에서 어떤 변경 사항이든 즉시 확인할 수 있습니다. `npm run dev`를 실행합니다.

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  padding: 1rem;
}
```

이제 이 파일에 대해 이것은 애플리케이션의 전체에 적용되는 스타일, 모든 페이지에 적용되는 스타일과 관련된 것으로 사용해야 합니다. body 요소, 제목, 하이퍼링크와 같은 모든 페이지에 적용되는 것과 관련된 스타일을 여기에 추가하면 됩니다. 특정 페이지나 컴포넌트에만 해당되는 스타일은 다른 곳에서 구현해야 합니다.

여기서 하면 안 되는 것은 사용자 목록과 같은 사용자 정의 클래스를 정의하지 않아야 합니다. 이는 특정 컴포넌트나 페이지에만 해당되므로 이러한 방식으로 전역 스타일 시트를 빌드하면 전역 스타일 시트가 더 커져서 유지 관리하기 어려워집니다.

```css
/* 하면 안되는 것 ex) */
.user-list {
}
```

더 중요한 점은 컴포넌트를 변경하거나 삭제할 때마다 여기에 와서 정리 작업을 수행해야 한다는 것입니다. 그렇지 않으면 시간이 지남에 따라 이 파일에 많은 스타일이 남게 됩니다. CSS를 어느 정도 다뤄보셨다면 무슨 말인지 이해하실 것입니다. 따라서 이 파일은 정말로 전역 스타일인 스타일에 사용하고 페이지나 컴포넌트별로 특정한 스타일은 CSS 모듈 또는 다음에 다룰 Tailwind를 사용하세요.

### CSS Modules

CSS Module: A CSS file that is scoped to a component/page

CSS 모듈에 대해 이야기해보겠습니다. CSS 모듈은 페이지나 컴포넌트에 범위가 지정된 CSS 파일입니다. 이는 스타일이 서로 충돌하거나 덮어쓰는 것을 방지하는 방법으로, CSS를 오랫동안 다뤄온 분들은 두 개의 다른 위치에서 동일한 클래스가 정의된 경우 이러한 클래스가 서로 덮어쓰일
수 있다는 것을 알고 계실 것입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*hi6EJTGNmUWN2E0LMj5PUg.png" />

이러한 스타일 시트 파일을 어떻게 가져올지에 따라 이러한 클래스는 서로 덮어쓰일 수 있습니다. CSS 모듈은 이러한 문제를 해결하기 위해 만들어졌습니다. 이제 어떻게 동작하는지 살펴보겠습니다.

여기 컴포넌트 폴더에 "ProductCard"라는 컴포넌트가 있습니다. 이 컴포넌트에 스타일을 추가하고자 합니다. 그러기 위해 새 파일을 추가할 수 있으며 파일 이름은 무엇이든 상관없지만 컴포넌트와 동일한 이름으로 만드는 것이 좋습니다. 파일의 확장자는 `.module.css`여야 합니다. 이러한 CSS 모듈 내에서는 "ProductCard" 컴포넌트에 대한 범위가 지정된 클래스를 정의할 수 있습니다. 따라서 "card"라는 클래스를 정의해보겠습니다. 물론 이러한 클래스를 다른 곳에서 정의할 수 있으며 이러한 클래스가 충돌하지 않도록 걱정할 필요가 없습니다. 아래와 같이 "card" 클래스를 정의해보겠습니다.

```css
/* app/components/ProductCard.module.css */
.card {
  padding: 1rem;
  border: 1px solid #ccc;
}
```

이제 컴포넌트로 돌아가서 이 스타일 시트를 가져올 것입니다. 스타일 시트를 가져오기 위해 다음과 같이 작성합니다.

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

이때 여기서 할당하는 이름은 중요하지 않지만 일반적으로 "styles"라는 이름을 사용합니다. 이것은 자바스크립트 객체가 될 것이므로 CSS 모듈에서 정의한 클래스는 이 객체의 속성으로 나타납니다. 예를 들어 "styles.card"로 접근할 수 있습니다. 그래서 우리는 컴포넌트의 div 요소에 `className`을 설정하고 해당 클래스를 적용합니다.

```tsx
<div className={styles.card}>
```

이렇게 하면 해당 클래스에 정의된 스타일이 적용됩니다. 이제 브라우저에서 확인해보면 스타일이 적용된 것을 볼 수 있습니다.

참고로 이 프로젝트에서 클래스 이름이 자동으로 생성되는 도구인 "postCSS"를 사용하고 있습니다. 이는 클래스 이름을 변환하고 충돌하지 않는 고유한 클래스 이름을 생성하기 위한 도구입니다. 이것이 CSS 모듈이 동작하는 방식입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*peS3qnizyNFEJ9A6tMmRAA.png" />

마지막으로, 현재 CSS 파일과 TypeScript 파일을 함께 두었습니다. CSS와 TSX 파일을 섞는 것이 마음에 들지 않는다면 폴더를 만들어 그룹화할 수도 있습니다. 예를 들어 "ProductCard" 컴포넌트와 관련된 파일을 "ProductCard"라는 폴더 안에 넣을 수 있습니다. 이 폴더 내에 TSX 파일과 CSS 파일을 둘 수 있습니다. 이런 식으로 페이지별로도 CSS 모듈을 사용하여 로컬 스타일을 정의할 수 있습니다.

### Tailwind CSS

Tailwindcss: https://tailwindcss.com/

Tailwind CSS는 매우 인기 있는 CSS 프레임워크로, 유틸리티 클래스라는 개념을 사용합니다. Tailwind CSS 공식 웹사이트(tailwindcss.com)에서 여러 유틸리티 클래스를 확인할 수 있습니다. 예를 들어 `flex pt-4`와 같은 클래스가 있으며, 이것은 `padding top 4`를 줄인 것입니다. 이처럼 작은 유틸리티 클래스를 조합하여 애플리케이션을 스타일링할 수 있습니다.Tailwind를 사용해본 적이 없다면 이번 기회에 사용해 보는 것을 권장합니다. 왜냐하면 요즘에는 많은 프로젝트가 Tailwind를 사용하고 있으며, 기술 스택을 확장하여 취업 기회를 더 넓히고자 한다면 Tailwind를 스킬셋에 추가해야 할 것입니다.

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

물론 일부 사람들은 이것이 관심사 분리 원칙(separation of concerns)을 어기는 것이라고 주장하기도 합니다. 그러나 이것은 컴포넌트 파일 자체가 모듈이며 외부 세계에서의 사용범위를 정의하는 것이라는 관점에서 생각하면 됩니다. 따라서 이 경계 내에 있는 것은 구현 세부사항일 뿐이며, 마크업, 자바스크립트 및 스타일이 모두 한 곳에서 정의됩니다. 내부에 무엇이 들어가든 외부 세계에는 관계가 없으며, 이 컴포넌트 또는 모듈이 재사용 가능하다면 내부 구조는 중요하지 않습니다.

Tailwind를 사용하는 이유 중 하나는 애플리케이션을 빌드할 때 최종 CSS 번들에 사용한 유틸리티 클래스만 포함된다는 점입니다. 예를 들어 이 컴포넌트를 삭제하면 이 클래스들도 번들에 포함되지 않습니다. 반면 CSS 모듈을 사용하는 경우 컴포넌트를 삭제하더라도 해당 CSS 파일도 삭제해야 하는 번거로움이 존재합니다. Tailwind는 이런 번거로움을 해결해주기 때문에 큰 인기를 얻고 있습니다.

### Daisy UI

daisyUI: https://daisyui.com/

Daisy UI는 Tailwind를 위한 매우 인기 있는 컴포넌트 라이브러리로, Tailwind의 버전이라고 생각할 수 있습니다. Daisy UI 공식 웹사이트(daisyui.com)에서는 다양한 컴포넌트를 확인할 수 있으며, 아코디언, 알림, 브레드크럼, 버튼, 카드, 캐러셀, 채팅 버블 등 다양한 컴포넌트가 제공됩니다. Daisy UI는 사용하기 쉽고 테마도 쉽게 적용할 수 있습니다.

Daisy UI를 사용하려면 먼저 개발 의존성으로 Daisy를 설치해야 합니다. 그런 다음 Tailwind의 플러그인으로 Daisy를 추가해야 합니다. 이제 Daisy UI 컴포넌트를 사용하는 방법을 알아보겠습니다.

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

예시로 버튼 컴포넌트를 사용해보겠습니다. 버튼 컴포넌트에는 `btn`, `btn-neutral`, `btn-primary`, `btn-secondary` 등과 같은 클래스가 제공됩니다. 이러한 클래스는 Tailwind를 기반으로 하므로 버튼을 만들기 위해 여러 작은 Tailwind 클래스를 수동으로 결합하는 대신 Daisy에서 제공하는 버튼을 사용할 수 있습니다. 또한 이 버튼을 사용자 정의할 수도 있습니다.

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

Daisy UI 컴포넌트를 사용하여 빠르게 UI를 개발하고 스타일을 적용할 수 있으므로 Tailwind 및 Daisy UI를 활용하여 애플리케이션을 빌드하는 과정을 더욱 쉽게 만듭니다. 이를 통해 애플리케이션 개발을 더 빠르게 진행할 수 있습니다.

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
