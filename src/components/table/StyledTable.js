import styled from 'styled-components';


const StyledTable = styled.table`
  max-width: 100%;
  width: 100%;
  border-collapse: collapse;    
  color: ${props =>
    (props.grommet && props.grommet.dark ? props.theme.global.colors.darkBackground.text
      : props.theme.table.color)};
  & td {
    text-align: left;
    padding: 10px;
  }
  & tr {
    text-align: center;
    border-bottom: solid 1px rgba(0,0,0,0.15);
  }
  
`;

export default StyledTable.extend`
  ${props => props.theme.table.extend}
`;
