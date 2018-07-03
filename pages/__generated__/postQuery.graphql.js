/**
 * @flow
 * @relayHash 3ecd4a8a160df2b485f7310aff671699
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Post$ref = any;
export type postQueryVariables = {|
  id: string
|};
export type postQueryResponse = {|
  +post: ?{|
    +id: string
  |},
  +$fragmentRefs: AppPage$ref & Post$ref,
|};
*/


/*
query postQuery(
  $id: ID!
) {
  post(id: $id) {
    id
  }
  ...AppPage
  ...Post_1Bmzm5
}

fragment AppPage on Query {
  me {
    id
    themeName
  }
}

fragment Post_1Bmzm5 on Query {
  post(id: $id) {
    id
    name
    web {
      id
      name
    }
    parents {
      id
      name
    }
    contentType
    contentChildren {
      id
      name
      contentType
    }
    contentChildrenOrder
    contentText
    contentTextFormat
    contentImage {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  v2
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
  v2,
  v4
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "contentType",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "postQuery",
  "id": null,
  "text": "query postQuery(\n  $id: ID!\n) {\n  post(id: $id) {\n    id\n  }\n  ...AppPage\n  ...Post_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Post_1Bmzm5 on Query {\n  post(id: $id) {\n    id\n    name\n    web {\n      id\n      name\n    }\n    parents {\n      id\n      name\n    }\n    contentType\n    contentChildren {\n      id\n      name\n      contentType\n    }\n    contentChildrenOrder\n    contentText\n    contentTextFormat\n    contentImage {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "postQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": v1,
        "concreteType": "Post",
        "plural": false,
        "selections": v3
      },
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Post",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "postQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": v1,
        "concreteType": "Post",
        "plural": false,
        "selections": [
          v2,
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "web",
            "storageKey": null,
            "args": null,
            "concreteType": "Web",
            "plural": false,
            "selections": v5
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "parents",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": v5
          },
          v6,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contentChildren",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": [
              v2,
              v4,
              v6
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "contentChildrenOrder",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "contentText",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "contentTextFormat",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contentImage",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": v3
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '573c1eb5d8acff006802b81cc6ef7bd9';
module.exports = node;
