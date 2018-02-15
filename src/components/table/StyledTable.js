import styled from 'styled-components';
import ReactTable from 'react-table';

const StyledTable = styled(ReactTable)`
  max-width: 100%;
  width: 100%;
  color: ${props =>
    (props.grommet && props.grommet.dark ? props.theme.global.colors.darkBackground.text
      : props.theme.table.color)};
  & .rt-table {
    align-items: stretch;
    width: 100%;
    border-collapse: collapse;
    overflow: auto
  }
  & .rt-thead {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  & .rt-thead.-headerGroups {
    font-weight: 500; 
  }
  
  & .rt-thead.-filters {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  & .rt-thead.-filters input, .rt-thead.-filters select {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 5px 7px;
    font-size: inherit;
    border-radius: 3px;
    font-weight: normal;
    outline: none;
  }
  
  & .rt-thead.-filters .rt-th {
    border-right: 1px solid rgba(0, 0, 0, 0.02);
  }
  
  
  & .rt-thead .rt-tr {
    font-weight:300;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  
  & .rt-thead .rt-th, .rt-thead .rt-td {
    padding: 5px 5px;
    line-height: normal;
    position: relative;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  & .rt-thead .rt-th.-cursor-pointer, .rt-thead .rt-td.-cursor-pointer {
    cursor: pointer
  }
  
  & .rt-thead .rt-th:last-child, .rt-thead .rt-td:last-child {
    border-right: 0
  }
  
  & .rt-thead .rt-resizable-header {
    overflow: visible;
  }
  
  & .rt-thead .rt-resizable-header:last-child {
    overflow: hidden
  }
  
  & .rt-thead .rt-resizable-header-content {
    overflow: hidden;
    text-overflow: ellipsis
  }
  
  & .rt-thead .rt-header-pivot {
    border-right-color: #f7f7f7
  }
  
  & .rt-thead .rt-header-pivot:after, .rt-thead .rt-header-pivot:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none
  }
  
  & .rt-thead .rt-header-pivot:after {
    border-color: rgba(255, 255, 255, 0);
    border-left-color: #fff;
    border-width: 8px;
    margin-top: -8px
  }
  
  & .rt-thead .rt-header-pivot:before {
    border-color: rgba(102, 102, 102, 0);
    border-left-color: #f7f7f7;
    border-width: 10px;
    margin-top: -10px
  }
  
  & .rt-tbody .rt-tr-group {
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  }
  
  & .rt-tbody .rt-tr-group:last-child {
    border-bottom: 0
  }
  
  & .rt-tbody .rt-td {
    text-align: left;
    padding: 10px;
  }
  
  & .rt-tbody .rt-td:last-child {
    border-right: 0
  }
  
  & .rt-tbody .rt-expandable {
    cursor: pointer
  }
  
  & .rt-tr-group {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch
  }
  
  & .rt-tr {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    align-items: center;
  }
  
  & .rt-th, .rt-td {
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 7px 5px;
    overflow: hidden;
  }
  
  & .rt-th.-hidden, .rt-td.-hidden {
    width: 0 !important;
    min-width: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    opacity: 0 !important
  }
  
  & .rt-expander {
    display: inline-block;
    position: relative;
    margin: 0;
    color: transparent;
    margin: 0 10px;
  }
  
  & .rt-expander:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%) rotate(-90deg);
    transform: translate(-50%, -50%) rotate(-90deg);
    border-left: 5.04px solid transparent;
    border-right: 5.04px solid transparent;
    border-top: 7px solid rgba(0, 0, 0, 0.8);
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    cursor: pointer
  }
  
  & .rt-expander.-open:after {
    -webkit-transform: translate(-50%, -50%) rotate(0);
    transform: translate(-50%, -50%) rotate(0)
  }
  
  & .rt-resizer {
    display: inline-block;
    position: absolute;
    width: 36px;
    top: 0;
    bottom: 0;
    right: -18px;
    cursor: col-resize;
    z-index: 10
  }
  
  & .rt-tfoot {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  
  & .rt-tfoot .rt-td {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  & .rt-tfoot .rt-td:last-child {
    border-right: 0
  }
  
  &.-striped .rt-tr.-odd {
    background: rgba(0, 0, 0, 0.03)
  }
  
  &.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: rgba(0, 0, 0, 0.05)
  }

  & .-loading {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    transition: all .3s ease;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }
  
  & .-loading > div {
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 0;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.6);
    -webkit-transform: translateY(-52%);
    transform: translateY(-52%);
    transition: all .3s cubic-bezier(.25, .46, .45, .94)
  }
  
  & .-loading.-active {
    opacity: 1;
    z-index: 2;
    pointer-events: all;
  }
  
  & .-loading.-active > div {
    -webkit-transform: translateY(50%);
    transform: translateY(50%)
  }
  
  & .rt-resizing .rt-th, .rt-resizing .rt-td {
    transition: none !important;
    cursor: col-resize;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }
  
`;

export default StyledTable.extend`
  ${props => props.theme.table.extend}
`;
