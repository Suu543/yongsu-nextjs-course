## Routing and Navigation

이전에 Next.js에서 라우팅의 기본 사항을 배웠습니다. 이 섹션에서는 라우팅과 네비게이션에 대해 더 깊이 알아보겠습니다. 다이나믹한 라우트를 정의하는 방법, 라우트와 쿼리 문자열 매개변수에 접근하는 방법, 레이아웃을 만드는 방법, 로딩 사용자 인터페이스를 표시하고 오류를 처리하는 방법 등을 배우게 됩니다.

- Define dynamic routes
- Access route and query string parameters
- Create layouts
- Show loading UIs
- Handle errors

### Routing Overview

지금까지 라우팅에 대해 배운 내용을 다시 한번 정리해보겠습니다. Next.js에서는 파일 시스템을 기반으로 한 내장 라우터가 있습니다. 예를 들어 앱 폴더에서 사용자 URL 세그먼트를 나타내는 폴더를 만들 수 있습니다. "users/new"와 같이요.

라우트를 공개적으로 접근 가능하게 만들려면 해당 폴더에 특별한 페이지 파일을 두어야 합니다. 페이지 파일은 Next.js 라우터가 찾는 특별한 파일 중 하나이며, 이 섹션을 진행하면서 다른 특별한 파일들에 대해서도 자세히 설명하겠습니다. 예를 들면 레이아웃 파일은 페이지에 대한 공통 레이아웃을 정의할 때 사용하고, 로딩 파일은 로딩 UI를 표시할 때 사용합니다. 또한 라우트 파일은 API를 만들고, 에러 파일은 사용자 정의 에러 페이지를 표시할 때 사용합니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*gO9WnLE9XP0GrVskrgqLqQ.png" />

하지만 앞서 말했듯이, 이 페이지(page.tsx) 파일만이 공개적으로 접근 가능합니다. 다른 파일(예: CSS 파일 또는 JavaScript 파일)을 이러한 폴더에 넣으면 이러한 파일들은 외부에 노출되지 않습니다. 예를 들어 "users" 폴더에 "test.css"와 같은 CSS 파일을 추가한다면 해당 파일에 접근하려고 시도하면 404 오류가 발생합니다. 이를 통해 페이지 파일 및 프로젝트의 다른 구성 요소를 함께 두는 강력한 기능을 이용할 수 있음을 알 수 있습니다.

- localhost:3000/users/test.css (오류 발생)

이전에 사용자 목록을 표시하는 페이지를 만들었습니다. 애플리케이션이 성장하면 이 페이지가 지나치게 복잡해질 수 있습니다. 이 경우 테이블을 추출하고 "user-table"과 같은 별도의 컴포넌트로 분리하고 싶을 것입니다. 프로젝트로 돌아가서 "users" 폴더에 "user-table.tsx"와 같은 새 파일을 추가하겠습니다. 여기에 React 컴포넌트를 만듭니다. 페이지에서 유저 목록이 필요하지만, 이를 프롭스로 전달할 필요는 없습니다. 여기에서 직접 사용자 목록을 가져올 수 있습니다. 페이지로 돌아가보겠습니다. 이 컴포넌트를 추가해보죠. "user-table" 컴포넌트를 페이지 아래에 추가하겠습니다.

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

여기서 흥미로운 점은 이 컴포넌트를 일반적이거나 중앙 집중적인 "Components" 폴더로 넣지 않았다는 것입니다. 애플리케이션이 성장하면 이러한 컴포넌트 폴더가 큰 혼란스러움을 초래할 수 있습니다. 반면 Next.js의 앱 라우터를 사용하면 컴포넌트 및 페이지와 같은 프로젝트 파일을 함께 둘 수 있습니다. 현재 이 컴포넌트는 users 페이지에서만 사용됩니다. 만약 이 컴포넌트를 미래에 여러 장소에서 사용해야 할 경우 "Components" 폴더로 이동시킬 수 있습니다.

### Dynamic Routes

동적 라우트란 매개변수가 포함된 라우트입니다.

예를 들어, 여기서 사용자 폴더에서 새 폴더를 만들어보겠습니다. 이제 여기에 id를 전달하려고 하며, 이를 대괄호로 감쌉니다. 이것이 라우트 매개변수입니다.

- users/[id]

이름은 무엇이든 상관없으며, id 여야 할 필요는 없으며, userId, username 등도 될 수 있습니다.

이제 이 폴더 안에서 페이지 파일을 다시 만들어보겠습니다. 그리고 우리 페이지를 만들어보겠습니다. 사용자 상세 페이지로 지정해보겠습니다.

```tsx
const UserDetailPage = () => {
  return <div>UserDetailPage</div>;
};

export default UserDetailPage;
```

이제 라우트 매개변수에 액세스하려면 이 컴포넌트에 속성(props)을 전달해야 합니다. 속성(props) 객체의 모양을 정의하는 인터페이스를 만들어보겠습니다. props라고 불러도 되며, 이렇게 부를 필요는 없으며, params 속성을 가질 컴포넌트 속성(props)이 있다고 선언합니다. params는 객체이며, 이 객체에 모든 라우트 매개변수를 가질 것입니다. 현재 우리에게는 number 타입의 id라는 하나의 매개변수가 있습니다.

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

이렇게 하면 id를 렌더링할 수 있습니다. 이제 브라우저로 돌아가서 users/1로 이동하면 id를 볼 수 있습니다.users/2로 이동할 수도 있습니다. 이렇게 라우트 매개변수에 액세스할 수 있습니다.

여기서 알아야 할 중요한 점은 이 방법이 페이지에서(page.tsx)만 작동한다는 것입니다. 따라서 이 페이지에서 사용하는 컴포넌트에 이 props를 추가할 수 없습니다. 만약 이 페이지에서 사용자 id를 알아야 하는 컴포넌트가 있다면, 페이지(page.tsx) 수준에서 사용자 id를 가져와서 컴포넌트에 props로 전달해야 합니다.

이제 여러분에게 작은 연습을 하나 드리겠습니다. 다음과 같은 라우트를 만들고 싶다고 가정해보겠습니다.

- /users/id/photos/id

여기서 두 개의 라우트 매개변수가 있습니다.

여기 id 폴더에서 photos라는 하위 폴더를 추가하고, 또 다른 하위 폴더를 추가해보겠습니다. 이곳에서는 이전에 이미 id 매개변수를 사용했으므로 id 대신 photoId와 같은 다른 이름을 사용해야 합니다.

- app/users/[id]/photos/[photoId]/page.tsx

그런 다음 여기에 페이지 파일을 추가합니다. "PhotoDetail"이라고 부르거나 "PhotoPage"라고 부를 수 있습니다.

다시 한 번 props 인터페이스를 추가하고, 여기서 params 속성을 가질 것이라고 선언합니다. params에는 id 및 photo id와 같은 두 개의 속성이 있는 객체가 될 것입니다.

다음으로 props를 추가하고, props의 타입을 지정합니다. 또는 이전에 말한대로 이것을 해체하고 props를 가져오고, id 및 photo id를 추가로 해체할 수 있습니다.

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

이제 작동하는지 확인하기 위해 id 및 photoId를 여기에 렌더링해보겠습니다.

- localhost:3000/users/2/photos/2
- localhost:3000/users/1/photos/2

### Catch-all Segments

때로는 라우트에서 다른 수의 매개변수가 필요할 수 있습니다. 예를 들어, 모든 제품을 표시하는 페이지를 만들고 싶다고 가정해 보겠습니다. 다음과 같이 라우트를 구현할 수 있습니다.

이제 만약 식료품 제품을 보려면 grocery와 같은 매개변수를 추가할 수 있으며, 유제품 제품을 보려면 dairy와 같은 두 번째 매개변수를 추가하고, 마찬가지로 우유 제품을 보려면 세 번째 매개변수를 추가합니다. 따라서 다양한 수의 매개변수가 있습니다.

- localhost:3000/products/grocery/dairy/milk

이를 구현하기 위해 이렇게 많은 중첩된 폴더를 생성하지 않을 것입니다. 더 나은 방법이 있습니다.

앱 폴더에서 새 폴더를 만들어보겠습니다. 여기에서 새 폴더를 만들고 이곳에 매개변수를 추가합니다. 매개변수라고 불리는 이유는 grocery, dairy, milk 등과 같은 URL 슬러그를 포함할 수 있기 때문입니다.

이러한 다양한 수의 매개변수를 수용하려면 여기에 점 세 개 (…)를 접두사로 붙입니다.

- app/products/[...slug]

이제 이전과 마찬가지로 페이지 파일을 여기에 만들어보겠습니다. 이제 이것을 제품 페이지라고 부르겠습니다. 다음으로 props 인터페이스를 정의합니다. 인터페이스 props를 추가하고, props를 정의합니다. 이 객체에는 slug라는 매개변수가 있지만, 이전 내용과 달리 이 타입은 숫자가 아닌 문자열 배열이므로 문자열 배열입니다.

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

### Accessing Query String Parameters

이제 쿼리 문자열 매개변수에 대해 이야기해 보겠습니다.

- localhost:3000/products?sortOrder=name

예를 들어 위 URL에서는 정렬 순서를 결정하는 쿼리 문자열 매개변수가 있습니다. 이제 제품 페이지로 돌아가보겠습니다. 이전에 props 인터페이스에 추가한 props 속성이 있습니다. 이제 쿼리 문자열(query-string) 매개변수에 액세스하려면 "searchParams"라는 다른 속성을 사용합니다. 이를 객체로 설정할 수 있으며 이 객체에서 하나 이상의 속성을 가질 수 있습니다. 현재 우리는 단일 쿼리 문자열 매개변수인 타입이 문자열인 정렬 순서를 가지고 있습니다. 그런 다음 이곳에 추가합니다. 여기서는 props를 해체하여(destruct) params를 바로 추출하는 곳입니다. 그 다음으로 searchParams 를 추가하고 그것을 해체하여(destruct) 정렬 순서를 가져올 수 있습니다. 이렇게 간단합니다. 이제 이를 여기에 렌더링하고 테스트해 봅시다.

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

이것을 가격으로 변경하면 가격을 볼 수 있습니다.

다음에는 여러분에게 작은 연습을 제공하겠습니다. 사용자 페이지로 돌아가봅시다. 사용자 목록을 이름 또는 이메일로 정렬할 수 있는 기능을 추가하려고 합니다. 따라서 이름을 클릭하면 쿼리 문자열에 정렬 순서가 표시되고 테이블이 사용자 이름으로 정렬되어야 합니다. 데이터를 정렬하려면 다양한 라이브러리가 있습니다. fast-sort를 찾아보는 것을 제안합니다. npm에서 fast-sort를 검색하면 이 라이브러리를 찾을 수 있습니다. 사용법이 매우 간단하므로 몇 분 동안 문서를 읽고 데이터를 정렬하는 방법을 파악하세요.

- fast-sort: https://www.npmjs.com/package/fast-sort

```bash
npm install fast-sort
```

먼저 테이블 헤더에 링크를 추가하려고 합니다. 이름을 클릭하면 쿼리 문자열에 정렬 순서가 설정되고, 이메일을 클릭하면 정렬 순서가 설정됩니다. 표준 앵커 요소를 사용하고 싶지 않습니다. 왜냐하면 이것은 전체 페이지를 다시로드하기 때문입니다. 대신 next.js의 링크 컴포넌트(Link)를 사용합니다. 이 컴포넌트는 클라이언트 측 탐색을 제공합니다. 링크를 추가합니다. href를 사용자로 설정하고 여기에 정렬 순서를 name으로 설정합니다. 따라서 이 방법으로 서버에서 모든 작업을 수행합니다. 클라이언트에서 렌더링되는 표준 리액트 애플리케이션과 대조적으로 이러한 기능을 구현하려면 일반적으로 상태 변수가 필요합니다. 상태를 변경하려면 링크나 버튼의 클릭 이벤트를 처리해야 합니다. 그러나 서버로 이동할 때 클라이언트 측 상태 대신 쿼리 문자열 매개변수를 사용합니다. 쿼리 문자열 매개변수는 서버에서 상태를 전달하는 방법입니다.

이제 여기에 링크가 있습니다. 다른 링크를 추가하여 이메일로 정렬하세요. 여기에서 정렬 순서를 email로 설정하고 레이블을 email로 설정합니다. 이제 우리의 애플리케이션을 이 지점까지 테스트해 보겠습니다. 여기에서 이름을 클릭하면 정렬 순서가 name으로 설정됩니다. 여기서 email을 클릭하면 정렬 순서가 email로 설정됩니다.

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

다음으로 정렬을 구현해야 합니다. 그러기 위해서는 fast-sort 라이브러리를 사용할 것입니다. 따라서 터미널에서 fast-sort를 설치하겠습니다. 좋습니다. 이제 데이터를 정렬하기 위해서는 먼저 쿼리 문자열 매개변수에 액세스해야 합니다. 이전에 말한 것처럼 이러한 작업은 컴포넌트에서 수행할 수 없습니다. URL이나 쿼리 문자열 매개변수에 액세스해야 하는 경우마다 이를 페이지에서 수행하고 데이터를 컴포넌트로 전달해야 합니다. 사용자 페이지로 이동합니다. 이 페이지에서 쿼리 문자열 매개변수에 액세스할 수 있습니다. 따라서 props에 대한 인터페이스를 정의합니다. 여기에서 search params를 문자열 형식의 정렬 순서가 있는 객체로 설정합니다. 그런 다음 이것을 여기에 추가합니다. 이것을 즉시 해체할 수 있습니다. search params를 더 깊게 해체하고 정렬 순서를 가져올 수도 있습니다. 더 나아가기 전에 이 지점까지 애플리케이션이 작동하는지 확인합니다. 콘솔에 정렬 순서를 기록하고 이곳에 렌더링할 수도 있습니다. 이 페이지를 새로 고칩니다. 그런 다음 터미널 창으로 돌아가 봅니다. 콘솔에서 email이라는 것을 볼 수 있습니다.

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

이제 정렬 순서를 사용자 테이블로 전달해야 합니다. 여기에서 정렬 순서로 설정합니다.

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

이 컴포넌트로 돌아가 정의한 props 인터페이스를 정의합니다. props 인터페이스를 정의합니다. 여기에서 정렬 순서를 문자열 형식으로 추가합니다. 그런 다음 props를 컴포넌트에 추가합니다. 여기에서 해체하고 정렬 순서를 가져옵니다. 이제 데이터를 정렬하려면 fast-sort에서 sort 함수를 가져와야 합니다. 이 함수를 가져와서 맨 위에 넣습니다. 이 컴포넌트에서 현재 이름 또는 이메일로 정렬만 지원할 것입니다.

사용자가 이메일로 설정하지 않는 한 기본적으로 이름으로 정렬되어야 합니다. 간단한 논리를 작성할 수 있습니다. 정렬을 호출하고 사용자 배열을 전달합니다. 현재로서는 오름차순(asc) 정렬만 구현하려고 합니다. 추가로 내림차순(desc)도 구현할 수 있습니다. 이 메서드를 호출하고 여기에서 정렬 순서를 확인합니다. 정렬 순서가 이메일이면 데이터를 이메일로 정렬합니다. 여기에서 사용자 객체를 가져올 수 있는 화살표 함수를 전달합니다. 그러면 이메일 속성에 액세스할 수 있습니다.

그렇지 않고 정렬 순서가 기본적으로 이름으로 설정된 경우 다른 속성을 설정하지 않았더라도 기본적으로 이름으로 정렬됩니다. 다른 화살표 함수를 전달하고 이름 속성에 액세스합니다. 변경 사항을 저장합니다. 코드가 다시 포맷되었습니다. 데이터를 정렬하고 결과를 sorted users라는 배열에 저장하고 마지막으로 여기에서 sorted users를 반복합니다. 이제 애플리케이션을 테스트해 봅시다.

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

알겠습니다. 내용을 문단 구분하여 깔끔하게 수정하겠습니다.

**레이아웃에 대한 이해:**

레이아웃은 여러 페이지 간에 공유되는 UI를 만들 때 사용합니다. 이 강좌에서 이전에 다룬 것처럼, 앱 폴더 내부에 있는 루트 레이아웃이 있습니다. 다시 한번 살펴보겠습니다.

루트 레이아웃은 모든 페이지에 대한 공통 UI를 정의합니다. 여기에서는 HTML과 body 요소를 반환하고, body 내에서 페이지를 동적으로 렌더링할 수 있는 children을 렌더링하고 있습니다. 이것이 루트 레이아웃입니다.

또한 중첩된 레이아웃을 생성할 수도 있습니다. 예를 들어, 모든 관리자 페이지가 특정 레이아웃을 필요로 하는 경우 관리자 영역을 위한 사용자 정의 레이아웃을 만들 수 있습니다. 어떻게 하는지 살펴보겠습니다.

**Admin 레이아웃 만들기:**

앱 폴더 내부에 admin이라는 폴더를 만들고, 먼저 레이아웃 파일(layout.tsx)을 추가합니다. 파일 이름은 모두 소문자로 입력해야 하며, 이 파일은 Next.js 라우터가 찾는 특수 파일 중 하나입니다.

- app/admin
- app/admin/layout.tsx

그런 다음 React 컴포넌트를 만듭니다. 우리는 이 컴포넌트에서 children이라는 타입의 props를 가져야 합니다. 따라서 props의 모양을 정의하는 인터페이스를 작성합니다.

```tsx
interface Props {
  children: React.ReactNode;
}
```

그리고 이러한 props를 추가하고, children을 여기에서 렌더링합니다. 이 컴포넌트에서는 모든 관리자 페이지에 대한 공통 UI를 정의할 수 있습니다. 예를 들어, 관리자 영역에 왼쪽에 사이드바를 추가하려면 다음과 같이 작성합니다.

이를 스타일링하기 위해 Tailwind를 사용할 것입니다. 부모 컨테이너에 클래스 이름을 적용하겠습니다. 여기서는 flex를 사용하여 기본적으로 flex의 방향이 가로로 설정되도록 합니다. aside 태그에 대해 클래스 이름을 설정하겠습니다. 매우 연한 회색 배경과 패딩 p-5, 오른쪽 여백 mr-5를 적용할 것입니다.

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

이를 확인하려면 admin 폴더에 새 페이지 파일을 추가합니다. admin 홈페이지라고 부르겠습니다. 이제 브라우저로 돌아가서 admin으로 이동해보세요. 이제 모든 관리자 페이지에 왼쪽에 사이드바가 있는 것을 볼 수 있습니다.

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

Link:

네비게이션에 대한 링크 컴포넌트를 구현하는 방법을 배웠습니다. 이제 Link 컴포넌트에 관한 세 가지 중요한 사항이 있습니다.

**첫 번째로**:
Only downloads the content of the target page.

Link 컴포넌트는 대상 페이지의 내용만 다운로드합니다. 이를 확인하려면 홈 페이지를 열고 네트워크 탭을 오른쪽에 열어보겠습니다. 이제 전체 페이지 새로 고침을 수행해 보겠습니다.

새로 고침하면 백엔드로 대량의 요청이 보내집니다. 그러나 사용자 페이지로 이동하면 사용자 페이지의 내용만 받습니다. 네비게이션 바와 같은 다른 파일(예: CSS 및 JavaScript 파일)은 받지 않습니다. 즉, 해당 페이지의 내용만 받습니다. 네트워크 로그를 지우고 사용자 페이지로 이동해 보겠습니다.

이제 해당 페이지의 내용만 포함된 몇 개의 요청만 있습니다. 처음 두 요청은 사실상 동일합니다. React 18의 기능 중 하나인 "strict mode" 때문에 동일한 요청이 두 번 렌더링됩니다. 이 기능은 개발 모드에서만 활성화되며 프로덕션에서는 작동하지 않습니다. 따라서 이에 대해 걱정할 필요가 없습니다. 그런 다음 사용자 페이지 이후에는 rsc(React Server Component)라는 쿼리 문자열 매개변수가 있습니다. 따라서 이 페이지의 내용을 검색하기 위해 브라우저는 백엔드로 이 요청을 보냅니다. 해당 페이지는 React Server Component로 작성되었습니다.

**두 번째로**,

Pre-fetches links that are in the viewport.

Link 컴포넌트는 뷰포트에 있는 링크를 미리 가져옵니다. 이를 확인하려면 애플리케이션을 프로덕션 모드로 시작해야 합니다. 그런 다음 사용자 페이지로 이동하고 전체 페이지를 새로 고침해 보겠습니다.

```bash
npm run build
# production mode
npm start
```

프로덕션 모드에서 페이지를 미리 가져오려고 시도하는 것으로 인해 홈 페이지 및 사용자 페이지를 검색하는 데 사용되는 여러 요청이 보내집니다. 정확한 이유는 명확하지 않지만 Next.js가 이 페이지를 사전에 가져와 성능을 향상시키려고 시도하는 것이 중요합니다. 이 페이지에 해당하는 링크가 있기 때문입니다.

**세 번째로**

Caches pages on the client.

애플리케이션에서 이동하면 Next.js가 페이지 내용을 클라이언트 캐시에 저장합니다. 이전에 본 페이지로 이동할 때 다시 백엔드로 요청을 보내지 않으며 클라이언트 캐시에서 페이지를 가져옵니다. 클라이언트 캐시는 세션 동안만 유효하며 전체 페이지 새로 고침 시 클리어됩니다.

이렇게 클라이언트 캐시를 사용하여 페이지를 효율적으로 가져오고 네비게이션을 최적화할 수 있습니다.

- localhost:3000/users => Clear Log ==> Next.js 링크 클릭 ==> 추가적인 요청x

### Programmatic Navigation

가끔은 버튼을 클릭하거나 양식을 제출한 결과로 사용자를 새 페이지로 이동해야 할 때가 있습니다. 이를 ＂프로그래밍 방식 탐색(programmatic navigation)＂이라고 합니다. 조금 더 자세히 설명하자면, 실제로 어떻게 작동하는지 살펴보겠습니다. 핵심은 기존의 Link 컴포넌트는 서버사이드 렌더링 방식으로 렌더링 되는 컴포넌트에서만 사용할 수 있지만, 양식 제출 등의 클라이언트 단에서 이뤄져야 하는 작업의 경우 클라이언트 사이드 렌더링을 해야 하기 때문에 페이지 이동 시 다른 접근 방식이 필요합니다. 이 경우 사용하는 방식을 ＂프로그래밍 방식 탐색(programmatic navigation)＂이라고 합니다.

먼저, 우리의 변경 내용을 확인하기 위해 개발 모드에서 애플리케이션을 실행하도록 터미널로 돌아가 먼저 실행해봅시다.

```bash
npm run dev
```

이제 사용자 페이지로 이동해 봅시다. "/users/page"로 이동하면 이 테이블 위에 링크를 추가하겠습니다. 링크의 href를 "/user/new"로 설정하고, 여기에서 "New User"라고 표시합니다.

이를 버튼처럼 보이도록 하려면 class name을 "btn"으로 설정하면 됩니다. "btn-primary"을 사용하여 파란색으로 표시할 수도 있지만 여기에서는 일반 버튼을 사용하는 것을 선호합니다. 이제 사용자 페이지에 이 버튼이 추가되었습니다.

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

다음으로, 이 페이지에 버튼을 추가해 보겠습니다. 양식의 일부로 이 버튼을 추가하는 것이 좋을 것 같습니다. 사용자가 양식을 제출하면 사용자 페이지로 이동하도록 하려면 "/user/new/page"로 이동하고 버튼을 추가합니다.

버튼의 class name을 "btn" 및 "btn-primary"로 설정하고 레이블을 "생성"으로 설정합니다. 이 버튼이 양식의 일부인 경우 버튼을 클릭하거나 양식을 제출할 때 이 버튼의 클릭 이벤트나 양식 제출 이벤트를 처리해야 합니다. 그러기 위해서는 클라이언트 컴포넌트로 변환해야 합니다. 서버 컴포넌트에서 브라우저 이벤트를 처리할 수 없기 때문입니다.

따라서 상단에서 "client" 지시문을 사용하고 클릭 이벤트를 처리하려면 함수로 설정해야 합니다. 이 함수 내에서 "link" 컴포넌트를 사용할 수 없으므로 프로그래밍 방식 탐색을 사용합니다. 이를 위해 "router" 객체를 사용할 것입니다.

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

React 18에서는 컴포넌트가 렌더링되는 동안 대체 UI를 표시할 수 있는 Suspense라는 새로운 기능이 있습니다. 이것을 실제로 어떻게 사용하는지 살펴보겠습니다.

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

이제 예상치 못한 오류를 처리하는 방법에 대해 이야기해 보겠습니다.

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

먼저, 터미널로 돌아가서 개발 모드로 애플리케이션을 다시 시작합니다.

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
