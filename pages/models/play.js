import React from 'react';
import { withRouter } from 'next/router';
import { Box, Heading } from 'grommet';
import App from '../../components/App';
import LinksMenu from '../../components/LinksMenu';
import withData from '../../apollo/withData';
import ModelDesigner from '../../components/deep_learning/Design/ModelDesigner';
import ModelHistory from '../../components/deep_learning/Execution/ModelHistory';
import ModelContextProvider, { ModelContext } from '../../components/deep_learning/StateProvider';

const playMenu = [
  {
    route: 'models_playground',
    params: {},
    label: 'design',
    a11yTitle: 'Design tensorflow models',
  },
  {
    route: 'models_playground',
    params: { page: 'history' },
    label: 'history',
    a11yTitle: 'History of trained tensorflow models',
  },
  {
    route: 'models_playground',
    params: { page: 'analysis' },
    label: 'analysis',
    a11yTitle: 'Analysis of the last executed model',
  },
];


class TensorFlowPlay extends React.Component {
  static renderView(model, page) {
    switch (page) {
      case 'design':
      case undefined:
        return (
          <ModelDesigner
            readOnly={false}
            model={model}
          />
        );
      case 'history':
        return <ModelHistory />;
      default:
        return null;
    }
  }
  render() {
    const { router: { query: { page = 'design' } } } = this.props;

    return (
      <ModelContextProvider>
        <ModelContext.Consumer>
          {({ modified, model }) => {
            const title = `Models playground ${modified ? '*' : ''}`;
            return (
              <App
                title={title}
                visibleTitle={(
                  <Box direction='row' align='center' justify='between' fill='horizontal'>
                    <Heading margin='none' level={1}>
                      <strong>{title}</strong>
                    </Heading>
                    <LinksMenu
                      items={playMenu}
                      activeItem={playMenu.findIndex(item => item.label === page)}
                    />
                  </Box>
                )}
              >
                {TensorFlowPlay.renderView(model, page)}
              </App>
            );
          }}
        </ModelContext.Consumer>
      </ModelContextProvider>
    );
  }
}

export default withRouter(withData(TensorFlowPlay));

