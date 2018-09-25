import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { shortDate } from 'grommet-controls/utils';
import { Value } from 'grommet-controls';
import { ModelContext } from '../StateProvider';
import predict from '../../../tensorflow/run/predictions';
import { formatTraingTime } from '../utils';
import RunButton from './RunButton';
import Symbol from '../../Symbol';

class PredictModel extends React.Component {
  state = {
    prediction: undefined,
    running: false,
  };

  async onPredict(model) {
    this.setState({ running: true });
    try {
      const { predictions, lastDate } = await predict(model);
      if (predictions && predictions.length > 0) {
        this.setState({
          prediction: predictions[predictions.length - 1],
          date: Date.now(),
          lastDate,
        });
      }
    } finally {
      this.setState({ running: false });
    }
  }
  render() {
    const {
      prediction, lastDate, running, date,
    } = this.state;
    return (
      <ModelContext.Consumer>
        {({ lastTrained }) => {
          const model = this.props.model || lastTrained;
          if (!model) {
            return null;
          }
          return (
            <Box
              direction='row'
              align='center'
              justify='between'
              fill='horizontal'
              border='horizontal'
              pad={{ vertical: 'small' }}
            >
              <Box gap='small' direction='row' align='center' basis='1/3'>
                <RunButton
                  onClick={() => this.onPredict(model)}
                  running={running}
                  label='predict'
                />
                {date && (
                  <Text size='small'>{`last: ${formatTraingTime(date)}`}</Text>
                )}
              </Box>
              <Box direction='row' gap='medium' basis='1/3'>
                <Value
                  value={(
                    <Symbol
                      disableLink={false}
                      {...model.model.targets[0]}
                    />
                  )}
                  label='target'
                />
                <Value
                  value={`${model.model.lookbackDays}`}
                  label='prediction days '
                />
                {prediction && (
                  <Value
                    value={`$${prediction.toFixed(2)}`}
                    label={`after ${shortDate(lastDate)}`}
                  />
                )}
              </Box>
              <Box basis='1/3' />
            </Box>
          );
        }}
      </ModelContext.Consumer>
    );
  }
}

PredictModel.defaultProps = {
  model: undefined,
};

PredictModel.propTypes = {
  model: PropTypes.object,
};

export default PredictModel;
