## Uploading Files

이 섹션에서는 Next.js 애플리케이션에서 사용자가 파일을 업로드할 수 있도록 하는 방법을 배울 것입니다.

### Choosing a Cloud Platform

사용자가 업로드한 파일을 저장하려면 클라우드 플랫폼을 사용해야 합니다. 다양한 클라우드 플랫폼이 있지만, Amazon Web Services의 일부인 Amazon S3, Google Cloud Platform, Microsoft Azure 등이 있습니다. 그러나 이 섹션에서 사용할 플랫폼은 Cloudinary입니다. 이유는 모든 클라우드 플랫폼 중에서 Next.js와 완벽하게 통합되어 있기 때문입니다. 이 섹션에서 나중에 소개드릴 것처럼 Cloudinary는 프로젝트에 쉽게 통합할 수 있는 다양한 React 컴포넌트를 제공합니다.

코딩이 거의 필요하지 않으며 작은 구성만 필요합니다. 반면에 S3에 파일을 저장하려면 여러 단계를 따라야 하며 코딩이 필요합니다. 이것이 본 섹션에서 Cloudinary를 사용하는 이유입니다. Cloudinary는 가장 간단한 솔루션을 제공하며 필요한 모든 기능을 제공합니다.

### Setting Up Cloudinary

- cloudinary: https://cloudinary.com/

Cloudinary 계정이 없다면 cloudinary.com으로 이동하여 등록하세요. 이 서비스는 무료로 사용할 수 있지만 대역폭이 더 필요한 경우 유료 요금을 지불해야 할 수도 있습니다. 회원가입이 끝나면 로그인하면 홈 페이지가 나타날 것입니다. 여기에서 제품 환경을 볼 수 있으며, 다중 환경을 만들 수 있습니다. 예를 들어 개발 환경, 테스트 환경 및 프로덕션 환경을 각각 만들 수 있습니다. 각 환경은 별도의 저장 공간을 제공합니다.

그런 다음 터미널 창을 열고 `next-cloudinary`를 설치하세요. 이 라이브러리는 파일 업로드 및 파일 보기를 위한 다양한 리액트 컴포넌트를 제공합니다.

```bash
npm install next-cloudinary
```

다음으로 구글에서 "next cloudinary"를 검색하면 `next.cloudinary.dev` 페이지를 찾을 수 있습니다. 여기에서 설치 방법을 찾을 수 있으며 이 강의에서 보여드릴 내용입니다. 먼저 `next-cloudinary`를 설치한 다음, 환경 변수를 `.env` 또는 `.env.local` 파일에 저장해야 합니다.

- Next Cloudinary: https://next.cloudinary.dev/installation

이 부분을 복사한 다음 프로젝트로 돌아가서 `.env` 파일을 열고 붙여넣으세요. 이제 이 부분을 Cloudinary 클라우드 환경의 이름으로 바꿔야 합니다.

```bash
# .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

Cloudinary 홈 페이지에서 찾을 수 있지만 코드 예제 중 하나에서 복사하는 것이 더 쉽습니다. 이제 이 노드 예제에서 복사한 다음 여기에 붙여넣으세요.

이것으로 Cloudinary를 설정하는 데 필요한 모든 단계를 완료했습니다. 이제 파일 업로드를 위한 업로드 컴포넌트를 사용하는 방법을 보여드리겠습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*ti7BdYVC_f5CPpOWskd3Sg.png" />

```bash
# .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtkksmdzx"
```

### Uploading Files

- Next Cloudinary: https://next.cloudinary.dev/installation

다시 `next-cloudinary` 문서로 돌아갑니다.

여기에서 이미지를 업로드하거나 보는 데 사용할 수 있는 다양한 컴포넌트가 있는 것을 볼 수 있습니다. 업로드 버튼, 업로드 위젯, 비디오 플레이어 등이 있습니다. (CldImage, CldOgImage, CldUploadButton, CldUploadWidget, and CldvideoPalyer)

먼저 "업로드 위젯(CldUploadWidget)"을 살펴보겠습니다. 기본 사용법을 확인해 보세요. 아주 간단하게 사용할 수 있습니다. 먼저 `next-cloudinary`에서 이 컴포넌트를 가져오고 다음과 같이 사용합니다.

- https://next.cloudinary.dev/clduploadwidget/basic-usage

프로젝트로 돌아가서 `app` 폴더 안에 `upload`라는 새 폴더를 만들고 페이지 파일을 추가합니다. 그런 다음 `upload page`라는 리액트 컴포넌트를 만듭니다.

- app/upload/page.tsx

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  return <CldUploadWidget uploadPreset="ubzfcmbv"></CldUploadWidget>;
};

export default UploadPage;
```

맨 위에서 `next-cloudinary`에서 `CLDUploadWidget`을 가져와 페이지에 추가합니다. 이 컴포넌트를 사용하려면 `uploadPreset` 프롭을 설정해야 합니다.

Cloudinary 관리 콘솔로 돌아가서 왼쪽에 있는 "Settings"를 클릭한 다음 "Upload" 페이지로 이동합니다. 아래에서 "Upload presets"를 볼 수 있습니다. "Add upload preset"을 클릭하고 새 업로드 프리셋의 이름을 지정합니다. 여기에서는 "unsigned_preset"을 사용하겠습니다. 그런 다음 "Signing Mode"를 "On-site"로 변경합니다. 이렇게 하면 사용하기 쉬워집니다. "Sign"을 사용할 수도 있지만 이 부분은 문서를 참고하시기 바랍니다.

아래에서 파일이 업로드될 폴더를 지정할 수 있습니다. 여기서는 비워 두겠습니다. 이렇게 하면 업로드된 모든 파일이 클라우드 환경의 루트에 저장됩니다. 변경 사항을 저장하세요. 이제 "unsigned_preset"이라는 업로드 프리셋이 있으므로 이 프리셋을 사용할 수 있습니다.

이 위젯은 사용자 인터페이스를 가지고 있지 않습니다. 대신에 어떤 것이든 자식 요소로 렌더링합니다. 일반적으로 여기에 버튼을 렌더링하려고 할 것입니다. 그러나 이 컴포넌트는 함수로 된 자식 요소를 예상하므로 버튼을 반환하는 함수를 전달해야 합니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  return <CldUploadWidget uploadPreset="ubzfcmbv"></CldUploadWidget>;
};

export default UploadPage;
```

이 부분에서 버튼을 반환합니다. 이 부분을 버튼 클래스에 "btn btn-primary"를 추가합니다. 버튼 텍스트는 "Upload"입니다. `next-cloudinary`는 이 함수에 객체를 전달합니다. 우리는 이 객체를 디스트럭처링하고 `open` 함수를 사용합니다. 다른 함수들도 있습니다. 더 추가적인 기능은 공식 문서를 참고해주세요. 하지만 우리는 여기서 `open` 함수만 사용할 것입니다. 이 함수는 버튼을 클릭하면 업로드 대화 상자를 엽니다.

그런데 이 컴포넌트에서 클릭 이벤트를 처리하고 있기 때문에 이 컴포넌트를 클라이언트 컴포넌트로 만들어야 합니다. 맨 위에서 `use client` 디렉티브를 사용합니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  return (
    <CldUploadWidget uploadPreset="">
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
```

이것으로 설정을 마쳤습니다. 이제 애플리케이션으로 돌아가서 "upload" 페이지로 이동하면 업로드 버튼이 표시됩니다.

- localhost:3000/upload

버튼을 클릭하면 Cloudinary 업로드 대화 상자가 표시됩니다. 기본적으로 컴퓨터에서, 웹 주소에서, 카메라에서, Google 드라이브에서, Dropbox에서 등에서 파일을 업로드할 수 있습니다. 이 모든 것은 사용자 지정 가능합니다. 예를 들어 어떤 애플리케이션에서는 로컬 컴퓨터에서 업로드만 허용하려고 할 수 있습니다. 이 위젯의 기능과 모양을 완전히 사용자 지정할 수 있습니다.

기본적으로 여러 파일을 업로드할 수 있지만 이를 비활성화하여 단일 파일을 업로드할 수도 있습니다. 이제 세 개의 이미지를 업로드해 보겠습니다. 업로드 중인 것을 볼 수 있습니다. 미리보기도 표시됩니다. 진행률 표시 막대도 볼 수 있습니다. 하나는 완료되었고 나머지 하나를 기다리고 있습니다. 완료되면 더 많이 업로드하거나 "완료"를 클릭할 수 있습니다.

이렇게 파일 업로드를 완료했습니다. 이제 Cloudinary 관리 콘솔로 돌아가서 미디어 라이브러리로 이동하면 업로드한 이미지를 볼 수 있습니다.

### Showing Uploaded Images

이제 업로드한 이미지를 표시하는 방법을 살펴봅시다.

코드로 돌아가 봅시다. 이 업로드 위젯 컴포넌트에는 파일이 업로드될 때마다 트리거되는 `upload` 이벤트가 있습니다. 여기서 `onUpload`를 두 개의 인자인 `result`와 `widget`을 가진 함수로 설정할 수 있습니다. 먼저 콘솔에 `result`를 기록해 봅시다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";

const UploadPage = () => {
  return (
    <CldUploadWidget
      uploadPreset=""
      onUpload={(result, widget) => {
        console.log(result);
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
```

그래서 페이지로 돌아가서 파일을 업로드해 보겠습니다. 그런 다음 콘솔을 확인해 봅시다. 알림창이 실패한 postMessage를 실행하지 못했다는 오류가 표시됩니다. 이것은 과거에 발생한 일시적인 문제였으며 해결되었지만 다시 발생했습니다. 무슨 문제인지 확실하지 않지만, 향후 이 비디오를 보는 동안 이 문제가 발생하지 않기를 바랍니다. 그러나 걱정하지 마세요. 이 문제는 애플리케이션 작동을 중단하지 않습니다.

아래에서 `result` 객체가 표시됩니다. 여기에는 `event`와 `info`라는 두 가지 속성이 있습니다. 먼저 `event`는 "success"로 설정되며 업로드된 이미지에 대한 정보를 포함하는 `info` 속성이 있습니다. 예를 들어 이미지의 크기, 작성 일자, 형식, 높이, 너비, 원래 파일 이름, 고유한 "public_id"를 볼 수 있습니다. 나중에 이 "public_id"를 가져와 next Cloudinary가 제공하는 이미지 컴포넌트에 전달할 것입니다. 또한 썸네일 URL과 전체 URL이 있습니다.

이제 코드로 돌아가 여기서 "public_id"를 저장할 상태 변수를 선언해야 합니다. 그러면 "public_id"를 이미지 컴포넌트에 전달할 수 있습니다. 이를 위해 "useState Hook"을 사용하여 초기화된 변수를 빈 문자열로 선언합니다. 이 변수의 이름을 public id로 지정합니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <CldUploadWidget
      uploadPreset=""
          onUpload={(result, widget) => {
              if (result.event !== "success") return;
              setPublicId(result.info.)
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
```

여러 이미지를 처리하려면 문자열 배열이 필요합니다. 업로드 함수로 돌아가서 먼저 `result.event`가 "success"가 아닌지 확인한 다음 리턴합니다. 그렇지 않으면 `public_id`를 `result.info`로 설정합니다. 이때 `info` 속성은 제대로 유형이 지정되지 않으므로 콘솔에서 보았던 것과 같은 속성을 여기에서 볼 수 없습니다. 이 문제를 해결하려면 이 속성을 제대로 유형화해야 합니다.

여기서는 인터페이스를 정의하고 "CloudinaryResult"라고 부르겠습니다. 그리고 "public_id"와 같은 필요한 속성을 추가할 수 있습니다.

이제 우리는 따로 상수를 선언할 수 있습니다. `info`라고 부르겠습니다. 그리고 이것을 `result.info`로 설정하고 유형 단언을 사용하여 TypeScript 컴파일러에 이 속성의 유형에 대해 알려줍니다. 이 경우 `CloudinaryResult`입니다. 또는 이 부분을 바로 여기서 처리할 수 있습니다. 괄호로 묶어도 됩니다. 이제 이렇게 설정하면 `public_id`를 `info.public_id`로 설정할 수 있습니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <CldUploadWidget
      uploadPreset=""
      onUpload={(result, widget) => {
        if (result.event !== "success") return;
        const info = result.info as CloudinaryResult;
        setPublicId(info.public_id);
      }}
    >
      {({ open }) => (
        <button className="btn btn-primary" onClick={() => open()}>
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPage;
```

마지막 단계입니다. 이미지를 렌더링하기 위해 next Cloudinary에서 제공하는 `cld-image` 컴포넌트를 가져옵니다. 그런 다음 프래그먼트를 추가하고 `public_id`가 있는 경우에만 `cld-image` 컴포넌트를 렌더링합니다.

여기에서 설정해야 할 몇 가지 속성이 있습니다. 먼저 닫는 태그를 제거하고 `self-closing` 구문을 사용합니다. 여기서 `source`를 `public_id`로 설정해야 합니다. 또한 너비와 높이를 설정해야 합니다. 임의의 숫자를 사용해 보겠습니다. 예를 들어 270과 180과 같은 숫자를 사용하여 사각형을 만듭니다. 그리고 `alt`를 설정해야 합니다. "Uploaded Image Not Found" 같은 것을 사용할 수 있습니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="Uploaded Image Not Found"
        />
      )}
      <CldUploadWidget
        uploadPreset=""
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
```

이제 애플리케이션을 테스트해 봅시다.

- localhost:3000/upload

### Customizing the Upload Widget

이전에 말한대로, 이 업로드 위젯의 모든 측면을 사용자 정의할 수 있다고 했습니다. 그래서 "demo.cloudinary.com/uw"(약어)로 이동해보겠습니다. 이 페이지에서는 이 위젯의 모든 측면을 사용자 정의할 수 있습니다.

예를 들어 이 모든 소스를 허용하지 않고 로컬 컴퓨터에서만 업로드를 허용하려면 해당 소스를 선택 해제할 수 있습니다. 로컬 컴퓨터에서만 업로드를 허용하려면 이렇게 설정합니다.

또한 테마를 변경할 수 있으며 다양한 기본 테마도 있으며 색상을 덮어쓸 수 있고 글꼴을 변경할 수도 있으며 잘라내기를 허용할 수 있으며 여러 파일을 허용할 수도 있습니다. 이 페이지에서 한 모든 변경 사항을 미리 볼 수 있으므로 현재 이 위젯에는 Dropbox에서 업로드, 카메라에서 업로드 등 다른 소스가 없습니다.

<img src="https://cdn-images-1.medium.com/max/1200/1*wkbQncgv4YiZoeVRUOhDLQ.png" />
<img src="https://cdn-images-1.medium.com/max/1200/1*zlMxQGj5YFVF4zwqSkHBCw.png" />

세 번째 탭에서 실제 코드를 볼 수 있습니다. 이 코드는 일반적인 JavaScript를 사용하며 이 섹션에서 보았던 React 컴포넌트를 사용하지 않습니다. 그러나 여기에 표시된 모든 속성은 React 컴포넌트에서 사용할 수 있습니다.

예를 들어, 여기에서 소스를 'local'로 설정하여 로컬 컴퓨터에서만 업로드를 허용할 수 있습니다. 이렇게 설정하는 방법은 다음과 같습니다.

```tsx
// app/upload/page.tsx
"use client";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="Uploaded Image Not Found"
        />
      )}
      <CldUploadWidget
        uploadPreset=""
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: {},
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
```

여러 파일을 허용하지 않으려면 `multiple`을 `false`로 설정할 수도 있으며, `maxFiles`로 최대 업로드 파일 수를 지정할 수도 있습니다.

스타일을 덮어쓰려면 별도의 `styles` 속성이 있으며 이를 객체로 설정하여 사용할 수 있습니다. 스타일 사용 예는 이 코드를 참고하면 됩니다.

`CldUploadWidget`의 `multiple` 속성이 `false`로 설정되어 있으면 사용자는 한 번에 하나의 파일만 업로드할 수 있습니다. `maxFiles: 5`를 설정하더라도 `multiple`이 `false`로 설정되어 있으면 여전히 하나의 파일만 업로드됩니다.

`multiple`을 `true`로 설정하면 한 번에 여러 파일을 선택하고 업로드할 수 있습니다. `maxFiles`는 동시에 업로드할 수 있는 파일의 최대 수를 제한하는 데 사용됩니다. 따라서 `multiple`이 `true`이고 `maxFiles: 5`로 설정되면 한 번에 여러 파일을 업로드할 수 있으며 최대 5개의 파일까지 업로드됩니다.

요약하면, `multiple`이 `false`로 설정되어 있으면 하나의 파일만 업로드할 수 있고, `maxFiles` 설정은 영향을 미치지 않습니다. `multiple`을 `true`로 설정하면 `maxFiles`를 통해 동시에 업로드할 수 있는 파일의 최대 수를 제한할 수 있습니다.

## Summary

<img src="https://cdn-images-1.medium.com/max/1200/1*dxUzUiDWdHTGWZ8ISOpkLg.png" />
