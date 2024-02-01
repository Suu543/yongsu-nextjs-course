## Routing and Navigation

이전에 Next.js에서 라우팅의 기본 사항을 배웠습니다. 이 섹션에서는 라우팅과 네비게이션에 대해 더 깊이 알아보겠습니다. 다이나믹한 라우트를 정의하는 방법, 라우트와 쿼리 문자열 매개변수에 접근하는 방법, 레이아웃을 만드는 방법, 로딩 사용자 인터페이스를 표시하고 오류를 처리하는 방법 등을 배우게 됩니다.

- Define dynamic routes
- Access route and query string parameters
- Create layouts
- Show loading UIs
- Handle errors

### Routing Overview

이번 시간에는 Next.js 라우팅에 대해서 학습해보겠습니다. 지금까지 라우팅에 대해 배운 내용을 다시 한 번 정리해보겠습니다. Next.js에는 파일 시스템을 기반으로한 내장 라우터가 존재합니다. 예를 들어, 앱 폴더의 자식으로 users라는 폴더를 생성하고, 내부에 약속된 파일명인 page.tsx에 export default 키워드가 명시된 컴포넌트를 작성하면, "/users" url로 접근했을때 해당 컴포넌트가 렌더링됩니다.

Next.js는 이처럼 특정 폴더에서 공개적으로 접근 가능한 파일을 만들 때 사용하는 "page.tsx" 파일명과 같이, 약속된 파일명이 존재합니다. 몇 가지 소개드리자면, 특정 라우터에만 적용하는 레이아웃이 필요한 경우 layout.tsx라는 파일 사용할 수 있고, 페이지 렌더링에 로딩시 출력되는 컴포넌트를 생성하고 싶다면, loading.tsx 파일을 사용할 수 있고, App 라우터를 활용해서 API를 만들 때 route.tsx 파일을 사용할 수 있고, 렌더링 할 컴포넌트가 없는 경우 not-found.tsx 파일을 사용할 수 있고, 마지막으로 렌더링 과정에 오류가 발생한 경우 error.tsx 파일을 사용할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*gO9WnLE9XP0GrVskrgqLqQ.png" />

하지만 앞서 말했듯이 앱 라우터에서는, "page.tsx" 파일에만 외부에서 공개적으로 접근할 수 있고, 해당 폴더에 "test.css" 파일을 추가해 외부에서, localhost:3000/users/test.css 링크로 접근한다면 404 오류가 발생합니다.

- localhost:3000/users/test.css (오류 발생)

이전 수업에서는 사용자 목록을 표시하는 페이지를 생성했습니다. 하지만 애플리케이션이 성장하면 이 페이지에 모든 코드가 정의되어 있는 경우, 코드가 지나치게 복잡할 수 있기 때문에, 이 경우 테이블을 추출해, "UserTable"과 같은 별도의 컴포넌트로 분리해 코드 유지보수성을 높혀보겠습니다.

이제 프로젝트 폴더로 돌아가서 "users" 폴더에 "UserTable.tsx" 파일을 생성하고, rafce + tab을 이용해서 기본 컴포넌트를 생성하겠습니다. 그리고 기존 Users 컴포넌트에 정의된 사용자 목록을 서버에 요청해 받아오는 로직부터, 받아온 데이터를 HTML 요소에 렌더링하는 부분을 "UserTable" 컴포넌트로 이동시키겠습니다.

그리고 생성한 "UserTable" 컴포넌트를 "users" 컴포넌트의 자식 요소로 전달하겠습니다.

여기서 흥미로운 점은 이 컴포넌트를 일반적 혹은 중앙집중적 목적으로 사용되는 컴포넌트를 저장할 때 사용하는 "components" 폴더로 넣지 않았다는 것입니다. 이는 애플리케이션이 성장하면 이러한 컴포넌트 폴더가 큰 혼란스러움을 초래할 수 있기 때문입니다. 반면 Next.js의 앱 라우터를 사용하면 page.tsx 파일에 export default 키워드로 정의된 컴포넌트를 제외하고는 외부에 노출되지 않기 때문에, 해당 프로젝트 파일에 컴포넌트를 함께 배치함으로써 유지보수성을 높힐 수 있습니다. 하지만 미래에 여러 장소에 사용될 경우에는 components 폴더로 이동시킬 수 있습니다.

이번 시간에는 앞서 학습한 라우팅과 page와 같이 Next.js에서 지정한 파일명에 대해서 알아봤습니다. 다음 시간에는 다이나믹 라우트에 대해서 알아보겠습니다. 감사합니다.

```tsx
// app/users/UserTable.tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
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
  );
};

export default UserTable;
```

```tsx
// app/users/page.tsx
import UserTable from "./UserTable";

const UsersPage = async () => {
  return (
    <>
      <h1>Users</h1>
      <UserTable />
    </>
  );
};

export default UsersPage;
```

### Dynamic Routes

이번 수업 시간에는 동적 라우트에 대해서 알아보겠습니다. 동적 라우트는 매개변수가 포함된 라우트입니다. 이해를 돕고자 실제 형태를 보자면 다음과 같은 형태가 모두 동적 라우트에 해당합니다.
Next.js에서는 다음과 같이 폴더명을 작성할 때 대괄호를 작성하고 대괄호 사이에 매개변수 이름을 작성해 폴더를 생성하면, 동적 라우트를 구현할 수 있습니다.

- users/[id]

이름은 무엇이든 id가 아니라 userId, username 등 무엇이든 구현하려는 로직에 맞게 작성하시면 됩니다. 이제 이렇게 폴더를 하나 생성하고, 이 폴더 안에 페이지 파일을 만들고, 해당 페이지 파일의 컴포넌트를 UserDetailPage로 변경해보겠습니다.

```tsx
const UserDetailPage = () => {
  return <div>UserDetailPage</div>;
};

export default UserDetailPage;
```

이제 이렇게 라우터를 정의하면, 많은 경우에 해당 라우터가 사용하고 있는 매개변수에 대한 접근이 필요합니다. 이 매개변수를 이용해 서버에 데이터를 요청하는 등의 추가 작업이 발생합니다. 매개변수에 접근하려면 우선 이 컴포넌트에 속성(props)를 전달해야합니다. 우선 속성을 전달하고 콘솔을 찍어보겠습니다. 콘손을 찍어보면 속성의 요소로 params 프로퍼티를 확인할 수 있습니다. 다시 props.params를 콘솔에 찍어보면 앞서 정의한 대괄호 사이의 매개변수 이름으로 매개변수가 생성된 것을 확인할 수 있습니다. 이제 이 값에 접근하고 싶은 경우 props.params.id를 통해 접근할 수 있습니다. 이제 어떤 형태로 매개변수가 전달되는지 파악했기 때문에 이 형태에 맞춰 인터페이스를 정의해보겠습니다. 인터페이스 이름을 Props라 칭하고, 내부에 params라는 속성의 값으로써 객체를 가지고, 해당 객체는 숫자 타입의 id만 존재하기 때문에, id를 정의하겠습니다. 그리고 함수의 인자값 props를 작성하고 인터페이스 Props를 적용해보겠습니다. 이제 마우스를 올려보면 인터페이스가 적용되여 보다 쉽게 매개변수를 확인할 수 있습니다. 그리고 필요에 따라 디스트럭쳐링 문법을 통해 params 속성을 바로 가져와 id에 접근할 수 있습니다. 이제 users/1, users/2 등의 url로 접근해보면 라우트 매개변수가 정상적으로 동작하는 것을 확인할 수 있습니다.

```tsx
// app/users/[id]/page.tsx
interface Props {
  params: { id: number };
}

const UserDetailPage = (props: Props) => {
  return <div>UserDetailPage</div>;
};

export default UserDetailPage;
```

그런 다음, 이 컴포넌트에 props를 추가하고, 이를 해체(destructure)하여 params 속성을 바로 가져올 수 있습니다. 또한 params를 더 깊게 구조화(destructure)하여 id 속성을 가져올 수 있습니다.

```tsx
// app/users/[id]/page.tsx
interface Props {
  params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
```

여기서 알아야 할 중요한 점은 이 방법이 페이지에서(page.tsx)만 작동한다는 것입니다. 따라서 이 페이지에서 사용하는 컴포넌트에 이 props를 추가할 수 없습니다. 만약 이 페이지에서 사용자 id를 알아야 하는 컴포넌트가 있다면, 페이지(page.tsx) 수준에서 사용자 id를 가져와서 컴포넌트에 props로 전달해야 합니다.

이제 연습을 문제를 하나 드리겠ㅅ브니다. 만약 다음과 같은 라우트를 만들고 싶다고 가정해보겠습니다.

- /users/id/photos/id

여기에는 두 개의 라우트 매개변수가 있습니다. 여기 id 폴더에서 photos라는 하위 폴더를 추가하고, 또 다른 하위 폴더를 추가해보겠습니다. 이곳에서는 이전에 이미 id 매개변수를 사용했으므로 id 대신 photoId와 같은 다른 이름을 사용해 폴더를 작성해보겠습니다.

- app/users/[id]/photos/[photoId]/page.tsx

그런 다음 여기에 페이지 파일을 추가합니다. "PhotoDetail"이라고 부르거나 "PhotoPage"라고 부를 수 있습니다. 다시 한 번 props 인터페이스를 추가하고, 여기서 params 속성을 가질 것이라고 선언합니다. params에는 id 및 photo id와 같은 두 개의 속성이 있는 객체가 될 것입니다. 다음으로 props를 추가하고, props의 타입을 지정합니다. 또는 이전에 말한대로 이것을 해체하고 props를 가져오고, id 및 photo id를 추가로 해체할 수 있습니다. 이제 작동하는지 확인하기 위해 id 및 photoId를 여기에 렌더링해보겠습니다.

이번 시간에는 동적 라우트에 대해서 알아봤습니다. 다음 시간에는 한 번에 두 개 이상의 매개변수가 필요한 로직에 사용할 수 있는 라우트 정의 방식인 Catch-All Segments에 대해 알아보겠습니다.

```tsx
interface Props {
  params: { id: number; photoId: number };
}

const PhotoPage = (props: Props) => {
  return (
    <div>
      PhotoPage {props.params.id} {props.params.photoId}
    </div>
  );
};

export default PhotoPage;
```

```tsx
interface Props {
  params: { id: number; photoId: number };
}

const PhotoPage = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      PhotoPage {id} {photoId}
    </div>
  );
};

export default PhotoPage;
```

### Catch-all Segments

이번 시간에는 다양한 경로의 매개변수를 동적으로 처리하는 방법에 대해서 알아보겠습니다. 개발을 하다보면 상황에 따라 둘 이상의 매개변수를 한 번에 처리해야 하는 경우가 있습니다. 예를 들어, 모든 제품을 표시하는 페이지를 만든다 생각해보겠습니다. url을 작성해보자면 다음과 같이 구성됩니다. "localhost:3000/products/grocery/dairy/milk". 해당 구조를 구현하려면 일이리 폴더의 폴더의 폴더 형태로 중첩 형태를 구현해야합니다. 그리고 만약 여기서 화면에 출력된 url과 같이 "localhost:3000/products/grocery", "localhost:3000/products/dairy", "localhost:3000/products/grocery/dairy/milk/carrot" 무한대로 url이 늘어날 수 있음을 확인할 수 있습니다. 그래서 이러한 경우를 대비해 "localhost:3000/products" 이라는 기본 url을 기준으로 뒤에 몇 개의 경로가 오던 매개 변수로 간주하는 방법이 존재합니다. 이 방법이 바로 Catch-all Segments입니다. 구현을 통해 어떻게 동작하는지 알아보겠습니다.

우선 앱 폴더에 새 폴더를 하나 생성하겠습니다. 여기서 새폴더의 이름은 products입니다. 그리고 products 폴더의 자식 폴더로 "Catch-All Segment" 문법을 사용해, 대괄호를 작성하고 그 사이에 Spread Operator를 작성하고 매개 변수를 담을 때 사용 할 키값을 정의하겠습니다. 이 경우 별명이라는 의미로 slug로 작성하겠습니다. 이후 해당 "Catch-All Segment" 폴더 형태로 만든 폴더에 page.tsx 파일을 생성하겠습니다. 해당 컴포넌트의 인자값으로 props를 전달하고 콘솔 코드를 작성하고, 브라우저에서 다음 url을 입력해보겠습니다. "localhost:3000/products/grocery/dairy/milk". props의 결과를 확인해보면 폴더의 slug라는 프로퍼티의 값으로 매개변수가 순서대로 배열에 담겨있는 것을 확인할 수 있습니다. 이때 배열에 담긴 모든 값의 형태는 문자열입니다.

- app/products/[...slug]

이제 구조를 파악했으니, 이를 기반으로 interface를 작성해보겠습니다. 우선 Props라는 이름의 interface를 작성하고, 해당 props 객체의 프로퍼티로 params라는 프로퍼티가 존재하고, params 프로퍼티의 자식으로 앞서 정의한 키값인 slug가 있고 여기에는 문자열형태로 변환된 매개변수가 담긴 배열이 있기때문에, 문자열을 담는 배열 타입을 정의하겠습니다. 그리고 다음과 4가지 케이스를 테스트해보겠습니디.

- app/products/[...slug]/page.tsx
- localhost:3000/products/grocery
- localhost:3000/products/grocery/dairy
- localhost:3000/products/grocery/dairy/milk
- localhost:3000/products

여기서 주목할 점은 url: localhost:3000/products에서는 오류가 출력된다는 점입니다. 왜냐하면 Catch-All Segment 문법중 대괄호를 한 쌍만 작성한 경우에는 반드시 하나 이상의 매개변수가 있는 경우에 렌더링되는 규칙이 있습니다. 그렇기때문에 만약 다음 url: localhost:3000/products와 같이 매개변수가 없는 경우에도 렌더링을 하고 싶은경우에는 대괄호를 두쌍을 작성해야합니다. 그럼 두쌍을 작성하고, 다시 테스트해보겠습니다. 모든 url에서 정상적으로 동작하는 것을 확인할 수 있습니다.

- localhost:3000/products/ (ok)
- localhost:3000/products/milk (ok)
- localhost:3000/products/grocery (ok)
- localhost:3000/products/grocery/milk (ok)

이번 시간에는 두개 이상의 매개변수를 처리하는 방법인 Catch-All Segments에 대해 학습했습니다. 다음 시간에는 query-string을 처리하는 방법에 대해서 학습하겠습니다. 감사합니다.

```tsx
// app/products/[...slug]/page.tsx
interface Props {
  params: { slug: string[] };
}

const ProductPage = ({ params }: Props) => {
  return <div>page {params.slug}</div>;
};

export default ProductPage;
```

```tsx
// app/products/[...slug]/page.tsx
interface Props {
  params: { slug: string[] };
}

const ProductPage = ({ params: { slug } }: Props) => {
  return <div>page {slug}</div>;
};

export default ProductPage;
```

다음으로 props를 컴포넌트에 추가하여 즉시 해체할 수 있으므로 slug 속성을 가져올 수 있습니다. 이를 더 깊게 해체하고 slug 속성을 가져올 수도 있습니다. 이제 이를 여기에 렌더링하고 애플리케이션을 테스트해보겠습니다.

- localhost:3000/products/grocery/dairy/milk

따라서 products/grocery/dairy/milk로 이동하면 여기에서 slug 매개변수를 볼 수 있습니다.

이제 이를 사용하려면 적어도 하나의 매개변수를 전달해야 합니다. 따라서 모든 세 개의 매개변수를 제거하고 /products/에 도달하면 404 오류가 발생합니다.

- localhost:3000/products/

slug 매개변수를 선택 사항으로 만들려면 이를 이중 대괄호로 래핑해야 합니다. 그래서 이름을 변경합니다. 여기에 이중 대괄호와 […slug]를 가진 새 폴더를 만듭니다. 그런 다음 페이지를 여기로 이동하고 다른 폴더를 제거합니다.

- app/products/[[...slug]]/page.tsx

이렇게 하면 모든 제품을 볼 수 있는 제품 페이지로 이동하거나, 식료품 제품을 볼 수 있는 제품/식료품으로 이동하거나, 유제품 제품을 필터링하고 더 나아갈 수 있습니다.

- localhost:3000/products/ (ok)
- localhost:3000/products/milk (ok)
- localhost:3000/products/grocery (ok)
- localhost:3000/products/grocery/milk (ok)

### Catch-all Segments Revised

이번 수업에서는 다양한 경로의 매개변수를 동적으로 처리하는 방법 중 하나인 캐치올 세그먼트에 대해 배워보겠습니다. 여러 매개변수를 동시에 처리해야 할 상황을 생각해보세요. 예를 들어, 사용자의 프로필과 게시물을 보여주는 페이지의 URL 구조가 다음과 같다고 가정해보겠습니다.

"/profile/[username]/[postid]"

이런 경우, 캐치올 세그먼트를 사용할 수 있습니다. [username] 아래의 모든 하위 경로를 처리하려면, [...yourParam] 형식으로 폴더를 작성하고, 내부에 page.tsx 파일을 생성합니다. 이 방식을 통해 다양한 URL을 하나의 파일에서 처리할 수 있습니다:

- /profile/john
- /profile/john/post1
- /profile/john/settings/security

이제 구현 방법을 살펴보겠습니다. 'profile'이라는 폴더를 만들고, 그 안에 캐치올 세그먼트 문법을 사용해 [...username] 폴더를 생성한 후, 해당 폴더에 page.tsx 파일을 만듭니다. 인자값으로 props를 전달하고 콘솔로 결과를 확인합니다. 예를 들어 "/profile/john/post1" URL을 입력했을 때, 'username' 프로퍼티의 값으로 매개변수가 배열 형태로 나타납니다.

다음으로는 Props라는 이름의 interface를 작성합니다. 이 interface는 params 프로퍼티를 포함하며, params 아래에는 문자열 배열 형태의 username 키가 있습니다. 다음과 같은 URL 케이스를 테스트해봅니다:

- /profile/john
- /profile/john/post1
- /profile/john/settings/security

모든 경우에서 정상 작동함을 확인할 수 있습니다. 그러나 "/profile" URL을 테스트하면 오류가 발생하는데, 이는 캐치올 세그먼트 문법에서 대괄호를 한 쌍만 정의했을 때 하나 이상의 매개변수가 있어야만 렌더링되는 규칙 때문입니다. 매개변수가 없어도 오류 없이 렌더링하려면 대괄호를 두 쌍으로 작성해야 합니다. 이 변경 후 다음 URL 모두에서 정상 작동함을 확인할 수 있습니다:

- /profile
- /profile/john
- /profile/john/post1
- /profile/john/settings/security

이번 수업에서는 캐치올 세그먼트를 통해 여러 매개변수를 처리하는 방법을 배웠습니다. 다음 시간에는 query-string을 처리하는 방법에 대해 알아보겠습니다. 감사합니다.

### Accessing Query String Parameters

지난 시간에는 Next.js에서 여러 매개변수를 처리하는 Catch-All Segments에 대해 배웠습니다. 이번 시간에는 Next.js에서 쿼리스트링을 추출하는 방법을 살펴보겠습니다. 웹 개발이나 웹 사이트 사용 중 https://example.com/page?name=value&key2=value2와 같은 URL을 보셨을 겁니다. 여기서 ? 뒤에 오는 부분이 바로 쿼리스트링입니다.

실제로 구현할 URL을 살펴봅시다. ? 뒤에 sortOrder라는 키가 있는데, 이는 정렬 기준을 결정할 때 사용됩니다. 이제 이 값에 접근하는 방법을 알아보죠. 이전에 props 인터페이스에 추가한 속성을 활용해 "params" 키로 매개변수에 접근했듯이, 쿼리스트링에는 "searchParams" 키를 사용해야 합니다. 이 키는 Next.js 키워드로 표준적으로 사용되므로 반드시 지켜야 합니다. "searchParams" 키를 이용해 해당 값에 접근하는 과정을 살펴보겠습니다.

app/products/page.tsx 파일로 이동해 ProductPage 컴포넌트에 Props를 작성하고 콘솔에 출력해 보겠습니다. 브라우저로 돌아가 URL을 입력하고 Visual Studio Code로 돌아오면 searchParams 프로퍼티를 확인할 수 있습니다.

이제 구조를 파악했으니, 인터페이스를 작성해보겠습니다. 먼저 searchParams를 정의하고, 그 안에 sortOrder라는 키를 추가해보겠습니다. searchParams는 여러 값을 가질 수 있으므로 객체 형태로 정의하고, 내부에 sortOrder를 프로퍼티로 추가합니다. 이후 destructuring을 사용해 searchParams를 추출하고, div 태그에 값을 렌더링해 보겠습니다. 브라우저에서 정상 작동하는 것을 확인할 수 있습니다.

```tsx
interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      page {slug} {sortOrder}
    </div>
  );
};

export default ProductPage;
```

- localhost:3000/products?sortOrder=name

```tsx
interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      page {slug} {sortOrder}
    </div>
  );
};

export default ProductPage;
```

다음으로는, 실제 API에서 쿼리스트링을 적용하는 방법에 대해 배워보겠습니다. 우리는 JSONPlaceholder API를 사용하여 사용자와 관련된 정보를 추출하고, sortOrder 쿼리 스트링 값에 따라 데이터를 정렬하는 방법을 알아보겠습니다.

사용자의 이름이나 이메일을 기준으로 정보를 정렬하는 상황을 생각해보겠습니다. 예를 들어, sortOrder 값이 'name'이라면 이름 순으로, 'email'이라면 이메일 순으로 데이터를 정렬하고 싶습니다.

이러한 정렬 작업을 직접 구현하는 것도 가능하지만, 이는 상당히 번거로운 작업이 될 수 있습니다. 그래서 우리는 fast-sort라는 정렬에 특화된 모듈을 사용하여 이 과정을 간소화할 것입니다. fast-sort 모듈은 우리가 쉽게 데이터를 정렬할 수 있도록 도와주는 훌륭한 도구입니다.

이 모듈을 사용하면 간단한 명령 몇 개만으로도 원하는 기준에 따라 데이터를 정렬할 수 있습니다. 예를 들어, sortOrder 값이 'name'일 때는 사용자 이름을 기준으로 오름차순 정렬을, 'email'일 때는 이메일을 기준으로 정렬하는 것이 가능해집니다.

이렇게 fast-sort 모듈을 활용하면 우리는 쉽고 빠르게 데이터를 정렬할 수 있으며, 이를 통해 보다 효율적인 웹 애플리케이션을 구현할 수 있습니다.

- fast-sort: https://www.npmjs.com/package/fast-sort

```bash
npm install fast-sort
```

이제 fast-sort 모듈의 다운로드가 완료되었습니다. UserTable 컴포넌트를 수정하여 쿼리스트링 기반의 정렬을 적용해보겠습니다.

테이블의 헤더 부분을 주목해보세요. 사용자에게 정렬 방식을 선택할 수 있는 링크를 제공하려면 여기에 Link 태그를 추가해야 합니다. 이 링크는 사용자가 클릭하면 쿼리스트링에 따라 데이터가 정렬됩니다.

이전 수업에서도 언급했듯이, 왜 우리가 a 태그 대신 Link 태그를 사용하는지 기억하시나요? a 태그는 클릭할 때마다 전체 페이지를 새로 로드하기 때문입니다. 반면, Link 태그는 페이지 전체를 다시 로드하지 않으면서도 원하는 페이지로 라우팅 할 수 있게 해줍니다. 이는 사용자 경험을 크게 향상시키는 중요한 기능입니다.

따라서, Link 태그를 컴포넌트의 상단에 임포트하고, 이를 테이블 헤더 부분에 적용하겠습니다. 첫 번째 링크는 사용자의 이름을 기준으로 데이터를 정렬하는 sortOrder=name이라는 쿼리스트링을 가진 Link를 생성합니다. 그리고 두 번째 링크는 이메일을 기준으로 정렬하는 sortOrder=email 쿼리스트링을 가진 Link를 생성합니다.

이렇게 설정하면 사용자는 이름이나 이메일 중 원하는 기준으로 데이터를 쉽게 정렬할 수 있습니다.

```tsx
// app/user/UserTable.tsx
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
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
  );
};

export default UserTable;
```

이제 Link 태그를 이용해 쿼리스트링을 통한 링크 구성을 완료했습니다. 다음 단계는 사용자의 선택에 따라 데이터를 실제로 정렬하는 것입니다.

먼저 fast-sort 모듈을 프로젝트로 가져와야 합니다. 이 모듈은 빠르고 효율적인 정렬 기능을 제공합니다. 이를 통해 사용자의 정렬 기준에 따라 데이터를 정렬할 수 있습니다.

데이터 정렬을 진행하기 전에, 우리는 선택된 정렬 기준을 알아야 합니다. 이때 쿼리 문자열이 사용됩니다. next.js는 searchParams라는 프로퍼티를 통해 쿼리 문자열에 쉽게 접근할 수 있도록 도와줍니다. 이를 활용하기 위해서는 컴포넌트의 props에 접근하고, 해당 searchParams 프로퍼티에 대한 interface를 설정하여 우리가 추출하려는 sortOrder 값에 접근할 수 있도록 해야 합니다.

정상적으로 코드를 구성했다면, sortOrder의 값을 콘솔에 출력하여 테스트할 수 있습니다. 브라우저에서 페이지를 새로고침하고, 개발자 도구의 콘솔 탭을 확인하면, 선택한 정렬 기준이 콘솔에 올바르게 출력되는지 확인할 수 있습니다. 만약 "email" 기준으로 정렬을 선택했다면, 콘솔에서 "email"이라는 문자열을 확인할 수 있어야 합니다.

정상적인 동작을 확인했다면, 다음 단계로 넘어가기 위한 기반을 마련한 것입니다.

```tsx
// app/users/page.tsx
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  console.log(sortOrder);

  return (
    <>
      <h1>Users</h1>
      <UserTable />
    </>
  );
};

export default UsersPage;
```

이제 정렬 순서를 UserTable 컴포넌트의 props로 전달해야합니다. 전달에 사용되는 프로퍼티 키는 sortOrder입니다.

```tsx
// app/users/page.tsx
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  // console.log(sortOrder);

  return (
    <>
      <h1>Users</h1>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;
```

---

이제, 부모 컴포넌트에서 전달된 `props`의 `sortOrder` 프로퍼티에 접근하는 방법을 구현할 차례입니다. 우선, 코드의 이해를 돕기 위해 `props` 인터페이스를 명확히 정의해보겠습니다. 이를 통해 `sortOrder` 값에 보다 효과적으로 접근할 수 있게 됩니다.

다음으로, 정렬 로직을 구현하기 위해 `fast-sort` 모듈을 사용하겠습니다. 이 모듈은 간단하고 효과적인 방법으로 배열 데이터를 정렬해줍니다. `sortOrder` 값을 기반으로, JSONPlaceholder API로부터 받아온 사용자 데이터를 정렬하는 `sortedUsers`라는 함수를 만들어보겠습니다.

`fast-sort` 모듈은 `sort`라는 함수를 제공합니다. 이 함수에 배열 형태의 데이터를 전달하고, `sort` 함수가 리턴하는 `asc` 함수에 정렬 순서인 `sortOrder` 값을 전달하면, 데이터가 오름차순으로 정렬됩니다. 만약 내림차순으로 정렬하고 싶다면, `desc` 함수를 사용할 수 있습니다.

여기서는 삼항 연산자를 사용해 기본 정렬 방식을 'name'으로 설정하겠습니다. 만약 `sortOrder` 값이 주어지지 않았다면, 기본적으로 이름을 기준으로 정렬하는 것입니다.

마지막 단계로, 정렬된 사용자 정보를 `Table` 태그에 전달하여 동적으로 렌더링하겠습니다. 이렇게 하면 쿼리스트링을 활용한 실제 데이터 정렬 예시를 확인할 수 있습니다. 이로써 사용자는 원하는 기준에 따라 데이터를 쉽게 정렬하고 확인할 수 있게 됩니다.

이번 시간에는 쿼리스트링에 대해서 학습했습니다. 다음 시간에는 레이아웃에 대해서 알아보겠습니다. 감사합니다.

```tsx
// app/users/UserTable.tsx
import Link from "next/link";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
```

### Layouts

지난 시간에는 쿼리스트링에 대해 알아봤습니다. 이번 시간에는 레이아웃에 대해 배워보겠습니다.

레이아웃은 여러 페이지에 공유되는 UI를 구축할 때 사용됩니다. 이전 강의에서 말씀드린 것처럼, 앱 폴더 내에는 모든 페이지에 공통으로 적용되는 루트 레이아웃이 있습니다. 루트 레이아웃은 모든 페이지의 공통 UI를 정의합니다. 여기서는 HTML과 body 요소를 반환하고, body 내에서는 페이지의 children을 동적으로 렌더링합니다. 이것이 루트 레이아웃의 역할입니다.

또한, 중첩된 레이아웃을 만들 수도 있습니다. 예를 들어, 모든 관리자 페이지가 특정 레이아웃을 필요로 한다면, 관리자 영역을 위한 사용자 정의 레이아웃을 생성할 수 있습니다. 이제 어떻게 만드는지 살펴보겠습니다.

먼저, 앱 폴더 내에 'admin'이라는 새로운 폴더를 만듭니다. 그리고 레이아웃 파일인 'layout.tsx'를 추가합니다. 파일명은 반드시 소문자로 입력해야 하며, 이 파일은 Next.js 라우터가 찾는 특수 파일 중 하나입니다.

- app/admin
- app/admin/layout.tsx

다음으로, React 컴포넌트를 구성해보겠습니다. 이 컴포넌트는 `children`이라는 props를 반드시 가져야 합니다. 그렇기에 우선 props의 형태를 정의하는 인터페이스를 선언하겠습니다.

이 인터페이스를 사용하여 props를 컴포넌트에 추가하고, 여기서 `children`을 렌더링합니다. 이 관리자 레이아웃 컴포넌트를 통해, 모든 관리자 페이지에 공통적으로 사용되는 UI 요소를 설정할 수 있습니다. 예컨대, 관리자 페이지의 왼쪽에 사이드바를 포함하려면 해당 영역을 추가하면 됩니다.

이 UI를 꾸미기 위해, Tailwind CSS를 활용하겠습니다. 먼저 부모 컨테이너에 적절한 클래스 이름을 지정합니다. 여기서는 flexbox를 활용하여 메인 컨텐츠와 사이드바를 가로로 배치합니다. `aside` 태그는 사이드바를 나타내는 데 사용됩니다. 그에 따라, 연한 회색 배경, 적절한 패딩, 그리고 오른쪽 여백을 위해 `bg-gray-100`, `p-5`, `mr-5`와 같은 클래스를 적용합니다.

```tsx
interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
```

다음 단계로, `admin` 폴더 내에 새로운 페이지 파일을 생성하겠습니다. 이를 'admin home page'라고 부르기로 하겠습니다. 파일을 생성한 후, 필요한 컴포넌트와 내용을 추가합니다.

파일이 준비되면 브라우저를 열어 `/admin` 주소로 이동합니다. 이 페이지를 통해, 관리자 레이아웃 컴포넌트가 제대로 적용되었는지 확인할 수 있습니다. 결과적으로, `/admin` 주소로 이동하면 왼쪽 사이드바와 함께 페이지 내용이 보여야 합니다. 이렇게 함으로써, 모든 관리자 페이지에 동일한 사이드바를 쉽게 추가할 수 있게 되었습니다.

다음 단계로, /admin 폴더 내에 새로운 페이지 파일을 생성하겠습니다.
먼저, admin 폴더 안에, page.tsx 파일을 생성하고, 기본 컴포넌트를 만들고 'AdminHomePage'로 컴포넌트 이름을 변경하겠습니다. 간단하게 div 태그를 생성하고 내용을 입력하겠습니다.

그 다음, 브라우저를 통해 /admin 주소로 접속합니다. 이렇게 접속하면 관리자 레이아웃 컴포넌트가 올바르게 적용됐는지 확인이 가능합니다. 제대로 작동한다면 /admin 주소에서는 왼쪽 사이드바와 페이지 내용이 함께 표시됩니다. 이 설정을 통해 모든 관리자 페이지에 동일한 사이드바를 간편하게 넣을 수 있습니다.

```tsx
// app/admin/page.tsx
const AdminHomePage = () => {
  return <div>AdminHomePage</div>;
};

export default AdminHomePage;
```

요약하면, 앱 폴더에 있는 루트 레이아웃은 모든 페이지에 대한 공통 UI를 정의하며, admin 폴더에 있는 레이아웃은 모든 관리자 페이지에 대한 공통 UI를 정의합니다.

간단한 연습을 하나 드리겠습니다.

모든 페이지에 네비게이션 바를 추가하도록 하겠습니다. 이 작업은 매우 간단하며 몇 분 만에 완료됩니다. 네비게이션 바는 모든 페이지에 공통적이므로 루트 레이아웃에 구현해야 합니다.

따라서 여기에서 body 요소에 네비게이션 바를 추가하고, 이를 여기에서 사용하기 위해 별도의 컴포넌트로 구현하는 것을 선호합니다. 이렇게 하면 이 컴포넌트의 구조를 복잡하게 만들지 않고 깔끔하게 유지할 수 있습니다.

따라서 'app' 폴더에 'navbar.tsx'라는 컴포넌트를 추가하겠습니다. 이것을 'components' 폴더에 넣을 수도 있지만, 공유 컴포넌트의 리포지토리로 사용하기 위해 여기에 두는 것을 선호합니다. 이 경우에는 루트 레이아웃에서만 네비게이션 바가 필요하므로 루트 레이아웃 옆에 놓겠습니다.

이제 React 컴포넌트를 만들고 다시 Tailwind를 사용하여 스타일을 지정하겠습니다. 여기에서도 flex를 사용하여 항목을 가로로 배치합니다.

네비게이션 바에서 먼저 링크를 추가하고 웹 사이트의 루트에 대한 href를 설정합니다. 실제 애플리케이션에서는 여기에 로고를 렌더링할 것입니다. 지금은 단순하게 'next.js'라고 적겠습니다. 그런 다음 이를 다른 링크와 구분하기 위해 class 이름을 margin-right-5로 지정하겠습니다.

링크로는 사용자 링크만 추가하려고 합니다. 따라서 또 다른 링크를 추가하고 href를 '/users'로 설정하겠습니다. 이제 레이아웃에서 children을 렌더링하기 전에 먼저 네비게이션 바를 렌더링하고, 그런 다음 main 태그에 children을 렌더링하겠습니다. 이것이 더 semantic HTML입니다.

---

```tsx
// app/NavBar.tsx
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex">
      <Link className="mr-5" href="/">
        Next.js
      </Link>

      <Link href="/users">Users</Link>
    </div>
  );
};

export default NavBar;
```

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

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
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

애플리케이션을 테스트해 보겠습니다. 이제 네비게이션 바가 있습니다. 현재 스타일이 없으므로 네비게이션 바 컴포넌트로 이동하여 메인 컨테이너에 스타일을 적용하겠습니다. 동일한 배경 색상(bg-slate-200)을 주겠습니다. 이제 전역 스타일 시트에서 추가한 본문 요소의 패딩을 제거하겠습니다. 이제 패딩을 적용할 수 있습니다. 네비게이션 바에 5의 패딩을 줄 것입니다. 이제 이 네비게이션 바는 모든 페이지에서 볼 수 있습니다. 관리자 페이지나 사용자 페이지와 관계없이 모두 볼 수 있습니다.

```tsx
// app/NavBar.tsx
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex bg-slate-200 p-5">
      <Link className="mr-5" href="/">
        Next.js
      </Link>

      <Link href="/users">Users</Link>
    </div>
  );
};

export default NavBar;
```

여기서 주의할 점은 현재 main 태그(영역)에 패딩이 없다는 것입니다. 그래서 다시 루트 레이아웃으로 돌아가서 여기에 Tailwind 클래스를 적용하겠습니다. 현재 h1 요소는 기본적으로 스타일이 적용되지 않습니다. 기본적으로 Tailwind를 사용할 때 요소는 스타일이 없습니다. 이것을 수정하려면 글로벌 스타일 시트로 이동하여 base, components 및 utilities에 레이어를 가져오기 위한 지시문이 있습니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

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
        <NavBar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
```

이제 기본 레이어의 스타일을 재정의하기 위한 다른 지시문을 사용하겠습니다. '@layer base'라고 입력하고 여기에서 plain HTML 요소인 h1, h2 등에 대한 스타일을 정의할 수 있습니다. 예를 들어 h1에 대해 두 번째 지시문인 'apply'를 사용하고 Tailwind 클래스 중 하나를 적용할 수 있습니다. 여기에서 'font-medium' 또는 'font-bold'를 사용할 수 있습니다. 더 두꺼운 글꼴을 적용하고 크기를 키우려면 'text-2xl'을 사용할 수 있습니다. 이제 h1 요소에 대한 스타일이 적용됩니다. 마지막으로 아래로 여백을 줄 수도 있습니다. 'mb-3'을 사용해보겠습니다.

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
}

@layer base {
  h1 {
    @apply font-extrabold text-2xl mb-3;
  }
}
```

### Navigation

지난 시간에는 웹 페이지의 레이아웃 구성에 대해 배웠습니다. 이번 시간에는 넥스트제이에스의 네비게이션 최적화 방법, 특히 링크 컴포넌트에 대해 알아야 할 세 가지 주요 사항을 알아보겠습니다.

첫 번째 사항은 타겟 페이지의 내용만 다운로드한다.

링크 컴포넌트는 대상 페이지의 내용만 다운로드합니다. 이를 확인하려면 홈 페이지를 열고 네트워크 탭을 열어보겠습니다. 이후 전체 페이지를 새로 고침하면, 백엔드로 대량의 요청이 전송됩니다. 그러나 링크 컴포넌트로 구성된 사용자 페이지로 이동하면, 이전과 달리, 사용자 페이지의 내용에 대한 요청만 보내지고, 그 이외의 네비게이션 바와 같은 다른 파일, 예를 들면, 씨에스에스 및 자바스크립트 파일에 대한 별도의 요청이 발생하지 않는 것을 확인할 수 있습니다.

그리고 똑같은 요청이 두 개 발상하는 경우가 있는 데, 이는 리엑트 버전 18의 기능 중 하나인, 스트릭 모드 때문에 동일한 요청이 두 번 전달됩니다. 이 기능은 개발 모드에서만 활성화되며, 프로덕션에서는 작동하지 않음으로 걱정하지 않으셔도 됩니다. 이후 사용자 페이지 다음에 얼에스시(리엑트 서버 컴포넌트)라는 쿼리 문자열 매개변수가 있습니다. 이는 페이지의 내용을 검색하기 위해 브라우저가 백엔드에 요청을 보내는 단계입니다.

<!-- Link:

네비게이션에 대한 링크 컴포넌트를 구현하는 방법을 배웠습니다. 이제 Link 컴포넌트에 관한 세 가지 중요한 사항이 있습니다.

**첫 번째로**:
Only downloads the content of the target page.

Link 컴포넌트는 대상 페이지의 내용만 다운로드합니다. 이를 확인하려면 홈 페이지를 열고 네트워크 탭을 오른쪽에 열어보겠습니다. 이제 전체 페이지 새로 고침을 수행해 보겠습니다.

새로 고침하면 백엔드로 대량의 요청이 보내집니다. 그러나 사용자 페이지로 이동하면 사용자 페이지의 내용만 받습니다. 네비게이션 바와 같은 다른 파일(예: CSS 및 JavaScript 파일)은 받지 않습니다. 즉, 해당 페이지의 내용만 받습니다. 네트워크 로그를 지우고 사용자 페이지로 이동해 보겠습니다.

이제 해당 페이지의 내용만 포함된 몇 개의 요청만 있습니다. 처음 두 요청은 사실상 동일합니다. React 18의 기능 중 하나인 "strict mode" 때문에 동일한 요청이 두 번 렌더링됩니다. 이 기능은 개발 모드에서만 활성화되며 프로덕션에서는 작동하지 않습니다. 따라서 이에 대해 걱정할 필요가 없습니다. 그런 다음 사용자 페이지 이후에는 rsc(React Server Component)라는 쿼리 문자열 매개변수가 있습니다. 따라서 이 페이지의 내용을 검색하기 위해 브라우저는 백엔드로 이 요청을 보냅니다. 해당 페이지는 React Server Component로 작성되었습니다. -->

두 번째, 뷰포트에 있는 링크를 미리 가져온다:

Pre-fetches links that are in the viewport.

링크 컴포넌트는 뷰포트에 있는 링크를 미리 가져옵니다. 이를 확인하려면 애플리케이션을 프로덕션 모드로 시작해야 합니다. 그런 다음 사용자 페이지로 이동하고 전체 페이지를 새로 고침해 보겠습니다.

```bash
npm run build
# production mode
npm start
```

프로덕션 모드에서 페이지를 미리 가져오려고 시도하는 것으로 인해 홈 페이지 및 사용자 페이지를 검색하는 데 사용되는 여러 요청이 보내집니다. 요청 중 클릭하지 않았지만 소트오더 링크에 대한 요청이 보내진 것을 확인할 수 있습니다. 이는 넥스트제이에스 내부적으로 렌더링된 화면에 존재하는 모든 링크를 사전에 가져와 성능을 향상시키는 데 도움이 되기 때문입니다.

**세 번째로**

세 번째 사항은 클라이언트에서 페이지를 캐싱한다.

애플리케이션에서 이동하면 넥스트제이에스가 페이지 내용을 클라이언트 캐시에 저장합니다. 이전에 본 페이지로 이동할 때 다시 백엔드로 요청을 보내지 않으며 클라이언트 캐시에서 페이지를 가져옵니다. 클라이언트 캐시는 세션 동안만 유효하며 전체 페이지 새로 고침 시 클리어됩니다.

이렇게 클라이언트 캐시를 사용하여 페이지를 효율적으로 가져오고 네비게이션을 최적화할 수 있습니다.

처음에 다음 유얼엘에 접속하고 localhost:3000/users, 이후 새로고침없이 넥스트제이에스 링크 컴포넌트를 클릭할 때, 네트워크 탭을 살펴보면 추가적인 요청이 없는 것을 확인할 수 있습니다.

- => Clear Log ==> Next.js 링크 클릭 ==> 추가적인 요청x

요약하면 넥스트제이에스의 링크 컴포넌트는 타겟 페이지의 내용만 다운로드하며, 화면에 보이는 링크에 대해 미리 데이터를 가져와서 준비하고, 방문한 페이지의 내용을 클라이언트 측에서 캐싱합니다. 이런 방식으로 넥스트제이에스는 사용자의 네비게이션 경험을 빠르고 효율적으로 만들어 줍니다. 다음 강의에서는 코드를 이용한 네비게이션, 즉 프로그래메틱 네비게이션에 대해 알아보도록 하겠습니다. 감사합니다.

---

지난 시간에는 웹 페이지의 레이아웃 구성에 대해 배웠습니다. 이번 시간에는 넥스트제이에스의 네비게이션 최적화 방법, 특히 링크 컴포넌트에 대해 알아야 할 세 가지 주요 사항을 알아보겠습니다.

첫 번째 사항은 타겟 페이지의 내용만 다운로드한다.

링크 컴포넌트는 대상 페이지의 내용만 다운로드합니다. 이를 확인하려면 홈 페이지를 열고 네트워크 탭을 열어보겠습니다. 이후 전체 페이지를 새로 고침하면, 백엔드로 대량의 요청이 전송됩니다. 그러나 링크 컴포넌트로 구성된 사용자 페이지로 이동하면, 이전과 달리, 사용자 페이지의 내용에 대한 요청만 보내지고, 그 이외의 네비게이션 바와 같은 다른 파일, 예를 들면, 씨에스에스 및 자바스크립트 파일에 대한 별도의 요청이 발생하지 않는 것을 확인할 수 있습니다.

그리고 똑같은 요청이 두 개 발상하는 경우가 있는 데, 이는 리엑트 버전 18의 기능 중 하나인, 스트릭 모드 때문에 동일한 요청이 두 번 전달됩니다. 이 기능은 개발 모드에서만 활성화되며, 프로덕션에서는 작동하지 않음으로 걱정하지 않으셔도 됩니다. 이후 사용자 페이지 다음에 얼에스시(리엑트 서버 컴포넌트)라는 쿼리 문자열 매개변수가 있습니다. 이는 페이지의 내용을 검색하기 위해 브라우저가 백엔드에 요청을 보내는 단계입니다.

두 번째, 뷰포트에 있는 링크를 미리 가져온다:

Pre-fetches links that are in the viewport.

링크 컴포넌트는 뷰포트에 있는 링크를 미리 가져옵니다. 이를 확인하려면 애플리케이션을 프로덕션 모드로 시작해야 합니다. 그런 다음 사용자 페이지로 이동하고 전체 페이지를 새로 고침해 보겠습니다.

```bash
npm run build
# production mode
npm start
```

프로덕션 모드에서 페이지를 미리 가져오려고 시도하는 것으로 인해 홈 페이지 및 사용자 페이지를 검색하는 데 사용되는 여러 요청이 보내집니다. 요청 중 클릭하지 않았지만 소트오더 링크에 대한 요청이 보내진 것을 확인할 수 있습니다. 이는 넥스트제이에스 내부적으로 렌더링된 화면에 존재하는 모든 링크를 사전에 가져와 성능을 향상시키는 데 도움이 되기 때문입니다.

세 번째 사항은 클라이언트에서 페이지를 캐싱한다.

애플리케이션에서 이동하면 넥스트제이에스가 페이지 내용을 클라이언트 캐시에 저장합니다. 이전에 본 페이지로 이동할 때 다시 백엔드로 요청을 보내지 않으며 클라이언트 캐시에서 페이지를 가져옵니다. 클라이언트 캐시는 세션 동안만 유효하며 전체 페이지 새로 고침 시 클리어됩니다.

이렇게 클라이언트 캐시를 사용하여 페이지를 효율적으로 가져오고 네비게이션을 최적화할 수 있습니다.

처음에 다음 유얼엘에 접속하고 localhost:3000/users, 이후 새로고침없이 넥스트제이에스 링크 컴포넌트를 클릭할 때, 네트워크 탭을 살펴보면 추가적인 요청이 없는 것을 확인할 수 있습니다.

- => Clear Log ==> Next.js 링크 클릭 ==> 추가적인 요청x

요약하면 넥스트제이에스의 링크 컴포넌트는 타겟 페이지의 내용만 다운로드하며, 화면에 보이는 링크에 대해 미리 데이터를 가져와서 준비하고, 방문한 페이지의 내용을 클라이언트 측에서 캐싱합니다. 이런 방식으로 넥스트제이에스는 사용자의 네비게이션 경험을 빠르고 효율적으로 만들어 줍니다. 다음 강의에서는 코드를 이용한 네비게이션, 즉 프로그래메틱 네비게이션에 대해 알아보도록 하겠습니다. 감사합니다.

### Programmatic Navigation

지난 시간에는 링크 컴포넌트에 대해 알아봤습니다. 이번시간에는 프로그래메틱 네비게이션에 대해 알아보겠습니다.

가끔은 버튼을 클릭하거나, 양식을 제출한 결과로 사용자를 새 페이지로 이동해야 할 때가 있습니다. 이를 ＂프로그래밍 방식 탐색(programmatic navigation)＂이라고 합니다. 앞서 소개드린 링크 컴포넌트는 서버사이드 렌더링 방식으로, 렌더링 되는 컴포넌트에서만 사용할 수 있지만, 양식 제출 등의 클라이언트 단에서 이뤄져야 하는 작업의 경우, 클라이언트 사이드 렌더링 방식을 동작하기 때문에, 페이지 이동 시 다른 접근 방식이 필요합니다. 이 경우 사용하는 방식을 ＂프로그래밍 방식 탐색(programmatic navigation)＂이라고 합니다.

먼저, 변경 내용을 확인하기 위해 개발 모드에서 애플리케이션을 실행하도록 터미널로 돌아가 먼저 실행해봅시다.

```bash
npm run dev
```

이제 사용자 페이지로 이동해, 다음 유얼엘(/user/new)로 이동하는 링크를 생성하고, 내용은 뉴 유저라고 표시하겠습니다.

그리고 이 링크를 버튼처럼 보이도록, 클래스이름에 비티엔과 비티엔프라이머리를 추가하겠습니다.

<!-- [] "/users/page"로 이동하면 이 테이블 위에 링크를 추가하겠습니다. 링크의 href를 "/user/new"로 설정하고, 여기에서 "New User"라고 표시합니다. -->

<!-- 이를 버튼처럼 보이도록 하려면 class name을 "btn"으로 설정하면 됩니다. "btn-primary"을 사용하여 파란색으로 표시할 수도 있지만 여기에서는 일반 버튼을 사용하는 것을 선호합니다. 이제 사용자 페이지에 이 버튼이 추가되었습니다. -->

```tsx
// app/users/page.tsx
import Link from "next/link";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  // console.log(sortOrder);

  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;
```

그리고 다음 유얼엘로 이동하겠습니다. 이후 컴포넌트 렌더링 컨텐츠의 일부로 버튼을 추가하겠습니다. 버튼에는 비티엔과 비티엔 프라이머리 클래스를 추가하고, 내용은 크리에이트로 설정하겠습니다. 또한 이 버튼은 클릭이벤트 혹은 양식 제출 이벤트를 처리할 수 있도록, 온클릭 프로퍼티를 추가하겠습니다. 하지만 서버 컴포넌트에서는, 온클릭과 같은 브라우저 이벤트를 처리할 수 없기 때문에, 파일 상단에 유즈 클라이언트 지시문을 작성하겠습니다. 또한 링크 컴포넌트는 클라이언트 컴포넌트에서 사용할 수 없기 때문에, 이 대안으로 라우터 객체를 사용하겠습니다.

라우터 객체에 접근하려면, 유즈라우터 훅을 사용해야합니다. 유즈라우터 훅은 넥스트/라우터 모듈에서 가져와야합니다. 이 모듈을 통해 라우터 객체를 가져오겠습니다. 하지만 이 방식은 이전의 페이지 라우터에서 사용하던 방식이기 때문에, 오류가 출력됩니다. 이를 해결하려면 앱 라우터에서 사용하는 넥스트/네비게이션 모듈에서 유즈라우터 훅을 가져오겠습니다. 코드를 수정하고 다음 코드를 실행하면 정상적으로 동작하는 것을 확인할 수 있습니다.

마지막 단계로, 크리에이트 버튼을 클릭하면, 사용자 페이지로 전환될 수 있도록, 유즈라우터 객체를 통해 인스턴스를 생성하고, 해당 라우터가 제공하는 푸시라는 메소드를 이용해 목적한 유얼엘인 사용자 페이지로 이동해보겠습니다. 테스트해보겠습니다. 정상적으로 동작하는 것을 확인할 수 있습니다. 이것이 바로 프로그래메틱 네비게이션입니다.

요약하자면 서버 컴포넌트는 링크 컴포넌트로 네비게이션을 구현하고, 클라이언트 컴포넌트는 라우터 객체를 통해 네비게이션을 구현하고, 이러한 방식을 프로그래메틱 네비게이션입니다. 다음 시간에는 로딩을 출력하는 방법에대해 알아보겠습니다. 감사합니다.

<!-- 다음으로, 이 페이지에 버튼을 추가해 보겠습니다. 양식의 일부로 이 버튼을 추가하는 것이 좋을 것 같습니다. 사용자가 양식을 제출하면 사용자 페이지로 이동하도록 하려면 "/user/new/page"로 이동하고 버튼을 추가합니다. -->

<!-- 버튼의 class name을 "btn" 및 "btn-primary"로 설정하고 레이블을 "생성"으로 설정합니다. 이 버튼이 양식의 일부인 경우 버튼을 클릭하거나 양식을 제출할 때 이 버튼의 클릭 이벤트나 양식 제출 이벤트를 처리해야 합니다. 그러기 위해서는 클라이언트 컴포넌트로 변환해야 합니다. 서버 컴포넌트에서 브라우저 이벤트를 처리할 수 없기 때문입니다. -->

<!-- 따라서 상단에서 "client" 지시문을 사용하고 클릭 이벤트를 처리하려면 함수로 설정해야 합니다. 이 함수 내에서 "link" 컴포넌트를 사용할 수 없으므로 프로그래밍 방식 탐색을 사용합니다. 이를 위해 "router" 객체를 사용할 것입니다. -->

"router" 객체에 액세스하려면 "useRouter" 훅을 사용합니다. "useRouter"는 "next/router"에서 가져와야 합니다. 이 "useRouter" 훅을 사용하면 "router"를 얻을 수 있습니다. 하지만 이 방법은 old pages router 방식에서 사용하던 것이기 때문에 다음 코드를 실행하면 오류가 출력됩니다.

```tsx
// app/users/new/page.tsx
"use client";

import { useRouter } from "next/router";

const NewUserPage = () => {
  const router = useRouter();

  return (
    <button className="btn btn-primary" onClick={() => {}}>
      Create
    </button>
  );
};

export default NewUserPage;
```

app router에서는 "useRouter" 훅을 "next/navigation"에서 가져와야합니다. 수정 후 다음 코드를 실행하면 정상적으로 동작합니다.

```tsx
// app/users/new/page.tsx
"use client";

import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();

  return (
    <button className="btn btn-primary" onClick={() => {}}>
      Create
    </button>
  );
};

export default NewUserPage;
```

마지막 단계로, 이 버튼을 클릭하면 사용자 페이지로 이동해야 합니다. 따라서 클릭 핸들러로 돌아가면 "router.push"를 호출하고 대상 페이지의 URL을 전달하면 됩니다. 대상 페이지 URL은 "/users"입니다. 이제 양식을 제출하면 사용자 페이지로 돌아갑니다. 이것이 바로 프로그래밍 방식 탐색입니다.

```tsx
// app/users/new/page.tsx
"use client";

import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter();

  return (
    <button className="btn btn-primary" onClick={() => router.push("/users")}>
      Create
    </button>
  );
};

export default NewUserPage;
```

### Showing Loading UIs

(대본)
지난 수업에서는 프로그래매틱 네비게이션에 대해 배웠습니다. 이번 시간에는 렌더링 과정에서 로딩유아이를 표시하는 방법에 대해 알아보겠습니다.

리엑트 버전 18에서는 서스펜스를 활용하여 컴포넌트가 렌더링되는 동안 로딩유아이를 표시할 수 있습니다. 이 기능이 실제로 어떻게 동작하는지 함께 알아보겠습니다. 먼저 사용자 페이지로 이동한 뒤, 리엑트에서 제공하는 서스펜스 모듈을 가져와 반환하려는 컴포넌트를 서스펜스 태그로 감싸 보겠습니다. 그리고 여기에 뻘백프로퍼티를 설정해, 사용자테이블이 렌더링되는 동안 대체유아이가 표시될 수 있도록 작성해보겠습니다. 이 대체 유아이는 일반적으로 간단한 에이치티엠엘요소인 로딩메세지를 사용하거나, 로딩아이콘 혹은 스켈레톤을 렌더링하는 컴포넌트로 설정할 수 있습니다.

---

React 18에서는 컴포넌트가 렌더링되는 동안 로딩유아이를 표시할 수 있는 Suspense라는 새로운 기능이 있습니다. 이것을 실제로 어떻게 사용하는지 살펴보겠습니다.

먼저 사용자 페이지(UsersPage)로 이동해 보겠습니다.

이 페이지에서는 사용자 테이블을 Suspense 컴포넌트로 감싸서 데이터를 가져오기를 기다리는 동안 대체 UI를 표시할 수 있습니다.

다시 페이지로 돌아와서, 여기에 Suspense 컴포넌트를 사용하고 사용자 테이블을 감쌉니다. 그리고 여기에서 fallback 프로퍼티를 설정하여 사용자 테이블이 렌더링되는 동안 대체 UI를 표시할 수 있습니다. 이 대체 UI로 간단한 HTML 요소인 "로딩" 메시지를 사용하거나, 스피너나 스켈레톤을 렌더링하는 컴포넌트로 설정할 수 있습니다.

```tsx
// app/users/page.tsx
import Link from "next/link";
import UserTable from "./UserTable";
import { Suspense } from "react";

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  // console.log(sortOrder);

  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
```

(대본)

이제 브라우저로 돌아가 페이지를 새로고침하면, 로딩메세지가 잠시 표시되는 것을 볼 수 있습니다. 또한 크롬개발도구에서 리엑트데브툴스를 설치하면 서스펜스를 확인할 수 있습니다. 다음 링크에서 설치할 수 있습니다. 설치가 끝났으면, 개발자 도구에서 서스펜스 컴포넌트를 검색해보면, 서스펜디드값이 뻘스가 아닌 것을 볼 수 있습니다. 이는 데이터가 도착했으며, 최종페이지가 렌더링된 상태를 의미합니다. 하지만, 이 아이콘을 클릭해 서스펜스상태로 변경할 수 있습니다. 이렇게하고, 페이지 새로고침을 누르면, 로딩메시지가 표시됩니다. 이는 사용자가 컴포넌트 렌더링을 기다리는 동안, 사용자 경험을 개선할 수 있는 유용한기술입니다.

다시 언서스펜드 버튼을 클릭해 복귀해보겠습니다. 그 다음 네트워크 탭으로 이동해 페이지 새로고침을 누르면, 서버에서 받은 문서를 확인할 수 있습니다. 여기에 로딩메세지가 포함된 것을 확인할 수 있습니다. 이는 검색엔진봇이 데이터를 볼 수 없어 검색엔진최적화에 영향을 미칠 것 같지만, 실제로는 그렇지 않습니다. 검색엔진봇이보는 페이지는 로딩메세지가 표시된 문서입니다. 서버는 이 페이지를 생성하고 클라이언트로 보냈지만, 연결을 종료하지는 않습니다. 대신에, 사용자테이블컴포넌트가 렌더링될 때까지 대기하고, 추가 데이터를 클라이언트로 전달합니다. 그리고 이러한 방식을 스트리밍이라고합니다. 비디오나 오디오를 송출할 때와 동일한 기술입니다. 동일한 로직으로 에이치티엠엘콘텐츠로 스트리밍할 수 있습니다.

이제 서스펜스의 동작 방식을 이해했습니다. 그렇다면, 특정 페이지에 여러 개의 서스펜스 컴포넌트를 가지거나, 모든 페이지에 공통의 서스펜스 컴포넌트를 가지고 싶은 경우에 어떻게해야할까요? 이에 적용할 수 있는 두 가지 방법이 있습니다. 첫번째 방법은 루트레이아웃 컴포넌트에 모든 자식 컴포넌트를 서스펜스로 감싸는 방법입니다. 이는 간단하게 자식컴포넌트를 서스펜스로감싸고 원하는 로딩유아이를 뻘백 프로퍼티에 전달하면됩니다. 이렇게하면, 페이지 간 이동시 로딩메세지가 표시되지만, 매우 빠르게 발생하므로 보이지 않을 수 있습니다. 또한 더 복잡한 앱에서는 페이지가 무겁게 로딩될 때, 로딩메세지를 추가하면 사용자 경험이 향상됩니다.

---

이제 브라우저로 돌아가 페이지를 새로 고침하면, 로딩 메시지가 잠시 표시되는 것을 볼 수 있습니다. 또한 Chrome 개발 도구에서 Suspense를 토글할 수도 있습니다. 개발 도구를 열고 "components" 탭으로 이동하세요. 이 탭이 없는 경우 React Dev Tools를 설치해야 합니다. React Dev Tools는 Chrome 확장 프로그램입니다. 이 링크에서 설치할 수 있습니다.

설치한 개발자 도구에서 Suspense 컴포넌트를 검색하세요. 여기에는 Suspense 컴포넌트가 있습니다. 오른쪽에 보면 "suspended: false" 상태가 아닌 것을 볼 수 있습니다. 이것은 데이터가 도착했으며 최종 페이지가 렌더링된 상태입니다. 하지만 이 아이콘을 클릭하여 Suspense 상태로 변경할 수 있습니다. 이렇게 하면 페이지를 새로 고치면 로딩 메시지가 표시됩니다. 이것은 사용자가 데이터를 기다릴 때 어떤 경험을 할 것인지를 확인하는 매우 유용한 기술입니다.

이제 "unsuspend" 버튼을 클릭하여 다시 복귀하세요. 그런 다음 네트워크 탭으로 이동하여 페이지를 새로 고치고 서버에서 받은 문서를 확인해 보겠습니다. 이것이 서버가 생성한 페이지입니다. 여기에 로딩 메시지가 포함되어 있습니다. 이것이 검색 엔진 봇이 데이터를 볼 수 없어서 SEO에 영향을 미칠 것 같지만, 실제로는 그렇지 않습니다. 이것이 클라이언트가 초기에 볼 내용입니다. 서버는 이 페이지를 생성하고 클라이언트로 보냈지만 연결을 종료하지 않습니다. 대신 사용자 테이블 컴포넌트가 렌더링될 때까지 대기하고 추가 데이터를 클라이언트로 보냅니다. 이것을 스트리밍(streaming)이라고 합니다. 비디오나 오디오 스트리밍을 할 때와 동일한 기술입니다. HTML 콘텐츠도 스트리밍할 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*F5FEZ2E9Pz63LmjKwbda-g.png" />

Suspense의 동작 방식을 이해했습니다. 특정 페이지에서 여러 개의 Suspense 컴포넌트나 Suspense 경계를 가질 수 있습니다. 그런데 만약 모든 페이지를 Suspense 경계로 둘려싸고 싶다면 어떻게 해야 할까요? 이를 위한 두 가지 방법이 있습니다.

첫 번째 방법은 루트 레이아웃 컴포넌트로 이동하고 자식 컴포넌트를 Suspense 컴포넌트로 감쌀 수 있습니다. 여기에 Suspense를 추가하고 fallback로 현재는 단순한 단락을 추가하여 "로딩" 메시지를 표시할 수 있습니다. 이렇게 하면 페이지 간 이동 시 로딩 메시지가 표시되지만, 이것은 매우 빠르게 발생하므로 보이지 않을 수 있습니다. 더 복잡한 애플리케이션에서 페이지가 무겁게 로딩될 때 로딩 메시지를 추가하면 사용자 경험이 향상됩니다.

```tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Suspense } from "react";

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
        <NavBar />
        <main className="p-5">
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}
```

대본

서스펜스방법보다 훨씬 더 직관적으로 간단한 두번째 방법이 존재합니다. 이는 넥스트제이에스에서 제공하는 로딩닷티에스엑스 파일을 사용하는 것입니다. 이는 페이지닷티에스엑스 혹은 레이아웃닷티에스엑스와 같이 넥스트제이에스에서 약속한 파일명입니다. 이를 이용해 모든 컴포넌트에 공통으로 로딩유아이를 작성하고 싶은 경우, 레이아웃과 동일하게 앱 폴더내에 로딩닷티에스엑스 파일을 생성하고 컴포넌트를 렌더링하면됩니다. 그리고 만약 특정 라우터에, 특정 로딩유아이를 출력하고 싶은 경우, 해당 라우터 폴더에 로딩닷티에스엑스 파일을 생성하면, 특정 라우터에 대한 로딩유아이를 출력할 수 있습니다. 공통 로딩유아이를 작성해 테스트해보겠습니다. 정상적으로 잘 작동하는 것을 확인할 수 있습니다.

이제 실제 웹사이트에서 사용하는 것 처럼, 로딩애니메이션을 표시하는 방법을 알아보겠습니다. 앞서 학습한 데이지유아이에서는 웹사이트 로딩에 사용할 수 있는 로딩애니메이션을 제공합니다. 웹사이트를 통해 같이 살펴보겠습니다. 다양한 모양의 로딩 애니메이션 스타일이 있는 것을 확인할 수 있습니다. 이번 수업에서는 스피너애니메이션을 사용해보겠습니다. 해당 스타일의 에이치티엠엘마크업 또는 제이에스엑스코드를 복사해 로딩닷티에스엑스 파일에 붙여넣겠습니다. 이제 페이지를 새로고침하면 로딩 애니메이션을 확인할 수 있습니다.

이번 시간에는 로딩유아이를 처리하는 방법에 대해 알아봤습니다. 다음 시간에는 오류 처리에 대해 알아보겠습니다.
ㅊ

---

두 번째 방법은 또 다른 특수 파일인 "loading 파일"을 사용하는 것입니다. 지금까지 페이지와 레이아웃 파일에 대해 이야기했지만 "loading 파일"도 살펴보겠습니다. 루트 레이아웃 옆에 "loading 파일"을 추가할 수 있습니다. 이 파일은 "app" 폴더 안에 위치해야 합니다. 여기에 "loading 파일"을 추가하고 확장자는 js, jsx 또는 tsx가 될 수 있습니다. 이 컴포넌트에서는 페이지가 렌더링되는 동안 표시될 React 컴포넌트를 생성하고 내보냅니다. 이 예제에서는 "로딩..." 메시지를 렌더링합니다. 이제 페이지 간 이동 시 로딩 메시지를 볼 수 있습니다.

```tsx
// app/loading.tsx
const Loading = () => {
  return <div>Loading...</div>;
};

export default Loading;
```

이제 DaisyUI를 사용하여 로딩 애니메이션을 표시하는 방법을 알아보겠습니다. DaisyUI 웹 사이트로 이동하여 "components" 페이지로 이동한 다음 "loading"을 검색합니다. 여기에는 다양한 로딩 애니메이션 스타일이 있습니다. 예를 들어 스피너, 점, 링, 공 등이 있습니다. 여기서는 스피너를 사용하겠습니다. 해당 스타일의 HTML 마크업 또는 JSX 코드를 복사하여 페이지에 붙여넣습니다. 이제 페이지를 새로 고침하면 더 나은 로딩 애니메이션을 볼 수 있습니다.

- Loading: https://daisyui.com/components/loading/

```tsx
// app/loading.tsx
const Loading = () => {
  return <span className="loading loading-spinner loading-md"></span>;
};

export default Loading;
```

이제 로딩 UI에 대한 이야기를 마쳤습니다. 다음에는 오류 처리에 대해 이야기하겠습니다.

### Handling Not Found Errors

지난 시간에는 로딩을 처리하는 방법에 대해 알아봤습니다. 이번에는 요청한 페이지가 존재하지 않을 때, 오류를 처리하는 방법에 대해 알아보겠습니다.

넥스트제이에스는 기본적으로 페이지가 존재하지 않는 경우에 사공사 페이지가 출력됩니다. 그러나 상황에 따라, 이를 직접 정의할 수 있습니다.

이 또한 넥스트제이에스에서 명시한 규칙의 파일명을 사용해야합니다. 파일명 다음과 같이 낫파운드티에스엑스입니다. 이제 앱 폴더에 낫파운드티에스엑스파일을 추가하고 컴포넌트를 작성해보겠습니다. 해당 파일에 작성된 컴포넌트는 존재하지 않는 페이지에 요청을 보냈을 때, 오류메세지를 출력해줍니다. 이번의 경우 한국어로 요청하신 페이지는 존재하지 않습니다라는 메세지를 추가해보겠습니다. 테스트해보겠습니다.

Next.js 프로젝트에서는 기본적으로 페이지가 존재하지 않는 경우에 404 페이지가 나타납니다. 그러나 이를 사용자 정의할 수도 있습니다.

먼저, Next.js 앱 폴더로 돌아갑니다. 여기에는 Next.js 라우터가 찾는 또 다른 특별한 파일이 있습니다. 그 파일은 `not-found.tsx`입니다. 이제 `not-found.tsx`라는 새 파일을 추가합니다.

여기에서는 사용자가 존재하지 않는 페이지로 이동할 경우에 렌더링될 React 컴포넌트를 생성하고 내보냅니다. 우리는 이 페이지가 "요청한 페이지가 존재하지 않습니다"라는 메시지를 표시하도록 설정합니다.

```tsx
// app/not-found.tsx
const NotFoundPage = () => {
  return <div>요청하신 페이지는 존재하지 않습니다.</div>;
};

export default NotFoundPage;
```

그러면 우리가 사용자 정의한 메시지가 나타납니다.

하지만 우리는 애플리케이션의 다른 부분에 대해 사용자 정의 404 페이지를 만들 수도 있습니다. 예를 들어, 존재하지 않는 사용자를 보려고 할 때 이 메시지를 표시하는 대신 해당 사용자가 존재하지 않음을 나타내는 다른 페이지를 표시하고 싶을 수 있습니다. 이를 어떻게 할 수 있는지 살펴보겠습니다.

이전에 우리는 이 엔드포인트에 대한 페이지를 빌드했습니다. `/users/1`로 가는 것이죠. 실제 애플리케이션에서는 여기서 해당 ID로 사용자를 가져와야 할 것입니다. 그러나 지금은 이에 대한 주의를 돌리고 싶지 않으므로, ID가 10보다 큰 경우 사용자가 존재하지 않는 것으로 간주하도록 규칙을 만들어 봅시다.

`/user-detail.tsx` 페이지로 이동합니다. 여기에서 ID 매개변수를 확인하고, ID가 10보다 크다면 `next/navigation` 패키지에서 정의한 `notFound` 함수를 호출하여 404 페이지로 리디렉션합니다.

```tsx
// app/users/[id]/page.tsx
import { notFound } from "next/navigation";

interface Props {
  params: { id: number };
}

const UserDetailPage = ({ params: { id } }: Props) => {
  if (id > 10) notFound();

  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
```

이제 `/users/11`로 이동하면 일반 목적의 404 페이지로 리디렉션됩니다. 그러나 이 엔드포인트를 위한 사용자 정의 404 페이지를 만들고자 합니다. 이를 위해 해당 폴더인 `id` 폴더로 이동하고, `not-found.tsx`라는 새 파일을 추가합니다.

```tsx
// app/users/[id]/not-found.tsx
const UserNotFoundPage = () => {
  return <div>This user does not exist</div>;
};

export default UserNotFoundPage;
```

이 파일은 해당 엔드포인트로 이동할 경우 렌더링되며, 해당 사용자가 존재하지 않는 경우에 표시될 페이지입니다. 이제 컴포넌트를 생성하고 "이 사용자가 존재하지 않습니다"라고 표시합니다.

이제 존재하지 않는 페이지로 이동할 경우 일반 오류 메시지 대신에 우리가 만든 사용자 정의 오류 메시지를 볼 수 있습니다.

### Handling Unexpected Errors

지난 시간에는 존재하지 않는 페이지에 대한 요청을 처리하는 방법에 대해 알아봤습니다. 이번 시간에는 컴포넌트에서 발생한 예상치 못한 오류를 처리하는 방법에 대해 알아보겠습니다. 먼저 유저테이블 컴포넌트로 이동해보겠습니다. 그리고 에이피아이 요청을 패치 함수의 인자값으로 전달한 유얼엘에 엑스 값을 추가해 잘못된 유얼엘로 조작해보겠습니다. 그리고 브라우저로 돌아가 실행해보겠습니다. 오류가 출력되는 것을 확인할 수 있습니다. 그리고 오류 발생과 함께 디버깅 도구는 오류 세부 정보, 오류 메세지 및 오류 발생 위치를 알려줍니다. 이는 개발 모드에서만 발생하며, 프로덕션모드로 빌드하는 경우 이렇게 상세한 오류 페이지는 출력되지 않습니다. 이를 확인하고자 다음 명령어를 통해, 앱을 빌드하고 실행해보겠습니다. 일반적인 오류 페이지가 나타납니다. 개발모드처럼 오류 발생에 대한 자세한 정보를 제공하지 않는 것을 확인할 수 있습니다.이는 보안상의 목적으로 개발자만 봐야하는 정보이기 때문에, 이 방식으로 동작합니다. 하지만 이전의 낫파운드 컴포넌트와 같이, 오류 메세지를 원하는 방식으로 작성할 수 있습니다.

---

먼저, 사용자 테이블 컴포넌트로 이동합니다.

예상치 못한 오류를 시뮬레이션하기 위해 이곳에 "x"를 넣어 유효하지 않은 엔드포인트를 만들겠습니다.

```tsx
// app/users/UserTable.tsx
const res = await fetch("https://jsonplaceholder.typicode.com/xusers");
```

이제 사용자 페이지로 이동하면 오류 페이지가 나타납니다. 오류 세부 정보, 오류 메시지 및 오류 발생 위치를 볼 수 있습니다. 이 파일에서 어느 라인에서 오류가 발생했는지 확인할 수 있습니다.

이것은 개발 모드에서만 발생하며, 우리가 프로덕션용으로 애플리케이션을 빌드하면 일반적인 오류 페이지가 나타납니다. 이를 보여드리겠습니다.

터미널로 돌아가서 다음 명령어를 실행해 보겠습니다.

```bash
npm run build
npm start
```

약간의 오류가 발생합니다. 이 오류는 이 프로젝트에서 사용하는 코드 분석 도구인 ESLint에서 발생한 것입니다. 오류는 이 파일에서 작은따옴표를 사용할 수 없다는 것이며, 올바르게 이스케이프 처리해야 합니다. 이를 위해 앰퍼샌드와 아포스트로피 뒤에 세미콜론을 사용해야 합니다.

```tsx
// app/not-found.tsx
const NotFoundPage = () => {
  return <div>The requested page doesn&apos;t exist</div>;
};

export default NotFoundPage;
```

```tsx
// app/users/[id]/not-found.tsx
const UserNotFoundPage = () => {
  return <div>This user doesn&apos;t exist</div>;
};

export default UserNotFoundPage;
```

이것은 기본 HTML 규칙입니다. 따라서 이 오류를 빠르게 수정하겠습니다. 'not-found' 페이지로 이동하여 이 아포스트로피를 앰퍼샌드와 아포스트로피 세미콜론으로 대체합니다. 같은 작업을 다른 'not-found' 페이지에도 수행합니다.

이제 애플리케이션을 다시 빌드해 보겠습니다.

```bash
npm run build
npm start
```

애플리케이션이 빌드되었습니다. 이제 프로덕션 모드로 애플리케이션을 시작해 보겠습니다. 사용자 페이지로 이동하여 확인합니다. 일반적인 오류 페이지가 나타납니다. "서버 측 예외가 발생했습니다."라는 메시지입니다. 이 메시지를 사용자 정의할 수 있습니다. 이를 보여드리겠습니다.

---

구현에 앞서 먼저 터미널로 돌아가서 개발 모드로 애플리케이션을 실행하겠습니다. 예상치 못한 오류 메세지를 직접 작성하고 싶은 경우, 에러닷티에스엑스 파일을 사용할 수 있습니다. 이 파일 또한 낫파운드닷티에스엑스 파일과 같이 넥스트제이에스에서 지정한 파일명으로써, 이 파일명을 사용하면 내부적으로 예상치 못한 오류가 발생했을 때, 내부에 정의된 컴포넌트가 렌더링됩니다. 하지만 에러닷티에스엑스 컴포넌트는 반드시 클라이언트 컴포넌트로 만들어야 하는 점을 주의해야합니다. 다시 말해서 에러닷티에스엑스 파일을 생성하고, 최상단에 유즈클라이언트 지시문을 작성해야합니다. 왜냐하면 에러닷티에스엑스 파일에서는 새로고침을 하는 등 브라우저에이피아이와 상호작용해야하는 경우가 많기 때문입니다. 이제 이어서 에러닷티에스엑스 파일을 생성하고, 한국어로 예상치 못하 오류가 발생했다는 메세지를 표시하도록 설정해보겠습니다. 그런 다음 이 컴포넌트를 클라이언트 컴포넌트로 만들고, 테스트해보겠습니다. 정상적으로 직접 생서한 오류 페이지가 나타납니다. 개발 중에는 오류가 발생한 위치를 볼 수 있는 알림도 표시됩니다.

에러닷티에스엑스 파일 또한 낫파운드파일과 동일하게 앱 폴더에 파일을 추가해, 다른 자식 라우터에서 발생하는 오류를 처리할 수 있습니다. 또한, 각 라우터마다 개별적으로 오류를 처리할 수 있습니다. 하지만 한 가지 예외로, 앱 폴더에 에러닷티에스엑스 파일이 존재함에도, 루트레이아웃에서 발생한 오류를 캐치할 수 없다는 점을 꼭 기억하셔야합니다. 현재 라우트 레이아웃은 매우 간단하기때문에 오류를 발생 할 내용이 없지만, 애플리케이션이 복잡해지고, 루트레이아웃의 크기가 커지면서 관리 할 내용이 많다면, 이 루트 레이아웃을 처리할 때 사용하는 글로벌에러닷티엑스에서 파일을 생성해야합니다. 이 파일 또한 넥스트제이에스에서 지정한 파일입니다. 마지막으로 에러닷티에스엑스 파일은 인자값으로 실제 발생한 오류에 대한 상세 정보를 프롭스 인자값으로 받을 수 있습니다. 이를 위해 먼저 이 컴포넌트의 프롭스 인터페이스를를 정의하고 `error`라는 타입의 프로퍼티를 추가하겠습니다.

실제 애플리케이션에서는 이 오류를 영구적인 곳에 기록하거나 실시간으로 확인하지만, 이러한 내용은 이 강좌의 범위를 벗어나기때문에, 간단하게 콘솔을 찍어 오류를 확인해보겠습니다. 그리고 개인적으로 이러한 내용에 더 관심있으신 분들은 Sentry라는 서비스를 살펴보는 것을 추천드립니다.

그리고 때로는 일시적인 오류가 있는 경우, 애플리케이션의 특정 부분에서 사용자에게 다시 재로드하는 기능을 제공하고 싶을 수 있습니다. 이때 에러닷티에스엑스 파일에서는 프롭스 인자 값으로 전달받는 리셋이라는 함수를 사용할 수 있습니다. 이 함수 또한 인터페이스에 추가해보겠습니다. 이 속성의 리턴값은 없기 때문에 보이드로 명시하겠습니다. 그리고 사용자에게 리셋 기회를 제공하고자 버튼을 추가하고, 클릭 이벤트를 추가해, 클릭시 리셋메소드가 호출되도록 코드를 구성해보겠습니다. 테스트하기 전 다시 개발 모드로 돌아가겠습니다. 이제 테스트해보겠습니다. 리셋 기능이 정상적으로 작동하는 것을 확인할 수 있습니다. 하지만 이 메소드는 애플리케이션의 일부에서만 사용해야합니다, 그렇지 않으면 사용자가 계속 재시도를 하는 경우 불필요한 오류가 계속 기록됩니다. 이제 사용자 테이블 컴포넌트로 돌아가 유얼엘을 원상복구하고 수업을 마무리하겠습니다.

이번 시간에는 예상치 못한 오류를 처리하는 방법에 대해 알아봤습니다. 다음 시간에는 에이피아이를 설계하는 방법에 대해 알아보겠습니다. 감사합니다.

---

```bash
npm run dev
```

이제 프로젝트 내의 `app` 폴더에서 다른 특별한 파일을 추가해야 합니다. 그 파일은 `error.tsx`입니다. `error.tsx` 파일에서는 어떤 페이지에서든 예상치 못한 오류가 발생할 경우 렌더링할 React 컴포넌트를 생성하고 내보냅니다. 이 파일을 만들고 "예상치 못한 오류가 발생했습니다"라는 메시지를 표시하도록 설정합니다. 그런 다음 이 컴포넌트를 클라이언트 컴포넌트로 만들어야 합니다. 그 이유는 곧 설명해드리겠습니다.

```tsx
// app/error.tsx
"use client";

const ErrorPage = () => {
  return <div>An unexpected error has occurred</div>;
};

export default ErrorPage;
```

이제 브라우저로 돌아가서 새로 고침합니다. 사용자 정의 오류 페이지가 나타납니다. 개발 중에는 오류가 발생한 위치를 볼 수 있는 알림도 표시됩니다.

이 오류 페이지에 대해 알아야 할 몇 가지 중요한 사항이 있습니다.

첫 번째로, 다른 레벨의 앱 라우트에서 오류 페이지 또는 오류 파일을 가질 수 있다는 것입니다. 현재 우리는 `app` 폴더에 오류 파일이 있으며 이 파일은 애플리케이션의 모든 페이지에서 발생하는 오류를 캐치할 수 있습니다. 그러나 특정 부분의 앱에서 발생하는 오류에 대한 사용자 정의 오류 페이지도 만들 수 있습니다.

```tsx
// app/users/error.tsx
```

대부분의 경우 이것을 그 수준까지 사용자 정의할 필요는 없고 예상치 못한 오류를 모든 페이지에서 캐치하는 일반적인 오류 페이지만 필요할 것입니다.

두 번째로, 이 오류 파일에서 또는 이 컴포넌트에서는 root layout(app/layout.tsx)에서 발생한 오류를 캐치할 수 없습니다. 현재 라우트 레이아웃은 매우 간단하기떄문에 오류를 발생시킬 수 있는 로직이 없습니다. 그러나 더 복잡한 애플리케이션에서는 root layout(app/layout.tsx)에서 오류를 발생시킬 수 있는 로직이 있다면 이 레이아웃에 대한 오류를 캐치하기 위한 별도의 오류 파일을 만들어야 합니다. 이 오류 파일은 `global-error.tsx`라는 이름으로 작성됩니다. 이 파일은 앱 폴더에 추가됩니다.

```tsx
// app/users/global-error.tsx
```

그러나 현재는 이를 신경 쓰지 않겠습니다. 따라서 이 파일을 삭제하겠습니다.

"error.tsx(app/error.tsx)" 컴포넌트에서 발생한 오류에 액세스할 수 있어야 합니다. 이를 위해 먼저 이 컴포넌트의 프롭스를 정의하고 `error`라는 타입의 프로퍼티를 추가합니다. Next.js는 자동으로 오류 객체를 이 컴포넌트에 전달합니다.

그런 다음 이 오류를 여기서 가져올 수 있습니다. `props`에서 오류를 구조화(destructure)하고 `error`를 가져옵니다.

```tsx
// app/error.tsx
"use client";

interface Props {
  error: Error;
}

const ErrorPage = ({ error }: Props) => {
  console.log("Error: ", error);

  return <div>An unexpected error has occurred</div>;
};

export default ErrorPage;
```

실제 애플리케이션에서는 이 오류를 로그하는 데 사용자 지정 로그인 서비스를 사용해야 합니다. 콘솔에 로깅하는 것은 클라이언트에만 표시되므로 콘솔에 로깅하는 것보다는 영구적인 곳에 이 오류를 기록해야 합니다. 여러 가지 로그인 서비스가 있으며 그 중 어떤 것을 사용할지에 대한 논의는 이 강좌의 범위를 벗어납니다. 하지만 개인적으로 사용하고 좋아하는 서비스 중 하나는 Sentry입니다. Sentry 웹 사이트로 이동하여 해당 요금제를 확인하고 문서를 읽어보면 큰 도움이 됩니다.

이 레슨에서는 오류를 콘솔에 로깅해서 함께 확인하겠습니다.

콘솔에서 오류를 확인할 수 있습니다.

때로는 오류가 일시적일 수 있으므로 애플리케이션의 특정 부분에서 사용자에게 다시 시도할 기회를 제공하고 싶을 수 있습니다. 이를 위해 `props` 인터페이스에 `reset`이라는 두 번째 속성을 추가해야 합니다. 이 속성은 함수여야 하며 반환값이 `void`여야 합니다. Next.js는 자동으로 리셋 함수를 이 컴포넌트에 전달합니다.

리셋 기회를 사용자에게 제공하려면 여기에 버튼을 추가해야 합니다. 버튼을 추가하고 클릭 이벤트를 처리하는 함수를 설정합니다. 이 함수에서 전달된 `reset` 함수를 호출합니다.

```tsx
// app/error.tsx
"use client";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error: ", error);

  return (
    <>
      <div>An unexpected error has occurred</div>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
```

이 버튼을 클릭하여 다시 시도할 수 있습니다. 여전히 동일한 오류가 발생하지만 이 기술을 애플리케이션의 일부에서만 사용해야 합니다. 그렇지 않으면 사용자가 계속 재시도하고 오류 로그에 반복적인 오류가 많이 기록될 수 있습니다. 이 기술은 애플리케이션의 특정 부분에서만 사용해야합니다.

이제 사용자 테이블 컴포넌트로 돌아가서 여기에 있는 "x"를 제거하겠습니다.

## Summary

- Client Cache
- Dynamic Routes
- Prefetching
- Layout

다음은 내용을 리스트 형태로 깔끔하게 정리한 것입니다:

1. Next.js의 새로운 App 라우터는 컨벤션(convention)을 사용하여 루트를 정의합니다.

   - 특수 파일들을(Special Files) 찾아서 루트를 정의합니다 (예: page.tsx, layout.tsx, loading.tsx, route.tsx 등).

2. App 라우터를 사용하면 페이지와 해당 구성 요소 (예: 컴포넌트, 서비스 등)를 함께 둘 수 있습니다.

   - 관련 파일을 가까이 두어 프로젝트 구성을 개선할 수 있습니다.
   - 모든 컴포넌트를 중앙 집중형 컴포넌트 디렉터리에 넣을 필요가 없습니다.

3. 동적 경로는 하나 이상의 매개변수를 사용하는 경로를 의미합니다.

   - 매개변수를 경로에 추가하려면 대괄호로 디렉터리 이름을 묶어줍니다 (예: [id]).

4. 서버 렌더링된 애플리케이션에서는 컴포넌트 상태 관리를 위해 쿼리 문자열 매개변수를 사용합니다.

   - 이를 통해 페이지를 특정 상태로 즐겨찾기에 추가할 수 있습니다.

5. 레이아웃 파일 (layout.tsx)을 사용하여 여러 페이지에서 공유되는 UI를 생성합니다.

   - 루트 레이아웃 (/app/layout.tsx)은 모든 페이지의 공통 UI를 정의합니다.
   - 특정 애플리케이션 영역에 대한 추가 레이아웃을 만들 수 있습니다 (예: /app/admin/layout.tsx).

6. 링크 컴포넌트는 뷰포트에 있는 링크를 미리 가져와서 원활한 페이지 간 탐색을 제공합니다.

7. 사용자가 애플리케이션을 탐색하는 동안 Next.js는 페이지 콘텐츠를 클라이언트의 캐시에 저장합니다.
   - 캐시에 이미 존재하는 페이지를 다시 방문하면 서버에 새로운 요청을 보내지 않고 캐시에서 가져옵니다.
   - 클라이언트 캐시는 브라우저 메모리에 존재하며 세션 동안 지속됩니다.
   - 전체 새로 고침을 수행할 때마다 클리어됩니다.
