// flow-typed signature: 48401fc565cf72de1c0eb0c00b0abe84
// flow-typed version: <<STUB>>/slate-react_v^0.21.1/flow_v0.85.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'slate-react'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'slate-react' {
  // TL;DR: Currently copy-pasting is indeed the best practice.
  // https://github.com/flow-typed/flow-typed/issues/2842#issuecomment-429974407
  declare export type SlateValue = Object;
  declare export var Editor: React$ComponentType<{|
    autoCorrect?: boolean,
    spellCheck?: boolean,
    autoFocus?: boolean,
    ref?: $FlowFixMe,
    value?: SlateValue,
    style?: Object,
    onChange?: ({ value: SlateValue }) => void,
    onFocus?: () => void,
    onKeyDown?: (
      event: SyntheticKeyboardEvent<HTMLDivElement>,
      editor: $FlowFixMe,
      next: () => $FlowFixMe,
    ) => void,
    renderNode?: $FlowFixMe,
    renderMark?: $FlowFixMe,
  |}>;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'slate-react/dist/slate-react' {
  declare module.exports: any;
}

declare module 'slate-react/dist/slate-react.min' {
  declare module.exports: any;
}

declare module 'slate-react/lib/slate-react.es' {
  declare module.exports: any;
}

declare module 'slate-react/lib/slate-react' {
  declare module.exports: any;
}

// Filename aliases
declare module 'slate-react/dist/slate-react.js' {
  declare module.exports: $Exports<'slate-react/dist/slate-react'>;
}
declare module 'slate-react/dist/slate-react.min.js' {
  declare module.exports: $Exports<'slate-react/dist/slate-react.min'>;
}
declare module 'slate-react/lib/slate-react.es.js' {
  declare module.exports: $Exports<'slate-react/lib/slate-react.es'>;
}
declare module 'slate-react/lib/slate-react.js' {
  declare module.exports: $Exports<'slate-react/lib/slate-react'>;
}
