/**
 * @flow
 * @relayHash c61f53d675799989f47f28b9cee5b5c9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Page$ref = any;
export type signInQueryVariables = {| |};
export type signInQueryResponse = {|
  +$fragmentRefs: Page$ref,
|};
*/


/*
query signInQuery {
  ...Page
}

fragment Page on Query {
  me {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "signInQuery",
  "id": null,
  "text": "query signInQuery {\n  ...Page\n}\n\nfragment Page on Query {\n  me {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "signInQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Page",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "signInQuery",
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
          }
        ]
      }
    ]
  }
};
(node/*: any*/).hash = '27b8c2f4d973b7c447f8c510f9253bc8';
module.exports = node;
