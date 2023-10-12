## Sending Emails

이 섹션에서는 Next.js 애플리케이션에서 이메일을 보내는 방법을 배우게 됩니다.

### Setting Up React Email

이번 섹션에서는 React 및 TypeScript를 사용하여 이메일을 생성하고 보내는 강력한 라이브러리인 "react-email"을 사용할 것입니다.

- react-email: https://react.email/

"react-email"이라는 이 라이브러리는 HTML 이메일을 생성하는 데 사용할 수 있는 여러 컴포넌트를 제공합니다. 또한 이메일을 미리 볼 수 있는 도구와 이메일을 보내는 함수도 제공합니다.

시작하는 가장 쉬운 방법은 "npx"를 사용하여 이 패키지를 실행하는 것이지만, 몇 가지 문제가 있으므로 제가 선호하는 수동 설정 방법을 보여 드리겠습니다.

먼저 터미널로 이동해야 합니다. 두 개의 패키지를 설치해야 합니다. 첫 번째는 "react-email"이고, 두 번째는 "react-email/Components"입니다. 이 패키지들의 이름이 미래에 변경될 수 있으므로 항상 최신 정보를 얻기 위해 문서를 참고하세요.

이제 이러한 패키지를 설치해 보겠습니다. 그리고 현재 사용 중인 버전을 확인하기 위해 "package.json" 파일을 확인해 보겠습니다. 설치된 버전은 다음과 같습니다.

- "react-email/Components" 버전: 0.0.7
- "React-email" 버전: 1.9.4

```bash
npm install react-email @react-email/components
```

따라서 동일한 버전을 설치해야 합니다. 이제 우리의 프로젝트 루트에 "emails"라는 새 폴더를 만들어서, 그 안에 이메일 템플릿을 나타내는 React 컴포넌트를 추가해야 합니다. 이 작업에 대해 자세히 알려드리겠습니다.

- my-next-app/emails

이제 이 라이브러리가 이메일 미리보기 도구를 제공한다고 말씀드렸습니다. 이를 사용하려면 새 스크립트를 설정해야 합니다.

그래서 여기 스크립트 객체 안에 새 명령을 추가해보겠습니다.

이것을 "preview-email" 또는 원하는대로 부를 수 있습니다. 그리고 이를 "email dev"로 설정합니다. 기본적으로 이것은 포트 3000에서 웹 서버를 시작하지만, 이는 우리 Next.js 앱에 사용하는 동일한 포트입니다. 그래서 여기서 대체 포트를 지정하기 위해 "-p"를 사용합니다. 예를 들어, 3030과 같이요.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "preview-email": "email dev -p 3030"
}
```

### Creating an Email Template

이메일 템플릿을 생성하려면 "emails" 폴더에 "WelcomeTemplate.tsx"와 같은 새 파일을 추가하겠습니다. 파일 이름은 중요하지 않으며, 여기에서는 "WelcomeTemplate.tsx"라는 이름을 사용하겠습니다.

이 파일 내에서 React 컴포넌트를 생성합니다. 먼저 상단에서 "at react-email/components"에서 몇 가지 컴포넌트를 가져와야 합니다. 이 컴포넌트들은 HTML 이메일 내에서 사용할 수 있는 구성 요소들을 제공합니다.

다음 컴포넌트들을 가져옵니다.

- `html`: HTML 이메일 내의 HTML 요소를 나타냅니다.
- `body`: 이메일 내의 내용을 나타냅니다.
- `container`: 내용을 가운데 정렬하기 위해 사용합니다.
- `text`: 텍스트를 추가하는 데 사용합니다.
- `link`: 링크를 추가하는 데 사용합니다.
- `preview`: 이메일 미리 보기 텍스트를 추가하기 위해 사용합니다. 이는 이메일 클라이언트에서 사용자에게 표시되는 첫 번째 텍스트 줄입니다.

그런 다음 이 컴포넌트 안에서 기본 HTML 구조를 작성합니다. HTML 컴포넌트를 추가한 후, 미리 보기 컴포넌트를 추가하여 사용자에게 표시할 환영 메시지를 정의합니다. 메시지는 "Welcome aboard!" 또는 사용자에게 보여주고자 하는 내용으로 변경할 수 있습니다.

그 아래에는 내용을 가운데 정렬하기 위해 "body" 컴포넌트를 추가합니다. "container" 컴포넌트 내에서 "text" 컴포넌트를 추가하여 사용자에게 "Hello, {name}" 메시지를 표시합니다. 이메일 템플릿이 동적으로 렌더링되도록 "props"에서 "name" 속성을 가져오고 이를 사용하여 사용자별로 다른 환영 메시지를 표시합니다.

마지막으로, "link" 컴포넌트를 추가하여 웹 사이트 링크를 이메일에 포함시킵니다. "href" 속성을 설정하여 사용자가 링크를 클릭하면 해당 웹 사이트로 이동할 수 있도록 합니다.

```tsx
// emails/WelcomeTemplate.tsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://www.google.com">Google</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;
```

### Previewing Emails

React Email 라이브러리는 이메일을 미리 보는 도구를 제공합니다. 이 도구를 사용하려면 `npm run preview-email` 명령을 실행해야 합니다. 그러나 주의해야 할 점은 이 명령을 처음 실행할 때 해당 이메일 미리 보기 애플리케이션이 생성된다는 것입니다. 이 애플리케이션은 프로젝트의 일부가 되며 수천 개의 파일을 포함하므로 Git 저장소에서 이 파일을 추적하려고 하지 않는 것이 좋습니다.

따라서 먼저 `.gitignore` 파일에 해당 폴더의 파일을 추적하지 않도록 설정해야 합니다. `.react-email/` 를 `.gitignore` 파일에 추가하고 `/`로 끝나도록 합니다. 이제 이 명령을 실행할 수 있습니다.

`npm run preview-email` 명령을 실행하면 해당 애플리케이션이 로컬호스트 포트 3030에서 실행됩니다. 이제 브라우저에서 해당 애플리케이션을 열어 이메일 템플릿을 미리 볼 수 있습니다.

```bash
npm run preview-email
```

미리 볼 수 있는 템플릿 목록이 나타나며, 원하는 템플릿을 선택하여 확인할 수 있습니다. 이를 통해 템플릿의 내용을 실제로 확인하고 테스트 이메일을 보낼 수 있습니다. 이렇게 간편하게 이메일 미리 보기 및 테스트를 수행할 수 있습니다. 그러므로 이제 스타일링된 이메일에 대해 논의할 것입니다.

### Styling Emails

이메일 스타일링에는 CSS 속성 또는 Tailwind를 사용할 수 있습니다. 이 레슨에서는 두 가지 기술을 모두 보여줄 것입니다.

먼저, 이메일 템플릿으로 이동하여 스타일을 적용해 보겠습니다. Body 컴포넌트 내에서 style 속성을 사용하여 스타일을 설정할 수 있습니다. 이 객체에는 유효한 CSS 속성을 설정할 수 있습니다. 예를 들어, 배경색을 흰색으로 설정할 수 있습니다.

```tsx
// emails/WelcomeTemplate.tsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body style={{ background: "#fff" }}>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://www.google.com">Google</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;
```

이와 같은 방식으로 다른 스타일 객체도 만들 수 있으며 다양한 텍스트 스타일을 정의할 수 있습니다.
그러나 이 방법은 스타일을 마크업 안에 직접 넣는 것이기 때문에 확장성이 떨어집니다. 대신에 이 컴포넌트 외부에서 스타일 객체를 생성하는 것이 더 나은 접근 방식입니다. 이를 위해 상수를 선언하고 CSS 속성을 사용하려면 해당 객체를 주석 처리해야 합니다. 그리고 CSS 속성을 react 모듈에서 가져와야 합니다.

```tsx
// emails/WelcomeTemplate.tsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";
import { CSSProperties } from "react";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body style={body}>
        <Container>
          <Text style={heading}>Hello {name}</Text>
          <Link href="https://www.google.com">Google</Link>
        </Container>
      </Body>
    </Html>
  );
};

const body: CSSProperties = {
  background: "#fff",
};

const heading: CSSProperties = {
  fontSize: "32px",
};

export default WelcomeTemplate;
```

또한 Tailwind를 사용할 수도 있습니다. 이를 위해 먼저 Tailwind를 가져와서 컴포넌트를 Tailwind로 감싸고 class name을 사용하여 스타일을 적용합니다. Tailwind 클래스를 사용하여 스타일을 지정할 수 있습니다.

```tsx
// emails/WelcomeTemplate.tsx
import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-3xl">Hello {name}</Text>
            <Link href="https://www.google.com">Google</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
```

이렇게 하면 Tailwind 클래스를 사용하여 이메일을 스타일링할 수 있습니다.

### Sending Emails

이메일을 어떻게 보낼 수 있는지 살펴보겠습니다.

우선 React.email 웹사이트로 돌아가서 문서를 확인해보겠습니다. 왼쪽에서 볼 수 있듯이, React Email은 Resend, Note Mailer, SendGrid, Postmark, AWS 등과 같은 다양한 서비스와 통합됩니다.

이 강의에서는 Resend를 사용할 것입니다. 그 이유는 Resend가 훌륭한 도구이며, React Email을 개발한 팀에서 만들었기 때문입니다. 그러니 이제 Resend.com으로 이동해보겠습니다.

- https://react.email/docs/integrations/resend
- https://resend.com/

다양한 가격 모델이 있으며, 무료로 최대 3,000개의 이메일을 사용할 수 있지만 그 이후에는 월간 요금을 지불해야 합니다. 예를 들어, 50,000개의 이메일을 보내려면 월 20달러만 지불하면 됩니다.

"시작하기"로 이동하여 계정을 만들고 로그인하겠습니다. 내 계정으로 로그인하겠습니다. 로그인하면 홈 페이지에서 API 키를 생성할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*E4ndI89Ubugr52Zbx_kxfQ.png" />

그래서 우리 프로젝트로 돌아가서 .env 파일로 이동하고, "RESEND_API_KEY"라는 새 키를 추가하고 해당 값을 설정하겠습니다.

```bash
# .env
RESEND_API_KEY=
```

이제 터미널로 돌아가서 Resend 버전 1.0.0을 설치하겠습니다.

```bash
npm install resent
```

이제 마지막 단계로 이메일을 보내기 위한 API 엔드포인트를 만들어 보겠습니다. 이것은 실제 애플리케이션에서는 따라야 할 것이므로 데모용으로만 사용됩니다. 실제 애플리케이션에서는 이메일 보내기가 비즈니스 영역에 포함되어야 합니다. 예를 들어, 누군가 주문을 제출하면 확인 이메일을 보내려고 할 것입니다.

- app/api/send-email/route.tsx

API 폴더로 이동하여 "send-email"이라는 새 폴더를 추가하고 라우트 파일을 추가합니다. 이 파일에서는 async로 작동하는 post 함수를 내보내겠습니다. 우리는 request 객체에 접근할 필요가 없으므로 생략하겠습니다.

여기서는 Resend를 사용할 것이므로 파일 상단에서 Resend를 가져와야 합니다. 이것은 클래스이므로 인스턴스를 만들어야 합니다. Resend 객체를 만들고 여기에 우리가 process.env.RESENT_API_KEY에서 가져올 수 있는 API 키를 전달합니다.

그런 다음 이 함수에서 reset.emails.send를 호출하고 페이로드 객체를 제공합니다. 이 객체에는 보낸 이메일 주소가 포함되어야 합니다. 이 이메일 주소는 소유한 도메인에서 와야 하므로 Gmail, Yahoo 등과 같은 무료 서비스를 사용할 수 없습니다. 도메인이 있으면 Resend.com으로 가서 로그인하고 여기에서 도메인을 구성해야 합니다. 불행하게도 이 강의에서는 이 부분을 보여드릴 수 없으며 이 강좌의 범위를 벗어납니다. 그러나 매우 쉽습니다. 도메인에 DNS 레코드를 추가하면 Resend가 해당 도메인에서 이메일을 보낼 권한이 있는지 알 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*ZVBcTIggqt39a6W8adLJqg.png" />

이 작업을 완료하면 여기로 돌아와서 이메일을 추가하면 됩니다. 또한 여기에서 "aaa.gmail.com"과 같이 설정해야 합니다. 그리고 주제를 원하는 대로 설정하고 React 컴포넌트를 설정합니다. 이 경우에는 "WelcomeTempplate"입니다. 이 "WelcomeTemplate"에는 동적 이메일을 생성하기 위해 "name"을 설정해야 합니다. 그러면 이 함수를 호출하고 프로미스를 반환하므로 await해야 합니다. 마지막으로 "NextResponse.json"을 반환하면 됩니다.

```tsx
// app/api/send-email/route.tsx
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jos50275266@gmail.com",
    subject: "Hello World",
    react: <WelcomeTemplate name="yongsu" />,
  });

  return NextResponse.json({});
}
```

이렇게 Resend를 사용하여 이메일을 보낼 수 있습니다.

만약 SendGrid와 같은 다른 이메일 서비스를 사용하려면 React Email 문서로 돌아가서 SendGrid 또는 AWS와 같은 다른 이메일 서비스 사용 지침을 확인하십시오.

## Optimizations

이 섹션에서는 Next.js 애플리케이션에 내장된 몇 가지 최적화 기술을 살펴볼 것입니다.

이미지 최적화, 3rd-party JavaScript 라이브러리 사용, 사용자 정의 글꼴 사용, 검색 엔진 최적화 및 지연 로딩 등에 대해 배우게 될 것입니다.

- Optimizing Images
- Using third-party JS Libraries
- Using custom fonts
- Search Engine Optimization
- Lazy Loading

### Optimizing Images

next.js의 이미지 컴포넌트를 사용하여 이미지를 최적화하는 방법을 보여드리겠습니다. 홈페이지를 살펴보겠습니다. 이전에 있던 모든 코드를 삭제했으므로 우리는 빈 화면에서 시작합니다.

next.js에서는 next/image 패키지에 정의된 이미지 컴포넌트를 사용할 수 있습니다. 이 컴포넌트는 HTML의 표준 이미지 요소를 기반으로 작동하지만 내부적으로 기기 크기에 따라 이미지를 자동으로 압축 및 크기 조정합니다.

- app/page.tsx

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image src={coffee} alt="coffee" />
    </main>
  );
};

export default Home;
```

따라서 next.js 애플리케이션에서는 표준 HTML 이미지 요소 대신 이 컴포넌트를 사용하는 것이 좋습니다. 이를 사용하려면 몇 가지 속성을 설정해야 합니다. 첫 번째 속성은 "source"입니다. 이를 파일로 설정할 수 있으며 이 파일은 상단에서 정적으로 가져올 수 있습니다. 이것은 애플리케이션 내의 로고, 배경 이미지 등과 같이 애플리케이션에 로컬로 포함된 이미지에 유용합니다. 예를 들어 이미지를 추가하기 위해 "public" 폴더를 만들어 여기에 이미지를 추가합니다.

이제 이 이미지를 화면에 표시하려면 이미지를 상단에서 가져오는 방법처럼 이 이미지를 가져와야 합니다. 그런 다음 "source"를 "Coffee"로 설정하고 "alt"를 "커피"로 설정합니다.

이제 여러분에게 멋진 기능을 보여드리겠습니다. 개발 도구를 열고 네트워크 탭으로 이동한 다음 이미지로 필터링하겠습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*YI2WRJcMgo0g0qfC7QcZLw.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*0-ePKjG_Rdu-ismkfcoc_A.png" />

이 요청은 /next/image라인에서 이미지를 제공하기 위해 전송됩니다. Next.js는 이미지 최적화를 위해 이 이미지를 제공하도록 자동으로 노출시킵니다. 이렇게 로컬 이미지를 표시할 수 있지만, 이미지는 종종 애플리케이션 외부에 저장됩니다. 이것을 원격 이미지라고 합니다. 제 React 강의 표지를 표시하겠습니다. 여기서 객체 대신 문자열을 전달하고 HTTPS://bit.ly/react-cover와 같은 URL 형식을 사용해야 합니다. 이 작업을 위해 Next 구성 파일에서 이 도메인을 등록해야 합니다. Next 구성 파일에서 next/image를 검색하여 이미지 컴포넌트의 문서를 찾으세요. 원격 패턴을 검색하세요. 여기에 등록해야 할 유효한 도메인을 찾을 수 있습니다. 이 코드를 복사하여 Next 구성 파일에 추가하세요. 보안 상의 이유로 이미지를 제공하는 데 허용할 도메인을 하나 이상 추가해야 합니다. 이제 이 구성 파일을 변경했으니 웹 서버를 다시 시작해야 합니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image src="https://bit.ly/react-cover" alt="coffee" />
    </main>
  );
};

export default Home;
```

- https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns

원격 이미지를 사용하려면 URL과 같은 문자열을 전달하고 해당 도메인을 "next" 구성 파일에 등록해야 합니다. 그런 다음 "sizes"를 설정하여 이미지 크기를 결정할 수 있습니다. remotePatterns의 보안사항은 가능한 자세히 적을수록 좋습니다.

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bit.ly',
      },
    ],
  },
}
}
```

이제 원격 이미지를 표시할 때 항상 이미지의 크기를 제공해야 합니다. Next.js는 로컬 이미지의 크기를 자동으로 감지하지만 원격 이미지의 크기는 미리 알 수 없습니다. 따라서 원격 이미지를 위해 width와 height를 제공해야 합니다. 예를 들어, width를 300으로, height를 170으로 설정할 수 있습니다. 이 값들은 임의로 설정한 값입니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        width={300}
        height={170}
        src="https://bit.ly/react-cover"
        alt="coffee"
      />
    </main>
  );
};

export default Home;
```

이것은 이미지를 고정 크기로 렌더링하려는 경우에 유용합니다. 이미지가 모든 기기 크기에서 항상 동일한 크기로 렌더링되어야 하는 경우에 사용됩니다. 이미지를 모든 기기 크기에 맞게 표시하려면 width와 height 대신 fill을 설정해야 합니다. fill은 불리언 값이므로 true 또는 false로 설정할 수 있지만 이는 불필요합니다. 속성 이름만 전달하면 됩니다. 이제 결과를 살펴보세요. 이것은 이미지가 가로 세로 비율을 잃어버렸다는 것을 알 수 있습니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image fill src="https://bit.ly/react-cover" alt="coffee" />
    </main>
  );
};

export default Home;
```

이 문제를 해결하기 위해서는 두 가지 옵션이 있습니다. 첫 번째 옵션은 style을 객체로 설정하고 이 객체 내에서 object-fit을 cover로 설정하는 것입니다. 이렇게 하면 이미지가 적절하게 늘어나고 잘립니다. 이 컨테이너 내에서 적절하게 맞게 됩니다. 다른 옵션은 object-fit을 contain으로 설정하는 것입니다. 이렇게 하면 이미지가 컨테이너에 맞게 크기가 조정됩니다. 차이를 보여드릴게요. 지금 이미지는 가로 세로 비율을 유지하기 위해 크기가 조정됩니다. 잘림은 없지만 결과적으로 여기에 약간의 여백이 생깁니다. 대부분의 경우 cover를 사용하려고 할 것입니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        fill
        style={{ objectFit: "cover" }}
        // or {{ objectFit: "contain"}}
        src="https://bit.ly/react-cover"
        alt="coffee"
      />
    </main>
  );
};

export default Home;
```

스타일을 설정하는 대신에 태일윈드를 사용하는 것이 더 나은 방법입니다. 따라서 style 대신 className을 object-cover로 설정합니다. 그리고 object-contain도 있으니 동일한 결과를 얻을 수 있습니다. 인라인 스타일을 사용하지 않고 이런 식으로 하는 것이 더 깔끔합니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
      />
    </main>
  );
};

export default Home;
```

fill 속성을 사용하여 반응형 이미지를 표시할 때 종종 sizes를 설정해야 합니다. sizes는 이미지가 차지할 뷰포트의 너비를 결정합니다. 예를 들어, 배경 이미지를 렌더링하려면 이미지가 뷰포트의 너비를 100% 차지해야 합니다. 따라서 여기서 sizes를 100vw로 설정합니다. 모든 기기 크기에서 이미지가 뷰포트 너비의 100%를 차지할 것입니다. 다양한 화면 크기에서 이 페이지를 살펴보세요. 같은 결과를 얻습니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
        sizes="100vw"
      />
    </main>
  );
};

export default Home;
```

다른 예로, Instagram과 같은 페이지를 렌더링하고자 한다고 가정해 봅시다. 모바일에서는 단일 열을 원하고 태블릿에서는 두 개의 열을 원하며 데스크톱에서는 세 개의 열을 원합니다. 따라서 이를 위해 sizes에 미디어 쿼리와 유사한 특수 문자열을 설정해야 합니다. 이 문자열 안에는 CSS의 미디어 쿼리처럼 보이는 조건을 입력하고, 해당 조건에 따라 너비를 설정합니다. 예를 들어, 태블릿의 경우 최대 너비를 768픽셀로 설정하고 너비를 100vw로 설정합니다. 두 번째 조건으로 모바일 디바이스의 경우 최대 너비를 1200픽셀로 설정하고 너비를 50vw로 설정합니다. 나머지 디바이스는 더 큰 화면을 의미하므로 너비를 33vw로 설정합니다. 이렇게 하면 각 이미지가 뷰포트의 세 개 중 하나를 차지하게 됩니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </main>
  );
};

export default Home;
```

이제 여기에는 다른 속성들이 있는데, 선택적으로 설정할 수 있습니다. 다음은 quality입니다. 이 값은 1부터 100 사이의 숫자이며 기본값은 75입니다. 대부분의 경우에는 잘 작동합니다. 그러나 배경 이미지와 같은 경우 더 높은 품질을 원할 수 있습니다. 그럴 때는 100으로 설정할 수 있습니다. 또한 priority라는 속성이 있습니다. 이는 화면에 먼저 표시되어야 하는 이미지를 위한 것입니다. 이 이미지 컴포넌트는 기본적으로 지연 로딩을 사용하므로 이미지가 뷰포트에 보이는 경우에만 가져옵니다. 그러나 먼저 보여져야 하는 이미지가 있는 경우에는 priority를 설정해야 합니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main>
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority
      />
    </main>
  );
};

export default Home;
```

여기 콘솔에서 경고 메시지가 나옵니다. "source"가 채워져 있고 부모 요소의 위치가 "static"이어서 "absolute", "fixed", 또는 "relative" 중 하나로 제공되어야 한다고 경고합니다. "fill" 속성을 사용할 때, 부모 요소의 위치를 "relative"로 설정해야 한다는 것을 의미합니다. 이 문제를 해결하려면 className을 "relative"로 설정하십시오.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main className="relative">
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority
      />
    </main>
  );
};

export default Home;
```

이것은 배경 이미지에 적합한 방법입니다. 그러나 카드에 넣으려면 이미지에 일정한 높이를 할당해야 합니다."
또 다른 경고 메시지가 나옵니다. "source"가 채워져 있고 높이 값이 0인 이유는 이미지의 부모 요소에 높이가 설정되지 않았기 때문입니다. 부모 요소에 높이를 설정해야 합니다. height를 "h-screen"으로 설정하면 됩니다. 이렇게 하면 이미지가 페이지 전체를 차지하게 됩니다.

```tsx
// app/page.tsx
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

const Home = () => {
  return (
    <main className="relative h-screen">
      <Image
        fill
        src="https://bit.ly/react-cover"
        alt="coffee"
        className="obejct-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority
      />
    </main>
  );
};

export default Home;
```

### Using Third-party Scripts

애플리케이션을 제3자 서비스와 통합하는 일은 종종 하나 이상의 페이지에 그들의 스크립트를 추가해야 할 때 발생합니다. 예를 들어, 여기서는 Google Analytics 코드를 보여드리겠습니다. 이제 저희 애플리케이션을 Google Analytics와 통합하는 방법을 보여드리겠습니다.

먼저, 이 코드를 어디에 추가해야 할 지 결정해야 합니다. 하나의 페이지에서만 필요한 경우 해당 페이지(page.tsx)에 추가해야 하고, 그렇지 않으면 여러 페이지에 필요한 경우 레이아웃(layout.tsx)에 추가해야 합니다. 저희 애플리케이션에서는 두 가지 레이아웃이 있으며 하나는 전체 사이트를 위한 루트 레이아웃(app/layout.tsx)이고 다른 하나는 관리자 영역을 위한 것입니다. 이 스크립트는 모든 페이지에서 필요하므로 루트 레이아웃에 추가해야 합니다.

그러니까 여기로 가서 이 코드를 복사하고 Google Analytics에 대한 스크립트는 가능한 한 상단에 있어야 합니다. 따라서 `<html>` 태그 바로 뒤에 코드를 붙여 넣습니다. 이제 몇 가지 조작이 필요합니다. 먼저 주석을 제거해야 합니다. 그리고 `<script>` 태그 대신 Next.js의 `script` 컴포넌트를 사용해야 합니다.

- https://nextjs.org/docs/messages/next-script-for-ga

따라서 다음과 같이 변경합니다. `script` 컴포넌트는 `next/script` 패키지에 정의되어 있으므로 해당 패키지를 추가합니다. 그리고 닫는 태그를 제거하고 자체 닫히는 구문을 사용하도록 변경해야 합니다. 다른 `script` 태그에 대해서도 똑같이 처리해야 합니다. 여기서 에러가 발생합니다. TypeScript 컴파일러는 `dataLayer`에 대해 아무것도 모르기 때문에 전역 객체로 인식하지 못합니다. 이 문제를 해결하기 위해 인라인 스크립트를 사용하면 종종 이러한 종류의 오류가 발생합니다. 그래서 괄호와 역따옴표로(Template Literal) 이를 래핑하는 것이 요령입니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import Script from "next/script";
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
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

여기서 하는 일은 `script` 컴포넌트에 전달하는 자식으로 긴 문자열을 전달하는 것입니다. `script` 컴포넌트는 문자열을 구문 분석하고 JavaScript 코드로 해석합니다. 이제 `script` 컴포넌트에는 다음 값 중 하나가 될 수 있는 `strategy`라는 속성이 있습니다.

- "afterInteractive": 페이지가 상호 작용 가능한 상태가 되면 스크립트가 로드됩니다. 이는 Google Analytics와 같은 스크립트에 적합합니다.
- "beforeInteractive": 스크립트가 페이지에 주입되기 전에 로드됩니다. 이는 봇 탐지기나 쿠키 동의 관리자와 같이 초기에 로드되어야 하는 스크립트에 사용됩니다.
- "lazyOnLoad": 페이지의 모든 리소스가 가져온 후에 스크립트가 로드됩니다. 이는 배경 또는 우선 순위가 낮은 스크립트에 유용합니다.

보통 "afterInteractive" 전략을 사용하면 됩니다. 마지막으로, 스크립트 코드를 정리해야 합니다. 애플리케이션이 커질수록 점점 더 많은 제3자 서비스와 통합하게 되면 레이아웃에 스크립트 컴포넌트가 많아지기 때문에 Google Analytics에 대한 코드를 따로 컴포넌트로 분리하는 것이 좋습니다. 이제 여기서 Google Analytics 코드를 잘 관리할 수 있으므로 필요한 경우 코드를 쉽게 찾을 수 있습니다.

- app/GoogleAnalyticsScript.tsx

```tsx
// app/GoogleAnalyticsScript.tsx
import Script from "next/script";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
```

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

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
      <GoogleAnalyticsScript />
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

### Using Fonts

Next.js 애플리케이션에서 사용자 정의 글꼴을 어떻게 사용할 수 있는지 알아봅시다.

먼저, 루트 레이아웃 파일로 이동하여 이 줄을 확인해보세요. 우리 애플리케이션은 Google에서 제공하는 Inter 글꼴을 사용하고 있습니다.

- app/layout.tsx

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

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
      <GoogleAnalyticsScript />
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

이 모듈에서는 수십 가지의 인기 있는 Google 글꼴이 있습니다. 이제 Inter 글꼴 대신 Roboto와 같은 다른 글꼴을 사용하고 싶다고 가정해 봅시다. 우선 이 글꼴을 가져와야 합니다. 이것은 함수입니다. 객체를 생성하려면 이를 호출해야 합니다. 따라서 Roboto를 호출하고 옵션 객체를 제공합니다. 여기서 최선의 실천 방법은 서브셋을 적용하는 것입니다. 이를 통해 애플리케이션에서 필요한 문자만 포함된 글꼴 크기를 줄일 수 있습니다. 예를 들어, 라틴어 언어를 사용하는 경우 `subset`을 라틴어로 설정해야 합니다. 그런 다음 가중치를 문자열 배열로 설정하여 애플리케이션에서 필요한 글꼴 두께를 지정할 수 있습니다. 여기에서 값은 100부터 900까지 제공할 수 있습니다. 예를 들어 400과 500을 가져올 수 있습니다. 변수 글꼴(예: Open Sans)을 사용하는 경우 가중치를 제공할 필요가 없으므로 변수 글꼴은 다양한 글꼴 스타일을 나타내기 위해 단일 파일을 사용합니다.

이제 Roboto 객체를 생성했습니다. 이 객체에는 레이아웃에서 필요한 `className` 속성이 있습니다. 본문 요소를 확인해보세요. 현재 클래스 이름이 Inter로 설정되어 있습니다. 이제 이것을 Roboto로 변경해야 합니다. 그게 전부입니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
      <GoogleAnalyticsScript />
      <body className={roboto.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
```

브라우저에서 다시 확인해보세요. Roboto 글꼴이 아름답게 나타나는 것을 볼 수 있습니다. 이제 아주 멋진 것을 보여드리겠습니다. 개발 도구를 열어보세요. 네트워크 탭에서 글꼴로 필터링해보세요. 애플리케이션은 현재 세 개의 글꼴 파일을 다운로드하고 있습니다. 하나는 Inter용이고 나머지 두 개는 Roboto 글꼴을 위한 것입니다. Roboto에 대해 두 가지 다른 두께를 요청했기 때문에 두 개의 별도 파일이 다운로드됩니다.

이제 이 파일들이 어떻게 제공되는지 살펴보세요. 요청의 URL을 확인해보세요. 이 요청은 `/static/media` 경로로 보내집니다. 여기서 흥미로운 점은 이러한 글꼴이 Google 글꼴임에도 불구하고 우리 고유의 도메인에서 제공된다는 것입니다. 브라우저가 우리 애플리케이션에서 이러한 파일을 다운로드하고 우리 애플리케이션과 함께 제공합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*B7HakrALibMXngeyoS0nOA.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*jHb6M86A8VCD5co9c0V4pA.png" />

그럼 Google 글꼴을 사용하는 방법을 알아봤습니다. 그러면 Google에 없는 사용자 정의 글꼴은 어떨까요? 동일한 방식으로 로드할 수 있습니다.

파일의 최상단에 `next/font/local`에서 가져온 `localFont`라는 함수를 가져옵니다. 이 함수를 호출하여 객체를 생성합니다. `localFont` 함수를 호출하면 옵션 객체를 전달합니다. 여기서는 데모로 Poppins 글꼴을 사용합니다. Poppins 글꼴을 다운로드하고 이를 시도하려면 퍼블릭 폴더에 이 글꼴을 추가하십시오. 먼저 글꼴을 저장할 `fonts`라는 새 폴더를 만듭니다. 그런 다음 글꼴 파일을 해당 폴더에 드래그 앤 드롭합니다. 이제 소스를 설정합니다. 여기에서는 루트 경로로 이동하려면 `@/`를 사용할 수 없으므로 한 단계 올라가서 `public/fonts`로 이동해야 합니다. 파일 이름을 복사하여 여기에 붙여 넣으세요. 확장자를 꼭 추가하세요. 이제 `localFont` 함수가 객체를 반환합니다. 이 객체를 `Poppins`라는 변수에 저장하고 본문 요소에 적용합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*fQImjW2eAwrMUfa03jo1sw.png" />

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = localFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
});

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
      <GoogleAnalyticsScript />
      <body className={poppins.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
```

이제 Poppins 글꼴이 적용됩니다. 글꼴을 사용하는 방법 중 하나를 설명했습니다. 그러나 이 글꼴을 Tailwind CSS와 함께 사용하려면 어떻게 해야 할까요?

다시 레이아웃으로 돌아가면 글꼴을 생성할 때 `variable` 속성을 설정해야 합니다. 이 속성은 글꼴을 나타내는 사용자 지정 CSS 변수나 사용자 지정 속성의 이름을 설정합니다. 이제 본문 요소를 확인해보세요. 클래스 이름을 `Poppins`로 설정하는 대신 `Poppins.variable`로 설정합니다. 브라우저에서 확인해보면 클래스 이름이 여전히 고유하게 생성되지만 이 클래스에는 더 이상 `font-family` 속성이 없습니다. 대신 `Poppins` 글꼴을 나타내는 사용자 정의 CSS 속성인 `font-Poppins`가 있습니다. 이제 Tailwind CSS와 함께 사용하는 방법을 보여드리겠습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*A9jY5VGQR25kHGWhOADstA.png" />

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = localFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
  variable: "--font-poppins",
});

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
      <GoogleAnalyticsScript />
      <body className={poppins.variable}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
```

레이아웃을 수정할 때 글꼴을 생성할 때 `variable` 속성을 설정해야 합니다. 이 속성은 글꼴을 나타내는 사용자 지정 CSS 변수나 사용자 지정 속성의 이름을 설정합니다. 그런 다음 Tailwind 구성 파일로 이동하여 사용자 정의 글꼴을 등록하고 이를 사용자 정의 CSS 속성에 할당해야 합니다. 이렇게 하면 Tailwind 클래스로 글꼴을 쉽게 적용할 수 있습니다.

```ts
// tailwind.config.ts
extend: {
  fontFamily: {
    poppins: "var(--font-poppins)";
  }
}
```

```tsx
// app/page.tsx
const Home = () => {
  return (
    <main>
      <h1 className="font-poppins">Hello</h1>
    </main>
  );
};

export default Home;
```

만약 모든 h1에 font-poppins를 적용하고 싶은 경우 다음과 같이 작성할 수 있습니다.

```css
/* app/globals.csss */
@layer base {
  h1 {
    @apply font-extrabold text-2xl font-poppins;
  }
}
```

### Search Engine Optimization

이제 검색 엔진 최적화에 대해 이야기해보겠습니다.

루트 레이아웃으로 이동해보죠. 이 파일에서 `metadata`라는 객체를 내보내는데, 여기에는 `title`과 `description` 두 가지 속성이 있습니다. 이것은 스타터 코드의 일부로, 이전에 작성하지 않았습니다.

- app/layout.tsx

이제 메타데이터 객체를 레이아웃 또는 페이지 파일에서 내보낼 때마다 Next.js는 해당 메타데이터 객체를 HTML의 `<head>`에 자동으로 포함시킵니다. 아마도 알겠지만, 검색 엔진은 이러한 메타 태그를 사용하여 콘텐츠를 인덱싱합니다. 따라서 웹 사이트를 검색 엔진 친화적으로 만들려면 각 페이지에 적절한 메타 태그가 있는지 확인해야 합니다.

여기서처럼 open graph와 같은 다른 속성도 있습니다. 이것은 페이지를 소셜 미디어 플랫폼에서 공유할 때 사용됩니다. 최소한 제목과 설명을 제공해야 합니다. 그림, 카테고리 등과 같은 다른 속성도 있습니다. 다른 속성에 대해 자세히 알아보는 것은 여러분에게 맡기겠습니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  openGraph: {
    title: "...",
    description: "...",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <GoogleAnalyticsScript />
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

루트 레이아웃에 이 메타데이터 객체가 있으면 모든 페이지에 이러한 메타 태그가 있을 것입니다. 여기에서 작성자, 카테고리 등과 같은 공통 속성을 설정할 수 있고, 그런 다음 개별 페이지로 이동하여 이러한 값을 덮어쓸 수 있습니다. 예를 들어 홈페이지로 이동하여 다른 메타데이터 객체를 내보낼 수 있습니다. 제대로 스펠링을 확인하십시오. 이것은 Next.js가 찾는 규칙 중 하나입니다.

이것을 지금 상단의 `next` 모듈에서 정의된 메타데이터 유형으로 주석 처리하고, 이전과 마찬가지로 객체로 설정합니다. 여기에서 제목, 설명 등과 같이 루트 레이아웃에서 정의된 값을 덮어쓸 수 있습니다.

```tsx
// app/page.tsx
import { Metadata } from "next";

export default async function Home() {
  return (
    <main>
      <h1 className="font-poppins">Hello</h1>
    </main>
  );
}

export const metadata: Metadata = {
  title: "...",
  description: "...",
};
```

그러나 일부 페이지, 일반적으로 경로나 쿼리 문자열 매개변수가 있는 페이지에서는 메타데이터를 동적으로 생성해야 할 때가 있습니다. 예를 들어 제품을 표시하는 페이지가 있을 수 있습니다. 이 페이지에서는 표시할 제품에 따라 메타데이터가 달라져야 합니다. 이를 위해 메타데이터 객체를 내보내는 대신 `generateMetadata`라는 async 함수를 내보냅니다. 다시 한 번 제대로 스펠링을 확인하세요. 이 함수는 메타데이터의 프로미스를 반환해야 합니다.

일반적으로 API에서 무언가를 가져와서 제품을 얻을 수 있도록 하거나, Prisma를 사용하는 경우 데이터베이스에서 제품을 가져올 수 있습니다. 그런 다음 메타데이터 객체를 반환하고 여기에서 제목을 `product.title`과 같이 설정하고 설명을 `product.description`과 같이 설정합니다.

```tsx
// app/page.tsx
import { Metadata } from "next";

export default async function Home() {
  return (
    <main>
      <h1 className="font-poppins">Hello</h1>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await fetch("");

  return {
    title: "product.title",
    description: "product.description",
  };
}

// export const metadata: Metadata = {
//   title: "...",
//   description: "...",
// };
```

### Lazy Loading

이제 지연 로딩에 대해 이야기해보겠습니다.

지연 로딩(lazy loading)은 사용자 상호작용(예: 버튼 클릭 또는 일정 지점 이상으로 스크롤)과 같은 이벤트를 통해 필요한 때에만 클라이언트 컴포넌트나 서드파티 라이브러리를 로드하는 전략입니다. 실제 예시를 보여드릴게요.

이 강의에서는 앱의 `components` 폴더로 이동하여 `HeavyComponent.tsx`라는 컴포넌트를 생성하겠습니다. 이것은 상당히 복잡한 마크업, 스타일 및 자바스크립트 코드가 있는 무거운 컴포넌트로 가정합시다. 간단한 리액트 컴포넌트를 만들고, 레이블을 `My Heavy Component`로 변경하겠습니다. 이렇게 하면 나중에 자바스크립트 번들에서 컴포넌트를 쉽게 찾을 수 있습니다.

이제 이 `HeavyComponent.tsx`를 홈페이지에 추가해보겠습니다. 홈페이지로 이동하고 다음 코드를 추가합니다.

```tsx
// app/components/HeavyComponent.tsx
const HeavyComponent = () => {
  return <div>My Heavy Component</div>;
};

export default HeavyComponent;
```

```tsx
// app/page.tsx
import { Metadata } from "next";
import HeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <HeavyComponent />
    </main>
  );
}
```

여기까지 작업했으면 브라우저에서 새로고침해보세요. 이제 "HeavyComponent"가 표시됩니다. 이것은 리치 에디터 또는 많은 코드가 있는 컴포넌트와 같을 수 있습니다.

이제 디벨로퍼 도구를 열고 네트워크 탭을 선택한 다음 JavaScript를 필터링하고 페이지 파일을 검토해봅시다. 현재 홈페이지는 서버 컴포넌트로 되어 있어서 페이지 파일이 없습니다. 클라이언트 컴포넌트로 만들려면 먼저 `use client` 지시문을 추가해야 하며, 또한 이 시점에서 `async`를 제거해야 합니다. 이 시점에서 비디오가 만들어진 시점에는 클라이언트 컴포넌트가 `async`일 수 없습니다.

브라우저로 돌아가서 새로 고침해보세요. 이제 페이지 파일이 나타납니다. 이 파일에는 이 페이지를 렌더링하는 데 필요한 모든 자바스크립트 코드가 들어 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*V9zA6HAtzhDZleeXfQkU_w.png" />

```tsx
// app/page.tsx
"use client";

import { Metadata } from "next";
import HeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <HeavyComponent />
    </main>
  );
}
```

이제 번들에서 `My Heavy Component`를 검색해보세요. 보시다시피, `heavy component`가 이곳에 포함되어 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*fsIciQg_h1nT_kH4Ed2Jgg.png" />

그런데 이 무거운 컴포넌트를 즉시 표시하고 싶지 않을 수 있습니다. 사용자가 버튼을 클릭할 때 표시하고 싶을 수도 있습니다. 이렇게 큰 무거운 컴포넌트를 사전에 번들에 포함시키는 이유가 없습니다. 왜냐하면 브라우저가 이 페이지를 렌더링하기 위해 번들을 다운로드하고 실행해야하기 때문입니다. 그러므로 무거운 컴포넌트의 로딩을 미래로 연기할 수 있습니다.

이를 위해 먼저 버튼을 추가하겠습니다. 버튼을 `Show`라고 부르겠습니다. 버튼 클릭 이벤트를 다루기 위해 상태 변수가 필요합니다. `useState` 훅을 사용하여 상태 변수를 만들어 `isVisible`로 초기화하고 `setVisible`로 업데이트합니다.

```tsx
// app/page.tsx
import { Metadata } from "next";
import HeavyComponent from "./components/HeavyComponent";
import { useState } from "react";

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
```

이 구현을 사용하면 무거운 컴포넌트는 여전히 번들에 포함되어 있으며 네트워크 탭을 확인하면 이를 확인할 수 있습니다. 이제 이 컴포넌트를 동적으로 표시하고 있기는 하지만 컴포넌트가 여전히 번들에 포함되어 있습니다. 이 컴포넌트는 페이지 번들에 추가됩니다. 추가된 이유는 HeavyComponent가 다음 코드와 같이 정적으로(Statically) 렌더링 되기 때문입니다.
`import HeavyComponent from "./components/HeavyComponent"`

<img src="https://cdn-images-1.medium.com/max/1200/1*nmK8XA0m27tnJ8WZETVjpg.png" />

이러한 문제를 해결하고 싶을 때 "Lazy Loading"기법을 사용하면됩니다. 이를 구현하기 위해서는 `next/dynamic` 함수를 사용해야 합니다. 먼저 `dynamic` 함수를 가져오고, 무거운 컴포넌트를 정적으로 가져오는 대신 `dynamic` 함수를 사용하여 컴포넌트를 동적으로 가져옵니다.

```tsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./app/components/HeavyComponent"));

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
```

<img src="https://cdn-images-1.medium.com/max/1200/1*zElYcJGvdAMGGieMifpP5g.png" />

이렇게 컴포넌트를 동적으로 가져옵니다. 이것이 컴포넌트를 게으르게 로딩하는 방법입니다. 페이지를 새로고침하고 개발 도구를 열어 번들을 검토해보세요. `My Heavy Component`가 번들에 없음을 알 수 있습니다. 그러나 "Show" 버튼을 클릭하면 컴포넌트를 다운로드하기 위해 서버로 별도의 요청이 전송됩니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*Am0YjJNd4QcWJKyAkqnB5w.png" />

이 경우에는 컴포넌트를 지연로드하는 것이 별다른 의미가 없습니다. 왜냐하면 우리가 한 작업 이후 페이지 크기를 비교하면 성능을 최적화하는 것이 아니라 성능을 저하시키는 것을 알 수 있습니다. 여기서 현재 페이지 크기는 47킬로바이트이지만 `HeavyComponent`를 동적으로 로드하면 더 작아질 것입니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*jvLum6opX3GOl4IvZq1lSA.png" />

새로 고침하면 페이지 파일이 나타납니다. 파일 크기를 살펴보면 39킬로바이트입니다. 작은 컴포넌트를 지연로드하는 것은 의미가 없으므로 이 기술은 크고 무거운 컴포넌트에만 사용해야 합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*LWEdRSYbNYlYiwhnhnpVxQ.png" />

```tsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import HeavyComponent from "./components/HeavyComponent";
import dynamic from "next/dynamic";

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
```

컴포넌트를 동적으로 로드할 때, dynamic 함수의 두 번째 인자로 옵션 객체를 전달할 수 있습니다. 여기에는 이 컴포넌트가 다운로드되는 동안 로딩 인디케이터를 표시하는 로딩 함수를 전달할 수 있습니다.

따라서 로딩을 함수로 설정하고 여기에서 간단한 단락을 반환하여 "로딩 중"이라고 표시합니다. 이제 확인해 보세요. "show"를 클릭하면 먼저 "로딩 중"이 나오고 그런 다음 컴포넌트가 나타납니다.

```tsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("./app/components/HeavyComponent"),
  { loading: () => <p>Loading...</p> }
);

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
```

이 옵션 객체에 있는 다른 속성은 ssr입니다.

기본적으로 클라이언트 컴포넌트를 가져올 때 서버에서 미리 렌더링됩니다. 이것은 때로 문제를 일으킬 수 있습니다. 서버에서 특정 브라우저 API에 액세스하면 사용할 수 없을 수 있으며 오류가 발생할 수 있습니다.

이러한 상황에서는 ssr을 false로 설정하여 서버에서 미리 렌더링(Pre-Rendering)을 비활성화할 수 있습니다.
이것이 컴포넌트를 지연로드하는 방법입니다.

```tsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("./app/components/HeavyComponent"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
```

이제 외부 자바스크립트 라이브러리도 "Lazy Loading"하는 방법에 대해 알아보겠습니다. 예를 들어 Lodash를 설치하고 "Lazy Loading"을 구현해보겠습니다. Lodash는 JavaScript의 유틸리티 라이브러리로, 객체와 배열을 쉽게 조작할 수 있는 다양한 메서드를 제공합니다.

lodash를 사용하면 객체와 배열을 쉽게 조작할 수 있습니다. 예를 들어, 정렬 및 필터링 배열에 대한 여러 메서드를 제공합니다. 따라서 lodash를 설치하고 이 라이브러리에 대한 타입 정의도 설치해야 합니다. 기본적으로 이것들은 여기에 포함되어 있지 않습니다. 따라서 types/lodash를 개발 의존성으로 설치해야 합니다.

```bash
npm install lodash
npm install --save-dev @types/lodash
```

다시 홈 페이지로 돌아가서 이제 더 이상 무거운 컴포넌트가 필요하지 않습니다. lodash를 가져오고 일반적으로 우리는 그것을 "underscore"라고 부르며 lodash에서 가져옵니다.

이제 사용자가 이 버튼을 클릭하면 사용자 목록을 정렬하려고 합니다. 이전에 먼저 무거운 컴포넌트를 제거하고 여기에 함수를 추가합니다. 이 함수에서 사용자 배열을 정의하겠습니다. 사용자에 대한 배열을 정의하고 각 사용자에게 이름을 부여합니다. "c", "b" 및 "a"를 지정하겠습니다. 이 배열을 정렬하기 위해 lodash를 사용하려고 합니다.

이를 위해 여기에서 underscore.orderBy를 호출하고 사용할 정렬을 결정하는 문자열 배열을 전달합니다. 이 경우에는 "name"입니다.

```tsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button
        onClick={() => {
          const users = [{ name: "c" }, { name: "b" }, { name: "a" }];

          const sorted = _.orderBy(users, ["name"]);
          console.log(sorted);
        }}
      >
        Show
      </button>
    </main>
  );
}
```

이로써 정렬된 배열이 반환되며 콘솔에서 확인해 보겠습니다. 정렬되었습니다. 이제 브라우저를 확인해 보세요. 정렬된 배열이 나타납니다. "a", "b", "c"가 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*bJ6S2XjPzfIGsV29LWveow.png" />

lodash를 가져오는 방법으로는 라이브러리 전체를 사전에 페이지 번들에 포함시키고 브라우저가 이 페이지를 렌더링하기 위해 다운로드해야 합니다. 라이브러리를 사전에 필요로 하지 않고 페이지가 무거워지기 시작하면 이제 이것을 지연로드할 수 있습니다.

이를 위해 먼저 이 라인을 제거해야 합니다. 또한 동적 함수는 더 이상 필요하지 않으며 상태 변수도 필요하지 않습니다. lodash를 동적으로 로드하려면 여기에서 import 함수를 호출합니다. 이것을 클릭 핸들러에서 호출하므로 이 라이브러리가 필요한 위치입니다. import 함수를 호출하고 lodash를 전달합니다. 이제 결과를 상수에 저장하겠습니다. 이 객체의 타입을 살펴보겠습니다. 이것은 프로미스를 반환합니다.

프로미스를 기다리면 이러한 속성을 가진 객체가 반환됩니다. 기본값, 버전 등이 있습니다. 이것은 자바스크립트 모듈입니다.

따라서 프로미스를 기다리면 모듈을 얻습니다. 먼저 이것을 비동기로 만들어야 합니다. 이제 괄호로 둘러싸면 그 모듈의 속성에 액세스할 수 있습니다. 여기서 기본 속성을 선택합니다. lodash 모듈에서 내보내진 기본 객체을 선택합니다. 이제 결과를 "underscore"라는 상수에 저장하고 애플리케이션은 이전과 같이 작동할 것입니다.

```jsx
// app/page.tsx
import { Metadata } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";

export default async function Home() {
  const [isVisible, setVisible] = useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <button
        onClick={async () => {
          const x = (await import("lodash")).default;

          const users = [{ name: "c" }, { name: "b" }, { name: "a" }];

          const sorted = _.orderBy(users, ["name"]);
          console.log(sorted);
        }}
      >
        Show
      </button>
    </main>
  );
}
```

이 구현에서는 lodash가 사전에 페이지 번들에 포함되지 않으며 "show" 버튼을 클릭한 후에 로드됩니다. 이를 시연하기 위해 개발자 도구를 열어 보겠습니다. 새로 고침하고 이 페이지 번들을 살펴보겠습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*CP4PzSzkInCktMtCeFhP7A.png" />

orderBy를 검색해 보겠습니다. 이것이 우리가 이 메서드를 호출하는 곳입니다. 그러나 이것은 lodash의 orderBy 구현이 아닙니다. 왜냐하면 이 파일에서 orderBy의 유일한 인스턴스입니다.

이제 "show" 버튼을 클릭하면 백엔드로 별도의 요청이 전송되어 lodash를 로드합니다. 이 번들에는 orderBy의 구현이 포함되어 있습니다. 따라서 orderBy의 인스턴스가 11개 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*Hyp9Af1rSp3kXNNNGH8U6g.png" />

## Optimizations Summary

- Image Component
- Metadata
- Lazy Loading
- Link Component
- Script Component

- Next.js의 Image 컴포넌트는 이미지를 자동으로 최적화하고 여러 형식 및 크기로 제공하여 로딩 시간과 대역폭 사용량을 줄이며 웹 사이트 성능을 향상시킵니다.

- Link 컴포넌트는 Next.js 애플리케이션 내에서 페이지 간 클라이언트 측 네비게이션을 가능하게 하며 전체 페이지 다시 로드를 없애고 사용자 경험을 더 부드럽게 만듭니다.

- Script 컴포넌트를 사용하면 외부 스크립트를 효율적으로 로드하고 관리할 수 있습니다.

- Next.js는 폰트를 자동으로 최적화하고 개인 정보와 성능 향상을 위해 외부 네트워크 요청을 제거합니다.

- 검색 엔진에서 웹 애플리케이션을 더 친화적으로 만들기 위해 페이지와 레이아웃에서 메타데이터 객체를 내보낼 수 있습니다. 페이지에서 내보낸 메타데이터는 레이아웃에서 정의한 메타데이터를 덮어씁니다.

- 레이지 로딩은 페이지를 렌더링하는 데 필요한 JavaScript 양을 줄여 초기 로딩 성능을 향상시키는 데 도움이 됩니다. 레이지 로딩을 사용하면 클라이언트 컴포넌트와 외부 라이브러리의 로딩을 필요할 때까지 지연시킬 수 있습니다.

```tsx
// Creating Metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateMetadata(): Promise<Metadata> {}

// Lazy Loading
import dynamic from "next/dynamic";
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
```

## Deployment

이번 섹션에서는 이제 마지막 섹션으로 여러분께서 Next.js 애플리케이션을 배포하는 방법을 배우게 될 것입니다.

### Preparing for Production

이제 애플리케이션을 배포하기 전에 로컬에서 빌드하여 오류가 없는지 확인해야 합니다. 왜냐하면 배포 중에 빌드 오류가 발생할 수 있기 때문입니다. 그러므로 npm run build 명령을 실행하겠습니다. 모든 것이 올바르게 작동하는지 확인하려면 이 명령을 실행해야 합니다.

```
npm run build
```

좋아요, Google Analytics 스크립트에서 빌드 오류가 발생했습니다. 오류 내용은 "inline 내용을 가진 next/script 컴포넌트는 id 속성을 지정해야 합니다"입니다. 이전에 언급을 잊었던 사항입니다. 그러므로 Google Analytics 컴포넌트로 이동하여 인라인 스크립트를 사용할 때 이 컴포넌트에 고유한 ID를 부여해야 합니다. 우리는 이것을 "Google Analytics"로 지정하겠습니다.

그럼 이제 다시 빌드를 실행하겠습니다.

```
npm run build
```

좋습니다. 다음은 다른 오류가 발생한 파일입니다. 이 파일은 Next.js에서 권장하는 형식과 다른 형식으로 내보냈습니다. Next.js 라우트 파일에서는 get, post, put 및 swr 같은 함수만 내보낼 수 있습니다. 따라서 이 코드를 별도의 모듈로 옮겨야 합니다. "auth-options.ts"라는 새 파일을 만들어 코드를 복사하고, 다른 모듈에서 필요한 모든 가져오기를 추가하십시오.

그리고 이제 라우트 파일에서 auth-options 모듈을 가져와서 모든 가져오기 문을 정리하십니다.

```
import { CredentialsProvider } from 'next-off/auth';
import ... // 다른 가져오기 문
import { authOptions } from './auth-options'; // 이 줄 추가

// 이하 코드 생략
```

그럼 이제 다시 빌드를 실행하겠습니다.

```
npm run build
```

좋습니다. 이전에 있었던 오류는 모두 수정되었습니다. 이제 모든 코드를 Git 리포지토리에 커밋하고, 코드를 GitHub 리포지토리에 푸시해야 합니다. 이제 VS 코드에서 이 작업을 진행할 수 있습니다. 커밋 메시지를 작성하고 코드를 커밋한 다음, GitHub 리포지토리를 만들어 코드를 푸시하십시오.

### Pushing the Code to GitHub

다음 단계는 코드를 GitHub에 푸시(push)하는 것입니다.

만약 Git 또는 GitHub에 익숙하지 않다면, 제 웹사이트에서 6시간 동안만 공부하면 Git 및 GitHub에 대해 필요한 모든 내용을 배울 수 있는 포괄적인 강좌가 있습니다. Git은 전문 소프트웨어 엔지니어로서 일할 때 필수 도구 중 하나이기 때문에 여러분의 도구 세트에 포함해야 하는 도구입니다.

우선 GitHub 웹사이트(github.com)로 이동하십시오. GitHub 계정이 없다면 계정을 생성하고, 로그인한 후에 새 리포지토리를 만들어야 합니다.

새 리포지토리를 만들려면 다음 단계를 따릅니다.

1. GitHub 웹사이트에서 로그인합니다.
2. 로그인한 후, 새 리포지토리를 만들려면 우측 상단의 '+' 아이콘을 클릭합니다.
3. 'New Repository'를 선택합니다.
4. 원하는 리포지토리 이름을 입력하십시오. 예를 들어 'next-course'라고 지정하겠습니다.
5. 기본값을 모두 허용하고 'Create Repository'를 클릭합니다.

이제 이 페이지에서는 로컬 머신에 있는 리포지토리를 GitHub에 있는 리포지토리와 통합하는 방법에 대한 지침을 찾을 수 있습니다. "push an existing repository from the command line"이라는 섹션에서 복사해야 할 명령어를 확인할 수 있습니다.

그러면 VS Code나 터미널 창에서 이 명령어를 붙여넣고 실행하면 모든 코드가 GitHub에 푸시됩니다. 처음 실행할 때 Git은 사용자 이름과 비밀번호를 요청할 것입니다. 사용자 이름에는 GitHub 사용자 이름을 입력하고, 비밀번호에는 방금 복사한 개인 액세스 토큰을 붙여넣으십시오.

이제 모든 코드가 GitHub에 있어야 합니다. 확인해 보겠습니다. GitHub의 리포지토리 목록으로 돌아가 'next-course'와 같은 리포지토리를 검색하면 해당 리포지토리가 표시됩니다. 모든 폴더와 파일이 여기에 있는 것을 확인할 수 있습니다.

### Deploying to Vercel

이제 우리 애플리케이션을 배포하기 위해 몇 가지 옵션이 있습니다. Vercel, AWS, Google Cloud Platform, Heroku 등을 사용할 수 있습니다. 그 중에서도 내 의견으로는 Next.js 애플리케이션을 배포하는 가장 빠르고 최적의 방법은 Vercel을 사용하는 것입니다. 왜냐하면 Vercel은 Next.js를 개발한 회사가 만든 것이기 때문입니다.

먼저 Vercel.com으로 이동하여 계정을 생성하고 로그인하세요. 로그인한 후 대시보드에서 새 프로젝트를 생성할 수 있습니다.

여기서 먼저 git 리포지토리를 가져와야 합니다. 따라서 Vercel을 GitHub와 연결해야 합니다. 연결은 다음과 같이 수행합니다. 이제 모든 git 리포지토리를 볼 수 있는데, 여기서는 'next-course' 리포지토리를 가져올 것입니다.

그런 다음 이 페이지에서 프로젝트 이름을 지정합니다. 자동으로 프레임워크가 선택되고 Next.js와 Vercel 간에 아름다운 통합이 되어 있기 때문에 루트 디렉토리는 변경할 필요가 없습니다. 여기에서는 빌드 및 출력 설정도 볼 수 있습니다. npm run build가 있으므로 GitHub에 푸시할 때마다 Vercel은 최신 코드를 다운로드하고 npmn. 그러나 항상 빌드 오류를 프로덕션 서버가 아닌 로컬 머신에서 확인하는 것이 더 쉽다는 점을 기억하십시오.

또한 여기에서 출력 디렉토리와 패키지 설치 명령을 설정하는 것이 중요하지만, 가장 중요한 것은 환경 변수를 설정하는 것입니다. 프로젝트에는 이 env 파일에 저장된 여러 환경 변수가 있습니다. 예를 들어 데이터베이스 URL이 있습니다. 이 데이터베이스 URL은 로컬 머신에 있는 데이터베이스를 가리킵니다. 그러나 애플리케이션을 프로덕션 환경으로 배포할 때 프로덕션 MySQL 데이터베이스가 필요하며, 클라우드에 있는 프로덕션 MySQL 데이터베이스를 얻어서 데이터베이스 URL로 저장해야 합니다. 불행히도 이 비디오에서는 이를 보여드릴 수 없습니다. 이것은 이 강좌의 범위를 벗어납니다. 그러나 여러분은 프로덕션 환경으로 애플리케이션을 배포하기 위해 무엇을 해야 하는지 알고 있습니다. 마찬가지로, 프로덕션 환경에서 사용할 Cloudinary 클라우드 이름도 필요합니다. 이것은 개발 중에 사용되는 것이 아니라 프로덕션 환경을 위한 별도의 저장소가 필요하다는 것을 의미합니다. 이것 역시 Cloudinary에 대해 이전에 언급한 내용을 보여드렸습니다. 따라서 Cloudinary 콘솔에서 프로덕션 환경을 만들고 환경 이름을 가져와 환경 변수로 저장해야 합니다. 그 외에도 next-auth url, next-auth secret 등의 다른 키도 저장해야 합니다. 그러나 개발 및 프로덕션 환경에 동일한 키를 사용하지 않도록 주의하세요. 로컬 머신에서 키에 액세스한 후 이 키를 사용하면 프로덕션 환경에 영향을 미칠 수 있으므로 개발 및 프로덕션 환경을 위한 서로 다른 환경 변수를 항상 사용하세요.

이제 이 페이지로 돌아가서 여기에서 아무 것도 설정하지 않고 "Deploy"를 클릭합니다. 배포가 실패했습니다. 이것은 매우 흔한 현상이며, 다음 레슨에서 배포 오류를 해결하는 방법을 보여드리겠습니다.

### Troubleshooting Deployment Errors

좋아요, 배포가 오류로 실패했으므로 어떤 문제가 있는지 살펴봅시다.

로그에서 "module not found, can't resolve encoding"이라는 오류 메시지가 나타납니다. 이것이 무엇인지 정확히 알 수 없으므로 비디오를 일시 중지하고 나중에 문제를 해결하겠습니다. 다른 문제도 살펴봅시다.

또 다른 Prisma 관련 오류가 있습니다. Prisma가 이 프로젝트가 Vercel에서 빌드되었으며 의존성이 캐시된 것을 감지했으며, 이로 인해 Prisma 클라이언트가 오래된 것으로 인식된다는 내용입니다. Prisma 클라이언트의 자동 생성이 트리거되지 않았다고 합니다. Prisma CLI를 사용하여 데이터베이스와 통신할 수 있도록 Prisma 클라이언트를 자동 생성하면 각 마이그레이션을 실행할 때마다 Prisma CLI가 자동으로 Prisma 클라이언트를 생성합니다. 그러나 이 오류는 Vercel에서 Prisma 클라이언트의 자동 생성이 자동으로 수행되지 않는다는 것을 의미합니다. 이 문제를 해결하려면 빌드 프로세스 중에 "prisma generate" 명령을 실행해야 합니다.

따라서 빌드 명령을 "npx prisma generate && next build"로 변경해야 합니다. 이 변경을 적용한 후에는 새로운 배포를 진행해야 합니다.

그러나 새로운 배포도 실패했습니다. 이번에도 오류를 살펴보죠. 여전히 "missing api keys" 오류가 발생하고 있는데, 이 오류는 이메일을 보내기 위한 recent API 키가 없다는 내용입니다. 현재 상황에서 recent를 사용할 수 없으므로, 이메일 보내기 코드를 제거해야 합니다. api 폴더에서 "sendEmail" 폴더를 제거하세요. 그런 다음 코드를 커밋하고, 이메일 보내기 코드를 제거한 상태로 다시 푸시합니다.

다시 Vercel로 돌아가서 배포 상태를 확인합니다. 이번에는 정상적으로 배포되길 바랍니다.

드디어 성공했습니다. 이제 애플리케이션이 Vercel에 준비되었습니다. 여기에는 무작위 도메인 이름이 할당되어 있으며, 실제 도메인 이름도 사용할 수 있습니다. 대시보드에서 확인할 수 있습니다. 애플리케이션을 방문하면 사용자 페이지로 이동하여 JSON placeholder에서 가져온 사용자를 볼 수 있습니다. 이제 데이터베이스에 액세스할 수 없습니다. 데이터베이스에 액세스하려면 클라우드에서 MySQL 데이터베이스가 필요합니다. 제 목표는 배포 프로세스 전체와 빌드 오류를 해결하는 방법을 보여주는 것이었습니다.
