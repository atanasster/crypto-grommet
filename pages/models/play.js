import React from 'react';
import { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { Box, Heading, Button } from 'grommet';
import connect from '../../redux';
import App from '../../components/App';
import { addError } from '../../redux/notifications/actions';
import LinksMenu from '../../components/LinksMenu';
import withData from '../../apollo/withData';
import ModelDesigner from '../../components/deep_learning/Design/ModelDesigner';
import ModelHistory from '../../components/deep_learning/Execution/ModelHistory';
import ModelContextProvider, { ModelContext } from '../../components/deep_learning/StateProvider';
import modelSaveMutation from '../../components/deep_learning/graphql/ModelSave.graphql';
import routerPush from '../../components/Router';

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
  getServerErrors(err) {
    if (err.graphQLErrors || err.networkError) {
      const message = err.graphQLErrors.length ?
        err.graphQLErrors[0].message : err.networkError.result.errors[0].message;
      this.props.addError(message);
    }
  }

  onModelSave = ({
    name, id, batchSize, epochs, testSplit, lookbackDays, dataPoints,
    fillMethod, optimizer: { config: optimizerData }, loss, layers, features, targets,
  }) => {
    const { type: optimizer, ...optimizerConfig } = optimizerData;
    const lrs = layers.map((layer) => {
      const { config: { type, ...config } } = layer;
      return { type, config };
    });
    this.props.mutate({
      variables: {
        input: {
          id,
          name,
          batchSize,
          epochs,
          testSplit,
          lookbackDays,
          dataPoints,
          fillMethod,
          optimizer,
          optimizerConfig,
          loss,
          layers: lrs,
          features,
          targets,
        },
      },
    })
      .then((response) => {
        if (response.data) {
          this.props.signIn(response.data.login);
          routerPush({ route: 'profile' });
        }
      })
      .catch((err) => {
        this.getServerErrors(err);
      });
  };
  render() {
    const { router: { query: { page = 'design' } }, user } = this.props;

    return (
      <ModelContextProvider>
        <ModelContext.Consumer>
          {({ modified, model }) => {
            const title = `${model.name}${modified ? ' *' : ''}`;
            return (
              <App
                title={title}
                visibleTitle={(
                  <Box direction='row' align='center' justify='between' fill='horizontal'>
                    <Heading margin='none' level={1}>
                      <strong>{title}</strong>
                    </Heading>
                    {modified && user && <Button label='Save...' onClick={() => this.onModelSave(model)} />}
                    {console.log(model)}
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

const mapDispatchToProps = dispatch => bindActionCreators({ addError }, dispatch);

const mapStateToProps = state => ({
  user: state.auth.user,
});


export default withRouter(
  withData(
    graphql(
      modelSaveMutation
    )(connect(mapStateToProps,
      mapDispatchToProps)(TensorFlowPlay))
  )
);

