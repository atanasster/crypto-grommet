import React from 'react';
import { Box, Text } from 'grommet';
import { shortDate } from 'grommet-controls/utils/moment';
import Value from '../../grommet-controls/Value/Value';
import { ModelContext } from '../StateProvider';
import predict from '../../../tensorflow/run/predictions';
import { formatTraingTime } from '../utils';
import RunButton from './RunButton';

class PredictModel extends React.Component {
  state = {
    prediction: undefined,
    running: false,
  }
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
          if (!lastTrained) {
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
              <Box gap='small' direction='row' align='center'>
                <RunButton
                  onClick={() => this.onPredict(lastTrained)}
                  running={running}
                  label='predict'
                />
                {date && (
                  <Text size='small'>{`last: ${formatTraingTime(date)}`}</Text>
                )}
              </Box>
              <Box direction='row' basis='medium' flex={false} gap='medium'>
                <Value
                  value={`${lastTrained.model.lookbackDays}`}
                  label='prediction days '
                />
                {prediction && (
                  <Value
                    value={`$${prediction.toFixed(2)}`}
                    label={`after ${shortDate(lastDate)}`}
                  />
                )}
              </Box>
              <Box />
            </Box>
          );
        }}
      </ModelContext.Consumer>
    );
  }
}

export default PredictModel;
