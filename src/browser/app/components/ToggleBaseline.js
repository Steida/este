/* @flow */
import type { State } from '../../../common/types';
import Box from './Box';
import Button from './Button';
import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { toggleBaseline } from '../../../common/app/actions';

type ToggleBaselineProps = {
  baselineShown: boolean,
  toggleBaseline: typeof toggleBaseline,
};

const ToggleBaseline = ({ baselineShown, toggleBaseline }: ToggleBaselineProps) => (
  null
  // <Box>
  //   <Button
  //     // backgroundColor="transparent"
  //     color="black"
  //     border
  //     bold={false}
  //     marginVertical={0.25}
  //     marginBottom={1.25}
  //     onClick={toggleBaseline}
  //   >
  //     {baselineShown ? 'Hide Baseline' : 'Show Baseline'}
  //   </Button>
  // </Box>
);

export default R.compose(
  connect(
    (state: State) => ({
      baselineShown: state.app.baselineShown,
    }),
    { toggleBaseline },
  ),
)(ToggleBaseline);
