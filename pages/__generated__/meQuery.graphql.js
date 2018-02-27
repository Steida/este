/**
 * @flow
 * @relayHash c82b058f7b41d056dfaec6f71513b7ab
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Page$ref = any;
export type meQueryVariables = {| |};
export type meQueryResponse = {|
  +me: ?{|
    +email: string,
  |},
  +$fragmentRefs: Page$ref,
|};
*/


/*
query meQuery {
  ...Page
  me {
    email
    id
  }
}

fragment Page on Query {
  me {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "meQuery",
  "id": null,
  "text": "query meQuery {\n  ...Page\n  me {\n    email\n    id\n  }\n}\n\nfragment Page on Query {\n  me {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "meQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Page",
        "args": null
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
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "meQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          v0
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '1497b4f763901f71af0634a46a6e18c4';
module.exports = node;
