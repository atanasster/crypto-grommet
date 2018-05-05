import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { ImageStamp } from 'grommet-controls';

const Entity = ({
  entity, type, size, display,
}) => {
  const renderTitle = index => (
    <Text truncate={true} key={`coin_name_${entity.symbol}_${index}`} size={size}>
      {entity.name || entity.symbol}
    </Text>
  );
  const renderSymbol = index => (
    <Text truncate={true} key={`coin_symbol_${entity.symbol}_${index}`} size={size}>
      {entity.symbol}
    </Text>
  );
  const renderImage = index => (entity.image ? (
    <ImageStamp
      key={`coin_image_${entity.symbol}_${index}`}
      src={entity.image}
      alt={entity.symbol}
      contain='height'
      title={`${entity.symbol} - ${entity.name}`}
      size={size === 'xlarge' ? 'medium' : 'small'}
    />) : renderSymbol()
  );
  const renderElement = (kind, index) => {
    switch (kind) {
      case 'name': return renderTitle(index);
      case 'symbol': return renderSymbol(index);
      case 'image': return renderImage(index);
      default: return null;
    }
  };
  return entity ? (
    <Box
      a11yTitle={`View details of ${entity.symbol} ${type}`}
      gap='small'
      direction='row'
      align='center'
      flex={false}
      responsive={false}
    >
      {display.map((kind, index) => renderElement(kind, index))}
    </Box>
  ) : null;
};


Entity.defaultProps = {
  size: 'medium',
  entity: undefined,
  display: ['image', 'name', 'symbol'],
};

Entity.propTypes = {
  entity: PropTypes.object,
  size: PropTypes.string,
  display: PropTypes.arrayOf(PropTypes.oneOf(['name', 'symbol', 'image'])),
  type: PropTypes.oneOf(['coin', 'equity', 'exchange']).isRequired,
};

export default Entity;
